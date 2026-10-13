// Оформление: режим (светлая/тёмная/как в системе), палитра, размер текста и арабского шрифта.
// Хранится на устройстве (localStorage). Первое применение — inline-скрипт в <head> Base.astro (до отрисовки);
// этот модуль — для меню «Оформление». Ключ и значения должны совпадать со скриптом в Base.astro.
export type Mode = 'auto' | 'light' | 'dark';
export type Palette = 'turquoise' | 'lapis' | 'parchment' | 'contrast';
export type Look = { mode: Mode; palette: Palette; fs: number; ar: number };
export const PALETTES: Palette[] = ['turquoise', 'lapis', 'parchment', 'contrast'];
export const MODES: Mode[] = ['light', 'dark', 'auto'];
export const SIZES = [-1, 0, 1, 2];
export const KEY = 'unmuzaj:look';
export const DEFAULT: Look = { mode: 'auto', palette: 'turquoise', fs: 0, ar: 0 };

export function getLook(): Look {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      mode: MODES.includes(v.mode) ? v.mode : DEFAULT.mode,
      palette: PALETTES.includes(v.palette) ? v.palette : DEFAULT.palette,
      fs: SIZES.includes(v.fs) ? v.fs : 0,
      ar: SIZES.includes(v.ar) ? v.ar : 0,
    };
  } catch { return { ...DEFAULT }; }
}

const dark = () => matchMedia('(prefers-color-scheme: dark)').matches;
export function applyLook(l: Look) {
  const h = document.documentElement;
  h.dataset.theme = l.mode === 'auto' ? (dark() ? 'dark' : 'light') : l.mode;
  h.dataset.palette = l.palette;
  h.dataset.mode = l.mode;
  h.dataset.fs = String(l.fs);
  h.dataset.ar = String(l.ar);
  // цвет строки браузера на телефоне — как шапка сайта
  const bg = getComputedStyle(h).getPropertyValue('--head-bg').trim();
  if (bg) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  window.dispatchEvent(new CustomEvent('unmuzaj:look', { detail: l }));
}

export function setLook(patch: Partial<Look>): Look {
  const l = { ...getLook(), ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {}
  applyLook(l);
  return l;
}
export function resetLook(): Look {
  try { localStorage.removeItem(KEY); } catch {}
  applyLook({ ...DEFAULT });
  return { ...DEFAULT };
}
