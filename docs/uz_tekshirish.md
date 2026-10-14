# Oʻzbekcha satrlarni tekshirish · Проверка узбекских строк

Здесь собраны **все строки интерфейса на узбекском** (латиница) рядом с русскими — 634 строк.
Файл создаётся автоматически из `src/i18n/uz.ts` командой `npm run uz-review`, поэтому правки вносите **не сюда, а в `src/i18n/uz.ts`**
(или пришлите список исправлений: номер строки и правильный вариант).

Как читать:
- `{n}`, `{title}` и т. п. — сюда сайт подставит число или название. Их не переводить и не удалять.
- Теги вроде `<b>…</b>`, `<a href="{href}">…</a>` — жирный шрифт и ссылки. Текст внутри переводить, сами теги оставить.
- Орфография: oʻ, gʻ — знак **ʻ** (U+02BB), тутуқ белгиси — **ʼ** (U+02BC): maʼlumot, eʼlon, aʼlo. Обычный апостроф `'` не используется (это проверяет `npm run test:i18n`).
- Учебные материалы (переводы слов, пояснения в викторинах, названия наборов) пока на русском: на узбекской версии сайта они показываются с пометкой «(rus tilida)». Их перевод — отдельная задача (поля `r_uz`, `e_uz` и др. в `src/content/SCHEMA.md`).

## Что подтвердить в первую очередь

1. «класс» → **sinf** (Men sinfdanman, Sinf kodi, Sinf reytingi). Или лучше **guruh**?
2. «Мой прогресс» → **Mening natijalarim**.
3. «карточки» → **kartochkalar**; «набор слов» → **toʻplam**.
4. «псевдоним» → **taxallus**; «табло» → **tablo**; «рейтинг» → **reyting**.
5. «огласовки» → **harakatlar** («harakatli yoki harakatsiz» — с огласовками или без).
6. «интервальное повторение» → **oraliqli takrorlash**.
7. «очки» в викторине → **ball**; «разбор ответов» → **tahlil**.
8. В примере названия класса «2 курс ТГУВ» → **TDShU 2-kurs, 1-guruh**.
9. Названия палитр: Бирюза → **Feruza**, Лазурит → **Lojuvard**, Пергамент → **Pergament**.
10. Девиз «Barcha arab tili ixlosmandlari uchun» на узбекской версии показывается без перевода.
11. Спряжение: «спряжение» → **tuslanish**, «порода» → **bob** (I bob), «залог» → **nisbat** (maʼlum / majhul), «переходный» → **oʻtimli**.
12. Спряжение: наклонения → **marfuʼ / mansub / majzum**; типы глаголов → **salim, mahmuz, misol, ajvaf, noqis, muzoaf, lafif**; огласовки → **fatha / zamma / kasra**.
13. Спряжение: род в подписях лиц → **(muz.)** и **(muan.)** (muzakkar / muannas): «sen (muz.)», «ular ikkovi (muan.)». Или лучше другие сокращения?
14. Подпись к названию на главной: «allimniy — menga oʻrgat». Как лучше передать عَلِّمْنِي латиницей?

## Общее

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 1 | `meta.lang` | ru | uz |
| 2 | `meta.intl` | ru-RU | uz-Latn |
| 3 | `meta.siteSubtitle` | арабский язык | arab tili |
| 4 | `meta.mottoTr` | Для всех, кто любит арабский язык | — |
| 5 | `meta.inRussian` | — | (rus tilida) |
| 6 | `meta.contentInRussian` | — | Soʻzlarning tarjimalari hozircha rus tilida: oʻzbekcha tarjimalar asta-sekin qoʻshib boriladi. |

## Переключатель языка

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 7 | `lang.label` | Язык | Til |
| 8 | `lang.button` | Язык сайта: {lang} | Sayt tili: {lang} |

## Меню и шапка

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 9 | `nav.words` | Слова | Soʻzlar |
| 10 | `nav.quizzes` | Викторины | Viktorinalar |
| 11 | `nav.tests` | Тесты | Testlar |
| 12 | `nav.exercises` | Упражнения | Mashqlar |
| 13 | `nav.grammar` | Грамматика | Grammatika |
| 14 | `nav.texts` | Тексты | Matnlar |
| 15 | `nav.courses` | Курсы | Kurslar |
| 16 | `nav.dictionary` | Словарь | Lugʻat |
| 17 | `nav.conjugation` | Спряжение | Tuslanish |
| 18 | `nav.login` | Войти | Kirish |
| 19 | `nav.me` | Мой прогресс | Mening natijalarim |
| 20 | `nav.teacher` | Панель учителя | Oʻqituvchi paneli |
| 21 | `nav.menu` | Меню | Menyu |
| 22 | `nav.close` | Закрыть | Yopish |
| 23 | `nav.home` | Главная | Bosh sahifa |
| 24 | `nav.sections` | Разделы сайта | Sayt boʻlimlari |
| 25 | `nav.more` | Ещё | Yana |
| 26 | `nav.skip` | К содержанию | Asosiy qismga oʻtish |
| 27 | `nav.youAreHere` | Вы здесь | Siz shu yerdasiz |

## Группы меню

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 28 | `navGroups.learn` | Учить | Oʻrganish |
| 29 | `navGroups.tasks` | Задания | Topshiriqlar |
| 30 | `navGroups.read` | Читать | Oʻqish |
| 31 | `navGroups.courses` | Курсы | Kurslar |

## Окно «Оформление»

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 32 | `look.button` | Оформление | Koʻrinish |
| 33 | `look.title` | Оформление | Koʻrinish |
| 34 | `look.mode` | Режим | Rejim |
| 35 | `look.modes.light` | Светлая | Yorugʻ |
| 36 | `look.modes.dark` | Тёмная | Qorongʻi |
| 37 | `look.modes.auto` | Как в системе | Tizimdagidek |
| 38 | `look.palette` | Цвета | Ranglar |
| 39 | `look.palettes.turquoise` | Бирюза | Feruza |
| 40 | `look.palettes.lapis` | Лазурит | Lojuvard |
| 41 | `look.palettes.parchment` | Пергамент | Pergament |
| 42 | `look.palettes.contrast` | Контраст | Kontrast |
| 43 | `look.paletteHint.turquoise` | по умолчанию | standart |
| 44 | `look.paletteHint.lapis` | синяя | koʻk |
| 45 | `look.paletteHint.parchment` | тёплая, книжная | iliq, kitobiy |
| 46 | `look.paletteHint.contrast` | для слабого зрения | zaif koʻruvchilar uchun |
| 47 | `look.fontSize` | Размер текста | Matn oʻlchami |
| 48 | `look.arSize` | Арабский шрифт | Arabcha shrift |
| 49 | `look.sizes` | А− · А · А+ · А++ | A− · A · A+ · A++ |
| 50 | `look.sizeNames` | меньше · обычный · крупнее · самый крупный | kichikroq · odatiy · kattaroq · eng katta |
| 51 | `look.sample` | Пример: | Namuna: |
| 52 | `look.reset` | Сбросить | Asliga qaytarish |
| 53 | `look.saved` | Настройки сохраняются на этом устройстве. | Sozlamalar shu qurilmada saqlanadi. |

## Поиск по сайту

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 54 | `search.button` | Поиск | Qidirish |
| 55 | `search.hotkey` | Поиск по сайту ( / или Ctrl+K ) | Saytdan qidirish ( / yoki Ctrl+K ) |
| 56 | `search.label` | Искать на сайте | Saytdan qidirish |
| 57 | `search.placeholder` | слово, тема, задание… например: книга, كتاب | soʻz, mavzu, topshiriq… masalan: كتاب |
| 58 | `search.hint` | Ищите по-русски или по-арабски — с огласовками или без. Клавиши: / или Ctrl+K — открыть, ↑ ↓ — выбрать, Enter — перейти, Esc — закрыть. | Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz (soʻzlarning tarjimalari hozircha rus tilida). Tugmalar: / yoki Ctrl+K — ochish, ↑ ↓ — tanlash, Enter — oʻtish, Esc — yopish. |
| 59 | `search.loading` | Загрузка… | Yuklanmoqda… |
| 60 | `search.empty` | Ничего не нашлось. Попробуйте другое слово или откройте словарь. | Hech narsa topilmadi. Boshqa soʻz bilan urinib koʻring yoki lugʻatni oching. |
| 61 | `search.noIndex` | Поиск по страницам появится после публикации сайта (сейчас ищутся только слова). | Sahifalar boʻyicha qidiruv sayt eʼlon qilingach ishlaydi (hozircha faqat soʻzlar qidiriladi). |
| 62 | `search.groups.words` | Слова | Soʻzlar |
| 63 | `search.groups.tasks` | Задания | Topshiriqlar |
| 64 | `search.groups.sections` | Разделы | Boʻlimlar |
| 65 | `search.groups.grammar` | Грамматика | Grammatika |
| 66 | `search.groups.texts` | Тексты | Matnlar |
| 67 | `search.groups.articles` | Статьи | Maqolalar |
| 68 | `search.allInDict` | Все совпадения в словаре → | Lugʻatdagi barcha mosliklar → |
| 69 | `search.found` | Найдено: {n} | Topildi: {n} |

## Описания разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 70 | `sectionsDesc.words` | Карточки с интервальным повторением и тест на 20 вопросов. | Oraliqli takrorlash kartochkalari va 20 ta savollik test. |
| 71 | `sectionsDesc.quizzes` | Викторины по текстам уроков и темам. | Dars matnlari va mavzular boʻyicha viktorinalar. |
| 72 | `sectionsDesc.tests` | Контрольные и пробный экзамен. | Nazorat ishlari va sinov imtihoni. |
| 73 | `sectionsDesc.exercises` | Интерактивные упражнения по грамматике. | Grammatika boʻyicha interaktiv mashqlar. |
| 74 | `sectionsDesc.grammar` | Короткие памятки с примерами. | Misollar bilan qisqa eslatmalar. |
| 75 | `sectionsDesc.texts` | Тексты для чтения с переводом. | Tarjimasi bilan oʻqish uchun matnlar. |
| 76 | `sectionsDesc.courses` | Упорядоченные подборки заданий. | Tartib bilan joylashgan topshiriqlar toʻplamlari. |
| 77 | `sectionsDesc.dictionary` | Тематический словарь с поиском. | Qidiruvli mavzuli lugʻat. |
| 78 | `sectionsDesc.conjugation` | Таблицы спряжения глаголов. | Feʼllarning tuslanish jadvallari. |

## Общие слова

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 79 | `common.soon` | Скоро | Tez orada |
| 80 | `common.soonLong` | Материалы этого раздела добавляются постепенно. | Bu boʻlim materiallari asta-sekin qoʻshib boriladi. |
| 81 | `common.gradually` | Материалы добавляются постепенно. | Materiallar asta-sekin qoʻshib boriladi. |
| 82 | `common.open` | Открыть | Ochish |
| 83 | `common.start` | Начать | Boshlash |
| 84 | `common.items` | {n} материала | {n} ta material |
| 85 | `common.words` | {n} слова | {n} ta soʻz |
| 86 | `common.decks` | {n} набора | {n} ta toʻplam |
| 87 | `common.courses` | {n} курса | {n} ta kurs |
| 88 | `common.tasks` | {n} задания | {n} ta topshiriq |
| 89 | `common.level` | Уровень | Daraja |
| 90 | `common.added` | Добавлено | Qoʻshilgan |
| 91 | `common.oldVersion` | Открывается прежняя версия задания. Скоро она переедет на новый сайт. | Topshiriqning avvalgi (rus tilidagi) versiyasi ochiladi. Tez orada u yangi saytga koʻchiriladi. |
| 92 | `common.back` | Назад | Orqaga |
| 93 | `common.loading` | Загрузка… | Yuklanmoqda… |
| 94 | `common.tryExercises` | Пока можно потренироваться в разделе &lt;a href="{href}"&gt;«Упражнения»&lt;/a&gt;. | Hozircha &lt;a href="{href}"&gt;«Mashqlar»&lt;/a&gt; boʻlimida mashq qilishingiz mumkin. |

## Типы заданий

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 95 | `kinds.deck` | Слова | Soʻzlar |
| 96 | `kinds.quiz` | Викторина | Viktorina |
| 97 | `kinds.test` | Тест | Test |
| 98 | `kinds.exercise` | Упражнение | Mashq |
| 99 | `kinds.grammar` | Грамматика | Grammatika |
| 100 | `kinds.text` | Текст | Matn |

## Главная страница

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 101 | `home.lead` | Сайт для изучения арабского языка: слова, викторины, упражнения и грамматика. Начинайте без регистрации. | Arab tilini oʻrganish uchun sayt: soʻzlar, viktorinalar, mashqlar va grammatika. Roʻyxatdan oʻtmasdan boshlang. |
| 102 | `home.gloss` | &lt;i&gt;‘аллимнӣ&lt;/i&gt; — «научи меня». С этой просьбы начинается учёба. | &lt;i&gt;allimniy&lt;/i&gt; — «menga oʻrgat». Oʻqish shu iltimosdan boshlanadi. |
| 103 | `home.h1` | Арабский язык — с первого слова | Arab tili — birinchi soʻzdan |
| 104 | `home.startWords` | Учить слова | Soʻz oʻrganish |
| 105 | `home.iAmInClass` | Я из класса | Men sinfdanman |
| 106 | `home.cardLabel` | Карточка-пример: нажмите, чтобы увидеть перевод | Namuna kartochka: tarjimani koʻrish uchun bosing |
| 107 | `home.cardHint` | нажмите, чтобы увидеть перевод | tarjimani koʻrish uchun bosing |
| 108 | `home.otherWord` | Другое слово | Boshqa soʻz |
| 109 | `home.allCards` | Все карточки | Barcha kartochkalar |
| 110 | `home.contents` | Содержание | Mundarija |
| 111 | `home.fresh` | Новое на сайте | Saytdagi yangiliklar |
| 112 | `home.courses` | Курсы | Kurslar |

## Страницы разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 113 | `pages.words.desc` | Наборы арабских слов с карточками, интервальным повторением и тестом. | Kartochkalar, oraliqli takrorlash va testli arabcha soʻzlar toʻplamlari. |
| 114 | `pages.words.lead` | Карточки подбирают слова сами: новые и трудные чаще, выученные реже. Без входа прогресс хранится на этом устройстве, после входа — в облаке. | Kartochkalar soʻzlarni oʻzi tanlaydi: yangi va qiyin soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Kirmasangiz, natijalar shu qurilmada, kirsangiz — bulutda saqlanadi. |
| 115 | `pages.quizzes.desc` | Викторины по арабскому языку: тексты уроков, лексика, грамматика. | Arab tili boʻyicha viktorinalar: dars matnlari, leksika, grammatika. |
| 116 | `pages.tests.desc` | Тесты и пробный экзамен по арабскому языку. | Arab tili boʻyicha testlar va sinov imtihoni. |
| 117 | `pages.tests.wordTest` | Тест по словам: {title} | Soʻzlar testi: {title} |
| 118 | `pages.tests.q20` | 20 вопросов | 20 ta savol |
| 119 | `pages.tests.wordTestMeta` | Вопросы выбираются по вашим трудным и новым словам. | Savollar siz uchun qiyin va yangi soʻzlardan tanlanadi. |
| 120 | `pages.exercises.desc` | Интерактивные упражнения по арабской грамматике. | Arab grammatikasi boʻyicha interaktiv mashqlar. |
| 121 | `pages.courses.desc` | Курсы арабского языка: задания по порядку. | Arab tili kurslari: topshiriqlar tartib bilan. |
| 122 | `pages.courses.forWhom` | Для кого: | Kim uchun: |
| 123 | `pages.dictionary.desc` | Тематический арабско-русский словарь с поиском: огласовки, множественное число, пары антонимов. | Qidiruvli mavzuli arabcha-ruscha lugʻat: harakatlar, koʻplik shakli, antonim juftlari. |
| 124 | `pages.dictionary.lead` | {words} по {topics}. Ищите по-русски или по-арабски — с огласовками или без. | {words}, {topics}. Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz. |
| 125 | `pages.dictionary.topics` | {n} темам | {n} ta mavzu |
| 126 | `pages.dictionary.search` | Поиск | Qidirish |
| 127 | `pages.dictionary.placeholder` | например: книга, كتاب | masalan: كتاب |
| 128 | `pages.dictionary.found` | Найдено: {n} | Topildi: {n} |
| 129 | `pages.notFound.title` | Страница не найдена | Sahifa topilmadi |
| 130 | `pages.notFound.h1` | Такой страницы нет | Bunday sahifa yoʻq |
| 131 | `pages.notFound.text` | Возможно, адрес изменился. Начните с &lt;a href="{home}"&gt;главной страницы&lt;/a&gt; или откройте &lt;a href="{words}"&gt;слова&lt;/a&gt;. | Ehtimol, manzil oʻzgargan. &lt;a href="{home}"&gt;Bosh sahifadan&lt;/a&gt; boshlang yoki &lt;a href="{words}"&gt;soʻzlarni&lt;/a&gt; oching. |

## О сайте

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 132 | `about.title` | О сайте | Sayt haqida |
| 133 | `about.desc` | {name} ({nameAr}) — сайт для изучения арабского языка. Автор — {author}. | {name} ({nameAr}) — arab tilini oʻrganish uchun sayt. Muallif — {author}. |
| 134 | `about.intro` | &lt;b&gt;{name}&lt;/b&gt; — сайт для всех, кто учит арабский язык: слова с карточками, викторины, тесты, упражнения, а со временем — грамматика и тексты для чтения. Всем можно пользоваться без регистрации. | &lt;b&gt;{name}&lt;/b&gt; — arab tilini oʻrganayotgan barcha uchun sayt: kartochkali soʻzlar, viktorinalar, testlar, mashqlar, keyinchalik esa grammatika va oʻqish uchun matnlar. Saytdan roʻyxatdan oʻtmasdan foydalanish mumkin. |
| 135 | `about.whyH` | Почему «{nameAr}» | Nega «{nameAr}» |
| 136 | `about.why` | «‘Аллимнӣ» значит «научи меня»: повелительная форма глагола «‘аллама» (учить, обучать) со слитным местоимением «-нӣ» («меня»). Это просьба каждого, кто приходит учиться. | «Allimniy» — «menga oʻrgat» degani: «allama» (oʻrgatmoq, taʼlim bermoq) feʼlining buyruq shakli va «-niy» («meni», «menga») qoʻshilgan olmoshi. Bu — oʻqishga kelgan har bir kishining iltimosi. |
| 137 | `about.former` | Ранее сайт назывался {formerName} ({formerNameAr}) — по краткой грамматике аз-Замахшари для начинающих «ал-Унмӯзадж фӣ-н-наҳв». | Avval sayt {formerName} ({formerNameAr}) deb atalgan — az-Zamaxshariyning boshlovchilar uchun yozgan qisqa grammatikasi «Al-Unmuzaj fin-nahv» nomi bilan. |
| 138 | `about.forWhomH` | Для кого | Kim uchun |
| 139 | `about.forWhom` | Для студентов-востоковедов и всех, кто изучает арабский самостоятельно. Преподаватели могут вести на сайте свои классы: ученики входят по коду и ПИН, а преподаватель видит их прогресс. | Sharqshunos talabalar va arab tilini mustaqil oʻrganayotgan barcha uchun. Oʻqituvchilar saytda oʻz sinflarini yuritishi mumkin: oʻquvchilar kod va PIN orqali kiradi, oʻqituvchi esa ularning natijalarini koʻradi. |
| 140 | `about.authorH` | Автор | Muallif |
| 141 | `about.notice` | Материалы добавляются постепенно. Нашли ошибку — напишите автору. | Materiallar asta-sekin qoʻshib boriladi. Xato topsangiz — muallifga yozing. |

## Конфиденциальность

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 142 | `privacy.title` | Конфиденциальность | Maxfiylik |
| 143 | `privacy.desc` | Какие данные собирает сайт {name} и как их удалить. | {name} sayti qanday maʼlumotlarni yigʻadi va ularni qanday oʻchirish mumkin. |
| 144 | `privacy.draft` | Черновик. Текст будет уточнён. | Qoralama. Matn aniqlashtiriladi. |
| 145 | `privacy.guestH` | Без входа | Kirmasdan |
| 146 | `privacy.guest` | Если вы не входите на сайт, мы ничего о вас не сохраняем. Ваш прогресс по карточкам хранится только в браузере на вашем устройстве. На сайте нет рекламы и сторонних счётчиков посещений. | Agar saytga kirmasangiz, biz siz haqingizda hech narsa saqlamaymiz. Kartochkalar boʻyicha natijalaringiz faqat qurilmangizdagi brauzerda saqlanadi. Saytda reklama va begona tashriflar hisoblagichlari yoʻq. |
| 147 | `privacy.conjH` | Спряжение: «Любой глагол» | Tuslanish: «Istalgan feʼl» |
| 148 | `privacy.conj` | Если на странице «Спряжение» нажать «Загрузить движок спряжения», браузер скачает программу Pyodide с cdn.jsdelivr.net и пакеты Qutrub с pypi.org. Эти сайты видят ваш IP-адрес, как при любой загрузке файла. Без нажатия кнопки ничего не загружается. Введённые глаголы обрабатываются только в вашем браузере. | «Tuslanish» sahifasida «Tuslash dasturini yuklash» tugmasi bosilsa, brauzer cdn.jsdelivr.net saytidan Pyodide dasturini va pypi.org saytidan Qutrub paketlarini yuklab oladi. Bu saytlar har qanday fayl yuklanganidagidek IP-manzilingizni koʻradi. Tugma bosilmasa, hech narsa yuklanmaydi. Kiritilgan feʼllar faqat brauzeringizda qayta ishlanadi. |
| 149 | `privacy.classH` | Ученики классов | Sinf oʻquvchilari |
| 150 | `privacy.class` | Ученик входит по коду класса, своему коду и ПИН. В базе хранятся только код, псевдоним, пол (по желанию преподавателя) и учебная статистика: какие задания выполнены, ответы, время занятий. Настоящие имена в базу не записываются: соответствие «код — имя» есть только у преподавателя. | Oʻquvchi sinf kodi, oʻz kodi va PIN orqali kiradi. Bazada faqat kod, taxallus, jins (oʻqituvchi xohlasa) va oʻquv statistikasi saqlanadi: qaysi topshiriqlar bajarilgan, javoblar, mashgʻulot vaqti. Haqiqiy ismlar bazaga yozilmaydi: «kod — ism» mosligi faqat oʻqituvchida boʻladi. |
| 151 | `privacy.emailH` | Вход по email | Email orqali kirish |
| 152 | `privacy.email` | Хранятся email (для входа), псевдоним и учебная статистика. | Email (kirish uchun), taxallus va oʻquv statistikasi saqlanadi. |
| 153 | `privacy.whereH` | Где хранятся данные | Maʼlumotlar qayerda saqlanadi |
| 154 | `privacy.where` | В базе данных Supabase (сервер в Европейском союзе, Франкфурт). | Supabase maʼlumotlar bazasida (server Yevropa Ittifoqida, Frankfurtda). |
| 155 | `privacy.deleteH` | Удаление | Oʻchirish |
| 156 | `privacy.delete` | Чтобы удалить свои данные, напишите автору: {email} или {telegram}. Ученик класса может также обратиться к своему преподавателю. | Maʼlumotlaringizni oʻchirish uchun muallifga yozing: {email} yoki {telegram}. Sinf oʻquvchisi oʻz oʻqituvchisiga ham murojaat qilishi mumkin. |

## Вход

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 157 | `login.title` | Вход | Kirish |
| 158 | `login.desc` | Вход на сайт {name}: для учеников класса и по email. | {name} saytiga kirish: sinf oʻquvchilari uchun va email orqali. |
| 159 | `login.lead` | Заниматься можно и без входа. Вход нужен, чтобы прогресс сохранялся в облаке и был виден на любом устройстве. | Kirmasdan ham shugʻullanish mumkin. Kirish natijalaringiz bulutda saqlanishi va istalgan qurilmada koʻrinishi uchun kerak. |
| 160 | `login.classH` | Я из класса | Men sinfdanman |
| 161 | `login.classNote` | Код класса, свой код и ПИН дал преподаватель. | Sinf kodi, oʻz kodingiz va PIN-ni oʻqituvchi beradi. |
| 162 | `login.join` | Код класса | Sinf kodi |
| 163 | `login.joinPh` | например, K7MQ2D | masalan, K7MQ2D |
| 164 | `login.code` | Мой код | Mening kodim |
| 165 | `login.pin` | ПИН | PIN |
| 166 | `login.remember` | Запомнить меня на этом телефоне | Meni shu telefonda eslab qolish |
| 167 | `login.rememberNote` | (на общем компьютере снимите галочку) | (umumiy kompyuterda belgini olib tashlang) |
| 168 | `login.enterClass` | Войти в класс | Sinfga kirish |
| 169 | `login.mailH` | Вход по email | Email orqali kirish |
| 170 | `login.mailNote` | Для преподавателей и тех, кто уже зарегистрирован. | Oʻqituvchilar va roʻyxatdan oʻtganlar uchun. |
| 171 | `login.email` | Email | Email |
| 172 | `login.pass` | Пароль | Parol |
| 173 | `login.enter` | Войти | Kirish |
| 174 | `login.regLater` | Открытая регистрация по email появится позже. Пока занимайтесь как гость: прогресс сохранится на вашем устройстве. | Email orqali ochiq roʻyxatdan oʻtish keyinroq paydo boʻladi. Hozircha mehmon sifatida shugʻullaning: natijalaringiz qurilmangizda saqlanadi. |
| 175 | `login.already` | Вы уже вошли. &lt;a href="{href}"&gt;Мой прогресс&lt;/a&gt; | Siz allaqachon kirgansiz. &lt;a href="{href}"&gt;Mening natijalarim&lt;/a&gt; |
| 176 | `login.fill` | Заполните все поля. ПИН — 4 цифры. | Barcha maydonlarni toʻldiring. PIN — 4 ta raqam. |
| 177 | `login.checking` | Проверяю… | Tekshirilmoqda… |
| 178 | `login.errClass` | Класс с таким кодом не найден. Проверьте код класса. | Bunday kodli sinf topilmadi. Sinf kodini tekshiring. |
| 179 | `login.errLocked` | Слишком много неверных попыток. Подождите 10 минут. | Notoʻgʻri urinishlar juda koʻp. 10 daqiqa kuting. |
| 180 | `login.errPin` | Неверный код или ПИН. Если забыли ПИН — спросите преподавателя. | Kod yoki PIN notoʻgʻri. PIN-ni unutgan boʻlsangiz, oʻqituvchidan soʻrang. |
| 181 | `login.offline` | Нет связи с сервером. Проверьте интернет и попробуйте ещё раз. | Server bilan aloqa yoʻq. Internetni tekshirib, qaytadan urinib koʻring. |
| 182 | `login.errMail` | Неверный email или пароль. | Email yoki parol notoʻgʻri. |
| 183 | `login.failMail` | Не удалось войти: {err} | Kirib boʻlmadi: {err} |

## Мой прогресс

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 184 | `me.title` | Мой прогресс | Mening natijalarim |
| 185 | `me.guest` | Вы занимаетесь как гость: прогресс хранится только на этом устройстве. | Siz mehmon sifatida shugʻullanyapsiz: natijalar faqat shu qurilmada saqlanadi. |
| 186 | `me.login` | Войти | Kirish |
| 187 | `me.headPin` | &lt;b&gt;{nick}&lt;/b&gt; · класс «{cls}» · код {code} | &lt;b&gt;{nick}&lt;/b&gt; · «{cls}» sinfi · kod {code} |
| 188 | `me.totals` | Всего занятий: &lt;b&gt;{v}&lt;/b&gt; · активное время: &lt;b&gt;{m}&lt;/b&gt; мин. | Jami mashgʻulotlar: &lt;b&gt;{v}&lt;/b&gt; · faol vaqt: &lt;b&gt;{m}&lt;/b&gt; daq. |
| 189 | `me.words` | Слова | Soʻzlar |
| 190 | `me.know` | знаю {k} из {n} | bilaman: {k}/{n} |
| 191 | `me.deckMeta` | видел {seen} · учу {learn} · выучено {done} | koʻrilgan {seen} · oʻrganyapman {learn} · oʻrganilgan {done} |
| 192 | `me.lastTests` | Последние тесты по словам | Soʻzlar boʻyicha oxirgi testlar |
| 193 | `me.testLine` | {date} — {c} из {t} | {date} — {c}/{t} |
| 194 | `me.noTests` | Тестов пока нет. | Hozircha testlar yoʻq. |
| 195 | `me.quizzes` | Викторины | Viktorinalar |
| 196 | `me.quizLine` | {date}: &lt;b&gt;{c} из {t}&lt;/b&gt;, {p} очков, {time} | {date}: &lt;b&gt;{c}/{t}&lt;/b&gt;, {p} ball, {time} |
| 197 | `me.noQuizzes` | Викторин пока нет. | Hozircha viktorinalar yoʻq. |
| 198 | `me.review` | Разбор | Tahlil |
| 199 | `me.teacher` | Панель учителя | Oʻqituvchi paneli |
| 200 | `me.logout` | Выйти | Chiqish |
| 201 | `me.stale` | Вход устарел. &lt;a href="{href}"&gt;Войдите снова&lt;/a&gt;. | Kirish muddati tugagan. &lt;a href="{href}"&gt;Qaytadan kiring&lt;/a&gt;. |
| 202 | `me.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |
| 203 | `me.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |

## Карточки слов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 204 | `deck.descTail` | {words} с карточками и тестом. | {words}: kartochkalar va test. |
| 205 | `deck.tabs.cards` | Карточки | Kartochkalar |
| 206 | `deck.tabs.test` | Тест · 20 вопросов | Test · 20 ta savol |
| 207 | `deck.tabs.hard` | Мои трудные | Qiyin soʻzlarim |
| 208 | `deck.tabs.board` | Рейтинг класса | Sinf reytingi |
| 209 | `deck.which` | Какие слова показывать | Qaysi soʻzlarni koʻrsatish |
| 210 | `deck.all` | Все слова | Barcha soʻzlar |
| 211 | `deck.onlyHard` | Только трудные | Faqat qiyinlari |
| 212 | `deck.dir` | Направление | Yoʻnalish |
| 213 | `deck.dirs` | ар → рус · рус → ар · вперемешку | arabcha → tarjima · tarjima → arabcha · aralash |
| 214 | `deck.no` | Не знаю | Bilmayman |
| 215 | `deck.yes` | Знаю | Bilaman |
| 216 | `deck.below` | Новые слова и слова с ошибками попадаются чаще, выученные — реже. Нажмите «Знаю», если вспомнили перевод сами; иначе — «Не знаю», и ответ покажется. | Yangi va xato qilingan soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Tarjimani oʻzingiz eslasangiz, «Bilaman»ni bosing; aks holda «Bilmayman»ni bosing — javob koʻrsatiladi. |
| 217 | `deck.net.guest` | Вы занимаетесь как гость — прогресс хранится только на этом устройстве. &lt;a href="{login}"&gt;Войти&lt;/a&gt; | Siz mehmon sifatida shugʻullanyapsiz — natijalar faqat shu qurilmada saqlanadi. &lt;a href="{login}"&gt;Kirish&lt;/a&gt; |
| 218 | `deck.net.saved` | ☁ Сохранено | ☁ Saqlandi |
| 219 | `deck.net.pending` | ☁ Сохраняю… | ☁ Saqlanmoqda… |
| 220 | `deck.net.offline` | ⚠ Нет связи — ответы сохранятся, когда появится интернет | ⚠ Aloqa yoʻq — javoblar internet paydo boʻlganda saqlanadi |
| 221 | `deck.net.relogin` | ⚠ Вход устарел. &lt;a href="{login}"&gt;Войдите снова&lt;/a&gt; | ⚠ Kirish muddati tugagan. &lt;a href="{login}"&gt;Qaytadan kiring&lt;/a&gt; |
| 222 | `deck.lv.new` | новые | yangi |
| 223 | `deck.lv.learn` | учу | oʻrganyapman |
| 224 | `deck.lv.good` | знаю | bilaman |
| 225 | `deck.lv.done` | выучено | oʻrganilgan |
| 226 | `deck.passed` | пройдено {k} из {n} | koʻrildi: {k}/{n} |
| 227 | `deck.inSet` | Слов в подборке: {n}, из них новых: {k} | Toʻplamda {n} ta soʻz, ulardan yangi: {k} |
| 228 | `deck.noHard` | Трудных слов пока нет | Hozircha qiyin soʻzlar yoʻq |
| 229 | `deck.empty` | Здесь пусто | Bu yer boʻsh |
| 230 | `deck.tagNew` | новое слово | yangi soʻz |
| 231 | `deck.tagErr` | ошибок: {n} | xatolar: {n} |
| 232 | `deck.tagRep` | повторение | takrorlash |
| 233 | `deck.tapHint` | нажмите, чтобы увидеть ответ | javobni koʻrish uchun bosing |
| 234 | `deck.remember` | Запомните ответ и нажмите любую кнопку | Javobni eslab qoling va istalgan tugmani bosing |
| 235 | `deck.grades` | Отлично · Хорошо · Удовлетворительно · Нужно повторить | Aʼlo · Yaxshi · Qoniqarli · Takrorlash kerak |
| 236 | `deck.result` | {s} из {n} | {s}/{n} |
| 237 | `deck.resultNote` | {lvl}. Слова с ошибками теперь будут попадаться чаще. | {lvl}. Xato qilingan soʻzlar endi tez-tez chiqadi. |
| 238 | `deck.again` | Пройти ещё раз | Yana bir bor |
| 239 | `deck.qOf` | Вопрос {i} из {n} · верно: {s} | Savol {i}/{n} · toʻgʻri: {s} |
| 240 | `deck.hardH` | Слова, в которых вы ошибались | Siz xato qilgan soʻzlar |
| 241 | `deck.relearned` | ✓ — слово уже выучено заново. | ✓ — soʻz qayta oʻrganildi. |
| 242 | `deck.noErr` | Ошибок пока нет. | Hozircha xatolar yoʻq. |
| 243 | `deck.boardLogin` | Рейтинг виден ученикам класса. &lt;a href="{href}"&gt;Войти в класс&lt;/a&gt; | Reyting sinf oʻquvchilariga koʻrinadi. &lt;a href="{href}"&gt;Sinfga kirish&lt;/a&gt; |
| 244 | `deck.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 245 | `deck.boardEmpty` | Пока пусто. | Hozircha boʻsh. |
| 246 | `deck.bTime` | Больше всех занимались | Eng koʻp shugʻullanganlar |
| 247 | `deck.bKnown` | Знают больше всего слов | Eng koʻp soʻz biladiganlar |
| 248 | `deck.bAcc` | Самые точные (от 50 ответов) | Eng aniqlari (50 ta javobdan) |
| 249 | `deck.uMin` | мин. | daq. |
| 250 | `deck.uWords` | сл. | soʻz |
| 251 | `deck.bNote` | Время считается только активное: когда вы отвечаете на карточки. | Faqat faol vaqt hisoblanadi: kartochkalarga javob berayotgan vaqtingiz. |
| 252 | `deck.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |

## Викторины и тесты

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 253 | `quiz.questions` | {n} вопросов | {n} ta savol |
| 254 | `quiz.start` | Начать ▶ | Boshlash ▶ |
| 255 | `quiz.whoPin` | Результат сохранится: &lt;b&gt;{name}&lt;/b&gt; · класс «{cls}» | Natija saqlanadi: &lt;b&gt;{name}&lt;/b&gt; · «{cls}» sinfi |
| 256 | `quiz.whoEmail` | Результат сохранится в вашем аккаунте: &lt;b&gt;{name}&lt;/b&gt; | Natija hisobingizda saqlanadi: &lt;b&gt;{name}&lt;/b&gt; |
| 257 | `quiz.whoGuest` | Вы проходите как гость: результат останется только на этом устройстве и не попадёт в рейтинг класса. | Siz mehmon sifatida oʻtyapsiz: natija faqat shu qurilmada qoladi va sinf reytingiga kirmaydi. |
| 258 | `quiz.login` | Войти в класс | Sinfga kirish |
| 259 | `quiz.guestBest` | Ваш лучший результат на этом устройстве: {p} очков ({c} из {t}). | Shu qurilmadagi eng yaxshi natijangiz: {p} ball ({c}/{t}). |
| 260 | `quiz.sound` | 🔊 Звук | 🔊 Ovoz |
| 261 | `quiz.soundOff` | 🔇 Без звука | 🔇 Ovozsiz |
| 262 | `quiz.part` | Часть {i} из {n} | Qism {i}/{n} |
| 263 | `quiz.toQuestions` | К вопросам ▶ | Savollarga ▶ |
| 264 | `quiz.text` | 📄 Текст | 📄 Matn |
| 265 | `quiz.openText` | 📄 Открыть текст | 📄 Matnni ochish |
| 266 | `quiz.textTitle` | Текст урока | Dars matni |
| 267 | `quiz.listen` | ▶ Прослушать диалог (осталось {n}) | ▶ Dialogni tinglash (qoldi: {n}) |
| 268 | `quiz.listened` | Прослушано 2 раза | 2 marta tinglandi |
| 269 | `quiz.playing` | 🔊 Звучит запись… | 🔊 Yozuv eshittirilmoqda… |
| 270 | `quiz.loadingAudio` | ⏳ Загрузка записи… | ⏳ Yozuv yuklanmoqda… |
| 271 | `quiz.audioOk` | Запись диалога. Можно прослушать два раза. | Dialog yozuvi. Ikki marta tinglash mumkin. |
| 272 | `quiz.ttsNote` | Диалог читает голос устройства. Лучше слушать запись или преподавателя. | Dialogni qurilma ovozi oʻqiydi. Yozuvni yoki oʻqituvchini tinglagan maʼqul. |
| 273 | `quiz.noVoice` | На этом устройстве нет арабского голоса — слушайте преподавателя. | Bu qurilmada arabcha ovoz yoʻq — oʻqituvchini tinglang. |
| 274 | `quiz.points` | {n} очков | {n} ball |
| 275 | `quiz.right` | ✅ Верно! +{n} | ✅ Toʻgʻri! +{n} |
| 276 | `quiz.wrong` | ❌ Неверно | ❌ Notoʻgʻri |
| 277 | `quiz.timeout` | ⏰ Время вышло | ⏰ Vaqt tugadi |
| 278 | `quiz.noAnswer` | (нет ответа) | (javob yoʻq) |
| 279 | `quiz.result` | {lvl} · верно {c} из {t} ({pct}%) | {lvl} · toʻgʻri: {c}/{t} ({pct}%) |
| 280 | `quiz.time` | Время: {t} | Vaqt: {t} |
| 281 | `quiz.myAnswers` | 📋 Мои ответы | 📋 Javoblarim |
| 282 | `quiz.again` | ↻ Ещё раз | ↻ Yana |
| 283 | `quiz.toList` | К списку | Roʻyxatga |
| 284 | `quiz.reviewTitle` | Мои ответы | Javoblarim |
| 285 | `quiz.question` | вопрос {n} | {n}-savol |
| 286 | `quiz.ok` | ✅ верно | ✅ toʻgʻri |
| 287 | `quiz.bad` | ❌ неверно | ❌ notoʻgʻri |
| 288 | `quiz.yourAnswer` | Ваш ответ: | Javobingiz: |
| 289 | `quiz.rightAnswer` | Правильный ответ: | Toʻgʻri javob: |
| 290 | `quiz.why` | Почему: | Izoh: |
| 291 | `quiz.sec` | с | s |
| 292 | `quiz.close` | Закрыть | Yopish |
| 293 | `quiz.saved` | ☁ Результат сохранён | ☁ Natija saqlandi |
| 294 | `quiz.pending` | ☁ Сохраняю результат… | ☁ Natija saqlanmoqda… |
| 295 | `quiz.offline` | ⚠ Нет связи — результат сохранён на телефоне и отправится, когда появится интернет | ⚠ Aloqa yoʻq — natija telefonda saqlandi va internet paydo boʻlganda yuboriladi |
| 296 | `quiz.relogin` | ⚠ Вход устарел — войдите снова, и результат отправится | ⚠ Kirish muddati tugagan — qaytadan kiring, natija yuboriladi |
| 297 | `quiz.guestSaved` | Результат не сохранён в облаке: вы не вошли. | Natija bulutda saqlanmadi: siz kirmagansiz. |
| 298 | `quiz.board` | 🏆 Рейтинг класса | 🏆 Sinf reytingi |
| 299 | `quiz.boardNote` | Лучший результат каждого за последние 3 часа. Только псевдонимы. | Har kimning oxirgi 3 soatdagi eng yaxshi natijasi. Faqat taxalluslar. |
| 300 | `quiz.boardEmpty` | Пока нет результатов. | Hozircha natijalar yoʻq. |
| 301 | `quiz.boardFail` | Рейтинг сейчас недоступен. | Reyting hozir mavjud emas. |
| 302 | `quiz.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 303 | `quiz.leaveConfirm` | Викторина ещё идёт. Выйти? | Viktorina hali davom etyapti. Chiqasizmi? |
| 304 | `quiz.secondsLeft` | секунд осталось | qolgan soniyalar |
| 305 | `quiz.noscript` | Для викторины нужен включённый JavaScript. | Viktorina uchun JavaScript yoqilgan boʻlishi kerak. |
| 306 | `quiz.contentRu` | — | Savollar va izohlar hozircha rus tilida. |

## Табло для проектора

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 307 | `board.title` | Табло | Tablo |
| 308 | `board.classCode` | Код класса | Sinf kodi |
| 309 | `board.show` | Показать | Koʻrsatish |
| 310 | `board.hours` | за последние {n} ч. | oxirgi {n} soatda |
| 311 | `board.empty` | Пока нет результатов. Табло обновляется само. | Hozircha natijalar yoʻq. Tablo oʻzi yangilanadi. |
| 312 | `board.noClass` | Класс с таким кодом не найден. | Bunday kodli sinf topilmadi. |
| 313 | `board.offline` | Нет связи — пробую снова… | Aloqa yoʻq — qayta urinilmoqda… |
| 314 | `board.updated` | обновлено {t} | yangilandi: {t} |

## Спряжение глаголов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 315 | `conj.title` | Спряжение глаголов | Feʼllar tuslanishi |
| 316 | `conj.description` | Таблицы спряжения арабских глаголов: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. С огласовками. | Arab feʼllarining tuslanish jadvallari: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Harakatlari bilan. |
| 317 | `conj.lead` | Таблицы спряжения {n} употребительных глаголов I породы — с огласовками, по всем 13 лицам. Любой другой глагол можно проспрягать ниже. | Keng qoʻllaniladigan {n} ta I bob feʼlining tuslanish jadvallari — harakatlari bilan, barcha 13 shaxs boʻyicha. Boshqa istalgan feʼlni quyida tuslash mumkin. |
| 318 | `conj.count` | {n} глагола | {n} ta feʼl |
| 319 | `conj.searchLabel` | Найти глагол | Feʼlni topish |
| 320 | `conj.searchPh` | например: писать, كتب, يكتب | masalan: كتب, يكتب |
| 321 | `conj.found` | Найдено: {n} | Topildi: {n} |
| 322 | `conj.notFound` | Такого глагола в списке нет. Попробуйте режим «Любой глагол» ниже. | Roʻyxatda bunday feʼl yoʻq. Quyidagi «Istalgan feʼl» rejimini sinab koʻring. |
| 323 | `conj.allTypes` | Все | Hammasi |
| 324 | `conj.types.sound` | правильные | salim |
| 325 | `conj.types.hamzated` | хамзованные | mahmuz |
| 326 | `conj.types.assimilated` | подобные правильным | misol |
| 327 | `conj.types.hollow` | пустые | ajvaf |
| 328 | `conj.types.defective` | недостаточные | noqis |
| 329 | `conj.types.doubled` | удвоенные | muzoaf |
| 330 | `conj.types.lafif` | дважды слабые | lafif |
| 331 | `conj.typesOne.sound` | правильный | salim |
| 332 | `conj.typesOne.hamzated` | хамзованный | mahmuz |
| 333 | `conj.typesOne.assimilated` | подобный правильному | misol |
| 334 | `conj.typesOne.hollow` | пустой | ajvaf |
| 335 | `conj.typesOne.defective` | недостаточный | noqis |
| 336 | `conj.typesOne.doubled` | удвоенный | muzoaf |
| 337 | `conj.typesOne.lafif` | дважды слабый | lafif |
| 338 | `conj.bab.فتحة` | фатха | fatha |
| 339 | `conj.bab.ضمة` | дамма | zamma |
| 340 | `conj.bab.كسرة` | кясра | kasra |
| 341 | `conj.babLabel` | Огласовка в настоящем-будущем | Hozirgi-kelasi zamondagi harakat |
| 342 | `conj.root` | Корень | Oʻzak |
| 343 | `conj.type` | Тип | Turi |
| 344 | `conj.form1` | I порода | I bob |
| 345 | `conj.transitive` | переходный | oʻtimli |
| 346 | `conj.intransitive` | непереходный | oʻtimsiz |
| 347 | `conj.print` | Печать | Chop etish |
| 348 | `conj.allVerbs` | Все глаголы | Barcha feʼllar |
| 349 | `conj.prev` | Предыдущий | Oldingi |
| 350 | `conj.next` | Следующий | Keyingi |
| 351 | `conj.auto` | Таблица построена автоматически (Qutrub). | Jadval avtomatik tuzilgan (Qutrub). |
| 352 | `conj.unchecked` | Формы ещё не проверены преподавателем. | Shakllar hali oʻqituvchi tomonidan tekshirilmagan. |
| 353 | `conj.checked` | Формы проверены преподавателем. | Shakllar oʻqituvchi tomonidan tekshirilgan. |
| 354 | `conj.doubtTitle` | Для преподавателя: что проверить | Oʻqituvchi uchun: nimani tekshirish kerak |
| 355 | `conj.report` | Заметили ошибку? Напишите нам: | Xato koʻrdingizmi? Bizga yozing: |
| 356 | `conj.pageTitle` | {verb} – {present}: спряжение глаголов | {verb} – {present}: feʼl tuslanishi |
| 357 | `conj.pageDesc` | Спряжение глагола {verb} ({present}){gloss}: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. Все 13 лиц, с огласовками. | {verb} ({present}){gloss} feʼlining tuslanishi: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Barcha 13 shaxs, harakatlari bilan. |
| 358 | `conj.active` | Действительный залог | Maʼlum nisbat |
| 359 | `conj.passive` | Страдательный залог | Majhul nisbat |
| 360 | `conj.person` | Лицо | Shaxs |
| 361 | `conj.past` | Прошедшее время | Oʻtgan zamon |
| 362 | `conj.present` | Настоящее-будущее время | Hozirgi-kelasi zamon |
| 363 | `conj.moods.present` | изъявительное | marfuʼ |
| 364 | `conj.moods.subjunctive` | сослагательное | mansub |
| 365 | `conj.moods.jussive` | повелительное (усечённое) | majzum |
| 366 | `conj.moodsLead` | Наклонения настоящего-будущего времени | Hozirgi-kelasi zamon mayllari |
| 367 | `conj.short.past` | Прош. | Oʻtgan |
| 368 | `conj.short.present` | Изъяв. | Marfuʼ |
| 369 | `conj.short.subjunctive` | Сослаг. | Mansub |
| 370 | `conj.short.jussive` | Усеч. | Majzum |
| 371 | `conj.short.passive_past` | Прош. | Oʻtgan |
| 372 | `conj.short.passive_present` | Наст.-буд. | Hoz.-kel. |
| 373 | `conj.showCol` | Показать колонку | Ustunni koʻrsatish |
| 374 | `conj.imperative` | Повелительная форма | Buyruq shakli |
| 375 | `conj.impersonal` | Непереходный глагол: в страдательном залоге только безличная форма (3-е лицо ед. ч. м. р., обычно с предлогом): | Oʻtimsiz feʼl: majhul nisbatda faqat shaxssiz shakl bor (III shaxs, birlik, muzakkar; odatda jar harfi bilan): |
| 376 | `conj.noForm` | нет формы | shakl yoʻq |
| 377 | `conj.persons` | я · ты м. · ты ж. · он · она · вы двое · они двое м. · они двое ж. · мы · вы м. · вы ж. · они м. · они ж. | men · sen (muz.) · sen (muan.) · u (muz.) · u (muan.) · siz ikkovingiz · ular ikkovi (muz.) · ular ikkovi (muan.) · biz · sizlar (muz.) · sizlar (muan.) · ular (muz.) · ular (muan.) |
| 378 | `conj.any` | Любой глагол | Istalgan feʼl |
| 379 | `conj.anyLead` | Проспрягать глагол, которого нет в списке: Qutrub запускается прямо в браузере. | Roʻyxatda yoʻq feʼlni tuslash: Qutrub toʻgʻridan-toʻgʻri brauzerda ishlaydi. |
| 380 | `conj.anyLoad` | Загрузить движок спряжения | Tuslash dasturini yuklash |
| 381 | `conj.anySize` | Загрузка около 7 МБ (Pyodide с cdn.jsdelivr.net и пакеты Qutrub с pypi.org), один раз — потом из кэша браузера. | Taxminan 7 MB yuklanadi (Pyodide — cdn.jsdelivr.net saytidan, Qutrub paketlari — pypi.org saytidan), bir marta — keyin brauzer keshidan olinadi. |
| 382 | `conj.anyLoading` | Загружаю Python и Qutrub… | Python va Qutrub yuklanmoqda… |
| 383 | `conj.anySteps` | Загружаю Python (Pyodide)… · Ставлю пакеты Qutrub… · Готово. | Python (Pyodide) yuklanmoqda… · Qutrub paketlari oʻrnatilmoqda… · Tayyor. |
| 384 | `conj.anyFail` | Не удалось загрузить движок. Проверьте интернет и попробуйте ещё раз. | Dasturni yuklab boʻlmadi. Internetni tekshirib, qaytadan urinib koʻring. |
| 385 | `conj.anyVerb` | Глагол в прошедшем времени, 3-е лицо ед. ч. м. р., с огласовками | Oʻtgan zamondagi feʼl (III shaxs, birlik, muzakkar), harakatlari bilan |
| 386 | `conj.anyVerbPh` | например: نَصَرَ | masalan: نَصَرَ |
| 387 | `conj.anyBab` | Огласовка второго корневого в настоящем-будущем (для глаголов I породы) | Hozirgi-kelasi zamonda ikkinchi oʻzak harfining harakati (I bob feʼllari uchun) |
| 388 | `conj.transBoth` | переходный и непереходный | oʻtimli va oʻtimsiz |
| 389 | `conj.anyTrans` | Переходность | Oʻtimlilik |
| 390 | `conj.anyGo` | Проспрягать | Tuslash |
| 391 | `conj.anyHint` | Глаголы II–X пород (например, عَلَّمَ، اِسْتَخْرَجَ) тоже можно; огласовка для них не важна. | II–X bob feʼllarini ham (masalan, عَلَّمَ، اِسْتَخْرَجَ) tuslash mumkin; ular uchun harakat muhim emas. |
| 392 | `conj.anyDict` | В словаре Qutrub есть: | Qutrub lugʻatida bor: |
| 393 | `conj.anyNoDict` | В словаре Qutrub такого глагола I породы нет — проверьте огласовку. | Qutrub lugʻatida bunday I bob feʼli yoʻq — harakatlarni tekshiring. |
| 394 | `conj.anyBad` | Qutrub не смог проспрягать этот глагол. Проверьте, что он в прошедшем времени (3-е л. ед. ч. м. р.) и с огласовками. | Qutrub bu feʼlni tuslay olmadi. Feʼl oʻtgan zamonda (III shaxs, birlik, muzakkar) va harakatlari bilan yozilganini tekshiring. |
| 395 | `conj.anyNeedAr` | Введите глагол арабскими буквами. | Feʼlni arab harflarida kiriting. |
| 396 | `conj.anyNeedBab` | Выберите огласовку настоящего-будущего времени. | Hozirgi-kelasi zamon harakatini tanlang. |
| 397 | `conj.anyNeedVowels` | Поставьте огласовки: у трёхбуквенного глагола они нужны (например, نَصَرَ, а не نصر). | Harakatlarni qoʻying: uch harfli feʼlda ular kerak (masalan, نَصَرَ, نصر emas). |
| 398 | `conj.anyNote` | Результат не проверен преподавателем. Для глаголов из списка выше лучше открыть их страницу. | Natija oʻqituvchi tomonidan tekshirilmagan. Yuqoridagi roʻyxatdagi feʼllar uchun ularning sahifasini ochgan maʼqul. |
| 399 | `conj.inList` | Этот глагол есть в списке: | Bu feʼl roʻyxatda bor: |
| 400 | `conj.creditQutrub` | Спряжение: Qutrub © Taha Zerrouki, GPL | Tuslash: Qutrub © Taha Zerrouki, GPL |
| 401 | `conj.creditArramooz` | Огласовка настоящего времени и переходность: словарь Arramooz © Taha Zerrouki, GPL | Hozirgi zamon harakati va oʻtimlilik: Arramooz lugʻati © Taha Zerrouki, GPL |
| 402 | `conj.creditCode` | исходный код | manba kodi |
| 403 | `conj.creditPyodide` | Python в браузере: Pyodide (MPL-2.0) | Brauzerda Python: Pyodide (MPL-2.0) |
| 404 | `conj.homeLabel` | Спряжение глагола | Feʼl tuslanishi |
| 405 | `conj.homePh` | введите глагол: كتب или «писать» | feʼlni kiriting: كتب |
| 406 | `conj.homeGo` | Показать | Koʻrsatish |
| 407 | `conj.dictLink` | спряжение | tuslanish |

## Панель учителя

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 408 | `teacher.title` | Панель учителя | Oʻqituvchi paneli |
| 409 | `teacher.logout` | Выйти | Chiqish |
| 410 | `teacher.classLabel` | Класс | Sinf |
| 411 | `teacher.newClassBtn` | + Новый класс | + Yangi sinf |
| 412 | `teacher.newClass` | Новый класс | Yangi sinf |
| 413 | `teacher.ncName` | Название | Nomi |
| 414 | `teacher.ncNamePh` | 2 курс ТГУВ, группа 1 | TDShU 2-kurs, 1-guruh |
| 415 | `teacher.ncYear` | Учебный год | Oʻquv yili |
| 416 | `teacher.ncYearPh` | 2026–2027 | 2026–2027 |
| 417 | `teacher.ncCount` | Сколько учеников | Oʻquvchilar soni |
| 418 | `teacher.ncNote` | Ученикам будут выданы коды 01, 02, … и случайные ПИН. ПИН показываются &lt;b&gt;один раз&lt;/b&gt; — сразу распечатайте лист с ПИН. | Oʻquvchilarga 01, 02, … kodlari va tasodifiy PIN beriladi. PIN &lt;b&gt;bir marta&lt;/b&gt; koʻrsatiladi — PIN varaqasini darhol chop eting. |
| 419 | `teacher.ncCreate` | Создать класс | Sinf yaratish |
| 420 | `teacher.tabs.stats` | Статистика | Statistika |
| 421 | `teacher.tabs.quizzes` | Викторины | Viktorinalar |
| 422 | `teacher.tabs.people` | Ученики и ПИН | Oʻquvchilar va PIN |
| 423 | `teacher.tabs.admin` | Администратор | Administrator |
| 424 | `teacher.period` | Период | Davr |
| 425 | `teacher.periods.d7` | Последние 7 дней | Oxirgi 7 kun |
| 426 | `teacher.periods.d30` | Последние 30 дней | Oxirgi 30 kun |
| 427 | `teacher.periods.sem` | С 1 сентября | 1-sentabrdan |
| 428 | `teacher.periods.all` | Всё время | Butun vaqt |
| 429 | `teacher.reload` | Обновить | Yangilash |
| 430 | `teacher.csv` | Скачать таблицу (CSV) | Jadvalni yuklab olish (CSV) |
| 431 | `teacher.print` | Печать | Chop etish |
| 432 | `teacher.pickClass` | Выберите класс. | Sinfni tanlang. |
| 433 | `teacher.quiz` | Викторина | Viktorina |
| 434 | `teacher.boardLink` | Табло для проектора ↗ | Proyektor uchun tablo ↗ |
| 435 | `teacher.allAnswersCsv` | Все ответы (CSV) | Barcha javoblar (CSV) |
| 436 | `teacher.quizNote` | Период — тот же, что во вкладке «Статистика». Табло показывает только псевдонимы и лучший результат каждого за 3 часа; откройте его на компьютере у проектора. | Davr «Statistika» boʻlimidagi bilan bir xil. Tabloda faqat taxalluslar va har kimning 3 soatdagi eng yaxshi natijasi koʻrsatiladi; uni proyektorga ulangan kompyuterda oching. |
| 437 | `teacher.addN` | Сколько добавить | Nechta qoʻshish |
| 438 | `teacher.addBtn` | Добавить учеников | Oʻquvchi qoʻshish |
| 439 | `teacher.resetSel` | Новый ПИН отмеченным | Belgilanganlarga yangi PIN |
| 440 | `teacher.namesBtn` | Настоящие имена… | Haqiqiy ismlar… |
| 441 | `teacher.namesNote` | Настоящие имена хранятся только в этом браузере, не на сервере. Чтобы видеть их на другом компьютере или в другом браузере, сохраните их в файл и загрузите там. | Haqiqiy ismlar serverda emas, faqat shu brauzerda saqlanadi. Ularni boshqa kompyuter yoki brauzerda koʻrish uchun faylga saqlang va u yerda yuklang. |
| 442 | `teacher.expBtn` | Сохранить имена в файл | Ismlarni faylga saqlash |
| 443 | `teacher.impBtn` | Загрузить имена из файла | Ismlarni fayldan yuklash |
| 444 | `teacher.expNone` | В этом браузере пока нет сохранённых имён. | Bu brauzerda hali saqlangan ismlar yoʻq. |
| 445 | `teacher.impReadFail` | Не удалось прочитать файл. Нужен файл, сохранённый кнопкой «Сохранить имена в файл». | Faylni oʻqib boʻlmadi. «Ismlarni faylga saqlash» tugmasi bilan saqlangan fayl kerak. |
| 446 | `teacher.impNoNames` | В файле нет имён учеников. | Faylda oʻquvchilar ismlari yoʻq. |
| 447 | `teacher.impConfirm` | Загрузить имена: классов — {c}, учеников — {n}? | Ismlar yuklansinmi: sinflar — {c}, oʻquvchilar — {n}? |
| 448 | `teacher.impClash` | Внимание: для классов ({n}) в этом браузере уже есть другие имена. Они будут заменены именами из файла. | Diqqat: {n} ta sinf uchun bu brauzerda boshqa ismlar bor. Ular fayldagi ismlar bilan almashtiriladi. |
| 449 | `teacher.impStoreFail` | Браузер не дал сохранить данные. | Brauzer maʼlumotlarni saqlashga ruxsat bermadi. |
| 450 | `teacher.impDone` | Готово: имена загружены. | Tayyor: ismlar yuklandi. |
| 451 | `teacher.namesTitle` | Настоящие имена (только на этом компьютере) | Haqiqiy ismlar (faqat shu kompyuterda) |
| 452 | `teacher.namesHelp` | По одной строке: код; имя и фамилия. Например: &lt;code&gt;07; Азиза Каримова&lt;/code&gt; | Har bir qatorda: kod; ism va familiya. Masalan: &lt;code&gt;07; Aziza Karimova&lt;/code&gt; |
| 453 | `teacher.save` | Сохранить | Saqlash |
| 454 | `teacher.roleTitle` | Сделать пользователя учителем | Foydalanuvchini oʻqituvchi qilish |
| 455 | `teacher.roleNote` | Пользователь сначала должен быть создан в Supabase → Authentication → Users. | Avval foydalanuvchi Supabase → Authentication → Users boʻlimida yaratilishi kerak. |
| 456 | `teacher.email` | Email | Email |
| 457 | `teacher.role` | Роль | Rol |
| 458 | `teacher.roles.teacher` | учитель | oʻqituvchi |
| 459 | `teacher.roles.user` | обычный пользователь | oddiy foydalanuvchi |
| 460 | `teacher.roles.admin` | администратор | administrator |
| 461 | `teacher.close` | Закрыть | Yopish |
| 462 | `teacher.pinsTitle` | ПИН учеников | Oʻquvchilarning PIN kodlari |
| 463 | `teacher.pinsWarn` | &lt;b&gt;Распечатайте или перепишите сейчас:&lt;/b&gt; после закрытия окна ПИН больше не будет видно (в базе хранится только зашифрованный вариант). Если потеряете — выдайте новый ПИН. | &lt;b&gt;Hozir chop eting yoki koʻchirib oling:&lt;/b&gt; oyna yopilgach PIN boshqa koʻrinmaydi (bazada faqat shifrlangan varianti saqlanadi). Yoʻqotsangiz — yangi PIN bering. |
| 464 | `teacher.pinsPrint` | Печать листа с ПИН | PIN varaqasini chop etish |
| 465 | `teacher.gateLogin` | Войдите по email учителя. | Oʻqituvchi emaili orqali kiring. |
| 466 | `teacher.login` | Войти | Kirish |
| 467 | `teacher.noRights` | У аккаунта {email} нет прав учителя. Обратитесь к администратору сайта. | {email} hisobida oʻqituvchi huquqlari yoʻq. Sayt administratoriga murojaat qiling. |
| 468 | `teacher.stale` | Вход устарел или нет связи. | Kirish muddati tugagan yoki aloqa yoʻq. |
| 469 | `teacher.loginAgain` | Войти снова | Qaytadan kirish |
| 470 | `teacher.archived` |  (архив) |  (arxiv) |
| 471 | `teacher.noClasses` | — классов пока нет — | — hozircha sinflar yoʻq — |
| 472 | `teacher.createFail` | Не удалось создать класс | Sinf yaratib boʻlmadi |
| 473 | `teacher.joinInfo` | Код класса для учеников: &lt;b class="join"&gt;{join}&lt;/b&gt; · вход: &lt;a href="{url}"&gt;{url}&lt;/a&gt; | Oʻquvchilar uchun sinf kodi: &lt;b class="join"&gt;{join}&lt;/b&gt; · kirish: &lt;a href="{url}"&gt;{url}&lt;/a&gt; |
| 474 | `teacher.th.all` | Отметить всех | Hammasini belgilash |
| 475 | `teacher.th.code` | Код | Kod |
| 476 | `teacher.th.nameLocal` | Имя (только у вас) | Ism (faqat sizda) |
| 477 | `teacher.th.nick` | Псевдоним (видят другие) | Taxallus (boshqalar koʻradi) |
| 478 | `teacher.th.sex` | Пол | Jins |
| 479 | `teacher.th.active` | Активен | Faol |
| 480 | `teacher.th.name` | Имя | Ism |
| 481 | `teacher.th.pin` | ПИН | PIN |
| 482 | `teacher.markOne` | Отметить {code} | Belgilash: {code} |
| 483 | `teacher.nickOf` | Псевдоним {code} | Taxallus: {code} |
| 484 | `teacher.sexOf` | Пол {code} | Jins: {code} |
| 485 | `teacher.activeOf` | Активен {code} | Faol: {code} |
| 486 | `teacher.sex.m` | м | yigit |
| 487 | `teacher.sex.f` | ж | qiz |
| 488 | `teacher.saved` | Сохранено ✓ | Saqlandi ✓ |
| 489 | `teacher.error` | Ошибка | Xato |
| 490 | `teacher.markFirst` | Отметьте учеников галочкой. | Oʻquvchilarni belgilang. |
| 491 | `teacher.resetConfirm` | Выдать новый ПИН {n} ученикам? Старые ПИН перестанут работать. | {n} ta oʻquvchiga yangi PIN berilsinmi? Eski PIN kodlar ishlamay qoladi. |
| 492 | `teacher.strip.classCode` | Код класса | Sinf kodi |
| 493 | `teacher.strip.myCode` | Мой код | Mening kodim |
| 494 | `teacher.strip.pin` | ПИН | PIN |
| 495 | `teacher.closePinsConfirm` | Вы распечатали или записали ПИН? После закрытия их не будет видно. | PIN kodlarni chop etdingizmi yoki yozib oldingizmi? Oyna yopilgach ular koʻrinmaydi. |
| 496 | `teacher.printTitle` | ПИН учеников — {name} | Oʻquvchilarning PIN kodlari — {name} |
| 497 | `teacher.printHint` | Если печать не открылась сама — нажмите Ctrl+P (на телефоне: «Поделиться» → «Печать» или «Сохранить в Файлы»). | Chop etish oʻzi ochilmasa — Ctrl+P ni bosing (telefonda: «Ulashish» → «Chop etish» yoki «Fayllarga saqlash»). |
| 498 | `teacher.popupBlocked` | Браузер заблокировал новое окно. Разрешите всплывающие окна для этого сайта и нажмите кнопку ещё раз. | Brauzer yangi oynani blokladi. Bu sayt uchun qalqib chiquvchi oynalarga ruxsat bering va tugmani yana bosing. |
| 499 | `teacher.createClass` | Создайте класс. | Sinf yarating. |
| 500 | `teacher.reportFail` | Не удалось загрузить отчёт. Проверьте интернет. | Hisobotni yuklab boʻlmadi. Internetni tekshiring. |
| 501 | `teacher.cols.name` | Имя | Ism |
| 502 | `teacher.cols.sex` | Пол | Jins |
| 503 | `teacher.cols.sessions` | Входов | Kirishlar |
| 504 | `teacher.cols.minutes` | Минут | Daqiqa |
| 505 | `teacher.cols.days` | Дней | Kunlar |
| 506 | `teacher.cols.known` | Знает слов | Biladigan soʻzlari |
| 507 | `teacher.cols.answers` | Ответов | Javoblar |
| 508 | `teacher.cols.acc` | Верно % | Toʻgʻri % |
| 509 | `teacher.cols.bad` | Ошибок | Xatolar |
| 510 | `teacher.cols.ct` | Тесты % | Testlar % |
| 511 | `teacher.cols.qz` | Викторины % | Viktorinalar % |
| 512 | `teacher.cols.qn` | Попыток викторин | Viktorina urinishlari |
| 513 | `teacher.cols.last` | Последний вход | Oxirgi kirish |
| 514 | `teacher.colTitle` | {l}: {v} мин. | {l}: {v} daq. |
| 515 | `teacher.noData` | пока нет данных | hozircha maʼlumot yoʻq |
| 516 | `teacher.units.min` | мин. | daq. |
| 517 | `teacher.units.words` | сл. | soʻz |
| 518 | `teacher.units.days` | дн. | kun |
| 519 | `teacher.units.times` | раз | marta |
| 520 | `teacher.units.errPct` | % ошибок | % xato |
| 521 | `teacher.units.people` | чел. | kishi |
| 522 | `teacher.noms.time` | ⏱ Больше всех времени | ⏱ Eng koʻp vaqt sarflagan |
| 523 | `teacher.noms.words` | 📚 Выучил больше слов | 📚 Eng koʻp soʻz oʻrgangan |
| 524 | `teacher.noms.acc` | 🎯 Самый точный (от 50 ответов) | 🎯 Eng aniq (50 ta javobdan) |
| 525 | `teacher.noms.days` | 📅 Больше всех дней занятий | 📅 Eng koʻp kun shugʻullangan |
| 526 | `teacher.noms.sessions` | 🔁 Чаще всех заходил | 🔁 Eng koʻp kirgan |
| 527 | `teacher.noms.ct` | 🧪 Лучший в тестах по словам | 🧪 Soʻzlar testlarida eng yaxshi |
| 528 | `teacher.noms.qz` | 🏆 Лучший в викторинах (средний %) | 🏆 Viktorinalarda eng yaxshi (oʻrtacha %) |
| 529 | `teacher.noms.help` | ⚠ Нужна помощь: низкая точность | ⚠ Yordam kerak: aniqlik past |
| 530 | `teacher.noms.idle` | 💤 Не занимались | 💤 Shugʻullanmaganlar |
| 531 | `teacher.allActive` | все занимались | hamma shugʻullangan |
| 532 | `teacher.kpi.active` | занимались | shugʻullangan |
| 533 | `teacher.kpi.minutes` | минут всего | jami daqiqa |
| 534 | `teacher.kpi.perLearner` | минут на ученика | bir oʻquvchiga daqiqa |
| 535 | `teacher.kpi.answers` | ответов | javob |
| 536 | `teacher.kpi.correct` | верных ответов | toʻgʻri javoblar |
| 537 | `teacher.kpi.sessions` | входов | kirish |
| 538 | `teacher.ofN` | {a} из {b} | {a}/{b} |
| 539 | `teacher.nominations` | Номинации | Nominatsiyalar |
| 540 | `teacher.nomsNote` | «Нужна помощь» и «Не занимались» видите только вы. Ученикам показываются только положительные номинации. | «Yordam kerak» va «Shugʻullanmaganlar»ni faqat siz koʻrasiz. Oʻquvchilarga faqat ijobiy nominatsiyalar koʻrsatiladi. |
| 541 | `teacher.learners` | Ученики | Oʻquvchilar |
| 542 | `teacher.learnersNote` | Нажмите на заголовок столбца, чтобы отсортировать, или на строку — чтобы открыть подробности. | Saralash uchun ustun sarlavhasini, batafsil maʼlumot uchun qatorni bosing. |
| 543 | `teacher.hardWords` | Трудные слова класса | Sinf uchun qiyin soʻzlar |
| 544 | `teacher.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 545 | `teacher.when` | Когда занимаются | Qachon shugʻullanishadi |
| 546 | `teacher.byWeekday` | По дням недели, минуты | Hafta kunlari boʻyicha, daqiqa |
| 547 | `teacher.weekdays` | пн · вт · ср · чт · пт · сб · вс | du · se · ch · pa · ju · sh · ya |
| 548 | `teacher.byHour` | По часам, минуты | Soatlar boʻyicha, daqiqa |
| 549 | `teacher.last30` | Последние 30 дней, минуты | Oxirgi 30 kun, daqiqa |
| 550 | `teacher.sexTitle` | Юноши и девушки | Yigitlar va qizlar |
| 551 | `teacher.sexCols.group` | Группа | Guruh |
| 552 | `teacher.sexCols.n` | Чел. | Kishi |
| 553 | `teacher.sexCols.minutes` | Минут | Daqiqa |
| 554 | `teacher.sexCols.known` | Знает слов | Biladigan soʻzlari |
| 555 | `teacher.sexCols.acc` | Точность % | Aniqlik % |
| 556 | `teacher.sexCols.ct` | Тесты % | Testlar % |
| 557 | `teacher.boys` | Юноши | Yigitlar |
| 558 | `teacher.girls` | Девушки | Qizlar |
| 559 | `teacher.sexMissing` | Не у всех указан пол: заполните его во вкладке «Ученики и ПИН». | Hammaning jinsi koʻrsatilmagan: uni «Oʻquvchilar va PIN» boʻlimida toʻldiring. |
| 560 | `teacher.sexNote` | Группа небольшая (n = {n}), поэтому разница даже в 10–15% может быть случайной. Это описание группы, а не вывод о юношах и девушках. | Guruh kichik (n = {n}), shuning uchun hatto 10–15% farq ham tasodifiy boʻlishi mumkin. Bu guruhning tavsifi, yigitlar va qizlar haqidagi xulosa emas. |
| 561 | `teacher.reportAt` | Отчёт на {t}. Подробно о викторинах — во вкладке «Викторины». | Hisobot vaqti: {t}. Viktorinalar haqida batafsil — «Viktorinalar» boʻlimida. |
| 562 | `teacher.wcols.word` | Слово | Soʻz |
| 563 | `teacher.wcols.tr` | Перевод | Tarjima |
| 564 | `teacher.wcols.studs` | Ошиблись | Xato qilganlar |
| 565 | `teacher.wcols.pct` | Ошибок % | Xato % |
| 566 | `teacher.noErrors` | Пока ошибок нет. | Hozircha xatolar yoʻq. |
| 567 | `teacher.noDataYet` | Пока нет данных. | Hozircha maʼlumot yoʻq. |
| 568 | `teacher.detail.head` | {name} · код {code} | {name} · kod {code} |
| 569 | `teacher.detail.boy` | юноша ·  | yigit ·  |
| 570 | `teacher.detail.girl` | девушка ·  | qiz ·  |
| 571 | `teacher.detail.line` | псевдоним «{nick}» · входов: &lt;b&gt;{s}&lt;/b&gt; · минут: &lt;b&gt;{m}&lt;/b&gt; · дней: &lt;b&gt;{d}&lt;/b&gt; · ответов: &lt;b&gt;{a}&lt;/b&gt; (верно {acc}%) · последний вход: {last} | taxallus «{nick}» · kirishlar: &lt;b&gt;{s}&lt;/b&gt; · daqiqa: &lt;b&gt;{m}&lt;/b&gt; · kunlar: &lt;b&gt;{d}&lt;/b&gt; · javoblar: &lt;b&gt;{a}&lt;/b&gt; (toʻgʻri {acc}%) · oxirgi kirish: {last} |
| 572 | `teacher.detail.decks` | Слова по наборам | Toʻplamlar boʻyicha soʻzlar |
| 573 | `teacher.detail.deckCols.deck` | Набор | Toʻplam |
| 574 | `teacher.detail.deckCols.seen` | Видел | Koʻrgan |
| 575 | `teacher.detail.deckCols.learn` | Учит | Oʻrganmoqda |
| 576 | `teacher.detail.deckCols.good` | Знает | Biladi |
| 577 | `teacher.detail.deckCols.done` | Выучил | Oʻrgangan |
| 578 | `teacher.detail.tests` | Тесты по словам | Soʻzlar testlari |
| 579 | `teacher.detail.testsLine` | {n} · средний {avg}% · лучший {best}% | {n} · oʻrtacha {avg}% · eng yaxshisi {best}% |
| 580 | `teacher.detail.noTests` | Тестов нет. | Testlar yoʻq. |
| 581 | `teacher.detail.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 582 | `teacher.detail.pctOf` | {p}% из {n} | {p}% ({n} tadan) |
| 583 | `teacher.detail.noAnswers` | Нет ответов. | Javoblar yoʻq. |
| 584 | `teacher.detail.hard` | Самые трудные слова | Eng qiyin soʻzlar |
| 585 | `teacher.detail.errors` | ошибок: {n} | xatolar: {n} |
| 586 | `teacher.detail.noErr` | Ошибок нет. | Xatolar yoʻq. |
| 587 | `teacher.detail.daily` | Минуты по дням | Kunlar boʻyicha daqiqa |
| 588 | `teacher.detail.noDays` | Нет занятий. | Mashgʻulotlar yoʻq. |
| 589 | `teacher.detail.quizzes` | Викторины | Viktorinalar |
| 590 | `teacher.att.none` | Попыток нет. | Urinishlar yoʻq. |
| 591 | `teacher.att.when` | Когда | Qachon |
| 592 | `teacher.att.learner` | Ученик | Oʻquvchi |
| 593 | `teacher.att.quiz` | Викторина | Viktorina |
| 594 | `teacher.att.correct` | Верно | Toʻgʻri |
| 595 | `teacher.att.points` | Очки | Ball |
| 596 | `teacher.att.time` | Время | Vaqt |
| 597 | `teacher.att.level` | Уровень | Daraja |
| 598 | `teacher.att.review` | Разбор | Tahlil |
| 599 | `teacher.att.reviewBest` | Разбор лучшей | Eng yaxshisi tahlili |
| 600 | `teacher.reviewLine` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {p} очков · {time} · {lvl} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {p} ball · {time} · {lvl} |
| 601 | `teacher.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |
| 602 | `teacher.noQData` | Нет данных. | Maʼlumot yoʻq. |
| 603 | `teacher.testMark` |  (тест) |  (test) |
| 604 | `teacher.attemptsN` | {title}{test} — попыток: {n} | {title}{test} — urinishlar: {n} |
| 605 | `teacher.qkpi.done` | прошли | topshirgan |
| 606 | `teacher.qkpi.attempts` | попыток | urinish |
| 607 | `teacher.qkpi.avgBest` | средний лучший результат | oʻrtacha eng yaxshi natija |
| 608 | `teacher.qcols.name` | Имя | Ism |
| 609 | `teacher.qcols.n` | Попыток | Urinishlar |
| 610 | `teacher.qcols.best` | Лучший | Eng yaxshisi |
| 611 | `teacher.qcols.points` | Очки | Ball |
| 612 | `teacher.qcols.last` | Последняя | Oxirgisi |
| 613 | `teacher.qParts` | Части викторины: доля верных | Viktorina qismlari: toʻgʻri javoblar ulushi |
| 614 | `teacher.noAnswersYet` | Пока нет ответов. | Hozircha javoblar yoʻq. |
| 615 | `teacher.allAttempts` | Все попытки | Barcha urinishlar |
| 616 | `teacher.hardQ` | Трудные вопросы | Qiyin savollar |
| 617 | `teacher.hardQNote` | Сверху — вопросы, в которых ошиблось больше всего учеников. | Yuqorida — eng koʻp oʻquvchi xato qilgan savollar. |
| 618 | `teacher.hq.q` | Вопрос | Savol |
| 619 | `teacher.hq.c` | Правильный ответ | Toʻgʻri javob |
| 620 | `teacher.hq.studs` | Ошиблись | Xato qilganlar |
| 621 | `teacher.hq.pct` | Ошибок % | Xato % |
| 622 | `teacher.exportFail` | Не удалось выгрузить. | Yuklab boʻlmadi. |
| 623 | `teacher.csvQ` | Код · Имя · Когда · Попытка · № · Часть · Вопрос · Ответ · Правильный · Верно · Секунд | Kod · Ism · Qachon · Urinish · № · Qism · Savol · Javob · Toʻgʻri javob · Toʻgʻrimi · Soniya |
| 624 | `teacher.csvCode` | Код | Kod |
| 625 | `teacher.yes` | да | ha |
| 626 | `teacher.no` | нет | yoʻq |
| 627 | `teacher.roleSaved` | Сохранено. | Saqlandi. |
| 628 | `teacher.noUser` | Такого пользователя нет. Сначала создайте его в Supabase → Authentication → Users. | Bunday foydalanuvchi yoʻq. Avval uni Supabase → Authentication → Users boʻlimida yarating. |
| 629 | `teacher.roleFail` | Не удалось сохранить. | Saqlab boʻlmadi. |

## Подвал

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 630 | `footer.author` | Автор | Muallif |
| 631 | `footer.authorRole` | преподаватель арабского языка | arab tili oʻqituvchisi |
| 632 | `footer.contacts` | Связаться | Bogʻlanish |
| 633 | `footer.about` | О сайте | Sayt haqida |
| 634 | `footer.privacy` | Конфиденциальность | Maxfiylik |
