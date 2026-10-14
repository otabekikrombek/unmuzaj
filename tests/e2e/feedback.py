# Сквозной тест «Сообщить об ошибке» (§15.2): гость → слово карточки, лимит, обрыв связи, вопрос викторины в разборе,
# кнопка в подвале, ученик класса, ловушка для спама; администратор: вкладка «Сообщения», прочитано / исправлено / удалить.
# Подготовка — как для flow.py (tests/README.md): база e2e с 0001–0003, эмулятор на :8787, сайт на :4322/unmuzaj/.
import os, subprocess, time, urllib.request, json
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/unmuzaj/'
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
def send(pg, text):
    pg.wait_for_selector('#fbDlg[open]'); pg.fill('#fbMsg', text); pg.click('#fbSend')
    pg.wait_for_function("!document.getElementById('fbDone').hidden || document.getElementById('fbOut').textContent.length > 0")
def thanks(pg): return pg.is_visible('#fbDone')
def play(pg, limit=240):
    t0 = time.time()
    while time.time() - t0 < limit:
        if pg.is_visible('#sEnd'): return
        if pg.is_visible('#inGo'): pg.click('#inGo')
        else:
            tiles = pg.locator('#tiles .tile:not([disabled])')
            if pg.is_visible('#sQ') and tiles.count(): tiles.first.click()
        pg.wait_for_timeout(120)
    raise RuntimeError('викторина не закончилась')

SQL('truncate feedback')
SQL("insert into auth.users(email) select 'teacher2@x' where not exists (select 1 from auth.users where email='teacher2@x')")
SQL("insert into profiles(user_id, role) select id, 'teacher' from auth.users where email='teacher2@x' on conflict (user_id) do update set role='teacher'")
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)
    phone = dict(viewport={'width': 360, 'height': 740}, is_mobile=True, has_touch=True,
                 user_agent='Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36')

    # 1. гость на карточках: к сообщению приложено слово на экране
    gc = b.new_context(**phone); g = page(gc)
    g.goto(B+'words/w100/'); g.wait_for_selector('#card .ar')
    word = g.inner_text('#card .ar').strip()
    g.click('#fbWord'); g.wait_for_selector('#fbDlg[open]')
    check('окно открылось, слово приложено', word in g.inner_text('#fbCtx'), g.inner_text('#fbCtx'))
    check('окно на 360 px без горизонтальной прокрутки', noscroll(g))
    g.click('#fbSend'); g.wait_for_timeout(200)
    check('пустое сообщение не отправляется', 'Напишите' in g.inner_text('#fbOut') and SQL('select count(*) from feedback') == '0')
    g.fill('#fbMsg', 'я' * 2100)
    check('не больше 2000 символов', g.evaluate("document.getElementById('fbMsg').value.length") == 2000 and '2000 из 2000' in g.inner_text('#fbCount'))
    send(g, 'Опечатка в переводе'); check('гость: «Спасибо»', thanks(g))
    row = SQL("select item || '|' || page || '|' || coalesce(learner_id::text, 'гость') || '|' || device from feedback order by id desc limit 1").split('|')
    check('в базе: слово, адрес, гость, устройство', row[0] == f'words:w100#{word}' and row[1].endswith('/unmuzaj/words/w100/') and row[2] == 'гость' and row[3].startswith('телефон · 360×740'), row)
    g.click('#fbDone .btn'); check('окно закрывается', not g.is_visible('#fbDlg[open]'))

    # 2. лимит: 5 сообщений за 10 минут с одного устройства; текст при ошибке не теряется
    for i in range(4): g.click('#fbWord'); send(g, f'Сообщение {i + 2}'); g.click('#fbDone .btn')
    g.click('#fbWord'); send(g, 'Шестое сообщение')
    check('6-е сообщение: дружелюбный отказ', 'через 10 минут' in g.inner_text('#fbOut'), g.inner_text('#fbOut'))
    check('текст не пропал', g.input_value('#fbMsg') == 'Шестое сообщение')
    check('в базе 5 сообщений', SQL('select count(*) from feedback') == '5')
    g.keyboard.press('Escape')

    # 3. нет связи → понятная ошибка, текст на месте; связь вернулась → отправилось
    oc = b.new_context(**phone); o = page(oc); o.goto(B+'about/')
    o.click('footer [data-feedback]'); o.wait_for_selector('#fbDlg[open]')
    check('кнопка в подвале: без задания', 'задание' not in o.inner_text('#fbCtx') and 'страница: /unmuzaj/about/' in o.inner_text('#fbCtx'), o.inner_text('#fbCtx'))
    ctl('down=1'); send(o, 'Без интернета')
    check('без связи: «нет связи»', 'нет связи' in o.inner_text('#fbOut'), o.inner_text('#fbOut'))
    check('без связи: текст не потерян', o.input_value('#fbMsg') == 'Без интернета')
    ctl('down=0'); o.click('#fbSend'); o.wait_for_selector('#fbDone:not([hidden])')
    check('связь вернулась: отправлено', SQL("select count(*) from feedback where message = 'Без интернета'") == '1')
    # ловушка для спам-программ: «спасибо», но в базу ничего не пишется
    o.click('#fbDone .btn'); o.click('footer [data-feedback]'); o.evaluate("document.getElementById('fbSite').value = 'http://spam'")
    send(o, 'Купите рекламу'); check('ловушка: спам не записан', thanks(o) and SQL("select count(*) from feedback where message like 'Купите%'") == '0')

    # 4. викторина: кнопка скрыта во время вопроса; «Ошибка в вопросе?» в разборе прикладывает id вопроса
    qc = b.new_context(**phone); q = page(qc); q.goto(B+'quizzes/izafa/')
    check('викторина: кнопка на старте', q.is_visible('#fbQuiz') and q.get_attribute('#fbQuiz', 'data-feedback') == 'quiz:izafa')
    q.click('#start'); q.wait_for_selector('#sQ:not([hidden])')
    check('во время вопроса кнопки нет (идёт таймер)', not q.is_visible('#fbQuiz'))
    play(q); check('после викторины кнопка снова видна', q.is_visible('#fbQuiz'))
    q.click('#myAns'); q.wait_for_selector('#mbody .rv-fb')
    check('разбор: кнопка у каждого вопроса', q.locator('#mbody .rv-fb').count() == 20)
    btn = q.locator('#mbody .rv-fb').nth(2); qid = btn.get_attribute('data-feedback'); qtext = btn.get_attribute('data-feedback-label')
    btn.click(); q.wait_for_selector('#fbDlg[open]')
    check('окно поверх разбора, вопрос приложен', qtext[:20] in q.inner_text('#fbCtx'), q.inner_text('#fbCtx'))
    check('окно поверх разбора без прокрутки', noscroll(q))
    send(q, 'Неверный ответ в вопросе'); q.click('#fbDone .btn')
    check('в базе: ключ вопроса викторины', SQL("select item from feedback where message = 'Неверный ответ в вопросе'") == qid and qid.startswith('quiz:izafa#'), qid)
    check('после закрытия окно разбора на месте', q.is_visible('#modal[open]'))

    # 5. ученик класса: сообщение подписано (псевдоним виден администратору)
    tc = b.new_context(viewport={'width': 1280, 'height': 900}); t = page(tc)
    t.goto(B+'login/'); t.fill('#email', 'teacher@x'); t.fill('#pass', 'secret123'); t.click('#fMail button'); t.wait_for_url('**/teacher/'); t.wait_for_selector('#app:not([hidden])')
    if not t.is_visible('#ncName'): t.click('#newClsBtn')
    t.fill('#ncName', 'Класс сообщений'); t.fill('#ncCount', '1'); t.click('#newCls button[type=submit]')
    t.wait_for_selector('#pins[open]'); pin = t.inner_text('#pinList tbody').split('\t')[2].strip()
    t.once('dialog', lambda d: d.accept()); t.click('#pclose')
    join = SQL("select join_code from classes where name='Класс сообщений' order by id desc limit 1")
    sc = b.new_context(**phone); s = page(sc)
    s.goto(B+'login/'); s.fill('#join', join); s.fill('#code', '1'); s.fill('#pin', pin); s.click('#fClass button'); s.wait_for_url('**/words/')
    s.goto(B+'exercises/predlogi/'); s.click('[data-feedback^="exercises:"]'); s.wait_for_selector('#fbDlg[open]')
    check('ученик: в окне сказано, что приложен псевдоним', 'псевдоним' in s.inner_text('#fbCtx'))
    send(s, 'Не открывается упражнение')
    check('ученик: сообщение подписано', SQL("select l.nickname from feedback f join learners l on l.id = f.learner_id where f.message = 'Не открывается упражнение'") == 'Ученик 01')
    s.goto(B+'dictionary/?q=книга'); s.wait_for_timeout(300); s.click('#fbDict'); s.wait_for_selector('#fbDlg[open]')
    check('словарь: найденное слово приложено', 'كِتَابٌ' in s.inner_text('#fbCtx'), s.inner_text('#fbCtx'))
    s.keyboard.press('Escape')
    # опасный адрес страницы (подделанный запрос) не превращается в ссылку у администратора
    anon = urllib.request.urlopen(urllib.request.Request('http://localhost:8787/rest/v1/rpc/submit_feedback', method='POST',
        data=json.dumps({'p_token': None, 'p': {'message': 'xss', 'page': 'javascript:alert(1)', 'device_id': 'dev-xss-1'}}).encode(),
        headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + os.environ['ANON'], 'apikey': os.environ['ANON']})).read()

    # 6. администратор: вкладка «Сообщения»
    t.reload(); t.wait_for_selector('#msgTab:not([hidden])')
    n_new = int(SQL("select count(*) from feedback where status = 'new'"))
    t.wait_for_function("document.getElementById('msgBadge').textContent !== ''")
    check('значок: число новых', t.inner_text('#msgBadge') == str(n_new), (t.inner_text('#msgBadge'), n_new))
    t.click('#msgTab'); t.wait_for_selector('#msgList .fbm')
    check('новые сообщения в списке', t.locator('#msgList .fbm').count() == n_new)
    card = t.locator('#msgList .fbm', has_text='Не открывается упражнение')
    check('видны псевдоним и класс ученика', 'Ученик 01' in card.inner_text() and 'Класс сообщений' in card.inner_text(), card.inner_text())
    check('без Telegram: «не отправлено»', 'не отправлено' in card.inner_text())
    check('опасный адрес — текстом, не ссылкой', t.locator('#msgList a[href^="javascript"]').count() == 0 and 'javascript:alert(1)' in t.inner_text('#msgList'))
    card.locator('[data-st=read]').click(); t.wait_for_function(f"document.querySelectorAll('#msgList .fbm').length === {n_new - 1}")
    check('«Прочитано»: ушло из новых, значок уменьшился', t.inner_text('#msgBadge') == str(n_new - 1))
    t.select_option('#msgFilter', 'read'); t.wait_for_selector('#msgList .fbm')
    t.locator('#msgList .fbm', has_text='Не открывается упражнение').locator('[data-st=fixed]').click(); t.wait_for_timeout(600)
    check('«Исправлено»: статус в базе', SQL("select status from feedback where message = 'Не открывается упражнение'") == 'fixed')
    t.select_option('#msgFilter', ''); t.wait_for_selector('#msgList .fbm.st-fixed')
    t.once('dialog', lambda d: d.accept()); t.locator('#msgList .fbm', has_text='xss').locator('[data-st=delete]').click(); t.wait_for_timeout(600)
    check('«Удалить»: сообщение удалено', SQL("select count(*) from feedback where message = 'xss'") == '0')
    t.screenshot(path='/tmp/e_feedback_admin.png', full_page=True)
    # обычный учитель вкладку не видит
    t2c = b.new_context(**phone); t2 = page(t2c)
    t2.goto(B+'login/'); t2.fill('#email', 'teacher2@x'); t2.fill('#pass', 'secret123'); t2.click('#fMail button'); t2.wait_for_url('**/teacher/'); t2.wait_for_selector('#app:not([hidden])')
    check('учитель без прав администратора: вкладки нет', not t2.is_visible('#msgTab'))
    b.close()
print('ERRORS', errs)
print('FAILED', len(fails), fails)
raise SystemExit(1 if fails or errs else 0)
