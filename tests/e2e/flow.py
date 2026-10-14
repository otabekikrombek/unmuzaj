# Сквозной тест: учитель создаёт класс → ученик входит → карточки → офлайн → второе устройство → отчёт.
# Запуск: локальный Postgres + tests/mock (см. README_TESTS.md), сайт на :4322/
import json, random, re, sys, urllib.request, subprocess
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
SQL = lambda q: subprocess.run(['psql','-h','localhost','-p','54329','-U','postgres','-d','e2e','-tAc',q],capture_output=True,text=True,env={'PGPASSWORD':'pw','PATH':'/usr/bin:/bin'}).stdout.strip()
ctl = lambda q: urllib.request.urlopen('http://localhost:8787/__ctl?'+q).read()
errs = []
def page(ctx):
    pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append('pageerror: '+str(e)))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and errs.append('console: '+m.text))
    return pg
def cards(pg, n, err=0.3):
    for _ in range(n):
        if random.random() < err: pg.click('#no'); pg.click('#no')
        else: pg.click('#yes')
with sync_playwright() as p:
    b = p.chromium.launch()
    # 1. учитель
    tc = b.new_context(viewport={'width':1280,'height':900}); t = page(tc)
    t.goto(B+'login/'); t.fill('#email','teacher@x'); t.fill('#pass','wrong'); t.click('#fMail button'); t.wait_for_timeout(600)
    print('teacher wrong pass:', t.inner_text('#mMail'))
    t.fill('#pass','secret123'); t.click('#fMail button'); t.wait_for_url('**/teacher/'); t.wait_for_selector('#app:not([hidden])')
    t.fill('#ncName','2 курс ТГУВ'); t.fill('#ncYear','2026–2027'); t.fill('#ncCount','4'); t.click('#newCls button[type=submit]')
    t.wait_for_selector('#pins[open]'); pins = {r[0]: r[2] for r in [x.split('\t') for x in t.inner_text('#pinList tbody').split('\n')]}
    join = SQL('select join_code from classes limit 1'); print('class', join, 'pins', pins)
    t.screenshot(path='/tmp/e_pins.png')
    t.once('dialog', lambda d: d.accept()); t.click('#pclose')
    # 2. ученик 01: сначала гость, потом вход — прогресс гостя переносится
    sc = b.new_context(viewport={'width':375,'height':800}); s = page(sc)
    s.goto(B+'words/w100/'); s.wait_for_timeout(500); cards(s, 5, 0)
    print('guest who:', s.inner_text('#who')[:40])
    s.goto(B+'login/'); s.fill('#join', join.lower()); s.fill('#code','1'); s.fill('#pin','0000'); s.click('#fClass button'); s.wait_for_timeout(500)
    print('wrong pin:', s.inner_text('#mClass'))
    s.fill('#pin', pins['01']); s.click('#fClass button'); s.wait_for_url('**/words/'); s.goto(B+'words/w100/'); s.wait_for_timeout(1200)
    print('after login:', s.inner_text('#who'), '| stats:', s.inner_text('#stats').replace('\n',' '))
    print('db states after merge:', SQL('select count(*) from card_state'))
    cards(s, 30); s.click('[data-tab=test]')
    for i in range(20): s.click('.opt >> nth=0'); s.wait_for_timeout(1750)
    s.wait_for_timeout(800); print('test:', s.inner_text('#test')[:12].replace('\n',' '))
    s.click('[data-tab=cards]'); s.evaluate('1'); s.wait_for_timeout(500)
    stats1 = s.inner_text('#stats'); print('who:', s.inner_text('#who'))
    # 3. офлайн
    ctl('down=1'); cards(s, 14, .5); s.wait_for_timeout(1500); print('offline:', s.inner_text('#who'))
    ctl('down=0'); s.evaluate("document.querySelector('#yes').click()"); s.wait_for_timeout(2500); print('online again:', s.inner_text('#who'))
    s.screenshot(path='/tmp/e_student.png', full_page=True)
    # 4. второе устройство
    sc2 = b.new_context(viewport={'width':375,'height':800}); s2 = page(sc2)
    s2.goto(B+'login/'); s2.fill('#join', join); s2.fill('#code','01'); s2.fill('#pin', pins['01']); s2.click('#fClass button'); s2.wait_for_url('**/words/')
    s2.goto(B+'words/w100/'); s2.wait_for_timeout(1200)
    st2 = s2.inner_text('#stats'); print('2nd device same progress:', st2.split('пройдено')[1] if 'пройдено' in st2 else st2, '| first:', s.inner_text('#stats').split('пройдено')[1])
    # 5. блокировка
    lc = b.new_context(); l = page(lc); l.goto(B+'login/')
    for i in range(6): l.fill('#join', join); l.fill('#code','03'); l.fill('#pin','1234'); l.click('#fClass button'); l.wait_for_timeout(400)
    print('lockout:', l.inner_text('#mClass'))
    # 6. ученик 02 + рейтинг
    c2 = b.new_context(viewport={'width':375,'height':800}); q = page(c2)
    q.goto(B+'login/'); q.fill('#join', join); q.fill('#code','2'); q.fill('#pin', pins['02']); q.click('#fClass button'); q.wait_for_url('**/words/')
    q.goto(B+'words/w100/'); q.wait_for_timeout(800); cards(q, 25, .2)
    q.evaluate("window.dispatchEvent(new Event('pagehide'))"); q.wait_for_timeout(800)
    SQL("update visits set active_sec = active_sec + 600")
    q.click('[data-tab=board]'); q.wait_for_timeout(1500); print('board:', q.inner_text('#board')[:160].replace('\n',' | '))
    q.goto(B+'me/'); q.wait_for_timeout(1000); print('me:', q.inner_text('#me')[:120].replace('\n',' | '))
    print('DB answers', SQL('select count(*) from answers'), 'distinct client ids', SQL('select count(distinct client_id) from answers'), 'visits', SQL('select count(*) from visits'), 'tests', SQL('select count(*) from card_tests'))
    # 7. учитель: отчёт, имена, детали
    t.goto(B+'teacher/'); t.wait_for_selector('#report .kpis'); print('kpis:', t.inner_text('#report .kpis').replace('\n',' '))
    t.click('[data-tab=people]'); t.click('#namesBtn'); t.fill('#namesTxt', '01; Азиза Каримова\n02; Бобур Алиев'); t.click('#namesForm button')
    t.select_option('#people tbody tr:nth-child(1) .sex', 'ж'); t.click('#people tbody tr:nth-child(1) .save'); t.wait_for_timeout(800)
    t.click('[data-tab=stats]'); t.click('#reload'); t.wait_for_selector('#report .kpis'); t.screenshot(path='/tmp/e_teacher.png', full_page=True)
    t.click('#rep tbody tr >> nth=0'); t.wait_for_timeout(300); t.screenshot(path='/tmp/e_detail.png')
    print('names shown:', 'Азиза Каримова' in t.inner_text('#rep'), '| names in DB:', SQL("select count(*) from learners where nickname like '%Азиза%'"))
    b.close()
print('ERRORS', errs)
