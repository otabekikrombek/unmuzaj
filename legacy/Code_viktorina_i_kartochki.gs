// ═══════════════════════════════════════════════════════════════════
//  ОБЩАЯ БАЗА: викторины + карточки слов (версия 3)
//  Google Таблица → Расширения → Apps Script → заменить ВЕСЬ код на этот → Сохранить.
//  Затем: выбрать функцию «setup» → Выполнить (один раз, разрешить доступ).
//  Затем: Начать развертывание → Управление развертываниями → ✏️ →
//         Версия: «Новая версия» → Развернуть. Адрес …/exec НЕ меняется.
// ═══════════════════════════════════════════════════════════════════

// ---------- листы викторин (как раньше, не трогать) ----------
const RES = 'Результаты';   // одна строка на попытку викторины
const ANS = 'Ответы';       // одна строка на каждый ответ в викторине
// ---------- листы карточек ----------
const STU = 'Студенты';        // заполняет учитель: имя, пол, группа, ПИН
const PRG = 'Прогресс';        // одна строка на студента и набор слов (служебный)
const EVT = 'Слова_ответы';    // каждый ответ на карточку или в тесте
const SES = 'Сеансы';          // каждый вход: сколько минут, сколько карточек
const CTS = 'Тесты_карточек';  // результаты тестов «20 вопросов»
const CFG = 'Настройки';       // ключ учителя
const SUM = 'Сводка';          // строится кнопкой «Обновить сводку»
const HRD = 'Трудные_слова';   // строится кнопкой «Обновить сводку»

const DECKS = { w100: '100 слов (список 1)', w100b: '100 слов (список 2)' };
const MAX_FAILS = 5;           // неверных ПИНов подряд → блокировка на 10 минут

function sheet_(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}
const res_ = () => sheet_(RES, ['Дата', 'Викторина', 'Группа', 'Имя', 'Очки', 'Верно', 'Из', 'Время (сек.)', 'Уровень']);
const ans_ = () => sheet_(ANS, ['Дата', 'Викторина', 'Группа', 'Имя', '№ вопроса', 'Вопрос', 'Ответ студента', 'Правильный ответ', 'Верно?', 'Время ответа (сек.)']);
const stu_ = () => sheet_(STU, ['ID', 'Имя и фамилия', 'Пол (м/ж)', 'Группа', 'ПИН', 'Имя в викторинах (если пишет иначе)', 'Примечание']);
const prg_ = () => sheet_(PRG, ['ID', 'Имя', 'Набор', 'Данные (не редактировать)', 'Обновлено']);
const evt_ = () => sheet_(EVT, ['Дата', 'ID', 'Имя', 'Набор', 'Режим', 'Направление', 'Слово', 'Перевод', 'Тема', 'Верно?', 'Уровень после (0–5)']);
const ses_ = () => sheet_(SES, ['Код сеанса', 'Начало', 'Конец', 'ID', 'Имя', 'Набор', 'Активных минут', 'Карточек', 'Верно', 'Ошибок', 'Тестов', 'Устройство']);
const cts_ = () => sheet_(CTS, ['Дата', 'ID', 'Имя', 'Набор', 'Верно', 'Из', 'Время (сек.)']);
const cfg_ = () => sheet_(CFG, ['Параметр', 'Значение']);

const json_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const s_ = (v, n) => String(v == null ? '' : v).slice(0, n);
const norm_ = s => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase().replace(/ё/g, 'е');
const body_ = sh => { const n = sh.getLastRow(); return n < 2 ? [] : sh.getRange(2, 1, n - 1, sh.getLastColumn()).getValues(); };
const tz_ = () => Session.getScriptTimeZone();

// ═══════════════ МЕНЮ В ТАБЛИЦЕ ═══════════════
function onOpen() {
  SpreadsheetApp.getUi().createMenu('📚 Карточки')
    .addItem('1. Создать листы и выдать ПИН', 'setup')
    .addItem('2. Выдать ПИН новым студентам', 'fillPins')
    .addItem('3. Обновить сводку', 'buildReport')
    .addToUi();
}

// Один раз: создаёт все листы, 19 строк студентов со случайными ПИН и ключ учителя.
function setup() {
  [res_, ans_, prg_, evt_, ses_, cts_].forEach(f => f());
  const st = stu_();
  if (st.getLastRow() < 2) {
    const rows = [];
    for (let i = 1; i <= 19; i++) rows.push([i, 'Студент ' + i, '', '', '', '', '']);
    st.getRange(2, 1, rows.length, 7).setValues(rows);
  }
  st.getRange(2, 5, 200, 1).setNumberFormat('@');   // ПИН как текст
  fillPins();
  const cf = cfg_();
  if (!cfgGet_('Ключ учителя')) cf.appendRow(['Ключ учителя', randKey_(10)]);
  try {
    SpreadsheetApp.getUi().alert('Готово.\n\n1) На листе «Студенты» впишите имена и пол (м/ж).\n2) ПИН раздайте студентам лично.\n3) Ключ учителя для панели — на листе «Настройки».\n4) Не забудьте «Развернуть → Новая версия».');
  } catch (e) {}
}

// Выдаёт случайные 4-значные ПИН всем, у кого есть имя и нет ПИН.
function fillPins() {
  const st = stu_(), rows = body_(st);
  const used = new Set(rows.map(r => String(r[4]).trim()).filter(Boolean));
  rows.forEach((r, i) => {
    if (String(r[1]).trim() && !String(r[4]).trim()) {
      let p; do { p = String(1000 + Math.floor(Math.random() * 9000)); } while (used.has(p));
      used.add(p); st.getRange(i + 2, 5).setValue(p);
    }
    if (String(r[1]).trim() && !String(r[0]).trim()) st.getRange(i + 2, 1).setValue(i + 1);
  });
}
function randKey_(n) { const a = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)]; return s; }
function cfgGet_(k) { const r = body_(cfg_()).find(r => String(r[0]) === k); return r ? String(r[1]).trim() : ''; }

function students_() {
  return body_(stu_()).filter(r => String(r[1]).trim() && String(r[0]).trim()).map(r => ({
    id: String(r[0]).trim(), name: String(r[1]).trim(), sex: norm_(r[2]).slice(0, 1), group: String(r[3]).trim(),
    pin: String(r[4]).trim(), alias: String(r[5]).split(/[;,]/).map(norm_).filter(Boolean)
  }));
}

// Проверка ПИН с защитой от подбора
function auth_(id, pin) {
  const c = CacheService.getScriptCache(), k = 'fail_' + id;
  const fails = Number(c.get(k)) || 0;
  if (fails >= MAX_FAILS) return { ok: false, err: 'locked' };
  const st = students_().find(s => s.id === String(id));
  if (!st || !st.pin || st.pin !== String(pin || '').trim()) { c.put(k, String(fails + 1), 600); return { ok: false, err: 'pin' }; }
  c.remove(k);
  return { ok: true, st: st };
}

// ═══════════════ ПРИЁМ ДАННЫХ ═══════════════
function doPost(e) {
  const d = JSON.parse((e.postData && e.postData.contents) || '{}');
  if (d.action) return json_(action_(d));
  // ---- результат викторины (как раньше) ----
  const name = s_(d.name, 40).trim();
  if (!name) return json_({ ok: false });
  const now = new Date(), quiz = s_(d.quiz, 40), group = s_(d.group, 20);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    res_().appendRow([now, quiz, group, name, Number(d.points) || 0, Number(d.correct) || 0, Number(d.total) || 0, Number(d.time) || 0, s_(d.level, 20)]);
    const rows = (d.details || []).slice(0, 60).map(x => [now, quiz, group, name, Number(x.id) || '', s_(x.q, 200), s_(x.a, 120), s_(x.c, 120), x.ok ? 'да' : 'нет', Number(x.s) || 0]);
    if (rows.length) { const sh = ans_(); sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows); }
  } finally { lock.releaseLock(); }
  return json_({ ok: true });
}

function action_(d) {
  const deck = DECKS[d.deck] ? d.deck : '';
  if (d.action === 'login') {
    const a = auth_(d.id, d.pin); if (!a.ok) return a;
    let prog = null;
    if (deck) { const r = body_(prg_()).find(r => String(r[0]) === a.st.id && r[2] === deck); if (r) try { prog = JSON.parse(r[3]); } catch (e) {} }
    return { ok: true, id: a.st.id, name: a.st.name, progress: prog };
  }
  if (d.action === 'sync') {
    if (!deck) return { ok: false, err: 'deck' };
    const a = auth_(d.id, d.pin); if (!a.ok) return a;
    const st = a.st, cache = CacheService.getScriptCache();
    const lock = LockService.getScriptLock(); lock.waitLock(20000);
    try {
      // 1) прогресс
      if (d.progress && typeof d.progress === 'object') {
        const txt = JSON.stringify(d.progress).slice(0, 45000);
        const sh = prg_(), rows = body_(sh);
        const i = rows.findIndex(r => String(r[0]) === st.id && r[2] === deck);
        const row = [st.id, st.name, deck, txt, new Date()];
        if (i >= 0) sh.getRange(i + 2, 1, 1, 5).setValues([row]); else sh.appendRow(row);
      }
      // 2) ответы (пакет с кодом bid не записывается дважды)
      const bid = s_(d.bid, 60);
      if (Array.isArray(d.events) && d.events.length && !(bid && cache.get('bid_' + bid))) {
        const rows = d.events.slice(0, 500).map(x => [new Date(Number(x[0]) || Date.now()), st.id, st.name, deck,
          x[1] === 't' ? 'тест' : 'карточка', x[2] === 2 ? 'рус → ар' : 'ар → рус', s_(x[3], 80), s_(x[4], 80), s_(x[5], 60),
          x[6] ? 'да' : 'нет', Number(x[7]) || 0]);
        const sh = evt_(); sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
        if (bid) cache.put('bid_' + bid, '1', 21600);
      }
      // тесты «20 вопросов» из этого же пакета
      if (Array.isArray(d.tests) && d.tests.length && !(bid && cache.get('bidt_' + bid))) {
        const sh = cts_();
        d.tests.slice(0, 20).forEach(t => sh.appendRow([new Date(Number(t.ts) || Date.now()), st.id, st.name, deck, Number(t.correct) || 0, Number(t.total) || 0, Number(t.time) || 0]));
        if (bid) cache.put('bidt_' + bid, '1', 21600);
      }
      // 3) сеанс (перезаписывается по коду сеанса)
      const S = d.session;
      if (S && S.sid) {
        const sid = s_(S.sid, 60), sh = ses_(), last = sh.getLastRow();
        const from = Math.max(2, last - 400);
        const ids = last >= from ? sh.getRange(from, 1, last - from + 1, 1).getValues() : [];
        let at = -1; for (let k = ids.length - 1; k >= 0; k--) if (String(ids[k][0]) === sid) { at = from + k; break; }
        const row = [sid, new Date(Number(S.start) || Date.now()), new Date(), st.id, st.name, deck,
          Math.round((Number(S.active) || 0) / 6) / 10, Number(S.cards) || 0, Number(S.ok) || 0, Number(S.bad) || 0, Number(S.tests) || 0, s_(S.dev, 20)];
        if (at > 0) sh.getRange(at, 1, 1, row.length).setValues([row]); else sh.appendRow(row);
      }
    } finally { lock.releaseLock(); }
    return { ok: true };
  }
  return { ok: false, err: 'action' };
}

// ═══════════════ ВЫДАЧА ДАННЫХ ═══════════════
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'students') return json_(students_().map(s => ({ id: s.id, n: s.name })));
  if (p.action === 'board') return json_(board_(DECKS[p.deck] ? p.deck : 'w100'));
  if (p.action === 'report') {
    const key = cfgGet_('Ключ учителя');
    if (!key || String(p.key || '') !== key) return json_({ ok: false, err: 'key' });
    return json_(report_());
  }
  // ---- викторины (как раньше) ----
  const quiz = s_(p.quiz, 40);
  if (p.detail) {
    const name = s_(p.name, 40), ts = Number(p.ts) || 0;
    let rows = ans_().getDataRange().getValues().slice(1)
      .filter(r => (!quiz || r[1] === quiz) && String(r[3]) === name);
    if (ts) rows = rows.filter(r => Math.abs(new Date(r[0]).getTime() - ts) < 3000);
    else if (rows.length) { const last = Math.max(...rows.map(r => new Date(r[0]).getTime())); rows = rows.filter(r => new Date(r[0]).getTime() === last); }
    return json_(rows.map(r => ({ id: Number(r[4]), q: String(r[5]), a: String(r[6]), c: String(r[7]), ok: r[8] === 'да', s: Number(r[9]) })));
  }
  const group = s_(p.group, 20), hours = Math.min(72, Number(p.hours) || 3);
  const since = Date.now() - hours * 3600 * 1000;
  const best = {};
  res_().getDataRange().getValues().slice(1).forEach(r => {
    const t = new Date(r[0]).getTime();
    if (!t || t < since || (quiz && r[1] !== quiz) || (group && String(r[2]) !== group)) return;
    const k = String(r[3]), x = { n: k, g: String(r[2]), p: Number(r[4]), c: Number(r[5]), tot: Number(r[6]), t: Number(r[7]), l: String(r[8]), d: t };
    if (!best[k] || x.p > best[k].p) best[k] = x;
  });
  return json_(Object.values(best).sort((a, b) => b.p - a.p || a.t - b.t).slice(0, 60));
}

// счётчики по сохранённому прогрессу
function progStats_(P) {
  const o = { seen: 0, learn: 0, good: 0, done: 0, ok: 0, bad: 0 };
  Object.values((P && P.w) || {}).forEach(r => {
    if (!r || !r.n) return; o.seen++; o.ok += r.ok || 0; o.bad += r.bad || 0;
    if (r.box <= 2) o.learn++; else if (r.box <= 4) o.good++; else o.done++;
  });
  return o;
}

// Рейтинг для студентов: только положительные номинации
function board_(deck) {
  const c = CacheService.getScriptCache(), ck = 'board_' + deck, hit = c.get(ck);
  if (hit) return JSON.parse(hit);
  const S = {}; students_().forEach(s => S[s.id] = { n: s.name, min: 0, known: 0, ok: 0, bad: 0 });
  body_(ses_()).forEach(r => { const x = S[String(r[3])]; if (x && r[5] === deck) x.min += Number(r[6]) || 0; });
  body_(prg_()).forEach(r => { const x = S[String(r[0])]; if (!x || r[2] !== deck) return; let P = null; try { P = JSON.parse(r[3]); } catch (e) {}
    const q = progStats_(P); x.known = q.good + q.done; x.ok = q.ok; x.bad = q.bad; });
  const L = Object.values(S).filter(x => x.min > 0 || x.ok + x.bad > 0);
  const top = (f, k) => L.filter(f || (() => true)).sort((a, b) => k(b) - k(a)).slice(0, 10).map(x => ({ n: x.n, v: Math.round(k(x) * 10) / 10 }));
  const out = { time: top(null, x => x.min), known: top(null, x => x.known), acc: top(x => x.ok + x.bad >= 50, x => 100 * x.ok / (x.ok + x.bad)) };
  c.put(ck, JSON.stringify(out), 120);
  return out;
}

// Полный отчёт для учителя
function report_() {
  const tz = tz_(), day = d => Utilities.formatDate(d, tz, 'yyyy-MM-dd');
  const S = {}, alias = {};
  students_().forEach(s => {
    S[s.id] = { id: s.id, name: s.name, sex: s.sex, group: s.group, sessions: 0, minutes: 0, days: {}, last: 0, answers: 0, ok: 0, bad: 0,
      decks: {}, ct: { n: 0, sum: 0, best: 0 }, qz: { n: 0, sum: 0, best: 0, list: {} }, hard: {}, themes: {}, daily: {} };
    [s.name].map(norm_).concat(s.alias).forEach(a => alias[a] = s.id);
  });
  const weekday = [0, 0, 0, 0, 0, 0, 0], hour = new Array(24).fill(0), daily = {};
  body_(ses_()).forEach(r => {
    const x = S[String(r[3])]; if (!x) return; const d = new Date(r[1]), m = Number(r[6]) || 0;
    x.sessions++; x.minutes += m; const k = day(d); x.days[k] = 1; x.daily[k] = (x.daily[k] || 0) + m;
    x.last = Math.max(x.last, new Date(r[2]).getTime() || 0);
    weekday[Number(Utilities.formatDate(d, tz, 'u')) - 1] += m; hour[Number(Utilities.formatDate(d, tz, 'H'))] += m; daily[k] = (daily[k] || 0) + m;
  });
  body_(prg_()).forEach(r => { const x = S[String(r[0])]; if (!x) return; let P = null; try { P = JSON.parse(r[3]); } catch (e) {} x.decks[r[2]] = progStats_(P); });
  const W = {}, T = {};
  body_(evt_()).forEach(r => {
    const x = S[String(r[1])]; const deck = String(r[3]), a = String(r[6]), ok = r[9] === 'да';
    const wk = deck + '|' + a; const w = W[wk] || (W[wk] = { deck: deck, a: a, r: String(r[7]), t: String(r[8]), n: 0, bad: 0, st: {} });
    w.n++; if (!ok) { w.bad++; if (x) w.st[x.id] = 1; }
    const tk = deck + '|' + r[8]; const t = T[tk] || (T[tk] = { deck: deck, t: String(r[8]), n: 0, bad: 0 }); t.n++; if (!ok) t.bad++;
    if (!x) return;
    x.answers++; if (ok) x.ok++; else { x.bad++; x.hard[wk] = (x.hard[wk] || 0) + 1; }
    const st = x.themes[tk] || (x.themes[tk] = { deck: deck, t: String(r[8]), n: 0, bad: 0 }); st.n++; if (!ok) st.bad++;
  });
  body_(cts_()).forEach(r => { const x = S[String(r[1])]; if (!x) return; const p = Number(r[5]) ? 100 * Number(r[4]) / Number(r[5]) : 0; x.ct.n++; x.ct.sum += p; x.ct.best = Math.max(x.ct.best, p); });
  body_(res_()).forEach(r => { const id = alias[norm_(r[3])]; const x = S[id]; if (!x) return; const p = Number(r[6]) ? 100 * Number(r[5]) / Number(r[6]) : 0;
    x.qz.n++; x.qz.sum += p; x.qz.best = Math.max(x.qz.best, p); const q = String(r[1]); x.qz.list[q] = Math.max(x.qz.list[q] || 0, Math.round(p)); });
  const r1 = v => Math.round(v * 10) / 10;
  const students = Object.values(S).map(x => ({
    id: x.id, name: x.name, sex: x.sex, group: x.group, sessions: x.sessions, minutes: r1(x.minutes), days: Object.keys(x.days).length,
    last: x.last, answers: x.answers, ok: x.ok, bad: x.bad, acc: x.answers ? r1(100 * x.ok / x.answers) : null, decks: x.decks,
    ct: { n: x.ct.n, avg: x.ct.n ? r1(x.ct.sum / x.ct.n) : null, best: r1(x.ct.best) },
    qz: { n: x.qz.n, avg: x.qz.n ? r1(x.qz.sum / x.qz.n) : null, best: r1(x.qz.best), list: x.qz.list },
    hard: Object.keys(x.hard).sort((a, b) => x.hard[b] - x.hard[a]).slice(0, 12).map(k => ({ deck: W[k].deck, a: W[k].a, r: W[k].r, bad: x.hard[k] })),
    themes: Object.values(x.themes), daily: x.daily
  }));
  const words = Object.values(W).filter(w => w.bad > 0).map(w => ({ deck: w.deck, a: w.a, r: w.r, t: w.t, n: w.n, bad: w.bad, studs: Object.keys(w.st).length, pct: r1(100 * w.bad / w.n) }))
    .sort((a, b) => b.studs - a.studs || b.pct - a.pct).slice(0, 150);
  return { ok: true, generated: Date.now(), decks: DECKS, students: students, words: words, themes: Object.values(T).map(t => ({ deck: t.deck, t: t.t, n: t.n, bad: t.bad, pct: r1(100 * t.bad / t.n) })),
    weekday: weekday.map(r1), hour: hour.map(r1), daily: daily };
}

// Кнопка «Обновить сводку»: два листа для архива и печати в конце года
function buildReport() {
  const R = report_(), ss = SpreadsheetApp.getActiveSpreadsheet();
  const put = (name, head, rows) => {
    let sh = ss.getSheetByName(name); if (!sh) sh = ss.insertSheet(name); sh.clear();
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#1D5C63').setFontColor('#ffffff');
    if (rows.length) sh.getRange(2, 1, rows.length, head.length).setValues(rows);
    sh.setFrozenRows(1);
  };
  const L = R.students, rank = f => { const v = L.map(f); return v.map(x => x == null ? '' : 1 + v.filter(y => y != null && y > x).length); };
  const known = s => Object.values(s.decks).reduce((a, d) => a + d.good + d.done, 0);
  const rT = rank(s => s.minutes), rK = rank(known), rA = rank(s => s.answers >= 50 ? s.acc : null), rE = rank(s => s.bad);
  put(SUM, ['ID', 'Имя', 'Пол', 'Группа', 'Входов', 'Минут', 'Дней занятий', 'Последний вход', 'Ответов', 'Верно, %', 'Ошибок',
    'Знает слов (всего)', 'Список 1: знает / видел', 'Список 2: знает / видел', 'Тесты карточек: кол-во', 'Тесты: средний %', 'Викторины: кол-во', 'Викторины: средний %',
    'Место: время', 'Место: выучено', 'Место: точность', 'Место: ошибки', 'Самые трудные слова'],
    L.map((s, i) => { const d1 = s.decks.w100 || {}, d2 = s.decks.w100b || {};
      return [s.id, s.name, s.sex, s.group, s.sessions, s.minutes, s.days, s.last ? new Date(s.last) : '', s.answers, s.acc == null ? '' : s.acc, s.bad, known(s),
        (d1.good || 0) + (d1.done || 0) + ' / ' + (d1.seen || 0), (d2.good || 0) + (d2.done || 0) + ' / ' + (d2.seen || 0),
        s.ct.n, s.ct.avg == null ? '' : s.ct.avg, s.qz.n, s.qz.avg == null ? '' : s.qz.avg, rT[i], rK[i], rA[i], rE[i],
        s.hard.slice(0, 6).map(h => h.a + ' (' + h.bad + ')').join('; ')]; }));
  put(HRD, ['Набор', 'Слово', 'Перевод', 'Тема', 'Ответов', 'Ошибок', 'Ошибок, %', 'Ошиблись студентов'],
    R.words.map(w => [DECKS[w.deck] || w.deck, w.a, w.r, w.t, w.n, w.bad, w.pct, w.studs]));
  try { SpreadsheetApp.getUi().alert('Сводка обновлена: листы «Сводка» и «Трудные_слова».'); } catch (e) {}
}
