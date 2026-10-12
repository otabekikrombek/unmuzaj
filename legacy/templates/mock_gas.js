// Минимальная имитация Google Apps Script для проверки Code.gs
const fs = require('fs'), vm = require('vm'), http = require('http'), url = require('url');
const sheets = {};
function mkSheet(name) {
  const d = [];
  const sh = {
    _d: d, getName: () => name,
    appendRow: r => { d.push(r.slice()); return sh; },
    getLastRow: () => d.length,
    getLastColumn: () => d.reduce((m, r) => Math.max(m, r.length), 0),
    setFrozenRows: () => sh, clear: () => { d.length = 0; return sh; },
    getDataRange: () => sh.getRange(1, 1, Math.max(1, d.length), Math.max(1, sh.getLastColumn())),
    getRange: (row, col, nr = 1, nc = 1) => {
      const rg = {
        getValues: () => { const out = []; for (let i = 0; i < nr; i++) { const r = d[row - 1 + i] || []; const o = []; for (let j = 0; j < nc; j++) o.push(r[col - 1 + j] === undefined ? '' : r[col - 1 + j]); out.push(o); } return out; },
        setValues: v => { if (v.length !== nr || v[0].length !== nc) throw new Error('size mismatch ' + v.length + 'x' + v[0].length + ' vs ' + nr + 'x' + nc);
          for (let i = 0; i < nr; i++) { while (d.length < row + i) d.push([]); const r = d[row - 1 + i]; for (let j = 0; j < nc; j++) r[col - 1 + j] = v[i][j]; } return rg; },
        setValue: v => rg.setValues([[v]]),
      };
      const px = new Proxy(rg, { get: (t, k) => k in t ? t[k] : () => px });
      const sv = rg.setValues; rg.setValues = v => { sv(v); return px; };
      return px;
    }
  };
  return sh;
}
const ss = { getSheetByName: n => sheets[n] || null, insertSheet: n => (sheets[n] = mkSheet(n)) };
const cache = {};
const ctx = {
  SpreadsheetApp: { getActiveSpreadsheet: () => ss, getUi: () => { throw new Error('no ui'); } },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: s => ({ setMimeType: () => ({ _s: s }) }) },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  CacheService: { getScriptCache: () => ({ get: k => cache[k] || null, put: (k, v) => { cache[k] = v; }, remove: k => { delete cache[k]; } }) },
  Session: { getScriptTimeZone: () => 'Asia/Tashkent' },
  Utilities: { formatDate: (d, tz, f) => { const x = new Date(d.getTime() + 5 * 3600e3); // UTC+5
    if (f === 'yyyy-MM-dd') return x.toISOString().slice(0, 10); if (f === 'u') return String(((x.getUTCDay() + 6) % 7) + 1); if (f === 'H') return String(x.getUTCHours()); throw new Error(f); } },
  console, JSON, Math, Date, Number, String, Object, Array, Set, Error
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8') + '\n;this.doGet=doGet;this.doPost=doPost;this.setup=setup;this.buildReport=buildReport;this.fillPins=fillPins;', ctx);
ctx.setup();
// имена и пол для проверки
const st = sheets['Студенты']._d;
const names = ['Азиза Каримова', 'Бобур Алиев', 'Дилноза Юсупова', 'Жасур Рахимов'];
names.forEach((n, i) => { st[i + 1][1] = n; st[i + 1][2] = i % 2 ? 'м' : 'ж'; });
sheets['Студенты']._d[1][5] = 'Азиза; Aziza';
// одна запись викторины
sheets['Результаты']._d.push([new Date(), 'Матн 10', '2', 'Азиза', 5000, 8, 10, 120, 'Хорошо']);
const pins = {}; st.slice(1).forEach(r => pins[r[0]] = r[4]);
fs.writeFileSync(__dirname + '/pins.json', JSON.stringify(pins));
http.createServer((req, res) => {
  const u = url.parse(req.url, true);
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    let out;
    try {
      if (u.pathname === '/dump') out = { _s: JSON.stringify(Object.fromEntries(Object.entries(sheets).map(([k, v]) => [k, v._d]))) };
      else if (u.pathname === '/report') { ctx.buildReport(); out = { _s: '{"ok":true}' }; }
      else out = req.method === 'POST' ? ctx.doPost({ postData: { contents: body } }) : ctx.doGet({ parameter: u.query });
    } catch (e) { console.error(e); res.writeHead(500); res.end(String(e)); return; }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(out._s);
  });
}).listen(8765, () => console.log('mock on 8765'));
