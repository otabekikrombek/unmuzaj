"""Общее для скриптов спряжения: отдельное окружение Python с пакетами из requirements.txt.
Пакеты Qutrub и Arramooz (GPL) ставятся через pip при первом запуске в .venv-conjugate/ (папка не коммитится)."""
import os, subprocess, sys, venv

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
VENV = os.path.join(ROOT, '.venv-conjugate')
REQ = os.path.join(HERE, 'requirements.txt')


def ensure(script):
    """Перезапускает скрипт внутри .venv-conjugate, при необходимости создав его. CONJUGATE_NO_VENV=1 — работать в текущем Python."""
    if os.environ.get('CONJUGATE_NO_VENV') or os.path.realpath(sys.prefix) == os.path.realpath(VENV):
        return
    py = os.path.join(VENV, 'bin', 'python')
    stamp = os.path.join(VENV, '.requirements')
    req = open(REQ, encoding='utf-8').read()
    if not os.path.exists(py) or not os.path.exists(stamp) or open(stamp, encoding='utf-8').read() != req:
        print('Ставлю Qutrub и Arramooz в .venv-conjugate/ …', file=sys.stderr)
        venv.create(VENV, with_pip=True)
        subprocess.check_call([py, '-m', 'pip', 'install', '--quiet', '--disable-pip-version-check', '-r', REQ])
        open(stamp, 'w', encoding='utf-8').write(req)
    os.execv(py, [py, '-W', 'ignore', os.path.abspath(script), *sys.argv[1:]])
