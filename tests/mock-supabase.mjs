// Мини-эмулятор Supabase для тестов: /rest/v1/rpc/<fn> и /auth/v1/*
import http from 'node:http';
import pg from 'pg';
import jwt from 'jsonwebtoken';
const SECRET = 'test-secret-test-secret-test-secret-32';
const pool = new pg.Pool({ host: 'localhost', port: 54329, user: 'postgres', password: 'pw', database: process.env.DB || 'e2e' });
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' };
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json', ...cors }); res.end(JSON.stringify(obj)); };
let delay = 0, down = false;
http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  let body = ''; for await (const c of req) body += c;
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__ctl') { const q = Object.fromEntries(url.searchParams); if ('down' in q) down = q.down === '1'; return send(res, 200, { down }); }
  if (down) { req.socket.destroy(); return; }
  try {
    if (url.pathname === '/auth/v1/token') {
      const { email, password } = JSON.parse(body);
      const r = await pool.query('select id, email from auth.users where email = $1', [email]);
      if (!r.rows.length || password !== 'secret123') return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials', msg: 'Invalid login credentials', code: 'invalid_credentials' });
      const u = r.rows[0], exp = Math.floor(Date.now() / 1000) + 3600;
      const access_token = jwt.sign({ sub: u.id, role: 'authenticated', email: u.email, exp, aud: 'authenticated' }, SECRET);
      return send(res, 200, { access_token, token_type: 'bearer', expires_in: 3600, expires_at: exp, refresh_token: 'r' + u.id, user: { id: u.id, email: u.email, aud: 'authenticated', role: 'authenticated', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() } });
    }
    if (url.pathname === '/auth/v1/user') {
      const t = (req.headers.authorization || '').replace('Bearer ', ''); const c = jwt.verify(t, SECRET);
      return send(res, 200, { id: c.sub, email: c.email, aud: 'authenticated', role: 'authenticated', app_metadata: {}, user_metadata: {} });
    }
    if (url.pathname === '/auth/v1/logout') return send(res, 204, {});
    const m = url.pathname.match(/^\/rest\/v1\/rpc\/(\w+)$/);
    if (!m) return send(res, 404, { message: 'not found' });
    const t = (req.headers.authorization || '').replace('Bearer ', '');
    let claims; try { claims = jwt.verify(t, SECRET); } catch { return send(res, 401, { code: 'PGRST301', message: 'JWT invalid' }); }
    const args = body ? JSON.parse(body) : {};
    const names = Object.keys(args);
    const sql = `select to_jsonb(public.${m[1]}(${names.map((n, i) => `${n} => $${i + 1}`).join(', ')})) as r`;
    const vals = names.map(n => (args[n] !== null && typeof args[n] === 'object' && !Array.isArray(args[n]) ? JSON.stringify(args[n]) : args[n]));
    const c = await pool.connect();
    try {
      await c.query('begin');
      await c.query(`set local role ${['authenticated', 'service_role'].includes(claims.role) ? claims.role : 'anon'}`);
      await c.query(`select set_config('request.jwt.claims', $1, true), set_config('request.jwt.claim.sub', $2, true)`, [JSON.stringify(claims), claims.sub || '']);
      const r = await c.query(sql, vals);
      await c.query('commit');
      if (delay) await new Promise(r => setTimeout(r, delay));
      send(res, 200, r.rows[0].r);
    } catch (e) { await c.query('rollback').catch(() => {}); send(res, e.code === '28000' ? 401 : 400, { code: e.code, message: e.message }); }
    finally { c.release(); }
  } catch (e) { send(res, 500, { message: String(e) }); }
}).listen(8787, () => console.log('mock api :8787'));
console.log('ANON=' + jwt.sign({ role: 'anon', iss: 'supabase' }, SECRET));
console.log('SERVICE=' + jwt.sign({ role: 'service_role', iss: 'supabase' }, SECRET)); // для теста Edge Function (tests/feedback_telegram.mjs)
