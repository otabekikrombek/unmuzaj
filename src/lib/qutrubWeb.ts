// «Любой глагол»: Qutrub (libqutrub, © Taha Zerrouki, GPL) прямо в браузере через Pyodide.
// Загружается только по нажатию кнопки. Код Qutrub не входит в сайт: браузер ставит пакеты с PyPI (micropip).
import { fromQutrub, type Forms } from './conjugation';

export const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';
export const PACKAGES = ['libqutrub==1.2.4.1', 'pyarabic==0.6.15']; // те же версии, что в scripts/conjugate/requirements.txt

// Вызовы Qutrub. Поиск по его таблице глаголов написан здесь: в libqutrub он устарел (Python 2).
const HELPER = `
import json, re, unicodedata, warnings
warnings.simplefilter('ignore')
from libqutrub.conjugator import conjugate as _conj
from libqutrub import triverbtable as _tv
_H = re.compile('[\\u064b-\\u0652\\u0670]')
def _bare(s):
    return _H.sub('', unicodedata.normalize('NFC', s)).replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا')
def unmuzaj_conjugate(verb, future_type, transitive):
    r = _conj(verb, future_type, alltense=True, transitive=bool(transitive), display_format='DICT')
    return json.dumps(r, ensure_ascii=False) if r else 'null'
def unmuzaj_lookup(word):
    b = _bare(word)
    out = sorted({(unicodedata.normalize('NFC', e['verb']), e['haraka'], e['transitive']) for e in _tv.TriVerbTable.values() if _bare(e['verb']) == b})
    return json.dumps([{'verb': v, 'future_type': h, 'transitive': t} for v, h, t in out], ensure_ascii=False)
`;

/** запись таблицы глаголов Qutrub; transitive: ل — непереходный, م — переходный, ك — оба */
export type DictVerb = { verb: string; future_type: string; transitive: string };
export type Engine = {
  conjugate(verb: string, futureType: string, transitive: boolean): Forms | null;
  lookup(word: string): DictVerb[];
};

let engine: Promise<Engine> | null = null;

/** onStep(0) — загрузка Python, onStep(1) — пакеты Qutrub, onStep(2) — готово */
export function loadEngine(onStep?: (i: number) => void): Promise<Engine> {
  if (engine) return engine;
  engine = (async () => {
    onStep?.(0);
    const mod = await import(/* @vite-ignore */ PYODIDE_URL + 'pyodide.mjs');
    const quiet = () => {};
    const py = await mod.loadPyodide({ indexURL: PYODIDE_URL, stdout: quiet, stderr: quiet });
    onStep?.(1);
    await py.loadPackage('micropip', { messageCallback: quiet, errorCallback: quiet });
    await py.pyimport('micropip').install(PACKAGES);
    await py.runPythonAsync(HELPER);
    const conj = py.globals.get('unmuzaj_conjugate');
    const look = py.globals.get('unmuzaj_lookup');
    onStep?.(2);
    return {
      conjugate(verb, futureType, transitive) {
        const s: string = conj(verb, futureType, transitive);
        return s === 'null' ? null : fromQutrub(JSON.parse(s));
      },
      lookup: word => JSON.parse(look(word)),
    };
  })();
  engine.catch(() => { engine = null; }); // при ошибке сети можно попробовать снова
  return engine;
}
