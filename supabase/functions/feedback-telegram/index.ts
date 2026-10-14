// Supabase Edge Function «feedback-telegram»: пересылает новые сообщения «Сообщить об ошибке» в Telegram.
//
// Запускается триггером базы после каждого нового сообщения (supabase/migrations/0003_feedback.sql).
// Текст запроса не читается: функция сама забирает из базы ещё не отправленные сообщения,
// поэтому чужой запрос к ней не может ни подделать сообщение, ни отправить его дважды.
//
// Секреты (Supabase → Edge Functions → Secrets), в коде их нет:
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — куда присылать (ваш chat_id)
// SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY Supabase передаёт функции сам.
// TELEGRAM_API — только для тестов (адрес поддельного Telegram).

const env = (k: string) => Deno.env.get(k) ?? '';
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

type Row = {
  id: number; at: string; message: string; contact: string | null; page: string | null; item: string | null;
  item_label: string | null; device: string | null; nickname: string | null; code: string | null; class: string | null;
};

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  const r = await fetch(`${env('SUPABASE_URL')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!r.ok) throw new Error(`${fn}: ${r.status} ${await r.text()}`);
  const text = await r.text();
  return (text ? JSON.parse(text) : null) as T;
}

/** обычный текст без разметки: в сообщении посетителя может быть что угодно */
function format(r: Row): string {
  const who = r.nickname ? `${r.nickname}${r.class ? `, класс «${r.class}»` : ''}` : 'гость';
  const when = new Date(r.at).toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent', dateStyle: 'short', timeStyle: 'short' });
  const lines = [`✉️ Unmuzaj: сообщение №${r.id}`, '', r.message, ''];
  if (r.page) lines.push(`Страница: ${r.page}`);
  if (r.item_label || r.item) lines.push(`Задание: ${[r.item_label, r.item && `(${r.item})`].filter(Boolean).join(' ')}`);
  lines.push(`Кто: ${who}`);
  if (r.contact) lines.push(`Контакт: ${r.contact}`);
  if (r.device) lines.push(`Устройство: ${r.device}`);
  lines.push(`Время: ${when}`);
  return lines.join('\n').slice(0, 4000); // предел Telegram — 4096 символов
}

Deno.serve(async req => {
  if (req.method !== 'POST') return json({ ok: true }); // отправку запускает только POST (так вызывает база)
  const token = env('TELEGRAM_BOT_TOKEN'), chat = env('TELEGRAM_CHAT_ID');
  // секреты не заданы — сообщения остаются в базе и уйдут, когда секреты появятся
  if (!token || !chat) return json({ ok: false, err: 'no_telegram_secrets' });
  let rows: Row[];
  try { rows = await rpc<Row[]>('feedback_take_unsent', { p_limit: 10 }); }
  catch (e) { console.error(String(e)); return json({ ok: false, err: 'db' }, 500); }

  const api = env('TELEGRAM_API') || 'https://api.telegram.org';
  const failed: number[] = [];
  for (const r of rows ?? []) {
    try {
      const res = await fetch(`${api}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text: format(r), disable_web_page_preview: true }),
      });
      if (!res.ok) { failed.push(r.id); console.error(`telegram ${res.status}: ${await res.text()}`); }
    } catch (e) { failed.push(r.id); console.error(`telegram: ${e}`); }
  }
  // не дошедшие сообщения вернуть в очередь: они уйдут при следующем запуске
  if (failed.length) { try { await rpc('feedback_mark_unsent', { p_ids: failed }); } catch (e) { console.error(String(e)); } }
  return json({ ok: failed.length === 0, sent: (rows?.length ?? 0) - failed.length, failed: failed.length });
});
