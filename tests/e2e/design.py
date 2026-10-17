# Проверка оформления (CLAUDE.md §14): каждая страница × 4 палитры × 2 режима × ширина 360 и 1280.
#  - контраст AA (axe-core, правило color-contrast) — 0 нарушений;
#  - нет горизонтальной прокрутки, нет ошибок в консоли;
#  - тема ставится до отрисовки, «как в системе» следует за системой, выбор сохраняется;
#  - размер текста, меню «Оформление», поиск (лупа, / и Ctrl+K, русский и арабский), меню и «хлебные крошки».
# Подготовка: npm run build; раздать dist как /unmuzaj/ на :4322 (см. tests/README.md); npm i --no-save axe-core.
# Скриншоты: test-results/design/. Запуск: python3 tests/e2e/design.py [--quick]
import os, sys, json, time
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
AXE = os.path.join(ROOT, 'node_modules', 'axe-core', 'axe.min.js')
OUT = os.path.join(ROOT, 'test-results', 'design'); os.makedirs(OUT, exist_ok=True)
QUICK = '--quick' in sys.argv
PAGES = ['', 'words/', 'words/w100/', 'dictionary/', 'conjugation/', 'conjugation/kataba/', 'conjugation/jalasa/', 'quizzes/', 'quizzes/matn-10/', 'quizzes/mock-ekzamen/', 'tests/', 'mock/', 'mock/tanal/nahw/', 'exercises/',
         'exercises/predlogi/', 'grammar/', 'texts/', 'courses/', 'courses/tsu-2-sem1/', 'login/', 'me/', 'teacher/', 'about/', 'privacy/',
         'board/matn-10/?class=XXXXXX', '404.html']
PALETTES = ['turquoise', 'lapis', 'parchment', 'contrast']
MODES = ['light', 'dark']
WIDTHS = [360, 1280]
if QUICK: PAGES = ['', 'words/w100/', 'quizzes/matn-10/', 'dictionary/', 'conjugation/kataba/', 'teacher/']

errs, fails = [], []
def check(name, cond, info=''):
    if not cond:
        print('FAIL', name, info); fails.append(name)
def look(ctx, palette, mode, fs=0, ar=0):
    ctx.add_init_script(f"try{{localStorage.setItem('unmuzaj:look', JSON.stringify({{mode:'{mode}', palette:'{palette}', fs:{fs}, ar:{ar}}}))}}catch(e){{}}")
def page(ctx):
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(f'{pg.url}: {e}'))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_' not in m.text and errs.append(f'{pg.url}: {m.text}'))
    return pg
def axe(pg, where):
    pg.add_script_tag(path=AXE)
    r = pg.evaluate("""async () => { const r = await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
      return r.violations.flatMap(v => v.nodes.map(n => n.target.join(' ') + ' — ' + (n.any[0]?.message || '').slice(0, 140))); }""")
    check(f'контраст AA: {where}', not r, '\n    ' + '\n    '.join(r[:6]))
    return len(r)
def noscroll(pg): return pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth')

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)
    total = 0; t0 = time.time()
    # 1. все страницы × палитры × режимы × ширины
    for pal in PALETTES:
        for mode in MODES:
            for w in WIDTHS:
                ctx = b.new_context(viewport={'width': w, 'height': 800}, reduced_motion='reduce'); look(ctx, pal, mode)
                pg = page(ctx)
                for path in PAGES:
                    pg.goto(B + path); pg.wait_for_load_state('networkidle')
                    where = f'{path or "/"} [{pal}/{mode}/{w}]'
                    check(f'тема применена: {where}', pg.evaluate("[document.documentElement.dataset.palette, document.documentElement.dataset.theme].join('/')") == f'{pal}/{mode}')
                    check(f'нет горизонтальной прокрутки: {where}', noscroll(pg))
                    total += axe(pg, where)
                    if w == 360 or path in ('', 'quizzes/matn-10/'):
                        pg.screenshot(path=os.path.join(OUT, f"{(path.split('?')[0].strip('/').replace('/', '_') or 'home')}_{pal}_{mode}_{w}.png"), full_page=True)
                # учебные экраны: вопрос викторины и тест карточек
                pg.goto(B + 'quizzes/matn-10/'); pg.click('#start'); pg.wait_for_selector('#inGo', state='visible'); pg.click('#inGo'); pg.wait_for_selector('#tiles .tile')
                total += axe(pg, f'вопрос викторины [{pal}/{mode}/{w}]'); check(f'вопрос викторины без прокрутки [{pal}/{mode}/{w}]', noscroll(pg))
                pg.screenshot(path=os.path.join(OUT, f'quiz-question_{pal}_{mode}_{w}.png'))
                pg.goto(B + 'words/w100/'); pg.click('[data-tab=test]'); pg.wait_for_selector('.opt')
                total += axe(pg, f'тест карточек [{pal}/{mode}/{w}]')
                # пробный экзамен: вопрос с выбранным вариантом и отметкой, затем результаты
                pg.goto(B + 'mock/tanal/nahw/'); pg.click('#start'); pg.wait_for_selector('#o0'); pg.click('#o1'); pg.click('#markBtn'); pg.click('#next')
                total += axe(pg, f'вопрос пробного экзамена [{pal}/{mode}/{w}]'); check(f'пробный экзамен без прокрутки [{pal}/{mode}/{w}]', noscroll(pg))
                if w == 360: pg.screenshot(path=os.path.join(OUT, f'mock-question_{pal}_{mode}_{w}.png'))
                pg.click('#finishBtn'); pg.click('#cYes'); pg.wait_for_selector('#sRes .sum')
                total += axe(pg, f'результаты пробного экзамена [{pal}/{mode}/{w}]'); check(f'результаты экзамена без прокрутки [{pal}/{mode}/{w}]', noscroll(pg))
                # окна «Оформление» и «Поиск»
                pg.goto(B); pg.click('[data-open-look]'); pg.wait_for_selector('#lookDlg[open]')
                total += axe(pg, f'окно «Оформление» [{pal}/{mode}/{w}]'); check(f'«Оформление» без прокрутки [{pal}/{mode}/{w}]', noscroll(pg))
                if w == 360: pg.screenshot(path=os.path.join(OUT, f'look-panel_{pal}_{mode}_{w}.png'))
                pg.keyboard.press('Escape')
                pg.click('[data-open-search]'); pg.fill('#srchQ', 'книга'); pg.wait_for_selector('#srchRes li')
                total += axe(pg, f'окно поиска [{pal}/{mode}/{w}]')
                if w == 360: pg.screenshot(path=os.path.join(OUT, f'search_{pal}_{mode}_{w}.png'))
                ctx.close()
        print(f'палитра {pal}: готово ({int(time.time() - t0)} с)')

    # 2. тема до отрисовки, «как в системе», сохранение выбора
    ctx = b.new_context(color_scheme='dark'); pg = page(ctx)
    pg.goto(B)
    check('«как в системе» по умолчанию → тёмная при тёмной системе', pg.evaluate('document.documentElement.dataset.theme') == 'dark')
    pg.emulate_media(color_scheme='light'); pg.wait_for_timeout(100)
    check('«как в системе» следует за сменой системы', pg.evaluate('document.documentElement.dataset.theme') == 'light')
    pg.click('[data-open-look]'); pg.click('#lookDlg label:has(input[name=mode][value=dark])'); pg.click('#lookDlg label:has(input[name=palette][value=parchment])')
    pg.keyboard.press('Escape'); pg.reload()
    check('выбор сохраняется после перезагрузки', pg.evaluate("[document.documentElement.dataset.theme, document.documentElement.dataset.palette].join('/')") == 'dark/parchment')
    # до загрузки стилей: скрипт темы — в <head> раньше подключения CSS
    html = pg.content()
    check('скрипт темы стоит в <head> до стилей', html.find('unmuzaj:look') < html.find('rel="stylesheet"') or html.find('rel="stylesheet"') < 0)
    pg.emulate_media(color_scheme='light'); pg.wait_for_timeout(100)
    check('выбранная тёмная тема не меняется вслед за системой', pg.evaluate('document.documentElement.dataset.theme') == 'dark')
    pg.click('[data-open-look]'); pg.click('#lookReset'); pg.keyboard.press('Escape')
    check('«Сбросить» → бирюза', pg.evaluate('document.documentElement.dataset.palette') == 'turquoise')
    ctx.close()

    # 3. размер текста и арабского шрифта
    ctx = b.new_context(viewport={'width': 360, 'height': 800}); pg = page(ctx); pg.goto(B + 'dictionary/')
    base = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('td.ru')).fontSize)")
    ar0 = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('td.ar')).fontSize)")
    pg.click('[data-open-look]'); pg.click('#lookDlg label:has(input[name=fs][value="2"])'); pg.click('#lookDlg label:has(input[name=ar][value="2"])'); pg.keyboard.press('Escape')
    big = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('td.ru')).fontSize)")
    ar2 = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('td.ar')).fontSize)")
    check('А++ увеличивает текст', big > base * 1.2, f'{base} → {big}')
    check('арабский А++ увеличивает арабский сильнее', ar2 / ar0 > 1.6, f'{ar0} → {ar2}')
    for path in ['', 'words/w100/', 'quizzes/matn-10/', 'dictionary/', 'conjugation/kataba/']:
        pg.goto(B + path); pg.wait_for_timeout(200); check(f'крупный шрифт без прокрутки на 360 px: {path or "/"}', noscroll(pg))
    pg.screenshot(path=os.path.join(OUT, 'big-font_360.png'), full_page=True)
    pg.goto(B + 'dictionary/?q=дом'); pg.wait_for_timeout(300)
    n = pg.locator('#dict tr:visible').count()
    check('словарь на 360 px: поиск по-прежнему скрывает лишние строки', 0 < n < 10, n)
    ctx.close()

    # 4. поиск
    ctx = b.new_context(viewport={'width': 1280, 'height': 900}); pg = page(ctx); pg.goto(B + 'about/')
    pg.keyboard.press('/'); check('«/» открывает поиск', pg.is_visible('#searchDlg[open]')); pg.keyboard.press('Escape')
    check('Esc закрывает поиск', not pg.is_visible('#searchDlg[open]'))
    pg.keyboard.press('Control+k'); check('Ctrl+K открывает поиск', pg.is_visible('#searchDlg[open]'))
    def results(q):
        pg.fill('#srchQ', ''); pg.fill('#srchQ', q); pg.wait_for_timeout(700); return pg.inner_text('#srchRes')
    r = results('книга'); check('«книга» находит слово', 'كِتَابٌ' in r, r[:200])
    r = results('كتاب'); check('«كتاب» (без огласовок) находит слово', 'كِتَابٌ' in r, r[:200])
    r = results('كِتَابٌ'); check('«كِتَابٌ» (с огласовками) находит слово', 'книга' in r, r[:200])
    r = results('изафа'); check('«изафа» находит викторину в группе «Задания»', 'задания' in r.lower() and 'Изафа' in r, r[:300])
    r = results('صديقي'); check('арабский заголовок урока без огласовок находит урок 10', 'Урок 10' in r, r[:300])
    pg.keyboard.press('ArrowDown')
    with pg.expect_navigation(): pg.keyboard.press('Enter')
    check('↓ и Enter открывают результат', any(x in pg.url for x in ('/quizzes/', '/dictionary/', '/words/')), pg.url)
    pg.goto(B + 'dictionary/?q=' + 'книга'); pg.wait_for_timeout(300)
    check('словарь открывается с запросом', pg.locator('#dict tr:not([hidden])').count() >= 1 and pg.locator('#dict tr:not([hidden])').count() < 20)
    ctx.close()

    # 5. меню и крошки
    ctx = b.new_context(viewport={'width': 1280, 'height': 900}); pg = page(ctx); pg.goto(B + 'quizzes/izafa/')
    check('крошки: Главная › Викторины › Изафа', 'Главная' in pg.inner_text('.crumbs') and 'Викторины' in pg.inner_text('.crumbs'))
    pg.goto(B + 'quizzes/mock-ekzamen/'); check('экзамен в крошках — раздел «Тесты»', 'Тесты' in pg.inner_text('.crumbs'))
    check('текущая группа подсвечена', pg.locator('.grp-btn.current').inner_text().startswith('Задания'))
    pg.click('.grp-btn >> nth=0'); check('группа раскрывается', pg.is_visible('#g-learn a'))
    pg.keyboard.press('Escape'); check('Esc закрывает группу', not pg.is_visible('#g-learn a'))
    pg.focus('.grp-btn >> nth=1'); pg.keyboard.press('Enter'); pg.keyboard.press('Tab')
    with pg.expect_navigation(): pg.keyboard.press('Enter')
    check('меню работает с клавиатуры', pg.url.endswith('/quizzes/'), pg.url)
    ctx.close()
    ctx = b.new_context(viewport={'width': 360, 'height': 800}, is_mobile=True, has_touch=True); pg = page(ctx); pg.goto(B)
    check('на телефоне лупа и «Aa» видны без меню', pg.is_visible('[data-open-search]') and pg.is_visible('[data-open-look]'))
    pg.click('.menu-btn'); check('мобильное меню: все разделы', pg.locator('#site-nav a:visible').count() >= 9)
    pg.screenshot(path=os.path.join(OUT, 'mobile-menu_360.png'))
    with pg.expect_navigation(): pg.click('#site-nav a:has-text("Словарь")')
    check('мобильное меню ведёт в раздел', pg.url.endswith('/dictionary/'))
    ctx.close()
    b.close()

print(f'нарушений контраста: {total}')
print('ERRORS', errs[:20])
print('FAILED', len(fails), fails[:40])
sys.exit(1 if fails or errs else 0)
