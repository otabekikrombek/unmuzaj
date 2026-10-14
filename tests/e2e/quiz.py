# Сквозной тест викторин (этап 4): учитель → гость → ученик проходит викторину (с обрывом связи) → разбор → табло → панель учителя.
# Подготовка — как для flow.py (tests/README.md): база e2e, эмулятор на :8787, сайт на :4322/.
import os, subprocess, sys, time, urllib.request
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
SQL = lambda q: subprocess.run(['psql','-h','localhost','-p','54329','-U','postgres','-d','e2e','-tAc',q],capture_output=True,text=True,env={'PGPASSWORD':'pw','PATH':'/usr/bin:/bin'}).stdout.strip()
ctl = lambda q: urllib.request.urlopen('http://localhost:8787/__ctl?'+q).read()
errs, fails = [], []
def check(name, cond, info=''):
    print(('OK   ' if cond else 'FAIL ') + name, info if not cond else '')
    if not cond: fails.append(name)
def page(ctx):
    pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append('pageerror: '+str(e)))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_' not in m.text and errs.append('console: '+m.text))
    return pg
def noscroll(pg): return pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
def play(pg, on_q=None, limit=240):
    """проходит викторину: на вступлении — «К вопросам», на вопросе — первый вариант"""
    n, t0 = 0, time.time()
    while time.time() - t0 < limit:
        if pg.is_visible('#sEnd'): return n
        if pg.is_visible('#inGo'): pg.click('#inGo')
        else:
            tiles = pg.locator('#tiles .tile:not([disabled])')
            if pg.is_visible('#sQ') and tiles.count():
                n += 1
                if on_q: on_q(n, pg)
                tiles.first.click()
        pg.wait_for_timeout(120)
    raise RuntimeError('викторина не закончилась')

# тестовая база: начинаем с чистых классов и попыток
SQL('truncate classes, learners, pin_tokens, login_fails, card_state, card_steps, answers, visits, card_tests, quiz_attempts, quiz_answers cascade')
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)  # CHROMIUM — путь к браузеру, если Playwright его не находит
    phone = dict(viewport={'width': 360, 'height': 740}, is_mobile=True, has_touch=True)
    # 1. учитель создаёт класс
    tc = b.new_context(viewport={'width': 1280, 'height': 900}, accept_downloads=True); t = page(tc)
    t.goto(B+'login/'); t.fill('#email', 'teacher@x'); t.fill('#pass', 'secret123'); t.click('#fMail button'); t.wait_for_url('**/teacher/'); t.wait_for_selector('#app:not([hidden])')
    t.fill('#ncName', 'Группа викторин'); t.fill('#ncCount', '3'); t.click('#newCls button[type=submit]')
    t.wait_for_selector('#pins[open]'); pins = {r[0]: r[2] for r in [x.split('\t') for x in t.inner_text('#pinList tbody').split('\n')]}
    t.once('dialog', lambda d: d.accept()); t.click('#pclose')
    join = SQL("select join_code from classes where name='Группа викторин'")

    # 2. гость: тематическая викторина без частей, без сохранения
    gc = b.new_context(**phone); g = page(gc)
    g.goto(B+'quizzes/izafa/')
    check('гость: подпись «как гость»', 'гость' in g.inner_text('#who'))
    check('360 px без горизонтальной прокрутки (старт)', noscroll(g))
    g.click('#start'); n = play(g, lambda i, pg: i == 1 and check('360 px без прокрутки (вопрос)', noscroll(pg)))
    check('гость: 20 вопросов', n == 20, n)
    check('гость: результат не в облаке', 'не сохранён' in g.inner_text('#eNet'), g.inner_text('#eNet'))
    check('гость: рейтинг класса скрыт', not g.is_visible('#sBoard'))
    check('360 px без прокрутки (итог)', noscroll(g))
    g.click('#myAns'); check('гость: разбор 20 ответов', g.locator('#mbody .rv').count() == 20); g.click('#mclose')
    g.click('#again'); check('гость: лучший результат запомнен', 'лучший результат' in g.inner_text('#who'))
    check('гость: в базе пусто', SQL('select count(*) from quiz_attempts') == '0')

    # 3. ученик 01: урок 10, связь пропадает в конце викторины
    sc = b.new_context(**phone); s = page(sc)
    s.goto(B+'login/'); s.fill('#join', join); s.fill('#code', '1'); s.fill('#pin', pins['01']); s.click('#fClass button'); s.wait_for_url('**/words/')
    s.goto(B+'quizzes/matn-10/'); check('ученик: «результат сохранится»', 'сохранится' in s.inner_text('#who'))
    s.click('#start')
    s.wait_for_selector('#inGo', state='visible'); check('вступление: кнопка «Открыть текст»', s.locator('#inExtra button').count() == 1)
    s.click('#inExtra button'); s.wait_for_selector('#modal[open]'); check('текст урока открыт', s.locator('#mbody .ptxt').count() >= 3); s.click('#mclose')
    def mid(i, pg):
        if i == 2: check('кнопка «Текст» во время вопроса', pg.is_visible('#txtBtn'))
        if i == 20: ctl('down=1')
    n = play(s, mid); s.wait_for_timeout(1500)
    check('ученик: 20 вопросов', n == 20, n)
    check('без связи: результат ждёт на телефоне', 'Нет связи' in s.inner_text('#eNet'), s.inner_text('#eNet'))
    check('без связи: в базе ещё нет', SQL('select count(*) from quiz_attempts') == '0')
    ctl('down=0'); s.evaluate("window.dispatchEvent(new Event('online'))"); s.wait_for_timeout(1500)
    check('связь вернулась: сохранено', 'сохранён' in s.inner_text('#eNet'), s.inner_text('#eNet'))
    check('в базе 1 попытка и 20 ответов', SQL('select count(*) from quiz_attempts') == '1' and SQL('select count(*) from quiz_answers') == '20')
    pts = s.inner_text('#ePts'); check('очки в базе совпадают с экраном', SQL('select points from quiz_attempts') + ' очков' == pts, pts)
    s.evaluate("window.dispatchEvent(new Event('online'))"); s.wait_for_timeout(800)
    check('повторная отправка не создаёт дубль', SQL('select count(*) from quiz_attempts') == '1')
    s.wait_for_selector('#board li'); check('рейтинг класса: свой псевдоним', 'Ученик 01' in s.inner_text('#board'))
    s.click('#myAns'); check('разбор: 20 ответов с пояснениями', s.locator('#mbody .rv').count() == 20 and s.locator('#mbody .rve').count() >= 15)
    check('разбор: арабский помечен lang=ar', s.locator('#mbody .rvq [lang=ar]').count() >= 10); s.click('#mclose')
    s.screenshot(path='/tmp/claude-0/q_end.png', full_page=True)
    s.goto(B+'me/'); s.wait_for_selector('.qlist'); s.click('.qlist button'); s.wait_for_selector('#rvBox .rv')
    check('/me: разбор попытки', s.locator('#rvBox .rv').count() == 20)

    # 4. пробный экзамен: аудирование
    s.goto(B+'quizzes/mock-ekzamen/'); s.click('#start'); s.wait_for_selector('#inGo', state='visible')
    check('экзамен: кнопка «Прослушать диалог»', 'Прослушать' in s.inner_text('#inExtra') or 'голос' in s.inner_text('#inExtra'), s.inner_text('#inExtra'))
    s.click('#inGo'); s.wait_for_selector('#tiles .tile'); check('экзамен: в аудировании нет кнопки «Текст»', not s.is_visible('#txtBtn'))

    # 5. табло для проектора
    bc = b.new_context(viewport={'width': 1366, 'height': 768}); bd = page(bc)
    bd.goto(B+f'board/matn-10/?class={join.lower()}&hours=3'); bd.wait_for_selector('#board li')
    check('табло: псевдоним и очки', 'Ученик 01' in bd.inner_text('#board') and pts.split()[0] in bd.inner_text('#board'))
    check('табло: нет шапки сайта', bd.locator('header.site-head').count() == 0)
    bd.screenshot(path='/tmp/claude-0/q_board.png')
    bd.goto(B+'board/matn-10/?class=XXXXXX'); bd.wait_for_timeout(800); check('табло: неверный код', 'не найден' in bd.inner_text('#msg'))

    # 6. панель учителя
    t.goto(B+'teacher/'); t.wait_for_selector('#report .kpis'); t.click('[data-tab=quizzes]'); t.wait_for_selector('#qzRep .kpis')
    check('учитель: викторина с попыткой выбрана первой', t.eval_on_selector('#qzSel', 'e => e.value') == 'matn-10')
    check('учитель: ученик в таблице', 'Ученик 01' in t.inner_text('#qzRep'))
    check('учитель: ссылка на табло', join in (t.get_attribute('#qzBoard', 'href') or ''))
    t.click('#qzRep .rvBtn >> nth=0'); t.wait_for_selector('#dbody .rv'); check('учитель: разбор попытки', t.locator('#dbody .rv').count() == 20)
    t.click('#dclose'); t.screenshot(path='/tmp/claude-0/q_teacher.png', full_page=True)
    t.click('[data-tab=stats]'); t.click('#rep tbody tr >> nth=0'); t.wait_for_selector('#dlg[open]')
    check('учитель: профиль ученика — викторины', 'Урок 10' in t.inner_text('#dbody'))
    t.click('#dclose'); t.click('[data-tab=quizzes]')
    with t.expect_download() as dl: t.click('#qzCsv')
    check('учитель: CSV ответов (20 строк)', open(dl.value.path(), encoding='utf-8-sig').read().count('\n') == 20)
    b.close()
print('ERRORS', errs)
print('FAILED', fails)
sys.exit(1 if fails or errs else 0)
