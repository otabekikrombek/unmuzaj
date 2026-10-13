// Отправка результатов викторин: очередь на устройстве, повтор при появлении сети, без дублей (id попытки).
import { getWho, rpc, AuthError } from './api';
import type { Answer } from './quiz';

export type Attempt = { id: string; quiz: string; points: number; correct: number; total: number; time: number; level: string; start: number; dev: string; answers: Answer[] };
export type SendState = 'guest' | 'saved' | 'pending' | 'offline' | 'relogin';

function owner(): string | null {
  const w = getWho();
  if (!w) return null;
  return w.kind === 'pin' ? `pin:${w.join}:${w.code}` : `email:${w.email}`;
}
const qKey = (o: string) => `unmuzaj:quizq:${o}`;
const read = (o: string): Attempt[] => { try { return JSON.parse(localStorage.getItem(qKey(o)) || '[]'); } catch { return []; } };
const write = (o: string, q: Attempt[]) => { try { localStorage.setItem(qKey(o), JSON.stringify(q)); } catch {} };

/** лучший результат гостя (только на этом устройстве) */
export function guestBest(quiz: string): { points: number; correct: number; total: number } | null {
  try { return JSON.parse(localStorage.getItem(`unmuzaj:quizbest:${quiz}`) || 'null'); } catch { return null; }
}
export function saveGuestBest(a: Attempt) {
  const b = guestBest(a.quiz);
  if (!b || a.points > b.points) try { localStorage.setItem(`unmuzaj:quizbest:${a.quiz}`, JSON.stringify({ points: a.points, correct: a.correct, total: a.total })); } catch {}
}

let busy = false;
/** отправить всё, что накопилось. Возвращает состояние для подписи на экране. */
export async function flushQuizzes(): Promise<SendState> {
  const o = owner();
  if (!o) return 'guest';
  if (busy) return 'pending';
  busy = true;
  try {
    for (const a of read(o)) {
      const w = getWho();
      const r = await rpc<any>('quiz_submit', { p_token: w?.kind === 'pin' ? w.token : null, p: a });
      if (r?.ok || r?.err === 'id') write(o, read(o).filter(x => x.id !== a.id)); // принято (или такой id уже занят — повторять бесполезно)
    }
    return read(o).length ? 'pending' : 'saved';
  } catch (e) {
    return e instanceof AuthError ? 'relogin' : 'offline';
  } finally { busy = false; }
}

/** сохранить попытку: сначала в очередь на устройстве, затем отправить */
export async function submitAttempt(a: Attempt): Promise<SendState> {
  const o = owner();
  if (!o) { saveGuestBest(a); return 'guest'; }
  write(o, [...read(o).filter(x => x.id !== a.id), a]);
  return flushQuizzes();
}
export const pendingCount = () => { const o = owner(); return o ? read(o).length : 0; };
