# Языки интерфейса (CLAUDE.md §15.1): русский /…, узбекский /uz/…, английский /en/….
# Для каждой страницы на uz и en (ширина 360 и 1280):
#  - <html lang>, hreflang-ссылки на все три версии и x-default;
#  - весь видимый русский текст — только внутри элементов с lang="ru" (непереведённые материалы с пометкой);
#    всё остальное — из словаря (src/i18n/uz.ts, en.ts);
#  - внутренние ссылки ведут на тот же язык; нет горизонтальной прокрутки; нет ошибок в консоли.
# Плюс: переключатель в шапке и подвале, выбор запоминается (русская ссылка → /uz/…), ?параметры сохраняются;
# карточки и викторина на uz с пометкой «(rus tilida)»; поиск на uz; контраст AA меню языков и пометок; 404 на языке адреса;
# русская версия не изменилась.
# Подготовка: npm run build; раздать dist в корне на :4322 (см. tests/README.md). Запуск: python3 tests/e2e/i18n.py
import os, re
from playwright.sync_api import sync_playwright
B = 'http://localhost:4322/'
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PAGES = ['', 'words/', 'words/w100/', 'dictionary/', 'conjugation/', 'conjugation/kataba/', 'conjugation/jalasa/', 'quizzes/', 'quizzes/matn-10/', 'quizzes/izafa/', 'quizzes/mock-ekzamen/', 'tests/', 'mock/', 'mock/tanal/nahw/', 'exercises/',
         'exercises/predlogi/', 'grammar/', 'texts/', 'courses/', 'courses/tsu-2-sem1/', 'login/', 'me/', 'teacher/', 'about/', 'privacy/',
         'board/matn-10/?class=XXXXXX']
MARK = {'uz': '(rus tilida)', 'en': '(in Russian)'}

errs, fails = [], []
def check(name, cond, info=''):
    if not cond:
        print('FAIL', name, info); fails.append(name)
def page(ctx):
    ctx.route('**/*.supabase.co/**', lambda r: r.abort())  # база не нужна: проверяется только интерфейс
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(f'{pg.url}: {e}'))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and 'ERR_' not in m.text and errs.append(f'{pg.url}: {m.text}'))
    return pg

# видимый текст с кириллицей вне [lang="ru"]
UNMARKED = r"""() => {
  const out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode, el = n.parentElement;
    if (!/[Ѐ-ӿ]/.test(n.data) || !el || el.closest('script,style,noscript,template')) continue;
    if (el.closest('[lang]')?.getAttribute('lang') === 'ru') continue;
    if (!el.checkVisibility || !el.checkVisibility()) continue;
    out.push(n.data.trim().slice(0, 80));
  }
  // подписи (aria-label, title, placeholder) тоже из словаря
  document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(e => {
    for (const a of ['aria-label', 'title', 'placeholder']) { const v = e.getAttribute(a); if (v && /[Ѐ-ӿ]/.test(v)) out.push(`${a}="${v.slice(0, 60)}"`); }
  });
  return out;
}"""
# внутренние ссылки не на своём языке (кроме переключателя языка и прежних страниц v1/)
FOREIGN = r"""(loc) => [...document.querySelectorAll('a[href]:not([data-set-lang])')].map(a => a.getAttribute('href'))
  .filter(h => h.startsWith('/') && !h.startsWith('//') && !/^\/(v1\/|pagefind\/|sitemap|favicon)/.test(h))
  .filter(h => !h.startsWith(`/${loc}/`))
  .filter((h, i, arr) => arr.indexOf(h) === i)"""
FOREIGN_SWITCH = "[...document.querySelectorAll('a[data-set-lang]')].map(a => a.getAttribute('href'))"

def nav(pg, url):
    pg.goto(url); pg.wait_for_load_state('networkidle')

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)

    # 1. все страницы на uz и en
    for loc in ['uz', 'en']:
        for w in [360, 1280]:
            ctx = b.new_context(viewport={'width': w, 'height': 800}, reduced_motion='reduce'); pg = page(ctx)
            for path in PAGES:
                nav(pg, B + loc + '/' + path)
                where = f'/{loc}/{path} [{w}]'
                check(f'lang: {where}', pg.evaluate('document.documentElement.lang') == loc)
                bare = path.split('?')[0]
                alts = pg.evaluate("Object.fromEntries([...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l => [l.hreflang, new URL(l.href).pathname]))")
                check(f'hreflang: {where}', alts == {'ru': f'/{bare}', 'uz': f'/uz/{bare}', 'en': f'/en/{bare}', 'x-default': f'/{bare}'}, str(alts))
                um = pg.evaluate(UNMARKED)
                check(f'нет русского текста вне lang="ru": {where}', not um, '\n    ' + '\n    '.join(um[:8]))
                fl = pg.evaluate(FOREIGN, loc)
                check(f'ссылки на своём языке: {where}', not fl, str(fl[:6]))
                check(f'нет горизонтальной прокрутки: {where}', pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
                if 'board/' not in path:
                    sw = pg.evaluate(FOREIGN_SWITCH)
                    check(f'переключатель ведёт на эту же страницу: {where}', f'/{bare}' in sw and f'/uz/{bare}' in sw and f'/en/{bare}' in sw, str(sw))
            ctx.close()

    # 2. шапка на 360 px: переключатель виден и помещается
    ctx = b.new_context(viewport={'width': 360, 'height': 740}); pg = page(ctx)
    for loc in ['', 'uz/', 'en/']:
        nav(pg, B + loc)
        box = pg.locator('.lang-btn').bounding_box(); logo = pg.locator('.logo').bounding_box(); menu = pg.locator('.menu-btn').bounding_box()
        check(f'шапка 360: переключатель виден /{loc}', box and box['width'] >= 44 and box['height'] >= 44 and menu['x'] + menu['width'] <= 360, str(box))
        check(f'шапка 360: логотип не перекрыт /{loc}', logo['x'] + logo['width'] <= box['x'], f'{logo} {box}')
    pg.screenshot(path=os.path.join(ROOT, 'test-results', 'i18n_en_360.png'))

    # 3. переключение и запоминание выбора
    nav(pg, B)
    check('по умолчанию — русский', pg.evaluate('document.documentElement.lang') == 'ru')
    pg.click('.lang-btn'); check('меню языков открылось', pg.locator('#langMenu').is_visible())
    pg.keyboard.press('Escape'); check('Esc закрывает меню языков', not pg.locator('#langMenu').is_visible())
    pg.click('.lang-btn'); pg.click('#langMenu a[data-set-lang=uz]'); pg.wait_for_load_state('networkidle')
    check('переключено на uz', pg.url == B + 'uz/' and pg.evaluate('document.documentElement.lang') == 'uz', pg.url)
    check('выбор сохранён', pg.evaluate("localStorage.getItem('unmuzaj:lang')") == 'uz')
    check('шапка по-узбекски', pg.locator('.nav-login').inner_text().strip() == 'Kirish')
    nav(pg, B + 'words/w100/')
    check('русская ссылка открывается по-узбекски', pg.url == B + 'uz/words/w100/', pg.url)
    nav(pg, B + 'dictionary/?q=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0')
    check('параметры адреса сохраняются при переходе', pg.url == B + 'uz/dictionary/?q=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0', pg.url)
    check('словарь нашёл слово на uz', 'Topildi' in pg.locator('#cnt').inner_text(), pg.locator('#cnt').inner_text())
    # переключатель в подвале
    pg.click('footer a[data-set-lang=en]'); pg.wait_for_load_state('networkidle')
    check('подвал: переход на en с параметрами', pg.url == B + 'en/dictionary/?q=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0', pg.url)
    check('en сохранён', pg.evaluate("localStorage.getItem('unmuzaj:lang')") == 'en')
    pg.click('footer a[data-set-lang=ru]'); pg.wait_for_load_state('networkidle')
    check('назад на русский', pg.url.startswith(B + 'dictionary/') and pg.evaluate('document.documentElement.lang') == 'ru', pg.url)
    nav(pg, B + 'uz/')
    check('после выбора ru узбекская ссылка → русская', pg.url == B, pg.url)
    ctx.close()

    # 4. карточки и викторина на uz: материал по-русски с пометкой
    ctx = b.new_context(viewport={'width': 360, 'height': 740}, reduced_motion='reduce'); pg = page(ctx)
    nav(pg, B + 'uz/words/w100/'); pg.wait_for_selector('#stats .bar'); pg.click('[data-tab=cards]')
    check('карточки: кнопки по-узбекски', pg.locator('#yes').inner_text() == 'Bilaman' and pg.locator('#no').inner_text() == 'Bilmayman')
    pg.click('[data-dir="2"]')  # перевод → арабский: перевод на лицевой стороне
    check('карточка: перевод с пометкой (rus tilida)', MARK['uz'] in pg.locator('#card').inner_text() and pg.locator('#card .ru[lang=ru]').count() == 1, pg.locator('#card').inner_text())
    pg.click('[data-tab=test]'); pg.wait_for_selector('#test .opt')
    check('тест: вопрос по-узбекски', pg.locator('#test .hint').first.inner_text().startswith('Savol 1/20'), pg.locator('#test .hint').first.inner_text())
    nav(pg, B + 'uz/quizzes/matn-10/')
    check('викторина: пометка «вопросы по-русски»', pg.locator('.ru-note').count() == 1)
    pg.click('#start'); pg.wait_for_selector('#inGo', state='visible')
    check('викторина: часть по-узбекски', 'Qism 1/4' in pg.locator('#inChip').inner_text(), pg.locator('#inChip').inner_text())
    pg.click('#inGo'); pg.wait_for_selector('#tiles .tile'); pg.locator('#tiles .tile').first.click()
    pg.wait_for_function("document.getElementById('fb').textContent.length > 0")
    fb = pg.locator('#fb').inner_text(); ex = pg.locator('#ex').inner_text()
    check('викторина: ответ по-узбекски', 'Toʻgʻri' in fb or 'Notoʻgʻri' in fb, fb)
    check('викторина: пояснение с пометкой (rus tilida)', MARK['uz'] in ex, ex)
    um = pg.evaluate(UNMARKED); check('викторина: нет русского вне lang="ru"', not um, str(um[:5]))
    nav(pg, B + 'uz/quizzes/izafa/')
    pg.click('#start'); pg.wait_for_selector('#tiles .tile')
    check('вопрос по-русски: пометка', MARK['uz'] in pg.locator('#qt').inner_text(), pg.locator('#qt').inner_text())
    um = pg.evaluate(UNMARKED); check('вопрос izafa: нет русского вне lang="ru"', not um, str(um[:5]))
    ctx.close()

    # 5. поиск на uz: слова и ссылки — на узбекской версии
    ctx = b.new_context(viewport={'width': 1280, 'height': 800}); pg = page(ctx)
    nav(pg, B + 'uz/')
    pg.keyboard.press('/'); pg.fill('#srchQ', 'كتاب'); pg.wait_for_selector('#srchRes a')
    hrefs = pg.evaluate("[...document.querySelectorAll('#srchRes a')].map(a => new URL(a.href).pathname)")
    check('поиск uz: ссылки на /uz/', hrefs and all(h.startswith('/uz/') for h in hrefs), str(hrefs[:5]))
    check('поиск uz: заголовок группы по-узбекски', 'Soʻzlar' in pg.locator('#srchRes h3').first.text_content())
    pg.fill('#srchQ', 'izofa'); pg.wait_for_timeout(600)
    check('поиск uz: Pagefind ищет по узбекским страницам', pg.locator('#srchRes').inner_text() != '')
    ctx.close()

    # 6. контраст AA (axe) нового: меню языков, пометка «(rus tilida)» на учебном фоне — 4 палитры × 2 режима
    AXE = os.path.join(ROOT, 'node_modules', 'axe-core', 'axe.min.js')
    for pal in ['turquoise', 'lapis', 'parchment', 'contrast']:
        for mode in ['light', 'dark']:
            ctx = b.new_context(viewport={'width': 360, 'height': 800}, reduced_motion='reduce')
            ctx.add_init_script(f"try{{localStorage.setItem('unmuzaj:look', JSON.stringify({{mode:'{mode}', palette:'{pal}'}}))}}catch(e){{}}")
            pg = page(ctx)
            for path, act in [('uz/words/w100/', "document.querySelector('[data-tab=cards]').click(); document.querySelector('[data-dir=\"2\"]').click()"), ('uz/', "document.querySelector('.lang-btn').click()"), ('en/quizzes/izafa/', None)]:
                nav(pg, B + path)
                if act: pg.evaluate(act); pg.wait_for_timeout(100)
                pg.add_script_tag(path=AXE)
                v = pg.evaluate("""async () => { const r = await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
                  return r.violations.flatMap(v => v.nodes.map(n => n.target.join(' ') + ' — ' + (n.any[0]?.message || '').slice(0, 120))); }""")
                check(f'контраст AA: /{path} [{pal}/{mode}]', not v, '\n    ' + '\n    '.join(v[:5]))
            ctx.close()

    # 7. 404 на языке адреса; русская версия без изменений
    ctx = b.new_context(viewport={'width': 360, 'height': 740}); pg = page(ctx)
    pg.route('**/uz/nope/', lambda r: r.fulfill(path=os.path.join(ROOT, 'dist', '404.html'), status=404))
    pg.goto(B + 'uz/nope/')
    check('404 по-узбекски', pg.locator('[data-nf=uz]').is_visible() and pg.evaluate('document.documentElement.lang') == 'uz' and 'yoʻq' in pg.locator('h1:visible').inner_text())
    nav(pg, B)
    check('ru: заголовок и меню по-русски', pg.locator('h1').inner_text() == 'Арабский язык — с первого слова' and pg.locator('.nav-login').inner_text().strip() == 'Войти')
    check('ru: нет пометок «(rus tilida)»', pg.locator('.ru-mark:not(:empty)').count() == 0 and pg.locator('body [lang=ru]:not([data-set-lang])').count() == 0)
    ctx.close()
    b.close()

print('\nОшибки в консоли:', errs[:10] if errs else 'нет')
if errs: fails.append('console')
print('ИТОГ:', 'OK' if not fails else f'{len(fails)} проблем')
raise SystemExit(1 if fails else 0)
