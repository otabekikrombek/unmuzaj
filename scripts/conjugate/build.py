#!/usr/bin/env python3
"""Таблицы спряжения: src/data/verbs.json → src/content/conjugations/<key>.json.

Движок — Qutrub (libqutrub, © Taha Zerrouki, GPL). Его код в репозиторий не копируется:
пакет ставится через pip при первом запуске (см. _venv.py). В репозиторий попадают только
готовые таблицы — результат работы программы.

Запуск:  npm run conjugate            — пересобрать все таблицы
         npm run conjugate -- --check — только проверить, что таблицы совпадают с verbs.json (ничего не пишет)
"""
import json, os, re, sys, unicodedata, warnings

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _venv  # noqa: E402
_venv.ensure(__file__)

warnings.simplefilter('ignore')  # pyarabic печатает SyntaxWarning на новых версиях Python
from importlib.metadata import version  # noqa: E402
from libqutrub.conjugator import conjugate  # noqa: E402

ROOT = _venv.ROOT
VERBS = os.path.join(ROOT, 'src', 'data', 'verbs.json')
OUT = os.path.join(ROOT, 'src', 'content', 'conjugations')
ENGINE = f'libqutrub {version("libqutrub")}'

# 13 лиц в порядке таблицы (src/lib/conjugation.ts). «Вы двое» у Qutrub два ключа (м. и ж.) — формы совпадают.
PERSONS = ['أنا', 'أنت', 'أنتِ', 'هو', 'هي', 'أنتما', 'هما', 'هما مؤ', 'نحن', 'أنتم', 'أنتن', 'هم', 'هن']
TENSES = {
    'past': 'الماضي المعلوم',
    'present': 'المضارع المعلوم',
    'subjunctive': 'المضارع المنصوب',
    'jussive': 'المضارع المجزوم',
    'imperative': 'الأمر',
    'passive_past': 'الماضي المجهول',
    'passive_present': 'المضارع المجهول',
}
FUTURE_TYPES = ('فتحة', 'ضمة', 'كسرة')
nfc = lambda s: unicodedata.normalize('NFC', s)


def table(v):
    r = conjugate(v['verb'], v['future_type'], alltense=True, transitive=bool(v['transitive']), display_format='DICT')
    if not r:
        raise SystemExit(f'Qutrub не принял глагол {v["verb"]} ({v["key"]}): проверьте огласовки.')
    forms = {k: [nfc(r[t].get(p, '')) for p in PERSONS] for k, t in TENSES.items()}
    for k, t in TENSES.items():
        if r[t].get('أنتما', '') != r[t].get('أنتما مؤ', ''):
            print(f'  внимание: {v["key"]} {k}: «вы двое» м. и ж. различаются — показана форма м. р.', file=sys.stderr)
    return {'key': v['key'], 'verb': v['verb'], 'future_type': v['future_type'], 'transitive': bool(v['transitive']),
            'engine': ENGINE, 'forms': forms}


def dump(obj):
    """JSON, где каждое время — одна строка (так таблицу удобно читать и проверять)"""
    text = json.dumps(obj, ensure_ascii=False, indent=1)
    text = re.sub(r'\[\n\s+("[^"]*"(?:,\n\s+"[^"]*")*)\n\s+\]', lambda m: '[' + re.sub(r',\n\s+', ', ', m.group(1)) + ']', text)
    return text + '\n'


def main():
    check = '--check' in sys.argv
    verbs = json.load(open(VERBS, encoding='utf-8'))
    keys = [v['key'] for v in verbs]
    dup = {k for k in keys if keys.count(k) > 1}
    if dup:
        raise SystemExit(f'Повторяются ключи в verbs.json: {", ".join(sorted(dup))}')
    bad = [v['key'] for v in verbs if v['future_type'] not in FUTURE_TYPES]
    if bad:
        raise SystemExit(f'future_type должен быть одним из {FUTURE_TYPES}: {", ".join(bad)}')
    os.makedirs(OUT, exist_ok=True)
    changed, stale = [], []
    for v in verbs:
        path = os.path.join(OUT, f'{v["key"]}.json')
        text = dump(table(v))
        old = open(path, encoding='utf-8').read() if os.path.exists(path) else None
        if old != text:
            changed.append(v['key'])
            if not check:
                open(path, 'w', encoding='utf-8').write(text)
    for fn in sorted(os.listdir(OUT)):
        if fn.endswith('.json') and fn[:-5] not in keys:
            stale.append(fn)
            if not check:
                os.remove(os.path.join(OUT, fn))
    if check:
        if changed or stale:
            print(f'Таблицы устарели: {", ".join(changed + stale)}. Запустите: npm run conjugate', file=sys.stderr)
            sys.exit(1)
        print(f'Таблицы в порядке: {len(verbs)} глаголов ({ENGINE}).')
    else:
        print(f'Глаголов: {len(verbs)}; обновлено таблиц: {len(changed)}; удалено лишних: {len(stale)} ({ENGINE}).')


if __name__ == '__main__':
    main()
