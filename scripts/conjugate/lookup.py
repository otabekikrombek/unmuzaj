#!/usr/bin/env python3
"""Огласовка настоящего времени (бāб) и переходность по словарю Arramooz (© Taha Zerrouki, GPL)
и по таблице глаголов Qutrub (triverbtable). Нужен, чтобы заполнять и проверять src/data/verbs.json.

Запуск:  npm run conjugate:lookup -- كتب جلس   — что знают словари об этих глаголах (с огласовками или без)
         npm run conjugate:lookup               — сверить весь verbs.json со словарями и показать расхождения

В Arramooz переходность 0/1, где 1 значит «бывает переходным». В таблице Qutrub — три значения:
ل — непереходный, م — переходный, ك — и то и другое.
"""
import json, os, re, sqlite3, sys, unicodedata, warnings

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _venv  # noqa: E402
_venv.ensure(__file__)

warnings.simplefilter('ignore')
import arramooz  # noqa: E402
from libqutrub import triverbtable  # noqa: E402

HARAKAT = re.compile('[ً-ْٰ]')
nfc = lambda s: unicodedata.normalize('NFC', s)
bare = lambda s: HARAKAT.sub('', nfc(s)).replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا')
DB = sqlite3.connect(os.path.join(os.path.dirname(arramooz.__file__), 'data', 'arabicdictionary.sqlite'))
ROWS = [(nfc(r[0]), r[1], r[2], r[3]) for r in DB.execute(
    'select vocalized, root, future_type, transitive from verbs where triliteral = 1')]
TV = [(nfc(e['verb']), e['root'], e['haraka'], e['transitive']) for e in triverbtable.TriVerbTable.values()]


def find(word):
    """все записи о глаголе I породы; если слово с огласовками — только с той же огласовкой"""
    vocalized = bool(HARAKAT.search(word))
    same = (lambda v: v == nfc(word)) if vocalized else (lambda v: bare(v) == bare(word))
    a = sorted({r for r in ROWS if same(r[0])})
    t = sorted({r for r in TV if same(r[0])})
    return a, t


def show(word):
    a, t = find(word)
    print(f'\n{word}')
    for r in a:
        print(f'  Arramooz:  {r[0]}  корень {r[1]}  {r[2]}  {"переходный" if r[3] else "непереходный"}')
    for r in t:
        print(f'  Qutrub:    {r[0]}  корень {r[1]}  {r[2]}  {"ل непереходный" if r[3] == "ل" else "م переходный" if r[3] == "م" else "ك оба"}')
    if not a and not t:
        print('  нет ни в Arramooz, ни в таблице Qutrub')


def check():
    verbs = json.load(open(os.path.join(_venv.ROOT, 'src', 'data', 'verbs.json'), encoding='utf-8'))
    n = 0
    for v in verbs:
        a, t = find(v['verb'])
        fts = sorted({r[2] for r in a})
        notes = []
        if not a:
            notes.append('нет в Arramooz')
        elif v['future_type'] not in fts:
            notes.append(f'огласовка {v["future_type"]}, а в Arramooz: {", ".join(fts)}')
        elif len(fts) > 1:
            notes.append(f'в Arramooz несколько огласовок: {", ".join(fts)}')
        trs = sorted({bool(r[3]) for r in a if r[2] == v['future_type']})
        if a and trs and v['transitive'] not in trs:
            notes.append(f'переходность {v["transitive"]}, а в Arramooz: {trs}')
        if notes:
            n += 1
            confirmed = any(x in str(v.get('source', {}).get('bab', '')) for x in ('task', 'teacher'))
            flag = 'doubt' if v.get('doubt') else 'огласовка подтверждена' if confirmed else 'БЕЗ ПОМЕТКИ doubt'
            print(f'{v["key"]:12} {v["verb"]}  [{flag}]  ' + '; '.join(notes))
    print(f'\nВсего глаголов: {len(verbs)}; расходятся со словарём Arramooz или неоднозначны: {n}.')


if __name__ == '__main__':
    words = [w for w in sys.argv[1:] if not w.startswith('-')]
    if words:
        for w in words:
            show(w)
    else:
        check()
