// Связь с базой: кто вошёл, вызовы функций Supabase.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/site';

export type Who =
  | { kind: 'pin'; token: string; nickname: string; code: string; className: string; join: string; remember: boolean }
  | { kind: 'email'; email: string; nickname: string; role: string };

const WHO_KEY = 'unmuzaj:who';
let client: SupabaseClient | null = null;

export function sb(): SupabaseClient {
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, storageKey: 'unmuzaj:auth' } });
  return client;
}

function store(remember: boolean) { return remember ? localStorage : sessionStorage; }
export function getWho(): Who | null {
  try {
    const v = localStorage.getItem(WHO_KEY) ?? sessionStorage.getItem(WHO_KEY);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}
export function setWho(w: Who | null) {
  try {
    localStorage.removeItem(WHO_KEY); sessionStorage.removeItem(WHO_KEY);
    if (w) store(w.kind === 'pin' ? w.remember : true).setItem(WHO_KEY, JSON.stringify(w));
  } catch {}
}
/** токен ученика класса (или null для входа по email) */
export function token(): string | null { const w = getWho(); return w && w.kind === 'pin' ? w.token : null; }

export class AuthError extends Error {}
export async function rpc<T = any>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await sb().rpc(fn, args);
  if (error) {
    if (error.code === '28000' || /not_authenticated/.test(error.message)) throw new AuthError(error.message);
    throw new Error(error.message);
  }
  return data as T;
}

export async function classLogin(join: string, code: string, pin: string, remember: boolean) {
  const r = await rpc<any>('class_login', { p_join: join, p_code: code, p_pin: pin });
  if (r?.ok) setWho({ kind: 'pin', token: r.token, nickname: r.nickname, code: r.code, className: r.class, join: r.join, remember });
  return r as { ok: boolean; err?: 'class' | 'pin' | 'locked'; nickname?: string };
}

export async function emailLogin(email: string, password: string) {
  const { error } = await sb().auth.signInWithPassword({ email, password });
  if (error) return { ok: false, err: error.message };
  const me = await rpc<any>('whoami', { p_token: null });
  setWho({ kind: 'email', email, nickname: me.nickname, role: me.role });
  return { ok: true, role: me.role as string };
}

export async function logout() {
  const w = getWho();
  try {
    if (w?.kind === 'pin') await rpc('pin_logout', { p_token: w.token });
    else await sb().auth.signOut();
  } catch {}
  setWho(null);
}

export const device = () => (/Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'телефон' : 'компьютер');
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
