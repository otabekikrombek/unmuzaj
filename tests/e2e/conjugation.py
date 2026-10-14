# Раздел «Спряжение» (CLAUDE.md §13.2): страницы глаголов, список, поиск, ссылки из словаря, «Любой глагол».
# Подготовка: npm run build; раздать dist как /unmuzaj/ на :4322 (см. tests/README.md).
# «Любой глагол» (Pyodide) проверяется, только если задан PYODIDE_DIR — папка с файлами Pyodide 314.0.7
# (npm-пакет pyodide + колёса micropip и six): тогда запросы к cdn.jsdelivr.net отдаются из неё,
# а пакеты Qutrub скачиваются с PyPI. Запуск: python3 tests/e2e/conjugation.py
import hashlib, json, os, sys, urllib.request
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
PYODIDE_DIR = os.environ.get('PYODIDE_DIR')
fails, errs = [], []

def check(name, cond, info=''):
    print('ok  ' if cond else 'FAIL', name, '' if cond else info)
    if not cond: fails.append(name)

def page(ctx):
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(f'{pg.url}: {e}'))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and errs.append(f'{pg.url}: {m.text}'))
    return pg

noscroll = lambda pg: pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
# контрольные глаголы задания: огласовка настоящего-будущего времени
CONTROL = {'kataba': 'يَكْتُبُ', 'jalasa': 'يَجْلِسُ', 'fataha': 'يَفْتَحُ', 'qaala': 'يَقُولُ', 'baa': 'يَبِيعُ', 'rama': 'يَرْمِي',
           'daa': 'يَدْعُو', 'waada': 'يَعِدُ', 'saala': 'يَسْأَلُ', 'akhadha': 'يَأْخُذُ', 'madda': 'يَمُدُّ'}

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)

    # 1. страница глагола на телефоне
    ctx = b.new_context(viewport={'width': 360, 'height': 800}); pg = page(ctx)
    pg.goto(B + 'conjugation/kataba/'); pg.wait_for_load_state('networkidle')
    check('заголовок: كَتَبَ – يَكْتُبُ', 'كَتَبَ – يَكْتُبُ' in pg.inner_text('h1'), pg.inner_text('h1'))
    rows = pg.locator('.cj-multi').first.locator('tbody tr')
    check('13 лиц в таблице', rows.count() == 13, rows.count())
    check('прошедшее: كَتَبْتُ видно', pg.locator('td.c-past', has_text='كَتَبْتُ').first.is_visible())
    check('на телефоне колонка изъявительного скрыта', not pg.locator('td.c-present').first.is_visible())
    pg.click('.cj-switch button[data-col=present]')
    check('кнопка «Изъяв.» показывает يَكْتُبُ', pg.locator('td.c-present', has_text='يَكْتُبُ').first.is_visible())
    check('…и скрывает прошедшее', not pg.locator('td.c-past').first.is_visible())
    check('повелительная форма: اُكْتُبْ', 'اُكْتُبْ' in pg.inner_text('#cj'))
    check('страдательный залог: كُتِبَ', 'كُتِبَ' in pg.inner_text('#cj'))
    check('предупреждение «построена автоматически (Qutrub)»', 'Qutrub' in pg.inner_text('.cj-notice') and 'не проверены' in pg.inner_text('.cj-notice'))
    check('кнопка «Печать»', pg.is_visible('#printBtn'))
    check('ссылка на исходный код Qutrub', pg.locator('a[href="https://github.com/linuxscout/qutrub"]').count() == 1)
    check('нет горизонтальной прокрутки (360 px)', noscroll(pg))
    # печать: все колонки видны
    pg.emulate_media(media='print')
    check('при печати видны все колонки', pg.locator('td.c-past').first.is_visible() and pg.locator('td.c-jussive').first.is_visible())
    check('при печати нет шапки сайта', not pg.is_visible('.site-head'))
    pg.emulate_media(media='screen')

    # 2. контрольные глаголы
    for key, present in CONTROL.items():
        pg.goto(B + f'conjugation/{key}/')
        check(f'{key}: открывается, настоящее-будущее {present}', present in pg.inner_text('h1'), pg.inner_text('h1'))
    pg.goto(B + 'conjugation/jalasa/')
    check('непереходный جَلَسَ: только безличный страдательный (جُلِسَ – يُجْلَسُ)', 'جُلِسَ' in pg.inner_text('.cj-impersonal') and pg.locator('td.c-passive_past').count() == 0)
    pg.goto(B + 'conjugation/kaana/')
    check('спорный глагол: блок «что проверить»', pg.locator('details.doubt').count() == 1)

    # 3. крупный шрифт
    ctx.add_init_script("localStorage.setItem('unmuzaj:look', JSON.stringify({mode:'light', palette:'turquoise', fs:2, ar:2}))")
    for path in ['conjugation/kataba/', 'conjugation/', 'conjugation/madda/']:
        pg.goto(B + path); pg.wait_for_load_state('networkidle')
        check(f'А++ без горизонтальной прокрутки: {path}', noscroll(pg))
    ctx.close()

    # 4. список: поиск, типы, переход с главной
    ctx = b.new_context(viewport={'width': 1280, 'height': 900}); pg = page(ctx)
    pg.goto(B + 'conjugation/')
    total = pg.locator('#verbs li').count()
    check('в списке около 100 глаголов', total >= 100, total)
    def visible(): return pg.locator('#verbs li:visible').count()
    pg.fill('#vq', 'писать'); check('поиск «писать» → كَتَبَ', visible() >= 1 and pg.locator('#verbs li:visible', has_text='كَتَبَ').count() == 1)
    pg.fill('#vq', 'يكتب'); check('поиск «يكتب» (без огласовок) → كَتَبَ', pg.locator('#verbs li:visible', has_text='كَتَبَ').count() == 1)
    pg.fill('#vq', 'كَتَبَ'); check('поиск «كَتَبَ» (с огласовками)', pg.locator('#verbs li:visible', has_text='كَتَبَ').count() == 1)
    pg.fill('#vq', 'ыыыы'); check('ничего не найдено → подсказка про «Любой глагол»', pg.is_visible('#vnone'))
    pg.fill('#vq', '')
    pg.click('.types button[data-type=hollow]')
    n = visible(); check('фильтр «пустые»', 5 < n < total and pg.locator('#verbs li:visible', has_text='قَالَ').count() == 1, n)
    pg.click('.types button[data-type=""]')
    pg.goto(B)
    pg.fill('#cv', 'كتب'); pg.click('.cform button')
    pg.wait_for_url('**/conjugation/?v=*')
    check('главная → /conjugation/?v=كتب: поиск заполнен', pg.input_value('#vq') == 'كتب' and pg.locator('#verbs li:visible', has_text='كَتَبَ').count() == 1)
    check('пункт «Спряжение» в меню', pg.locator('.site-nav a[href$="/conjugation/"]').count() >= 1)

    # 5. словарь и поиск по сайту
    pg.goto(B + 'dictionary/')
    link = pg.locator('tr', has_text='напиши').locator('a.cj-link')
    check('словарь: у «اُكْتُبْ» ссылка на спряжение كَتَبَ', link.count() == 1 and link.get_attribute('href').endswith('/conjugation/kataba/'))
    check('словарь: у имени ذَهَبٌ «золото» ссылки на ذَهَبَ нет', pg.locator('tr', has_text='золото').locator('a.cj-link').count() == 0)
    n = pg.locator('a.cj-link').count()
    check('словарь: ссылки только у глаголов (اُكْتُبْ، اِقْرَأْ، ضَعْ، اِمْلَأْ)', n == 4, n)
    pg.click('[data-open-search]'); pg.fill('#srchQ', 'يكتب'); pg.wait_for_timeout(800)
    check('поиск по сайту: «يكتب» → страница спряжения', pg.locator('#srchRes a[href$="/conjugation/kataba/"]').count() >= 1, pg.inner_text('#srchRes')[:200])
    ctx.close()

    # 6. «Любой глагол» (Pyodide + Qutrub в браузере)
    if PYODIDE_DIR:
        ctx = b.new_context(viewport={'width': 360, 'height': 800}); pg = page(ctx)
        def cdn(route):
            name = route.request.url.split('/full/', 1)[1].split('?')[0]
            path = os.path.join(PYODIDE_DIR, name)
            if name == 'pyodide-lock.json':
                # колёса micropip и six взяты с PyPI, а не из сборки Pyodide: пересчитываем их хэши (проверка SRI)
                lock = json.load(open(path))
                for pkg in lock['packages'].values():
                    f = os.path.join(PYODIDE_DIR, pkg['file_name'])
                    if os.path.exists(f): pkg['sha256'] = hashlib.sha256(open(f, 'rb').read()).hexdigest()
                route.fulfill(body=json.dumps(lock), headers={'content-type': 'application/json', 'access-control-allow-origin': '*'})
            elif os.path.exists(path): route.fulfill(path=path, headers={'access-control-allow-origin': '*'})
            else: route.fulfill(status=404, body='')
        def pypi(route):
            req = urllib.request.Request(route.request.url, headers={'Accept': route.request.headers.get('accept', '*/*')})
            with urllib.request.urlopen(req, timeout=60) as r:
                route.fulfill(status=r.status, body=r.read(), headers={'content-type': r.headers.get('content-type', 'application/octet-stream'), 'access-control-allow-origin': '*'})
        ctx.route('https://cdn.jsdelivr.net/pyodide/**', cdn)
        ctx.route('https://pypi.org/**', pypi)
        ctx.route('https://files.pythonhosted.org/**', pypi)
        pg.goto(B + 'conjugation/')
        check('до нажатия Pyodide не загружается', not any('pyodide' in r for r in pg.evaluate('performance.getEntriesByType("resource").map(e => e.name)')))
        pg.click('#anyLoad')
        pg.wait_for_selector('#anyForm:not([hidden])', timeout=180000)
        check('движок загрузился, форма видна', pg.is_visible('#anyVerb'))
        pg.fill('#anyVerb', 'كتب'); pg.wait_for_timeout(600)
        check('подсказка из словаря Qutrub для «كتب»', pg.locator('#anyDict button').count() >= 1, pg.inner_text('#anyDict'))
        pg.click('#anyForm button[type=submit]')
        check('без огласовок — просьба поставить огласовки', 'огласовк' in pg.inner_text('#anyErr'), pg.inner_text('#anyErr'))
        pg.fill('#anyVerb', 'نَصَرَ'); pg.check('input[name=bab][value="ضمة"]'); pg.click('#anyForm button[type=submit]')
        pg.wait_for_selector('#anyOut table')
        out = pg.inner_text('#anyOut')
        check('نَصَرَ + дамма → يَنْصُرُ, نَصَرْتُ', 'يَنْصُرُ' in out and 'نَصَرْتُ' in out, out[:200])
        check('«Любой глагол»: переключатель колонок работает', pg.locator('#anyOut .cj-switch:not([hidden])').count() >= 1)
        check('«Любой глагол»: без горизонтальной прокрутки', noscroll(pg))
        pg.fill('#anyVerb', 'كَتَبَ'); pg.check('input[name=bab][value="ضمة"]'); pg.click('#anyForm button[type=submit]')
        pg.wait_for_selector('#anyOut table')
        check('глагол из списка → ссылка на его страницу', pg.locator('#anyOut a[href$="/conjugation/kataba/"]').count() == 1)
        ctx.close()
    else:
        print('skip «Любой глагол»: не задан PYODIDE_DIR')
    b.close()

check('нет ошибок в консоли', not errs, '\n  ' + '\n  '.join(errs[:10]))
print(f'\n{"ВСЁ ХОРОШО" if not fails else "ОШИБКИ: " + str(len(fails))}')
sys.exit(1 if fails else 0)
