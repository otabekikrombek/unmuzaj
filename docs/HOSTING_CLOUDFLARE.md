# Переезд allimni.net на Cloudflare Pages — пошаговая инструкция

> Подготовлено на этапе E1 (15.10.2026). **DNS не переключён**: всё ниже вы делаете сами, по шагам. Ничего не удаляется. Откат — 5 минут (шаг 7).

## Зачем

Сейчас сайт раздаёт **GitHub Pages**. Проверено 15.10.2026 командой `curl -I https://allimni.net/`. Ответ приходит от `server: GitHub.com` через CDN Fastly, у всех файлов `cache-control: max-age=600`. Заголовков безопасности нет ни одного: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.

У GitHub Pages два ограничения, и обойти их нельзя:

1. **Нельзя задать свои HTTP-заголовки.** Файл настроек для этого не предусмотрен. `<meta http-equiv>` заменяет заголовки лишь частично: через него не работают HSTS, `frame-ancestors` и режим «Report-Only» для CSP.
2. **Нельзя сделать свой 301-редирект.** GitHub Pages умеет только три встроенных перенаправления: `http → https`, `/words → /words/` и `otabekikrombek.github.io/unmuzaj/… → allimni.net/…`. Для своих правил есть только HTML-страница с `<meta refresh>`, а это не 301: поисковики считают её слабее. Правило 3 («изменённый адрес — это 301») на GitHub Pages выполнить нельзя.

**Cloudflare Pages** читает из сборки два файла:

- `_headers` — заголовки. Его создаёт `scripts/security/headers.mjs` при `npm run build`.
- `_redirects` — редиректы. Он лежит в `public/_redirects`, сейчас в нём только пояснения.

Тариф бесплатный: 500 сборок в месяц, до 20 000 файлов (у нас ~920), файл до 25 МиБ (наш самый большой меньше 1 МиБ), трафик без ограничений. DNS домена уже в Cloudflare.

> Cloudflare сейчас советует для новых проектов Workers (Static Assets), а не Pages. Pages по-прежнему поддерживается, файлы `_headers` и `_redirects` работают в обоих. Мы берём Pages, как вы просили: там проще подключить GitHub и получить превью каждого PR.

## Что уже готово в репозитории

| Файл | Что делает |
|---|---|
| `scripts/security/headers.mjs` | При каждой сборке создаёт `dist/_headers`: HSTS, CSP (Report-Only), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, кэш на год для `/_astro/*`, `noindex` для служебных страниц и для адресов `*.pages.dev` |
| `public/_redirects` | Место для будущих 301-редиректов; сейчас правил нет — ни один адрес не меняется |
| `.node-version` | Версия Node.js (22) для сборки на Cloudflare |

Проверено локально эмулятором Cloudflare Pages (`wrangler pages dev dist`, тот же разбор `_headers`, что и в Cloudflare):

- заголовки на месте;
- у `/conjugation/` и `/v1/*` своя политика CSP: общая снимается строкой `! заголовок`;
- в браузере на 18 страницах нет ни одного нарушения CSP;
- поиск (Pagefind) работает.

## Шаг 1. Создать проект Pages (5 минут, сайт не меняется)

1. Войдите в Cloudflare → слева **Workers & Pages** → **Create** → вкладка **Pages** → **Connect to Git**.
2. Разрешите доступ к GitHub. Лучше дать доступ только к репозиторию `otabekikrombek/unmuzaj`. Выберите его.
3. Настройки сборки:
   - **Project name:** `allimni` (технический адрес будет `allimni.pages.dev`).
   - **Production branch:** `main`.
   - **Framework preset:** `Astro`.
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** ничего добавлять не нужно. Адрес Supabase и публичный ключ `anon` уже в `src/config/site.ts`. Если Cloudflare не увидит файл `.node-version`, добавьте `NODE_VERSION` = `22`.
   - **Секретов не добавлять.** Сайту они не нужны. Ключ `service_role` никогда не кладите ни в Cloudflare, ни в GitHub.
4. **Save and Deploy.** Через 2–3 минуты сайт откроется на `https://allimni.pages.dev`. Поисковики его не проиндексируют: там стоит заголовок `X-Robots-Tag: noindex`, а `canonical` указывает на allimni.net.

## Шаг 2. Отключить то, что Cloudflare «дописывает» в страницы

Эти функции зоны вмешиваются в HTML. Они нарушают правило «без трекеров и чужих скриптов» и ломают CSP.

- **Scrape Shield → Email Address Obfuscation → Off.** Иначе Cloudflare заменит адрес в подвале на «[email protected]» и добавит свой скрипт.
- **Speed → Optimization → Rocket Loader → Off.**
- **Analytics → Web Analytics:** не включать для allimni.net. Это внешний скрипт, а у нас «без трекеров».
- **SSL/TLS → Edge Certificates:** **Always Use HTTPS → On**, **Minimum TLS Version → 1.2**. Отдельный HSTS там не включать: он уже в `_headers`.

## Шаг 3. Проверить превью (до переключения домена)

Каждый PR и каждая ветка получают своё превью: `https://<ветка>.allimni.pages.dev`. Ссылку Cloudflare пишет в PR.

Откройте в обычном браузере:

1. Главную, слова, викторину, словарь, спряжение (кнопку «Любой глагол»), поиск (лупа). Всё должно выглядеть и работать как на allimni.net.
2. Нажмите F12 → **Console**. Строк `[Report Only] Refused to …` быть не должно. Если они есть, пришлите снимок Claude: это значит, что CSP пока нельзя включать строго.

Проверка заголовков (Claude сделает это сам, если вы пришлёте адрес превью):

```bash
curl -I https://<ветка>.allimni.pages.dev/
# ожидается: strict-transport-security, content-security-policy-report-only, x-content-type-options: nosniff,
#            x-frame-options: DENY, referrer-policy, permissions-policy, x-robots-tag: noindex (только на *.pages.dev)
curl -I https://<ветка>.allimni.pages.dev/_astro/<любой файл>.css   # cache-control: public, max-age=31536000, immutable
curl -I https://<ветка>.allimni.pages.dev/words                       # 308 → /words/ (как и сейчас, один шаг)
```

## Шаг 4. Переключить домен без простоя

Перед началом **сохраните копию DNS-записей**: в Cloudflare, **DNS → Records → Export** (и при желании снимок экрана). **TXT-запись `google-site-verification` не удалять** — это подтверждение Search Console. Сейчас там (по скриншотам от 2026-10-19):

- 4 записи `A` для `allimni.net`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
- `CNAME` `www` → `otabekikrombek.github.io`;
- `TXT` `google-site-verification` (не трогать).

У всех серое облако («DNS only»).

1. Pages → проект `allimni` → **Custom domains** → **Set up a custom domain** → `allimni.net` → **Continue**.
2. Cloudflare создаст запись `CNAME allimni.net → allimni.pages.dev` с оранжевым облаком.
   - Если он предложит заменить старые записи, подтвердите.
   - Если напишет, что запись уже существует: **DNS → Records** → удалите 4 записи `A` для `allimni.net` (они есть на снимке) и сразу повторите пункт 1. Разрыв — секунды: DNS-кэши ещё несколько минут ведут на GitHub Pages, а там сайт работает.
3. Повторите для `www.allimni.net`. Затем **Rules → Redirect Rules → Create rule → шаблон «Redirect from WWW to Root»**: 301, путь и параметры сохраняются.
4. Подождите 5–15 минут, пока статус домена станет **Active**.

Простоя не будет. Пока обновляются DNS-кэши, часть посетителей ещё попадает на GitHub Pages, часть — уже на Cloudflare. Обе копии собраны из одного `main` и одинаковы.

**Supabase менять не нужно**: адрес сайта тот же (`https://allimni.net`).

## Шаг 5. Проверить боевой адрес

```bash
curl -I https://allimni.net/        # server: cloudflare + все заголовки из шага 3, без x-robots-tag
curl -I http://allimni.net/         # 301 → https://allimni.net/ (один шаг)
curl -I https://www.allimni.net/    # 301 → https://allimni.net/
curl -I https://allimni.net/nope/   # 404 (наша страница «не найдено»)
```

Затем зайдите учеником тестового класса и учителем: вход, карточки, викторина, панель учителя, печать ПИН.

## Шаг 6. Что остаётся на GitHub

- **GitHub Pages не выключать** и `deploy.yml` не удалять. Пока в настройках Pages указан домен `allimni.net`, GitHub перенаправляет старые ссылки `otabekikrombek.github.io/unmuzaj/…` на `allimni.net/…`. Как только Pages выключат, старые ссылки сломаются.
- GitHub может написать «DNS check unsuccessful» — это ожидаемо: домен теперь указывает на Cloudflare. **Через 1–2 дня проверьте**, что старый адрес по-прежнему перенаправляет. Если GitHub перестанет это делать, Claude сделает отдельную ветку `gh-pages` со страницами-перенаправлениями.
- Подтвердите домен в GitHub: аватар → **Settings → Pages → Add a domain** → `allimni.net`. GitHub даст TXT-запись, добавьте её в Cloudflare DNS. После этого никто другой не сможет привязать allimni.net к своему GitHub Pages.

## Шаг 7. Откат (если что-то пошло не так)

1. Pages → **Custom domains** → удалить `allimni.net` и `www.allimni.net`.
2. DNS → вернуть 4 записи `A` (`185.199.108–111.153`) и `CNAME www → otabekikrombek.github.io`, серое облако.

Через 5–15 минут сайт снова на GitHub Pages. Он всё это время обновлялся из `main` и актуален.

## Особенности Cloudflare Pages (проверено эмулятором)

- `/words` → **308** на `/words/`. На GitHub Pages было 301; Google считает 308 тем же постоянным редиректом.
- `/index.html` → 308 на `/`.
- **`.html` отрезается:** `/v1/dop_uprazhneniya.html` → 308 на `/v1/dop_uprazhneniya`. Ссылки на старые упражнения сработают через один шаг. Когда упражнения переедут из `public/v1/` (этап 5), вопрос исчезнет.
- Несуществующий адрес → наша `404.html` со статусом 404.
- Заголовки из `_headers` добавляются и к ответам-редиректам.
- Лимиты: `_headers` — до 100 правил и до 2000 символов в строке (`headers.mjs` проверяет это при сборке); `_redirects` — 2000 статических и 100 динамических правил, строка до 1000 символов. Редиректы выполняются раньше заголовков. Цепочек не делать: старый адрес ведёт сразу на окончательный.

## Когда включать CSP «по-настоящему»

Сейчас CSP работает в режиме **Report-Only**: браузер ничего не блокирует, только пишет нарушения в консоль. Порядок включения:

1. 1–2 недели после переезда: открывать сайт с F12 и проверять, что нарушений нет. Отдельно — панель учителя (печать ПИН, CSV) и «Любой глагол».
2. В `scripts/security/headers.mjs` поставить `ENFORCE = true`, проверить превью, смёрджить.
3. Если появятся нарушения, их видно в консоли. Собирать отчёты на сервере можно позже: обработчик Cloudflare → таблица `feedback` в Supabase (§15.2).
