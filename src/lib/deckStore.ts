// Прогресс по одному набору слов: хранение на устройстве + отправка в облако с очередью.
import { getWho, rpc, sb, uid, device, AuthError } from './api';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/site';
import { merge, type DeckState, type Rec } from './srs';

type Ev = { id: string; ts: number; mode: 'c' | 't'; dir: 1 | 2; w: string; th: string; ok: boolean; box: number };
type Test = { id: string; ts: number; correct: number; total: number; time: number };
type Queue = { dirty: string[]; events: Ev[]; tests: Test[] };
export type Visit = { id: string; activity: string; start: number; active: number; items: number; ok: number; bad: number; dev: string };
export type NetState = 'guest' | 'saved' | 'pending' | 'offline' | 'relogin';

function ownerKey(): string {
  const w = getWho();
  if (!w) return 'guest';
  return w.kind === 'pin' ? `pin:${w.join}:${w.code}` : `email:${w.email}`;
}
const lsGet = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const lsSet = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsDel = (k: string) => { try { localStorage.removeItem(k); } catch {} };

export class DeckStore {
  S: DeckState = { step: 0, words: {} };
  q: Queue = { dirty: [], events: [], tests: [] };
  visit: Visit;
  owner = ownerKey();
  net: NetState = 'guest';
  onNet: (s: NetState) => void = () => {};
  private busy = false;
  private lastAct = Date.now();
  private sentActive = -1;
  private accessToken: string | null = null;

  constructor(public deck: string) {
    this.visit = this.newVisit();
  }
  private k(x: string) { return `unmuzaj:${x}:${this.deck}:${this.owner}`; }
  private newVisit(): Visit { return { id: uid(), activity: this.deck, start: Date.now(), active: 0, items: 0, ok: 0, bad: 0, dev: device() }; }
  get loggedIn() { return this.owner !== 'guest'; }

  /** загрузка: устройство → облако → слияние. Прогресс гостя переносится в аккаунт при первом входе. */
  async load(): Promise<void> {
    this.S = lsGet(this.k('state'), { step: 0, words: {} });
    this.q = lsGet(this.k('queue'), { dirty: [], events: [], tests: [] });
    if (!this.loggedIn) { this.setNet('guest'); return; }
    const guestKey = `unmuzaj:state:${this.deck}:guest`;
    const guest = lsGet<DeckState | null>(guestKey, null);
    if (guest && Object.keys(guest.words).length) {
      this.S = merge(this.S, guest);
      this.q.dirty = [...new Set([...this.q.dirty, ...Object.keys(guest.words)])];
      lsDel(guestKey);
    }
    try {
      if (getWho()?.kind === 'email') this.accessToken = (await sb().auth.getSession()).data.session?.access_token ?? null;
      const server = await rpc<DeckState>('get_deck_state', { p_token: this.token(), p_deck: this.deck });
      const before = this.S;
      this.S = merge(server, before);
      for (const [k, r] of Object.entries(before.words)) if (!server.words[k] || r.n > server.words[k].n) this.q.dirty.push(k);
      this.q.dirty = [...new Set(this.q.dirty)];
      this.save();
      this.setNet(this.q.dirty.length || this.q.events.length ? 'pending' : 'saved');
      if (this.q.dirty.length) this.sync();
    } catch (e) {
      this.setNet(e instanceof AuthError ? 'relogin' : 'offline');
    }
  }
  private token() { const w = getWho(); return w?.kind === 'pin' ? w.token : null; }
  private setNet(s: NetState) { this.net = s; this.onNet(s); }
  save() { lsSet(this.k('state'), this.S); lsSet(this.k('queue'), this.q); }

  /** после каждого ответа */
  record(word: string, theme: string, r: Rec, ok: boolean, mode: 'c' | 't', dir: 1 | 2) {
    this.touch();
    if (this.loggedIn) {
      this.q.dirty.push(word);
      this.q.events.push({ id: uid(), ts: Date.now(), mode, dir, w: word, th: theme, ok, box: r.box });
      if (this.net === 'saved') this.setNet('pending');
    }
    this.visit.items++; if (ok) this.visit.ok++; else this.visit.bad++;
    this.save();
    if (this.q.events.length >= 12) this.sync();
  }
  recordTest(correct: number, total: number, seconds: number) {
    if (this.loggedIn) this.q.tests.push({ id: uid(), ts: Date.now(), correct, total, time: seconds });
    this.save(); this.sync();
  }
  touch() {
    const now = Date.now();
    if (now - this.lastAct > 30 * 60_000) { this.sync(); this.visit = this.newVisit(); }
    this.lastAct = now;
  }
  /** раз в 5 секунд: активное время, если вкладка видна и было действие за последнюю минуту */
  tick() { if (document.visibilityState === 'visible' && Date.now() - this.lastAct < 60_000) this.visit.active += 5; }

  private payload() {
    const dirty = [...new Set(this.q.dirty)];
    const words: Record<string, Rec> = {};
    dirty.forEach(k => { if (this.S.words[k]) words[k] = this.S.words[k]; });
    return { dirty, events: this.q.events.slice(0, 400), tests: this.q.tests.slice(), body: { deck: this.deck, step: this.S.step, words, events: this.q.events.slice(0, 400), tests: this.q.tests, visit: this.visit } };
  }

  async sync(): Promise<void> {
    if (!this.loggedIn || this.busy) return;
    const nothing = !this.q.dirty.length && !this.q.events.length && !this.q.tests.length && this.visit.active === this.sentActive;
    if (nothing) return;
    this.busy = true;
    const p = this.payload();
    try {
      const r = await rpc<any>('sync_progress', { p_token: this.token(), p: p.body });
      if (r?.ok) {
        const sentEv = new Set(p.events.map(e => e.id)), sentT = new Set(p.tests.map(t => t.id)), sentW = new Set(p.dirty);
        this.q.events = this.q.events.filter(e => !sentEv.has(e.id));
        this.q.tests = this.q.tests.filter(t => !sentT.has(t.id));
        this.q.dirty = this.q.dirty.filter(k => !sentW.has(k));
        this.sentActive = this.visit.active;
        this.save();
        this.setNet(this.q.events.length || this.q.dirty.length ? 'pending' : 'saved');
      }
    } catch (e) {
      this.setNet(e instanceof AuthError ? 'relogin' : 'offline');
    } finally { this.busy = false; }
    if (this.net === 'pending') setTimeout(() => this.sync(), 500);
  }

  /** при закрытии страницы: запрос, который браузер доводит до конца сам */
  flush() {
    if (!this.loggedIn) return;
    const p = this.payload();
    const auth = this.accessToken ?? SUPABASE_ANON_KEY;
    try {
      fetch(`${SUPABASE_URL}/rest/v1/rpc/sync_progress`, {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${auth}` },
        body: JSON.stringify({ p_token: this.token(), p: p.body }),
      });
    } catch {}
  }
}
