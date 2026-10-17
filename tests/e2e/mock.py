# Пробный экзамен (/mock/<экзамен>/) на телефоне 360 px: выборка, перемешивание, клавиши, режим концентрации, выходы из окна,
# таймер и восстановление после перезагрузки, результаты, языки, переадресация со старого адреса.
# Подготовка: npm run build; раздать dist в корне на :4322 (как для i18n.py). Запуск: python3 tests/e2e/mock.py
# Если работает эмулятор базы (:8787, см. tests/README.md, сайт собран на него) — ещё ученик класса и панель учителя.
import json, os, re, subprocess, sys, time, urllib.request
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
KEY = 'tanal-nahw'
PATH = 'tanal/nahw'  # адрес «книга/предмет»: /mock/tanal/nahw/
SKEY = f'unmuzaj:mock:{KEY}:guest'
DATA = json.load(open(os.path.join(ROOT, 'src/content/quizzes', KEY + '.json'), encoding='utf-8'))
POOL = {p['id']: p for p in DATA['pool']}
LETTERS = ['أ', 'ب', 'ج', 'د']
errs, fails = [], []
def check(name, cond, info=''):
    print(('OK   ' if cond else 'FAIL ') + name, info if not cond else '')
    if not cond: fails.append(name)
def page(ctx):
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_' not in m.text and errs.append('console: ' + m.text))
    pg.on('dialog', lambda d: d.accept())  # «Начать новый экзамен?» и предупреждение при уходе со страницы
    return pg
def noscroll(pg): return pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
# состояние экзамена: у гостя — ключ …:guest, у ученика класса — …:pin:<класс>:<код>
FIND = f"Object.keys(localStorage).find(k => k.startsWith('unmuzaj:mock:{KEY}:'))"
def state(pg): return pg.evaluate(f"JSON.parse(localStorage.getItem({FIND}) || 'null')")
def set_state(pg, st): pg.evaluate(f"v => localStorage.setItem({FIND} || '{SKEY}', JSON.stringify(v))", st)
def visible(pg, sel): return pg.locator(sel).first.is_visible()
def status(url):
    try: return urllib.request.urlopen(url, timeout=3).status
    except urllib.error.HTTPError as e: return e.code
    except Exception: return 0
def away_and_back(pg, change):
    """уйти со страницы экзамена (она сохраняет состояние), изменить состояние «вне» её и вернуться"""
    pg.goto(B + 'about/'); st = state(pg); change(st); set_state(pg, st); pg.goto(B + f'mock/{PATH}/'); pg.wait_for_load_state('networkidle')
def answer(pg, mode):
    """ответить на текущий вопрос: 'right' — правильный, 'wrong' — неверный, None — пропустить"""
    st = state(pg); i = st['cur']; perm = st['perm'][i]
    if mode is None: return None
    k = perm.index(0) if mode == 'right' else next(x for x in range(len(perm)) if perm[x] != 0)
    pg.click(f'#o{k}'); return k

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)
    phone = dict(viewport={'width': 360, 'height': 740}, is_mobile=True, has_touch=True)

    # 1. раздел и место в меню; в «Тестах», «Викторинах» и на табло экзамена нет
    ctx = b.new_context(**phone); pg = page(ctx)
    pg.goto(B + 'mock/'); pg.wait_for_load_state('networkidle')
    check('/mock/: заголовок раздела', 'Пробные экзамены' in pg.inner_text('h1'))
    check('/mock/: экзамен в списке', pg.locator(f'a[href="/mock/{PATH}/"]').count() == 1)
    check('/mock/: арабское название раздела', 'الِاخْتِبَارَاتُ التَّجْرِيبِيَّةُ' in pg.inner_text('.page-head'))
    check('/mock/: 360 px без прокрутки', noscroll(pg))
    check('меню «Задания»: пункт «Пробные экзамены»', pg.locator('#g-tasks a[href="/mock/"]').count() == 1)
    for path in ['tests/', 'quizzes/']:
        pg.goto(B + path); check(f'/{path}: экзамена нет в списке', pg.locator(f'a[href*="{KEY}"]').count() == 0)
    pg.goto(B); check('главная: раздел в оглавлении', pg.locator('.toc a[href="/mock/"]').count() == 1)
    check('табло для экзамена не собирается', status(B + f'board/{KEY}/') == 404)

    # 2. стартовый экран
    pg.goto(B + f'mock/{PATH}/')
    txt = pg.inner_text('#sStart')
    check('старт: 30 вопросов · 30 минут', '30 вопросов' in txt and '30 минут' in txt, txt[:200])
    check('старт: правила и честная оговорка', 'Выход из окна' in txt and 'не может полностью запретить' in txt)
    if DATA.get('book'):
        bk = pg.inner_text('#sStart .book')
        check('старт: источник — книга, издатель, депозит', DATA['book']['title'] in bk and DATA['book']['publisher'] in bk and DATA['book']['deposit'] in bk and all(x in bk for x in DATA['book'].get('authors', [])), bk)
    else: print('SKIP источник: в данных нет поля book')
    check('старт: гость — результат только на устройстве', 'гость' in pg.inner_text('#who'))
    check('старт: шапка сайта видна', visible(pg, 'header.site-head'))
    check('старт: 360 px без прокрутки', noscroll(pg))

    # 3. экзамен: выборка, режим концентрации
    pg.click('#start'); pg.wait_for_selector('#sExam:not([hidden]) #o0')
    st = state(pg)
    check('выборка: 30 вопросов', len(st['ids']) == 30, len(st['ids']))
    check('выборка: без повторов', len(set(st['ids'])) == 30)
    check('выборка: все из pool', all(i in POOL for i in st['ids']))
    check('режим концентрации: шапка, подвал, крошки скрыты', not visible(pg, 'header.site-head') and not visible(pg, 'footer.site-foot') and not visible(pg, '.crumbs'))
    check('режим концентрации: класс exam-on', pg.evaluate("document.documentElement.classList.contains('exam-on')"))
    check('таймер 30:00', pg.inner_text('#clock') in ('30:00', '29:59'), pg.inner_text('#clock'))
    check('360 px без прокрутки (вопрос)', noscroll(pg))
    fs = pg.evaluate("parseFloat(getComputedStyle(document.getElementById('qText')).fontSize)")
    lh = pg.evaluate("parseFloat(getComputedStyle(document.getElementById('qText')).lineHeight) / parseFloat(getComputedStyle(document.getElementById('qText')).fontSize)")
    check('вопрос: Amiri, не меньше 26 px, межстрочный ≈ 2', fs >= 26 and 1.9 <= lh <= 2.1 and 'Amiri' in pg.evaluate("getComputedStyle(document.getElementById('qText')).fontFamily"), f'{fs} {lh}')
    check('вопрос и варианты: lang=ar dir=rtl', pg.get_attribute('#qText', 'dir') == 'rtl' and pg.get_attribute('#opts', 'lang') == 'ar' and pg.get_attribute('#opts', 'dir') == 'rtl')
    hs = pg.evaluate("[...document.querySelectorAll('#opts .opt')].map(b => b.getBoundingClientRect().height)")
    ws = pg.evaluate("[...document.querySelectorAll('#opts .opt')].map(b => b.getBoundingClientRect().width)")
    check('варианты столбиком во всю ширину, ≥ 44 px', len(hs) == 4 and min(hs) >= 44 and max(ws) - min(ws) < 1 and min(ws) > 280, f'{hs} {ws}')
    check('буквы أ ب ج د по месту', pg.evaluate("[...document.querySelectorAll('#opts .ol')].map(x => x.textContent)") == LETTERS)
    check('нет очков, уровней и цветных фигур', pg.locator('#sExam .tile, #sExam #pts').count() == 0 and 'очк' not in pg.inner_text('#sExam'))
    v0 = POOL[st['ids'][0]]
    check('первый вопрос — текст из pool', pg.inner_text('#qText').strip() == v0['q'].strip())
    check('варианты — те же, в порядке perm', pg.evaluate("[...document.querySelectorAll('#opts .ot')].map(x => x.textContent)") == [v0['o'][k] for k in st['perm'][0]])

    # блокировки: копирование, контекстное меню, поиск по «/»
    check('копирование запрещено', pg.evaluate("!document.dispatchEvent(new Event('copy', { cancelable: true, bubbles: true }))"))
    check('контекстное меню запрещено', pg.evaluate("!document.getElementById('qText').dispatchEvent(new MouseEvent('contextmenu', { cancelable: true, bubbles: true }))"))
    pg.keyboard.press('/'); pg.wait_for_timeout(150); check('«/» не открывает поиск', not pg.evaluate("document.getElementById('searchDlg').open"))
    check('выделение текста выключено', pg.evaluate("getComputedStyle(document.getElementById('qText')).userSelect") == 'none')

    # клавиши и навигация
    pg.keyboard.press('2'); check('клавиша 2 — вариант ب', pg.get_attribute('#o1', 'aria-pressed') == 'true' and state(pg)['ans'][0] == 1)
    pg.click('#o3'); check('ответ можно изменить (нейтральное выделение)', pg.get_attribute('#o3', 'aria-pressed') == 'true' and pg.get_attribute('#o1', 'aria-pressed') == 'false')
    pg.keyboard.press('ArrowRight'); check('→ — следующий вопрос', state(pg)['cur'] == 1 and 'Вопрос 2 из 30' in pg.inner_text('#qn'))
    pg.keyboard.press('ArrowLeft'); check('← — предыдущий', state(pg)['cur'] == 0)
    pg.click('#markBtn'); check('«Отметить»', state(pg)['marked'][0] and pg.locator('#pal .pq.mk').count() == 1)
    pg.click('#pal .pq >> nth=9'); check('панель номеров: переход к 10', state(pg)['cur'] == 9 and pg.get_attribute('#pal .pq >> nth=9', 'aria-current') == 'step')
    check('панель номеров: 1 отвечен', pg.locator('#pal .pq.ans').count() == 1)

    # перемешивание: правильный ответ остаётся правильным — отвечаем по данным pool
    plan = ['right' if i % 3 == 0 else 'wrong' if i % 3 == 1 else None for i in range(30)]
    plan[0] = 'right'
    pg.click('#pal .pq >> nth=0')
    for i in range(30):
        if i: pg.click('#next')
        answer(pg, plan[i])
    st = state(pg)
    places = {st['perm'][i].index(0) for i in range(30)}
    check('правильный ответ стоит на разных местах', len(places) >= 2, places)
    n_right, n_none = plan.count('right'), plan.count(None)
    check('ответы записаны', sum(a is not None for a in st['ans']) == 30 - n_none)
    check('«Далее» на последнем вопросе выключено', pg.is_disabled('#next'))

    # выходы из окна (после короткой паузы на вход в полноэкранный режим)
    pg.wait_for_timeout(1700)
    pg.evaluate("window.dispatchEvent(new Event('blur'))"); pg.evaluate("window.dispatchEvent(new Event('blur'))")
    check('выход из окна: предупреждение', pg.evaluate("document.getElementById('dExit').open"))
    check('выход из окна: один уход — один выход', state(pg)['exits'] == 1, state(pg)['exits'])
    check('выход из окна: счётчик виден', '1' in pg.inner_text('#exitsN'))
    pg.click('#xBack'); pg.wait_for_timeout(1700)
    pg.evaluate("Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange'))")
    check('вкладка скрыта — второй выход', state(pg)['exits'] == 2, state(pg)['exits'])
    pg.evaluate("delete document.hidden")
    pg.click('#xBack')
    n0 = state(pg)['exits']
    pg.evaluate("window.dispatchEvent(new Event('blur'))"); pg.wait_for_timeout(300)
    check('blur сразу после возврата: пока не засчитан (окно в фокусе)', state(pg)['exits'] == n0)
    pg.wait_for_timeout(1500); check('…и после паузы не засчитан: окно в фокусе', state(pg)['exits'] == n0)
    pg.evaluate("Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange'))")
    check('скрытие вкладки засчитывается сразу', state(pg)['exits'] == n0 + 1)
    pg.evaluate("delete document.hidden"); pg.click('#xBack')

    # таймер идёт от отметки начала; перезагрузка не сбрасывает экзамен
    c1 = pg.inner_text('#clock'); pg.wait_for_timeout(2300); c2 = pg.inner_text('#clock')
    check('таймер идёт', c1 != c2, f'{c1} → {c2}')
    before = state(pg)
    pg.reload(); pg.wait_for_load_state('networkidle')
    after = state(pg)
    check('перезагрузка засчитана как выход из окна', after['exits'] == before['exits'] + 1, f"{before['exits']} → {after['exits']}")
    check('после перезагрузки: те же вопросы, порядок и ответы', after['ids'] == before['ids'] and after['perm'] == before['perm'] and after['ans'] == before['ans'] and after['marked'] == before['marked'])
    check('после перезагрузки: шапка скрыта сразу', pg.evaluate("document.documentElement.classList.contains('exam-on')") and not visible(pg, 'header.site-head'))
    check('после перезагрузки: «Продолжить экзамен»', visible(pg, '#resume') and 'Продолжить' in pg.inner_text('#start'))
    away_and_back(pg, lambda st: st.update(start=st['start'] - 25 * 60_000))  # «прошло» 25 минут
    pg.click('#start'); pg.wait_for_selector('#sExam:not([hidden])')
    clk = pg.inner_text('#clock'); mm = int(clk.split(':')[0])
    check('после перезагрузки время не сбросилось (≤ 5:00)', mm <= 4 or clk == '5:00', clk)
    check('предупреждение за 5 минут', 'Осталось 5 минут' in pg.inner_text('#warn') and visible(pg, '#warn'), pg.inner_text('#warn'))
    check('после перезагрузки — тот же текущий вопрос', state(pg)['cur'] == before['cur'])

    # «Завершить»: подтверждение с числом вопросов без ответа
    pg.click('#finishBtn'); pg.wait_for_selector('#dConfirm[open]')
    check('подтверждение: без ответа N', f'Без ответа: {n_none}' in pg.inner_text('#cText'), pg.inner_text('#cText'))
    pg.click('#cNo'); check('«Вернуться к вопросам»', not pg.evaluate("document.getElementById('dConfirm').open") and visible(pg, '#sExam'))

    # 0:00 — автоматическая сдача (экзамен «начался» 30 минут назад)
    exits = state(pg)['exits']
    away_and_back(pg, lambda st: st.update(start=st['start'] - 6 * 60_000)); pg.wait_for_selector('#sRes .sum')
    R = pg.inner_text('#sRes')
    check('0:00 — экзамен сдан автоматически', 'Время вышло' in R)
    check('результат: отвечено и верно', f'{30 - n_none} из 30' in R and re.search(rf'Верных ответов\s+{n_right}\b', R), R[:300])
    check('результат: выходы из окна', exits >= 3 and re.search(rf'Выходов из окна\s+{exits + 1}\b', R) is not None, f'{exits} {R[:260]!r}')
    check('результат: затраченное время 30:00', '30:00' in R)
    check('результат: без баллов и уровней', 'очк' not in R.lower() and 'уровень' not in R.lower())
    rows = pg.locator('#sRes .rt tbody tr')
    check('таблица: 30 строк', rows.count() == 30)
    st = state(pg); ok_rows = 0
    for i in range(30):
        tr = rows.nth(i); right = POOL[st['ids'][i]]['o'][0]; cells = tr.locator('td')
        if plan[i] == 'right': ok_rows += tr.evaluate("e => e.classList.contains('ok')") and cells.nth(3).inner_text().strip() == ''
        else: ok_rows += (right in cells.nth(3).inner_text())
    check('таблица: правильный ответ — только при ошибке или без ответа', ok_rows == 30, ok_rows)
    tsum = pg.evaluate("[...document.querySelectorAll('#sRes .tt tbody tr')].reduce((a, tr) => a + +tr.children[1].textContent, 0)")
    check('сводка по темам: всего 30', tsum == 30, tsum)
    check('сводка по темам: арабские названия', pg.locator('#sRes .tt [lang=ar]').count() >= 1)
    check('полный список: 30 вопросов', pg.locator('#sRes .full > li').count() == 30)
    check('полный список: выбранный и правильный отмечены', pg.locator('#sRes .fq-o li.me').count() == 30 - n_none and pg.locator('#sRes .fq-o li.right').count() == 30 - n_right)
    check('результат: «Печать / PDF» и «Новый экзамен»', visible(pg, '#sRes [data-act=print]') and visible(pg, '#sRes [data-act=again]'))
    check('результат: гость — только на устройстве', 'только на этом устройстве' in pg.inner_text('#rNet'))
    check('результат: шапка снова видна', visible(pg, 'header.site-head') and not pg.evaluate("document.documentElement.classList.contains('exam-on')"))
    check('результат: 360 px без прокрутки', noscroll(pg))
    pg.emulate_media(media='print'); check('печать: кнопки и шапка скрыты', not visible(pg, 'header.site-head') and not visible(pg, '#sRes .btns')); pg.emulate_media(media='screen')
    pg.screenshot(path=os.path.join(ROOT, 'test-results', 'mock_result_360.png'), full_page=True)
    pg.reload(); check('результат остаётся после перезагрузки', visible(pg, '#sRes .sum'))
    ids1 = state(pg)['ids']
    pg.click('#sRes [data-act=again] >> nth=0'); check('«Новый экзамен» → стартовый экран', visible(pg, '#sStart') and state(pg) is None)
    pg.click('#start'); pg.wait_for_selector('#o0')
    check('новый экзамен — другой набор вопросов', state(pg)['ids'] != ids1)
    pg.click('#finishBtn'); pg.click('#cYes'); pg.wait_for_selector('#sRes .sum')
    ctx.close()

    # 4. предел выходов: подменяем max_exits в данных страницы
    ctx = b.new_context(**phone); pg = page(ctx)
    def lim(r):
        resp = r.fetch(); r.fulfill(response=resp, body=resp.text().replace('"maxExits":null', '"maxExits":1'))
    ctx.route(f'**/mock/{PATH}/', lim)
    pg.goto(B + f'mock/{PATH}/')
    pg.click('#start'); pg.wait_for_selector('#o0'); pg.wait_for_timeout(1700)
    pg.evaluate("window.dispatchEvent(new Event('blur'))"); pg.click('#xBack'); pg.wait_for_timeout(1700)
    check('предел 1: после 1-го выхода экзамен идёт', visible(pg, '#sExam'))
    pg.evaluate("window.dispatchEvent(new Event('blur'))"); pg.wait_for_selector('#sRes .sum')
    check('предел 1: 2-й выход — экзамен сдан', 'Слишком много выходов' in pg.inner_text('#sRes'))
    ctx.close()

    # 5. языки: интерфейс на языке страницы, арабское не переводится
    for loc, words in [('uz', ['Imtihonni boshlash', 'Savol 1/30', 'Yakunlash']), ('en', ['Start the exam', 'Question 1 of 30', 'Finish'])]:
        ctx = b.new_context(**phone); pg = page(ctx)
        pg.goto(B + f'{loc}/mock/{PATH}/')
        check(f'{loc}: lang и кнопка', pg.evaluate('document.documentElement.lang') == loc and words[0] in pg.inner_text('#start'))
        pg.click('#start'); pg.wait_for_selector('#o0')
        ex = pg.inner_text('#sExam')
        check(f'{loc}: экзамен на языке страницы', words[1] in ex and words[2] in ex, ex[:120])
        check(f'{loc}: нет кириллицы в экзамене', not re.search('[А-Яа-яЁё]', ex))
        check(f'{loc}: 360 px без прокрутки', noscroll(pg))
        pg.click('#finishBtn'); pg.click('#cYes'); pg.wait_for_selector('#sRes .sum')
        check(f'{loc}: результаты без кириллицы', not re.search('[А-Яа-яЁё]', pg.evaluate("(() => { const c = document.getElementById('sRes').cloneNode(true); c.querySelectorAll('.rsrc').forEach(x => x.remove()); return c.innerText; })()")))  # строка источника — имена как в данных
        ctx.close()

    # 6. старый адрес /quizzes/tanal-nahw/ → /mock/tanal-nahw/ (с параметрами и якорем), на всех языках
    ctx = b.new_context(**phone); pg = page(ctx)
    for loc, old in [(l, o) for l in ['', 'uz/', 'en/'] for o in ['quizzes', 'mock']]:
        pg.goto(B + f'{loc}{old}/{KEY}/?from=old#top'); pg.wait_for_url(f'**/{loc}mock/{PATH}/?from=old#top', timeout=5000)
        check(f'переадресация /{loc}{old}/{KEY}/', pg.url == B + f'{loc}mock/{PATH}/?from=old#top', pg.url)
        html = urllib.request.urlopen(B + f'{loc}{old}/{KEY}/').read().decode()
        check(f'страница-переадресация /{loc}{old}/: noindex, canonical, refresh, без hreflang',
              'name="robots" content="noindex"' in html and f'rel="canonical" href="https://allimni.net/{loc}mock/{PATH}/"' in html
              and f'url=/{loc}mock/{PATH}/' in html and 'hreflang' not in html)
    ctx.close()
    ctx = b.new_context(**phone, java_script_enabled=False); pg = ctx.new_page()
    pg.goto(B + f'quizzes/{KEY}/'); pg.wait_for_url(f'**/mock/{PATH}/', timeout=5000)
    check('без JavaScript — переадресация через meta refresh', pg.url == B + f'mock/{PATH}/', pg.url)
    ctx.close()
    sm = urllib.request.urlopen(B + 'sitemap-0.xml').read().decode()
    check('sitemap: старого адреса нет, новый есть', f'quizzes/{KEY}/' not in sm and f'mock/{KEY}/' not in sm and f'/mock/{PATH}/' in sm and f'/uz/mock/{PATH}/' in sm)
    moved = re.findall(r"from: '([^']+)', to: '([^']+)'", open(os.path.join(ROOT, 'src/config/moved.mjs'), encoding='utf-8').read())
    rules = {tuple(l.split()[:3]) for l in open(os.path.join(ROOT, 'public/_redirects'), encoding='utf-8') if l.strip() and not l.startswith('#')}
    need = {(f'/{loc}{a}', f'/{loc}{b_}', '301') for a, b_ in moved for loc in ['', 'uz/', 'en/']}
    check('public/_redirects совпадает с src/config/moved.mjs', need <= rules, need - rules)

    # 7. с базой (если запущен эмулятор): ученик сдаёт экзамен, выходы видны в «Моём прогрессе» и у учителя
    if status('http://localhost:8787/__ctl?x=1') == 200:
        SQL = lambda q: subprocess.run(['psql', '-h', 'localhost', '-p', '54329', '-U', 'postgres', '-d', 'e2e', '-tAc', q], capture_output=True, text=True, env={'PGPASSWORD': 'pw', 'PATH': '/usr/bin:/bin'}).stdout.strip()
        SQL('truncate classes, learners, pin_tokens, login_fails, card_state, card_steps, answers, visits, card_tests, quiz_attempts, quiz_answers cascade')
        tc = b.new_context(viewport={'width': 1280, 'height': 900}); t = page(tc)
        t.goto(B + 'login/'); t.fill('#email', 'teacher@x'); t.fill('#pass', 'secret123'); t.click('#fMail button'); t.wait_for_url('**/teacher/'); t.wait_for_selector('#app:not([hidden])')
        t.fill('#ncName', 'Группа экзамена'); t.fill('#ncCount', '2'); t.click('#newCls button[type=submit]')
        t.wait_for_selector('#pins[open]'); pins = {r[0]: r[2] for r in [x.split('\t') for x in t.inner_text('#pinList tbody').split('\n')]}
        t.click('#pclose')
        join = SQL("select join_code from classes where name='Группа экзамена' order by id desc limit 1")
        sc = b.new_context(**phone); s = page(sc)
        s.goto(B + 'login/'); s.fill('#join', join); s.fill('#code', '1'); s.fill('#pin', pins['01']); s.click('#fClass button'); s.wait_for_url('**/words/')
        s.goto(B + f'mock/{PATH}/'); check('ученик: «результат сохранится»', 'сохранится' in s.inner_text('#who'))
        s.click('#start'); s.wait_for_selector('#o0'); s.wait_for_timeout(1700)
        okn = 0
        for i in range(30):
            if i: s.click('#next')
            if i < 12: answer(s, 'right'); okn += 1
        s.evaluate("window.dispatchEvent(new Event('blur'))"); s.click('#xBack')
        s.click('#finishBtn'); s.click('#cYes'); s.wait_for_selector('#sRes .sum'); s.wait_for_timeout(1500)
        check('ученик: результат сохранён', 'сохранён' in s.inner_text('#rNet'), s.inner_text('#rNet'))
        row = SQL(f"select points, correct, total, coalesce(level, ''), exits from quiz_attempts where quiz = '{KEY}' order by created_at desc limit 1")
        check('база: points 0, верно, всего, уровень пустой, выходы 1', row == f'0|{okn}|30||1', row)
        check('база: 30 ответов', SQL(f"select count(*) from quiz_answers a join quiz_attempts q on q.id = a.attempt_id where q.quiz = '{KEY}' and q.created_at > now() - interval '5 minutes'") == '30')
        s.goto(B + 'me/'); s.wait_for_selector('.qlist')
        check('/me: выходы из окна вместо очков', 'выходов из окна: 1' in s.inner_text('.qlist') and f'/mock/{PATH}/' in s.inner_html('.qlist'))
        t.goto(B + 'teacher/'); t.wait_for_selector('#report .kpis'); t.click('[data-tab=quizzes]'); t.select_option('#qzSel', KEY); t.wait_for_timeout(300)
        rep = t.inner_text('#qzRep')
        check('учитель: столбец «выходы из окна», без очков', 'Выходы из окна' in rep and 'Очки' not in rep, rep[:300])
        check('учитель: ссылки на табло нет', not t.is_visible('#qzBoard'))
        t.click('#qzRep .rvBtn >> nth=0'); t.wait_for_selector('#dbody .rv')
        check('учитель: разбор — выходов из окна: 1', 'выходов из окна: 1' in t.inner_text('#dbody p >> nth=0'))
        b.close()
    else:
        print('SKIP база: эмулятор :8787 не запущен (ученик класса и панель учителя не проверены)')
        b.close()
print('ERRORS', errs)
print('FAILED', fails)
sys.exit(1 if fails or errs else 0)
