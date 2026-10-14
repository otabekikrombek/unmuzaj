# Oʻzbekcha satrlarni tekshirish · Проверка узбекских строк

Здесь собраны **все строки интерфейса на узбекском** (латиница) рядом с русскими — 527 строк.
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
| 17 | `nav.login` | Войти | Kirish |
| 18 | `nav.me` | Мой прогресс | Mening natijalarim |
| 19 | `nav.teacher` | Панель учителя | Oʻqituvchi paneli |
| 20 | `nav.menu` | Меню | Menyu |
| 21 | `nav.close` | Закрыть | Yopish |
| 22 | `nav.home` | Главная | Bosh sahifa |
| 23 | `nav.sections` | Разделы сайта | Sayt boʻlimlari |
| 24 | `nav.more` | Ещё | Yana |
| 25 | `nav.skip` | К содержанию | Asosiy qismga oʻtish |
| 26 | `nav.youAreHere` | Вы здесь | Siz shu yerdasiz |

## Группы меню

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 27 | `navGroups.learn` | Учить | Oʻrganish |
| 28 | `navGroups.tasks` | Задания | Topshiriqlar |
| 29 | `navGroups.read` | Читать | Oʻqish |
| 30 | `navGroups.courses` | Курсы | Kurslar |

## Окно «Оформление»

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 31 | `look.button` | Оформление | Koʻrinish |
| 32 | `look.title` | Оформление | Koʻrinish |
| 33 | `look.mode` | Режим | Rejim |
| 34 | `look.modes.light` | Светлая | Yorugʻ |
| 35 | `look.modes.dark` | Тёмная | Qorongʻi |
| 36 | `look.modes.auto` | Как в системе | Tizimdagidek |
| 37 | `look.palette` | Цвета | Ranglar |
| 38 | `look.palettes.turquoise` | Бирюза | Feruza |
| 39 | `look.palettes.lapis` | Лазурит | Lojuvard |
| 40 | `look.palettes.parchment` | Пергамент | Pergament |
| 41 | `look.palettes.contrast` | Контраст | Kontrast |
| 42 | `look.paletteHint.turquoise` | по умолчанию | standart |
| 43 | `look.paletteHint.lapis` | синяя | koʻk |
| 44 | `look.paletteHint.parchment` | тёплая, книжная | iliq, kitobiy |
| 45 | `look.paletteHint.contrast` | для слабого зрения | zaif koʻruvchilar uchun |
| 46 | `look.fontSize` | Размер текста | Matn oʻlchami |
| 47 | `look.arSize` | Арабский шрифт | Arabcha shrift |
| 48 | `look.sizes` | А− · А · А+ · А++ | A− · A · A+ · A++ |
| 49 | `look.sizeNames` | меньше · обычный · крупнее · самый крупный | kichikroq · odatiy · kattaroq · eng katta |
| 50 | `look.sample` | Пример: | Namuna: |
| 51 | `look.reset` | Сбросить | Asliga qaytarish |
| 52 | `look.saved` | Настройки сохраняются на этом устройстве. | Sozlamalar shu qurilmada saqlanadi. |

## Поиск по сайту

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 53 | `search.button` | Поиск | Qidirish |
| 54 | `search.hotkey` | Поиск по сайту ( / или Ctrl+K ) | Saytdan qidirish ( / yoki Ctrl+K ) |
| 55 | `search.label` | Искать на сайте | Saytdan qidirish |
| 56 | `search.placeholder` | слово, тема, задание… например: книга, كتاب | soʻz, mavzu, topshiriq… masalan: كتاب |
| 57 | `search.hint` | Ищите по-русски или по-арабски — с огласовками или без. Клавиши: / или Ctrl+K — открыть, ↑ ↓ — выбрать, Enter — перейти, Esc — закрыть. | Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz (soʻzlarning tarjimalari hozircha rus tilida). Tugmalar: / yoki Ctrl+K — ochish, ↑ ↓ — tanlash, Enter — oʻtish, Esc — yopish. |
| 58 | `search.loading` | Загрузка… | Yuklanmoqda… |
| 59 | `search.empty` | Ничего не нашлось. Попробуйте другое слово или откройте словарь. | Hech narsa topilmadi. Boshqa soʻz bilan urinib koʻring yoki lugʻatni oching. |
| 60 | `search.noIndex` | Поиск по страницам появится после публикации сайта (сейчас ищутся только слова). | Sahifalar boʻyicha qidiruv sayt eʼlon qilingach ishlaydi (hozircha faqat soʻzlar qidiriladi). |
| 61 | `search.groups.words` | Слова | Soʻzlar |
| 62 | `search.groups.tasks` | Задания | Topshiriqlar |
| 63 | `search.groups.sections` | Разделы | Boʻlimlar |
| 64 | `search.groups.grammar` | Грамматика | Grammatika |
| 65 | `search.groups.texts` | Тексты | Matnlar |
| 66 | `search.groups.articles` | Статьи | Maqolalar |
| 67 | `search.allInDict` | Все совпадения в словаре → | Lugʻatdagi barcha mosliklar → |
| 68 | `search.found` | Найдено: {n} | Topildi: {n} |

## Описания разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 69 | `sectionsDesc.words` | Карточки с интервальным повторением и тест на 20 вопросов. | Oraliqli takrorlash kartochkalari va 20 ta savollik test. |
| 70 | `sectionsDesc.quizzes` | Викторины по текстам уроков и темам. | Dars matnlari va mavzular boʻyicha viktorinalar. |
| 71 | `sectionsDesc.tests` | Контрольные и пробный экзамен. | Nazorat ishlari va sinov imtihoni. |
| 72 | `sectionsDesc.exercises` | Интерактивные упражнения по грамматике. | Grammatika boʻyicha interaktiv mashqlar. |
| 73 | `sectionsDesc.grammar` | Короткие памятки с примерами. | Misollar bilan qisqa eslatmalar. |
| 74 | `sectionsDesc.texts` | Тексты для чтения с переводом. | Tarjimasi bilan oʻqish uchun matnlar. |
| 75 | `sectionsDesc.courses` | Упорядоченные подборки заданий. | Tartib bilan joylashgan topshiriqlar toʻplamlari. |
| 76 | `sectionsDesc.dictionary` | Тематический словарь с поиском. | Qidiruvli mavzuli lugʻat. |

## Общие слова

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 77 | `common.soon` | Скоро | Tez orada |
| 78 | `common.soonLong` | Материалы этого раздела добавляются постепенно. | Bu boʻlim materiallari asta-sekin qoʻshib boriladi. |
| 79 | `common.gradually` | Материалы добавляются постепенно. | Materiallar asta-sekin qoʻshib boriladi. |
| 80 | `common.open` | Открыть | Ochish |
| 81 | `common.start` | Начать | Boshlash |
| 82 | `common.items` | {n} материала | {n} ta material |
| 83 | `common.words` | {n} слова | {n} ta soʻz |
| 84 | `common.decks` | {n} набора | {n} ta toʻplam |
| 85 | `common.courses` | {n} курса | {n} ta kurs |
| 86 | `common.tasks` | {n} задания | {n} ta topshiriq |
| 87 | `common.level` | Уровень | Daraja |
| 88 | `common.added` | Добавлено | Qoʻshilgan |
| 89 | `common.oldVersion` | Открывается прежняя версия задания. Скоро она переедет на новый сайт. | Topshiriqning avvalgi (rus tilidagi) versiyasi ochiladi. Tez orada u yangi saytga koʻchiriladi. |
| 90 | `common.back` | Назад | Orqaga |
| 91 | `common.loading` | Загрузка… | Yuklanmoqda… |
| 92 | `common.tryExercises` | Пока можно потренироваться в разделе &lt;a href="{href}"&gt;«Упражнения»&lt;/a&gt;. | Hozircha &lt;a href="{href}"&gt;«Mashqlar»&lt;/a&gt; boʻlimida mashq qilishingiz mumkin. |

## Типы заданий

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 93 | `kinds.deck` | Слова | Soʻzlar |
| 94 | `kinds.quiz` | Викторина | Viktorina |
| 95 | `kinds.test` | Тест | Test |
| 96 | `kinds.exercise` | Упражнение | Mashq |
| 97 | `kinds.grammar` | Грамматика | Grammatika |
| 98 | `kinds.text` | Текст | Matn |

## Главная страница

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 99 | `home.lead` | Сайт для изучения арабского языка: слова, викторины, упражнения и грамматика. Начинайте без регистрации. | Arab tilini oʻrganish uchun sayt: soʻzlar, viktorinalar, mashqlar va grammatika. Roʻyxatdan oʻtmasdan boshlang. |
| 100 | `home.gloss` | &lt;i&gt;ал-унмӯзадж&lt;/i&gt; — «образец, введение». Так называлась краткая грамматика аз-Замахшари для начинающих. | &lt;i&gt;al-unmuzaj&lt;/i&gt; — «namuna, kirish». Zamaxshariyning boshlovchilar uchun yozgan qisqa grammatikasi shunday nomlangan. |
| 101 | `home.h1` | Арабский язык — с первого слова | Arab tili — birinchi soʻzdan |
| 102 | `home.startWords` | Учить слова | Soʻz oʻrganish |
| 103 | `home.iAmInClass` | Я из класса | Men sinfdanman |
| 104 | `home.cardLabel` | Карточка-пример: нажмите, чтобы увидеть перевод | Namuna kartochka: tarjimani koʻrish uchun bosing |
| 105 | `home.cardHint` | нажмите, чтобы увидеть перевод | tarjimani koʻrish uchun bosing |
| 106 | `home.otherWord` | Другое слово | Boshqa soʻz |
| 107 | `home.allCards` | Все карточки | Barcha kartochkalar |
| 108 | `home.contents` | Содержание | Mundarija |
| 109 | `home.fresh` | Новое на сайте | Saytdagi yangiliklar |
| 110 | `home.courses` | Курсы | Kurslar |

## Страницы разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 111 | `pages.words.desc` | Наборы арабских слов с карточками, интервальным повторением и тестом. | Kartochkalar, oraliqli takrorlash va testli arabcha soʻzlar toʻplamlari. |
| 112 | `pages.words.lead` | Карточки подбирают слова сами: новые и трудные чаще, выученные реже. Без входа прогресс хранится на этом устройстве, после входа — в облаке. | Kartochkalar soʻzlarni oʻzi tanlaydi: yangi va qiyin soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Kirmasangiz, natijalar shu qurilmada, kirsangiz — bulutda saqlanadi. |
| 113 | `pages.quizzes.desc` | Викторины по арабскому языку: тексты уроков, лексика, грамматика. | Arab tili boʻyicha viktorinalar: dars matnlari, leksika, grammatika. |
| 114 | `pages.tests.desc` | Тесты и пробный экзамен по арабскому языку. | Arab tili boʻyicha testlar va sinov imtihoni. |
| 115 | `pages.tests.wordTest` | Тест по словам: {title} | Soʻzlar testi: {title} |
| 116 | `pages.tests.q20` | 20 вопросов | 20 ta savol |
| 117 | `pages.tests.wordTestMeta` | Вопросы выбираются по вашим трудным и новым словам. | Savollar siz uchun qiyin va yangi soʻzlardan tanlanadi. |
| 118 | `pages.exercises.desc` | Интерактивные упражнения по арабской грамматике. | Arab grammatikasi boʻyicha interaktiv mashqlar. |
| 119 | `pages.courses.desc` | Курсы арабского языка: задания по порядку. | Arab tili kurslari: topshiriqlar tartib bilan. |
| 120 | `pages.courses.forWhom` | Для кого: | Kim uchun: |
| 121 | `pages.dictionary.desc` | Тематический арабско-русский словарь с поиском: огласовки, множественное число, пары антонимов. | Qidiruvli mavzuli arabcha-ruscha lugʻat: harakatlar, koʻplik shakli, antonim juftlari. |
| 122 | `pages.dictionary.lead` | {words} по {topics}. Ищите по-русски или по-арабски — с огласовками или без. | {words}, {topics}. Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz. |
| 123 | `pages.dictionary.topics` | {n} темам | {n} ta mavzu |
| 124 | `pages.dictionary.search` | Поиск | Qidirish |
| 125 | `pages.dictionary.placeholder` | например: книга, كتاب | masalan: كتاب |
| 126 | `pages.dictionary.found` | Найдено: {n} | Topildi: {n} |
| 127 | `pages.notFound.title` | Страница не найдена | Sahifa topilmadi |
| 128 | `pages.notFound.h1` | Такой страницы нет | Bunday sahifa yoʻq |
| 129 | `pages.notFound.text` | Возможно, адрес изменился. Начните с &lt;a href="{home}"&gt;главной страницы&lt;/a&gt; или откройте &lt;a href="{words}"&gt;слова&lt;/a&gt;. | Ehtimol, manzil oʻzgargan. &lt;a href="{home}"&gt;Bosh sahifadan&lt;/a&gt; boshlang yoki &lt;a href="{words}"&gt;soʻzlarni&lt;/a&gt; oching. |

## О сайте

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 130 | `about.title` | О сайте | Sayt haqida |
| 131 | `about.desc` | Unmuzaj — сайт для изучения арабского языка. Автор — {author}. | Unmuzaj — arab tilini oʻrganish uchun sayt. Muallif — {author}. |
| 132 | `about.intro` | &lt;b&gt;Unmuzaj&lt;/b&gt; — сайт для всех, кто учит арабский язык: слова с карточками, викторины, тесты, упражнения, а со временем — грамматика и тексты для чтения. Всем можно пользоваться без регистрации. | &lt;b&gt;Unmuzaj&lt;/b&gt; — arab tilini oʻrganayotgan barcha uchun sayt: kartochkali soʻzlar, viktorinalar, testlar, mashqlar, keyinchalik esa grammatika va oʻqish uchun matnlar. Saytdan roʻyxatdan oʻtmasdan foydalanish mumkin. |
| 133 | `about.whyH` | Почему «الأُنْمُوذَجُ» | Nega «الأُنْمُوذَجُ» |
| 134 | `about.why` | «Ал-Унмӯзадж фӣ-н-наҳв» (الأُنْمُوذَجُ فِي النَّحْوِ) — краткая грамматика арабского языка для начинающих, которую написал аз-Замахшари (1074–1143), учёный из Хорезма, автор знаменитого «ал-Муфассаля». Слово «унмӯзадж» значит «образец, введение». Так и этот сайт задуман как введение в арабский язык. | «Al-Unmuzaj fin-nahv» (الأُنْمُوذَجُ فِي النَّحْوِ) — boshlovchilar uchun arab tilining qisqa grammatikasi. Uni xorazmlik olim, mashhur «Al-Mufassal» asarining muallifi az-Zamaxshariy (1074–1143) yozgan. «Unmuzaj» soʻzi «namuna, kirish» degan maʼnoni bildiradi. Bu sayt ham arab tiliga kirish sifatida oʻylab topilgan. |
| 135 | `about.forWhomH` | Для кого | Kim uchun |
| 136 | `about.forWhom` | Для студентов-востоковедов и всех, кто изучает арабский самостоятельно. Преподаватели могут вести на сайте свои классы: ученики входят по коду и ПИН, а преподаватель видит их прогресс. | Sharqshunos talabalar va arab tilini mustaqil oʻrganayotgan barcha uchun. Oʻqituvchilar saytda oʻz sinflarini yuritishi mumkin: oʻquvchilar kod va PIN orqali kiradi, oʻqituvchi esa ularning natijalarini koʻradi. |
| 137 | `about.authorH` | Автор | Muallif |
| 138 | `about.notice` | Материалы добавляются постепенно. Нашли ошибку — напишите автору. | Materiallar asta-sekin qoʻshib boriladi. Xato topsangiz — muallifga yozing. |

## Конфиденциальность

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 139 | `privacy.title` | Конфиденциальность | Maxfiylik |
| 140 | `privacy.desc` | Какие данные собирает сайт Unmuzaj и как их удалить. | Unmuzaj sayti qanday maʼlumotlarni yigʻadi va ularni qanday oʻchirish mumkin. |
| 141 | `privacy.draft` | Черновик. Текст будет уточнён. | Qoralama. Matn aniqlashtiriladi. |
| 142 | `privacy.guestH` | Без входа | Kirmasdan |
| 143 | `privacy.guest` | Если вы не входите на сайт, мы ничего о вас не сохраняем. Ваш прогресс по карточкам хранится только в браузере на вашем устройстве. На сайте нет рекламы и сторонних счётчиков посещений. | Agar saytga kirmasangiz, biz siz haqingizda hech narsa saqlamaymiz. Kartochkalar boʻyicha natijalaringiz faqat qurilmangizdagi brauzerda saqlanadi. Saytda reklama va begona tashriflar hisoblagichlari yoʻq. |
| 144 | `privacy.classH` | Ученики классов | Sinf oʻquvchilari |
| 145 | `privacy.class` | Ученик входит по коду класса, своему коду и ПИН. В базе хранятся только код, псевдоним, пол (по желанию преподавателя) и учебная статистика: какие задания выполнены, ответы, время занятий. Настоящие имена в базу не записываются: соответствие «код — имя» есть только у преподавателя. | Oʻquvchi sinf kodi, oʻz kodi va PIN orqali kiradi. Bazada faqat kod, taxallus, jins (oʻqituvchi xohlasa) va oʻquv statistikasi saqlanadi: qaysi topshiriqlar bajarilgan, javoblar, mashgʻulot vaqti. Haqiqiy ismlar bazaga yozilmaydi: «kod — ism» mosligi faqat oʻqituvchida boʻladi. |
| 146 | `privacy.emailH` | Вход по email | Email orqali kirish |
| 147 | `privacy.email` | Хранятся email (для входа), псевдоним и учебная статистика. | Email (kirish uchun), taxallus va oʻquv statistikasi saqlanadi. |
| 148 | `privacy.whereH` | Где хранятся данные | Maʼlumotlar qayerda saqlanadi |
| 149 | `privacy.where` | В базе данных Supabase (сервер в Европейском союзе, Франкфурт). | Supabase maʼlumotlar bazasida (server Yevropa Ittifoqida, Frankfurtda). |
| 150 | `privacy.deleteH` | Удаление | Oʻchirish |
| 151 | `privacy.delete` | Чтобы удалить свои данные, напишите автору: {email} или {telegram}. Ученик класса может также обратиться к своему преподавателю. | Maʼlumotlaringizni oʻchirish uchun muallifga yozing: {email} yoki {telegram}. Sinf oʻquvchisi oʻz oʻqituvchisiga ham murojaat qilishi mumkin. |

## Вход

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 152 | `login.title` | Вход | Kirish |
| 153 | `login.desc` | Вход на сайт Unmuzaj: для учеников класса и по email. | Unmuzaj saytiga kirish: sinf oʻquvchilari uchun va email orqali. |
| 154 | `login.lead` | Заниматься можно и без входа. Вход нужен, чтобы прогресс сохранялся в облаке и был виден на любом устройстве. | Kirmasdan ham shugʻullanish mumkin. Kirish natijalaringiz bulutda saqlanishi va istalgan qurilmada koʻrinishi uchun kerak. |
| 155 | `login.classH` | Я из класса | Men sinfdanman |
| 156 | `login.classNote` | Код класса, свой код и ПИН дал преподаватель. | Sinf kodi, oʻz kodingiz va PIN-ni oʻqituvchi beradi. |
| 157 | `login.join` | Код класса | Sinf kodi |
| 158 | `login.joinPh` | например, K7MQ2D | masalan, K7MQ2D |
| 159 | `login.code` | Мой код | Mening kodim |
| 160 | `login.pin` | ПИН | PIN |
| 161 | `login.remember` | Запомнить меня на этом телефоне | Meni shu telefonda eslab qolish |
| 162 | `login.rememberNote` | (на общем компьютере снимите галочку) | (umumiy kompyuterda belgini olib tashlang) |
| 163 | `login.enterClass` | Войти в класс | Sinfga kirish |
| 164 | `login.mailH` | Вход по email | Email orqali kirish |
| 165 | `login.mailNote` | Для преподавателей и тех, кто уже зарегистрирован. | Oʻqituvchilar va roʻyxatdan oʻtganlar uchun. |
| 166 | `login.email` | Email | Email |
| 167 | `login.pass` | Пароль | Parol |
| 168 | `login.enter` | Войти | Kirish |
| 169 | `login.regLater` | Открытая регистрация по email появится позже. Пока занимайтесь как гость: прогресс сохранится на вашем устройстве. | Email orqali ochiq roʻyxatdan oʻtish keyinroq paydo boʻladi. Hozircha mehmon sifatida shugʻullaning: natijalaringiz qurilmangizda saqlanadi. |
| 170 | `login.already` | Вы уже вошли. &lt;a href="{href}"&gt;Мой прогресс&lt;/a&gt; | Siz allaqachon kirgansiz. &lt;a href="{href}"&gt;Mening natijalarim&lt;/a&gt; |
| 171 | `login.fill` | Заполните все поля. ПИН — 4 цифры. | Barcha maydonlarni toʻldiring. PIN — 4 ta raqam. |
| 172 | `login.checking` | Проверяю… | Tekshirilmoqda… |
| 173 | `login.errClass` | Класс с таким кодом не найден. Проверьте код класса. | Bunday kodli sinf topilmadi. Sinf kodini tekshiring. |
| 174 | `login.errLocked` | Слишком много неверных попыток. Подождите 10 минут. | Notoʻgʻri urinishlar juda koʻp. 10 daqiqa kuting. |
| 175 | `login.errPin` | Неверный код или ПИН. Если забыли ПИН — спросите преподавателя. | Kod yoki PIN notoʻgʻri. PIN-ni unutgan boʻlsangiz, oʻqituvchidan soʻrang. |
| 176 | `login.offline` | Нет связи с сервером. Проверьте интернет и попробуйте ещё раз. | Server bilan aloqa yoʻq. Internetni tekshirib, qaytadan urinib koʻring. |
| 177 | `login.errMail` | Неверный email или пароль. | Email yoki parol notoʻgʻri. |
| 178 | `login.failMail` | Не удалось войти: {err} | Kirib boʻlmadi: {err} |

## Мой прогресс

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 179 | `me.title` | Мой прогресс | Mening natijalarim |
| 180 | `me.guest` | Вы занимаетесь как гость: прогресс хранится только на этом устройстве. | Siz mehmon sifatida shugʻullanyapsiz: natijalar faqat shu qurilmada saqlanadi. |
| 181 | `me.login` | Войти | Kirish |
| 182 | `me.headPin` | &lt;b&gt;{nick}&lt;/b&gt; · класс «{cls}» · код {code} | &lt;b&gt;{nick}&lt;/b&gt; · «{cls}» sinfi · kod {code} |
| 183 | `me.totals` | Всего занятий: &lt;b&gt;{v}&lt;/b&gt; · активное время: &lt;b&gt;{m}&lt;/b&gt; мин. | Jami mashgʻulotlar: &lt;b&gt;{v}&lt;/b&gt; · faol vaqt: &lt;b&gt;{m}&lt;/b&gt; daq. |
| 184 | `me.words` | Слова | Soʻzlar |
| 185 | `me.know` | знаю {k} из {n} | bilaman: {k}/{n} |
| 186 | `me.deckMeta` | видел {seen} · учу {learn} · выучено {done} | koʻrilgan {seen} · oʻrganyapman {learn} · oʻrganilgan {done} |
| 187 | `me.lastTests` | Последние тесты по словам | Soʻzlar boʻyicha oxirgi testlar |
| 188 | `me.testLine` | {date} — {c} из {t} | {date} — {c}/{t} |
| 189 | `me.noTests` | Тестов пока нет. | Hozircha testlar yoʻq. |
| 190 | `me.quizzes` | Викторины | Viktorinalar |
| 191 | `me.quizLine` | {date}: &lt;b&gt;{c} из {t}&lt;/b&gt;, {p} очков, {time} | {date}: &lt;b&gt;{c}/{t}&lt;/b&gt;, {p} ball, {time} |
| 192 | `me.noQuizzes` | Викторин пока нет. | Hozircha viktorinalar yoʻq. |
| 193 | `me.review` | Разбор | Tahlil |
| 194 | `me.teacher` | Панель учителя | Oʻqituvchi paneli |
| 195 | `me.logout` | Выйти | Chiqish |
| 196 | `me.stale` | Вход устарел. &lt;a href="{href}"&gt;Войдите снова&lt;/a&gt;. | Kirish muddati tugagan. &lt;a href="{href}"&gt;Qaytadan kiring&lt;/a&gt;. |
| 197 | `me.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |
| 198 | `me.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |

## Карточки слов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 199 | `deck.descTail` | {words} с карточками и тестом. | {words}: kartochkalar va test. |
| 200 | `deck.tabs.cards` | Карточки | Kartochkalar |
| 201 | `deck.tabs.test` | Тест · 20 вопросов | Test · 20 ta savol |
| 202 | `deck.tabs.hard` | Мои трудные | Qiyin soʻzlarim |
| 203 | `deck.tabs.board` | Рейтинг класса | Sinf reytingi |
| 204 | `deck.which` | Какие слова показывать | Qaysi soʻzlarni koʻrsatish |
| 205 | `deck.all` | Все слова | Barcha soʻzlar |
| 206 | `deck.onlyHard` | Только трудные | Faqat qiyinlari |
| 207 | `deck.dir` | Направление | Yoʻnalish |
| 208 | `deck.dirs` | ар → рус · рус → ар · вперемешку | arabcha → tarjima · tarjima → arabcha · aralash |
| 209 | `deck.no` | Не знаю | Bilmayman |
| 210 | `deck.yes` | Знаю | Bilaman |
| 211 | `deck.below` | Новые слова и слова с ошибками попадаются чаще, выученные — реже. Нажмите «Знаю», если вспомнили перевод сами; иначе — «Не знаю», и ответ покажется. | Yangi va xato qilingan soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Tarjimani oʻzingiz eslasangiz, «Bilaman»ni bosing; aks holda «Bilmayman»ni bosing — javob koʻrsatiladi. |
| 212 | `deck.net.guest` | Вы занимаетесь как гость — прогресс хранится только на этом устройстве. &lt;a href="{login}"&gt;Войти&lt;/a&gt; | Siz mehmon sifatida shugʻullanyapsiz — natijalar faqat shu qurilmada saqlanadi. &lt;a href="{login}"&gt;Kirish&lt;/a&gt; |
| 213 | `deck.net.saved` | ☁ Сохранено | ☁ Saqlandi |
| 214 | `deck.net.pending` | ☁ Сохраняю… | ☁ Saqlanmoqda… |
| 215 | `deck.net.offline` | ⚠ Нет связи — ответы сохранятся, когда появится интернет | ⚠ Aloqa yoʻq — javoblar internet paydo boʻlganda saqlanadi |
| 216 | `deck.net.relogin` | ⚠ Вход устарел. &lt;a href="{login}"&gt;Войдите снова&lt;/a&gt; | ⚠ Kirish muddati tugagan. &lt;a href="{login}"&gt;Qaytadan kiring&lt;/a&gt; |
| 217 | `deck.lv.new` | новые | yangi |
| 218 | `deck.lv.learn` | учу | oʻrganyapman |
| 219 | `deck.lv.good` | знаю | bilaman |
| 220 | `deck.lv.done` | выучено | oʻrganilgan |
| 221 | `deck.passed` | пройдено {k} из {n} | koʻrildi: {k}/{n} |
| 222 | `deck.inSet` | Слов в подборке: {n}, из них новых: {k} | Toʻplamda {n} ta soʻz, ulardan yangi: {k} |
| 223 | `deck.noHard` | Трудных слов пока нет | Hozircha qiyin soʻzlar yoʻq |
| 224 | `deck.empty` | Здесь пусто | Bu yer boʻsh |
| 225 | `deck.tagNew` | новое слово | yangi soʻz |
| 226 | `deck.tagErr` | ошибок: {n} | xatolar: {n} |
| 227 | `deck.tagRep` | повторение | takrorlash |
| 228 | `deck.tapHint` | нажмите, чтобы увидеть ответ | javobni koʻrish uchun bosing |
| 229 | `deck.remember` | Запомните ответ и нажмите любую кнопку | Javobni eslab qoling va istalgan tugmani bosing |
| 230 | `deck.grades` | Отлично · Хорошо · Удовлетворительно · Нужно повторить | Aʼlo · Yaxshi · Qoniqarli · Takrorlash kerak |
| 231 | `deck.result` | {s} из {n} | {s}/{n} |
| 232 | `deck.resultNote` | {lvl}. Слова с ошибками теперь будут попадаться чаще. | {lvl}. Xato qilingan soʻzlar endi tez-tez chiqadi. |
| 233 | `deck.again` | Пройти ещё раз | Yana bir bor |
| 234 | `deck.qOf` | Вопрос {i} из {n} · верно: {s} | Savol {i}/{n} · toʻgʻri: {s} |
| 235 | `deck.hardH` | Слова, в которых вы ошибались | Siz xato qilgan soʻzlar |
| 236 | `deck.relearned` | ✓ — слово уже выучено заново. | ✓ — soʻz qayta oʻrganildi. |
| 237 | `deck.noErr` | Ошибок пока нет. | Hozircha xatolar yoʻq. |
| 238 | `deck.boardLogin` | Рейтинг виден ученикам класса. &lt;a href="{href}"&gt;Войти в класс&lt;/a&gt; | Reyting sinf oʻquvchilariga koʻrinadi. &lt;a href="{href}"&gt;Sinfga kirish&lt;/a&gt; |
| 239 | `deck.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 240 | `deck.boardEmpty` | Пока пусто. | Hozircha boʻsh. |
| 241 | `deck.bTime` | Больше всех занимались | Eng koʻp shugʻullanganlar |
| 242 | `deck.bKnown` | Знают больше всего слов | Eng koʻp soʻz biladiganlar |
| 243 | `deck.bAcc` | Самые точные (от 50 ответов) | Eng aniqlari (50 ta javobdan) |
| 244 | `deck.uMin` | мин. | daq. |
| 245 | `deck.uWords` | сл. | soʻz |
| 246 | `deck.bNote` | Время считается только активное: когда вы отвечаете на карточки. | Faqat faol vaqt hisoblanadi: kartochkalarga javob berayotgan vaqtingiz. |
| 247 | `deck.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |

## Викторины и тесты

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 248 | `quiz.questions` | {n} вопросов | {n} ta savol |
| 249 | `quiz.start` | Начать ▶ | Boshlash ▶ |
| 250 | `quiz.whoPin` | Результат сохранится: &lt;b&gt;{name}&lt;/b&gt; · класс «{cls}» | Natija saqlanadi: &lt;b&gt;{name}&lt;/b&gt; · «{cls}» sinfi |
| 251 | `quiz.whoEmail` | Результат сохранится в вашем аккаунте: &lt;b&gt;{name}&lt;/b&gt; | Natija hisobingizda saqlanadi: &lt;b&gt;{name}&lt;/b&gt; |
| 252 | `quiz.whoGuest` | Вы проходите как гость: результат останется только на этом устройстве и не попадёт в рейтинг класса. | Siz mehmon sifatida oʻtyapsiz: natija faqat shu qurilmada qoladi va sinf reytingiga kirmaydi. |
| 253 | `quiz.login` | Войти в класс | Sinfga kirish |
| 254 | `quiz.guestBest` | Ваш лучший результат на этом устройстве: {p} очков ({c} из {t}). | Shu qurilmadagi eng yaxshi natijangiz: {p} ball ({c}/{t}). |
| 255 | `quiz.sound` | 🔊 Звук | 🔊 Ovoz |
| 256 | `quiz.soundOff` | 🔇 Без звука | 🔇 Ovozsiz |
| 257 | `quiz.part` | Часть {i} из {n} | Qism {i}/{n} |
| 258 | `quiz.toQuestions` | К вопросам ▶ | Savollarga ▶ |
| 259 | `quiz.text` | 📄 Текст | 📄 Matn |
| 260 | `quiz.openText` | 📄 Открыть текст | 📄 Matnni ochish |
| 261 | `quiz.textTitle` | Текст урока | Dars matni |
| 262 | `quiz.listen` | ▶ Прослушать диалог (осталось {n}) | ▶ Dialogni tinglash (qoldi: {n}) |
| 263 | `quiz.listened` | Прослушано 2 раза | 2 marta tinglandi |
| 264 | `quiz.playing` | 🔊 Звучит запись… | 🔊 Yozuv eshittirilmoqda… |
| 265 | `quiz.loadingAudio` | ⏳ Загрузка записи… | ⏳ Yozuv yuklanmoqda… |
| 266 | `quiz.audioOk` | Запись диалога. Можно прослушать два раза. | Dialog yozuvi. Ikki marta tinglash mumkin. |
| 267 | `quiz.ttsNote` | Диалог читает голос устройства. Лучше слушать запись или преподавателя. | Dialogni qurilma ovozi oʻqiydi. Yozuvni yoki oʻqituvchini tinglagan maʼqul. |
| 268 | `quiz.noVoice` | На этом устройстве нет арабского голоса — слушайте преподавателя. | Bu qurilmada arabcha ovoz yoʻq — oʻqituvchini tinglang. |
| 269 | `quiz.points` | {n} очков | {n} ball |
| 270 | `quiz.right` | ✅ Верно! +{n} | ✅ Toʻgʻri! +{n} |
| 271 | `quiz.wrong` | ❌ Неверно | ❌ Notoʻgʻri |
| 272 | `quiz.timeout` | ⏰ Время вышло | ⏰ Vaqt tugadi |
| 273 | `quiz.noAnswer` | (нет ответа) | (javob yoʻq) |
| 274 | `quiz.result` | {lvl} · верно {c} из {t} ({pct}%) | {lvl} · toʻgʻri: {c}/{t} ({pct}%) |
| 275 | `quiz.time` | Время: {t} | Vaqt: {t} |
| 276 | `quiz.myAnswers` | 📋 Мои ответы | 📋 Javoblarim |
| 277 | `quiz.again` | ↻ Ещё раз | ↻ Yana |
| 278 | `quiz.toList` | К списку | Roʻyxatga |
| 279 | `quiz.reviewTitle` | Мои ответы | Javoblarim |
| 280 | `quiz.question` | вопрос {n} | {n}-savol |
| 281 | `quiz.ok` | ✅ верно | ✅ toʻgʻri |
| 282 | `quiz.bad` | ❌ неверно | ❌ notoʻgʻri |
| 283 | `quiz.yourAnswer` | Ваш ответ: | Javobingiz: |
| 284 | `quiz.rightAnswer` | Правильный ответ: | Toʻgʻri javob: |
| 285 | `quiz.why` | Почему: | Izoh: |
| 286 | `quiz.sec` | с | s |
| 287 | `quiz.close` | Закрыть | Yopish |
| 288 | `quiz.saved` | ☁ Результат сохранён | ☁ Natija saqlandi |
| 289 | `quiz.pending` | ☁ Сохраняю результат… | ☁ Natija saqlanmoqda… |
| 290 | `quiz.offline` | ⚠ Нет связи — результат сохранён на телефоне и отправится, когда появится интернет | ⚠ Aloqa yoʻq — natija telefonda saqlandi va internet paydo boʻlganda yuboriladi |
| 291 | `quiz.relogin` | ⚠ Вход устарел — войдите снова, и результат отправится | ⚠ Kirish muddati tugagan — qaytadan kiring, natija yuboriladi |
| 292 | `quiz.guestSaved` | Результат не сохранён в облаке: вы не вошли. | Natija bulutda saqlanmadi: siz kirmagansiz. |
| 293 | `quiz.board` | 🏆 Рейтинг класса | 🏆 Sinf reytingi |
| 294 | `quiz.boardNote` | Лучший результат каждого за последние 3 часа. Только псевдонимы. | Har kimning oxirgi 3 soatdagi eng yaxshi natijasi. Faqat taxalluslar. |
| 295 | `quiz.boardEmpty` | Пока нет результатов. | Hozircha natijalar yoʻq. |
| 296 | `quiz.boardFail` | Рейтинг сейчас недоступен. | Reyting hozir mavjud emas. |
| 297 | `quiz.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 298 | `quiz.leaveConfirm` | Викторина ещё идёт. Выйти? | Viktorina hali davom etyapti. Chiqasizmi? |
| 299 | `quiz.secondsLeft` | секунд осталось | qolgan soniyalar |
| 300 | `quiz.noscript` | Для викторины нужен включённый JavaScript. | Viktorina uchun JavaScript yoqilgan boʻlishi kerak. |
| 301 | `quiz.contentRu` | — | Savollar va izohlar hozircha rus tilida. |

## Табло для проектора

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 302 | `board.title` | Табло | Tablo |
| 303 | `board.classCode` | Код класса | Sinf kodi |
| 304 | `board.show` | Показать | Koʻrsatish |
| 305 | `board.hours` | за последние {n} ч. | oxirgi {n} soatda |
| 306 | `board.empty` | Пока нет результатов. Табло обновляется само. | Hozircha natijalar yoʻq. Tablo oʻzi yangilanadi. |
| 307 | `board.noClass` | Класс с таким кодом не найден. | Bunday kodli sinf topilmadi. |
| 308 | `board.offline` | Нет связи — пробую снова… | Aloqa yoʻq — qayta urinilmoqda… |
| 309 | `board.updated` | обновлено {t} | yangilandi: {t} |

## Панель учителя

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 310 | `teacher.title` | Панель учителя | Oʻqituvchi paneli |
| 311 | `teacher.logout` | Выйти | Chiqish |
| 312 | `teacher.classLabel` | Класс | Sinf |
| 313 | `teacher.newClassBtn` | + Новый класс | + Yangi sinf |
| 314 | `teacher.newClass` | Новый класс | Yangi sinf |
| 315 | `teacher.ncName` | Название | Nomi |
| 316 | `teacher.ncNamePh` | 2 курс ТГУВ, группа 1 | TDShU 2-kurs, 1-guruh |
| 317 | `teacher.ncYear` | Учебный год | Oʻquv yili |
| 318 | `teacher.ncYearPh` | 2026–2027 | 2026–2027 |
| 319 | `teacher.ncCount` | Сколько учеников | Oʻquvchilar soni |
| 320 | `teacher.ncNote` | Ученикам будут выданы коды 01, 02, … и случайные ПИН. ПИН показываются &lt;b&gt;один раз&lt;/b&gt; — сразу распечатайте лист с ПИН. | Oʻquvchilarga 01, 02, … kodlari va tasodifiy PIN beriladi. PIN &lt;b&gt;bir marta&lt;/b&gt; koʻrsatiladi — PIN varaqasini darhol chop eting. |
| 321 | `teacher.ncCreate` | Создать класс | Sinf yaratish |
| 322 | `teacher.tabs.stats` | Статистика | Statistika |
| 323 | `teacher.tabs.quizzes` | Викторины | Viktorinalar |
| 324 | `teacher.tabs.people` | Ученики и ПИН | Oʻquvchilar va PIN |
| 325 | `teacher.tabs.admin` | Администратор | Administrator |
| 326 | `teacher.period` | Период | Davr |
| 327 | `teacher.periods.d7` | Последние 7 дней | Oxirgi 7 kun |
| 328 | `teacher.periods.d30` | Последние 30 дней | Oxirgi 30 kun |
| 329 | `teacher.periods.sem` | С 1 сентября | 1-sentabrdan |
| 330 | `teacher.periods.all` | Всё время | Butun vaqt |
| 331 | `teacher.reload` | Обновить | Yangilash |
| 332 | `teacher.csv` | Скачать таблицу (CSV) | Jadvalni yuklab olish (CSV) |
| 333 | `teacher.print` | Печать | Chop etish |
| 334 | `teacher.pickClass` | Выберите класс. | Sinfni tanlang. |
| 335 | `teacher.quiz` | Викторина | Viktorina |
| 336 | `teacher.boardLink` | Табло для проектора ↗ | Proyektor uchun tablo ↗ |
| 337 | `teacher.allAnswersCsv` | Все ответы (CSV) | Barcha javoblar (CSV) |
| 338 | `teacher.quizNote` | Период — тот же, что во вкладке «Статистика». Табло показывает только псевдонимы и лучший результат каждого за 3 часа; откройте его на компьютере у проектора. | Davr «Statistika» boʻlimidagi bilan bir xil. Tabloda faqat taxalluslar va har kimning 3 soatdagi eng yaxshi natijasi koʻrsatiladi; uni proyektorga ulangan kompyuterda oching. |
| 339 | `teacher.addN` | Сколько добавить | Nechta qoʻshish |
| 340 | `teacher.addBtn` | Добавить учеников | Oʻquvchi qoʻshish |
| 341 | `teacher.resetSel` | Новый ПИН отмеченным | Belgilanganlarga yangi PIN |
| 342 | `teacher.namesBtn` | Настоящие имена… | Haqiqiy ismlar… |
| 343 | `teacher.namesNote` | Настоящие имена хранятся только в этом браузере, не на сервере. Чтобы видеть их на другом компьютере, вставьте список и там. | Haqiqiy ismlar serverda emas, faqat shu brauzerda saqlanadi. Ularni boshqa kompyuterda koʻrish uchun roʻyxatni u yerda ham kiriting. |
| 344 | `teacher.namesTitle` | Настоящие имена (только на этом компьютере) | Haqiqiy ismlar (faqat shu kompyuterda) |
| 345 | `teacher.namesHelp` | По одной строке: код; имя и фамилия. Например: &lt;code&gt;07; Азиза Каримова&lt;/code&gt; | Har bir qatorda: kod; ism va familiya. Masalan: &lt;code&gt;07; Aziza Karimova&lt;/code&gt; |
| 346 | `teacher.save` | Сохранить | Saqlash |
| 347 | `teacher.roleTitle` | Сделать пользователя учителем | Foydalanuvchini oʻqituvchi qilish |
| 348 | `teacher.roleNote` | Пользователь сначала должен быть создан в Supabase → Authentication → Users. | Avval foydalanuvchi Supabase → Authentication → Users boʻlimida yaratilishi kerak. |
| 349 | `teacher.email` | Email | Email |
| 350 | `teacher.role` | Роль | Rol |
| 351 | `teacher.roles.teacher` | учитель | oʻqituvchi |
| 352 | `teacher.roles.user` | обычный пользователь | oddiy foydalanuvchi |
| 353 | `teacher.roles.admin` | администратор | administrator |
| 354 | `teacher.close` | Закрыть | Yopish |
| 355 | `teacher.pinsTitle` | ПИН учеников | Oʻquvchilarning PIN kodlari |
| 356 | `teacher.pinsWarn` | &lt;b&gt;Распечатайте или перепишите сейчас:&lt;/b&gt; после закрытия окна ПИН больше не будет видно (в базе хранится только зашифрованный вариант). Если потеряете — выдайте новый ПИН. | &lt;b&gt;Hozir chop eting yoki koʻchirib oling:&lt;/b&gt; oyna yopilgach PIN boshqa koʻrinmaydi (bazada faqat shifrlangan varianti saqlanadi). Yoʻqotsangiz — yangi PIN bering. |
| 357 | `teacher.pinsPrint` | Печать листа с ПИН | PIN varaqasini chop etish |
| 358 | `teacher.gateLogin` | Войдите по email учителя. | Oʻqituvchi emaili orqali kiring. |
| 359 | `teacher.login` | Войти | Kirish |
| 360 | `teacher.noRights` | У аккаунта {email} нет прав учителя. Обратитесь к администратору сайта. | {email} hisobida oʻqituvchi huquqlari yoʻq. Sayt administratoriga murojaat qiling. |
| 361 | `teacher.stale` | Вход устарел или нет связи. | Kirish muddati tugagan yoki aloqa yoʻq. |
| 362 | `teacher.loginAgain` | Войти снова | Qaytadan kirish |
| 363 | `teacher.archived` |  (архив) |  (arxiv) |
| 364 | `teacher.noClasses` | — классов пока нет — | — hozircha sinflar yoʻq — |
| 365 | `teacher.createFail` | Не удалось создать класс | Sinf yaratib boʻlmadi |
| 366 | `teacher.joinInfo` | Код класса для учеников: &lt;b class="join"&gt;{join}&lt;/b&gt; · вход: &lt;a href="{url}"&gt;{url}&lt;/a&gt; | Oʻquvchilar uchun sinf kodi: &lt;b class="join"&gt;{join}&lt;/b&gt; · kirish: &lt;a href="{url}"&gt;{url}&lt;/a&gt; |
| 367 | `teacher.th.all` | Отметить всех | Hammasini belgilash |
| 368 | `teacher.th.code` | Код | Kod |
| 369 | `teacher.th.nameLocal` | Имя (только у вас) | Ism (faqat sizda) |
| 370 | `teacher.th.nick` | Псевдоним (видят другие) | Taxallus (boshqalar koʻradi) |
| 371 | `teacher.th.sex` | Пол | Jins |
| 372 | `teacher.th.active` | Активен | Faol |
| 373 | `teacher.th.name` | Имя | Ism |
| 374 | `teacher.th.pin` | ПИН | PIN |
| 375 | `teacher.markOne` | Отметить {code} | Belgilash: {code} |
| 376 | `teacher.nickOf` | Псевдоним {code} | Taxallus: {code} |
| 377 | `teacher.sexOf` | Пол {code} | Jins: {code} |
| 378 | `teacher.activeOf` | Активен {code} | Faol: {code} |
| 379 | `teacher.sex.m` | м | yigit |
| 380 | `teacher.sex.f` | ж | qiz |
| 381 | `teacher.saved` | Сохранено ✓ | Saqlandi ✓ |
| 382 | `teacher.error` | Ошибка | Xato |
| 383 | `teacher.markFirst` | Отметьте учеников галочкой. | Oʻquvchilarni belgilang. |
| 384 | `teacher.resetConfirm` | Выдать новый ПИН {n} ученикам? Старые ПИН перестанут работать. | {n} ta oʻquvchiga yangi PIN berilsinmi? Eski PIN kodlar ishlamay qoladi. |
| 385 | `teacher.strip.classCode` | Код класса | Sinf kodi |
| 386 | `teacher.strip.myCode` | Мой код | Mening kodim |
| 387 | `teacher.strip.pin` | ПИН | PIN |
| 388 | `teacher.closePinsConfirm` | Вы распечатали или записали ПИН? После закрытия их не будет видно. | PIN kodlarni chop etdingizmi yoki yozib oldingizmi? Oyna yopilgach ular koʻrinmaydi. |
| 389 | `teacher.printTitle` | ПИН учеников — {name} | Oʻquvchilarning PIN kodlari — {name} |
| 390 | `teacher.printHint` | Если печать не открылась сама — нажмите Ctrl+P (на телефоне: «Поделиться» → «Печать» или «Сохранить в Файлы»). | Chop etish oʻzi ochilmasa — Ctrl+P ni bosing (telefonda: «Ulashish» → «Chop etish» yoki «Fayllarga saqlash»). |
| 391 | `teacher.popupBlocked` | Браузер заблокировал новое окно. Разрешите всплывающие окна для этого сайта и нажмите кнопку ещё раз. | Brauzer yangi oynani blokladi. Bu sayt uchun qalqib chiquvchi oynalarga ruxsat bering va tugmani yana bosing. |
| 392 | `teacher.createClass` | Создайте класс. | Sinf yarating. |
| 393 | `teacher.reportFail` | Не удалось загрузить отчёт. Проверьте интернет. | Hisobotni yuklab boʻlmadi. Internetni tekshiring. |
| 394 | `teacher.cols.name` | Имя | Ism |
| 395 | `teacher.cols.sex` | Пол | Jins |
| 396 | `teacher.cols.sessions` | Входов | Kirishlar |
| 397 | `teacher.cols.minutes` | Минут | Daqiqa |
| 398 | `teacher.cols.days` | Дней | Kunlar |
| 399 | `teacher.cols.known` | Знает слов | Biladigan soʻzlari |
| 400 | `teacher.cols.answers` | Ответов | Javoblar |
| 401 | `teacher.cols.acc` | Верно % | Toʻgʻri % |
| 402 | `teacher.cols.bad` | Ошибок | Xatolar |
| 403 | `teacher.cols.ct` | Тесты % | Testlar % |
| 404 | `teacher.cols.qz` | Викторины % | Viktorinalar % |
| 405 | `teacher.cols.qn` | Попыток викторин | Viktorina urinishlari |
| 406 | `teacher.cols.last` | Последний вход | Oxirgi kirish |
| 407 | `teacher.colTitle` | {l}: {v} мин. | {l}: {v} daq. |
| 408 | `teacher.noData` | пока нет данных | hozircha maʼlumot yoʻq |
| 409 | `teacher.units.min` | мин. | daq. |
| 410 | `teacher.units.words` | сл. | soʻz |
| 411 | `teacher.units.days` | дн. | kun |
| 412 | `teacher.units.times` | раз | marta |
| 413 | `teacher.units.errPct` | % ошибок | % xato |
| 414 | `teacher.units.people` | чел. | kishi |
| 415 | `teacher.noms.time` | ⏱ Больше всех времени | ⏱ Eng koʻp vaqt sarflagan |
| 416 | `teacher.noms.words` | 📚 Выучил больше слов | 📚 Eng koʻp soʻz oʻrgangan |
| 417 | `teacher.noms.acc` | 🎯 Самый точный (от 50 ответов) | 🎯 Eng aniq (50 ta javobdan) |
| 418 | `teacher.noms.days` | 📅 Больше всех дней занятий | 📅 Eng koʻp kun shugʻullangan |
| 419 | `teacher.noms.sessions` | 🔁 Чаще всех заходил | 🔁 Eng koʻp kirgan |
| 420 | `teacher.noms.ct` | 🧪 Лучший в тестах по словам | 🧪 Soʻzlar testlarida eng yaxshi |
| 421 | `teacher.noms.qz` | 🏆 Лучший в викторинах (средний %) | 🏆 Viktorinalarda eng yaxshi (oʻrtacha %) |
| 422 | `teacher.noms.help` | ⚠ Нужна помощь: низкая точность | ⚠ Yordam kerak: aniqlik past |
| 423 | `teacher.noms.idle` | 💤 Не занимались | 💤 Shugʻullanmaganlar |
| 424 | `teacher.allActive` | все занимались | hamma shugʻullangan |
| 425 | `teacher.kpi.active` | занимались | shugʻullangan |
| 426 | `teacher.kpi.minutes` | минут всего | jami daqiqa |
| 427 | `teacher.kpi.perLearner` | минут на ученика | bir oʻquvchiga daqiqa |
| 428 | `teacher.kpi.answers` | ответов | javob |
| 429 | `teacher.kpi.correct` | верных ответов | toʻgʻri javoblar |
| 430 | `teacher.kpi.sessions` | входов | kirish |
| 431 | `teacher.ofN` | {a} из {b} | {a}/{b} |
| 432 | `teacher.nominations` | Номинации | Nominatsiyalar |
| 433 | `teacher.nomsNote` | «Нужна помощь» и «Не занимались» видите только вы. Ученикам показываются только положительные номинации. | «Yordam kerak» va «Shugʻullanmaganlar»ni faqat siz koʻrasiz. Oʻquvchilarga faqat ijobiy nominatsiyalar koʻrsatiladi. |
| 434 | `teacher.learners` | Ученики | Oʻquvchilar |
| 435 | `teacher.learnersNote` | Нажмите на заголовок столбца, чтобы отсортировать, или на строку — чтобы открыть подробности. | Saralash uchun ustun sarlavhasini, batafsil maʼlumot uchun qatorni bosing. |
| 436 | `teacher.hardWords` | Трудные слова класса | Sinf uchun qiyin soʻzlar |
| 437 | `teacher.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 438 | `teacher.when` | Когда занимаются | Qachon shugʻullanishadi |
| 439 | `teacher.byWeekday` | По дням недели, минуты | Hafta kunlari boʻyicha, daqiqa |
| 440 | `teacher.weekdays` | пн · вт · ср · чт · пт · сб · вс | du · se · ch · pa · ju · sh · ya |
| 441 | `teacher.byHour` | По часам, минуты | Soatlar boʻyicha, daqiqa |
| 442 | `teacher.last30` | Последние 30 дней, минуты | Oxirgi 30 kun, daqiqa |
| 443 | `teacher.sexTitle` | Юноши и девушки | Yigitlar va qizlar |
| 444 | `teacher.sexCols.group` | Группа | Guruh |
| 445 | `teacher.sexCols.n` | Чел. | Kishi |
| 446 | `teacher.sexCols.minutes` | Минут | Daqiqa |
| 447 | `teacher.sexCols.known` | Знает слов | Biladigan soʻzlari |
| 448 | `teacher.sexCols.acc` | Точность % | Aniqlik % |
| 449 | `teacher.sexCols.ct` | Тесты % | Testlar % |
| 450 | `teacher.boys` | Юноши | Yigitlar |
| 451 | `teacher.girls` | Девушки | Qizlar |
| 452 | `teacher.sexMissing` | Не у всех указан пол: заполните его во вкладке «Ученики и ПИН». | Hammaning jinsi koʻrsatilmagan: uni «Oʻquvchilar va PIN» boʻlimida toʻldiring. |
| 453 | `teacher.sexNote` | Группа небольшая (n = {n}), поэтому разница даже в 10–15% может быть случайной. Это описание группы, а не вывод о юношах и девушках. | Guruh kichik (n = {n}), shuning uchun hatto 10–15% farq ham tasodifiy boʻlishi mumkin. Bu guruhning tavsifi, yigitlar va qizlar haqidagi xulosa emas. |
| 454 | `teacher.reportAt` | Отчёт на {t}. Подробно о викторинах — во вкладке «Викторины». | Hisobot vaqti: {t}. Viktorinalar haqida batafsil — «Viktorinalar» boʻlimida. |
| 455 | `teacher.wcols.word` | Слово | Soʻz |
| 456 | `teacher.wcols.tr` | Перевод | Tarjima |
| 457 | `teacher.wcols.studs` | Ошиблись | Xato qilganlar |
| 458 | `teacher.wcols.pct` | Ошибок % | Xato % |
| 459 | `teacher.noErrors` | Пока ошибок нет. | Hozircha xatolar yoʻq. |
| 460 | `teacher.noDataYet` | Пока нет данных. | Hozircha maʼlumot yoʻq. |
| 461 | `teacher.detail.head` | {name} · код {code} | {name} · kod {code} |
| 462 | `teacher.detail.boy` | юноша ·  | yigit ·  |
| 463 | `teacher.detail.girl` | девушка ·  | qiz ·  |
| 464 | `teacher.detail.line` | псевдоним «{nick}» · входов: &lt;b&gt;{s}&lt;/b&gt; · минут: &lt;b&gt;{m}&lt;/b&gt; · дней: &lt;b&gt;{d}&lt;/b&gt; · ответов: &lt;b&gt;{a}&lt;/b&gt; (верно {acc}%) · последний вход: {last} | taxallus «{nick}» · kirishlar: &lt;b&gt;{s}&lt;/b&gt; · daqiqa: &lt;b&gt;{m}&lt;/b&gt; · kunlar: &lt;b&gt;{d}&lt;/b&gt; · javoblar: &lt;b&gt;{a}&lt;/b&gt; (toʻgʻri {acc}%) · oxirgi kirish: {last} |
| 465 | `teacher.detail.decks` | Слова по наборам | Toʻplamlar boʻyicha soʻzlar |
| 466 | `teacher.detail.deckCols.deck` | Набор | Toʻplam |
| 467 | `teacher.detail.deckCols.seen` | Видел | Koʻrgan |
| 468 | `teacher.detail.deckCols.learn` | Учит | Oʻrganmoqda |
| 469 | `teacher.detail.deckCols.good` | Знает | Biladi |
| 470 | `teacher.detail.deckCols.done` | Выучил | Oʻrgangan |
| 471 | `teacher.detail.tests` | Тесты по словам | Soʻzlar testlari |
| 472 | `teacher.detail.testsLine` | {n} · средний {avg}% · лучший {best}% | {n} · oʻrtacha {avg}% · eng yaxshisi {best}% |
| 473 | `teacher.detail.noTests` | Тестов нет. | Testlar yoʻq. |
| 474 | `teacher.detail.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 475 | `teacher.detail.pctOf` | {p}% из {n} | {p}% ({n} tadan) |
| 476 | `teacher.detail.noAnswers` | Нет ответов. | Javoblar yoʻq. |
| 477 | `teacher.detail.hard` | Самые трудные слова | Eng qiyin soʻzlar |
| 478 | `teacher.detail.errors` | ошибок: {n} | xatolar: {n} |
| 479 | `teacher.detail.noErr` | Ошибок нет. | Xatolar yoʻq. |
| 480 | `teacher.detail.daily` | Минуты по дням | Kunlar boʻyicha daqiqa |
| 481 | `teacher.detail.noDays` | Нет занятий. | Mashgʻulotlar yoʻq. |
| 482 | `teacher.detail.quizzes` | Викторины | Viktorinalar |
| 483 | `teacher.att.none` | Попыток нет. | Urinishlar yoʻq. |
| 484 | `teacher.att.when` | Когда | Qachon |
| 485 | `teacher.att.learner` | Ученик | Oʻquvchi |
| 486 | `teacher.att.quiz` | Викторина | Viktorina |
| 487 | `teacher.att.correct` | Верно | Toʻgʻri |
| 488 | `teacher.att.points` | Очки | Ball |
| 489 | `teacher.att.time` | Время | Vaqt |
| 490 | `teacher.att.level` | Уровень | Daraja |
| 491 | `teacher.att.review` | Разбор | Tahlil |
| 492 | `teacher.att.reviewBest` | Разбор лучшей | Eng yaxshisi tahlili |
| 493 | `teacher.reviewLine` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {p} очков · {time} · {lvl} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {p} ball · {time} · {lvl} |
| 494 | `teacher.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |
| 495 | `teacher.noQData` | Нет данных. | Maʼlumot yoʻq. |
| 496 | `teacher.testMark` |  (тест) |  (test) |
| 497 | `teacher.attemptsN` | {title}{test} — попыток: {n} | {title}{test} — urinishlar: {n} |
| 498 | `teacher.qkpi.done` | прошли | topshirgan |
| 499 | `teacher.qkpi.attempts` | попыток | urinish |
| 500 | `teacher.qkpi.avgBest` | средний лучший результат | oʻrtacha eng yaxshi natija |
| 501 | `teacher.qcols.name` | Имя | Ism |
| 502 | `teacher.qcols.n` | Попыток | Urinishlar |
| 503 | `teacher.qcols.best` | Лучший | Eng yaxshisi |
| 504 | `teacher.qcols.points` | Очки | Ball |
| 505 | `teacher.qcols.last` | Последняя | Oxirgisi |
| 506 | `teacher.qParts` | Части викторины: доля верных | Viktorina qismlari: toʻgʻri javoblar ulushi |
| 507 | `teacher.noAnswersYet` | Пока нет ответов. | Hozircha javoblar yoʻq. |
| 508 | `teacher.allAttempts` | Все попытки | Barcha urinishlar |
| 509 | `teacher.hardQ` | Трудные вопросы | Qiyin savollar |
| 510 | `teacher.hardQNote` | Сверху — вопросы, в которых ошиблось больше всего учеников. | Yuqorida — eng koʻp oʻquvchi xato qilgan savollar. |
| 511 | `teacher.hq.q` | Вопрос | Savol |
| 512 | `teacher.hq.c` | Правильный ответ | Toʻgʻri javob |
| 513 | `teacher.hq.studs` | Ошиблись | Xato qilganlar |
| 514 | `teacher.hq.pct` | Ошибок % | Xato % |
| 515 | `teacher.exportFail` | Не удалось выгрузить. | Yuklab boʻlmadi. |
| 516 | `teacher.csvQ` | Код · Имя · Когда · Попытка · № · Часть · Вопрос · Ответ · Правильный · Верно · Секунд | Kod · Ism · Qachon · Urinish · № · Qism · Savol · Javob · Toʻgʻri javob · Toʻgʻrimi · Soniya |
| 517 | `teacher.csvCode` | Код | Kod |
| 518 | `teacher.yes` | да | ha |
| 519 | `teacher.no` | нет | yoʻq |
| 520 | `teacher.roleSaved` | Сохранено. | Saqlandi. |
| 521 | `teacher.noUser` | Такого пользователя нет. Сначала создайте его в Supabase → Authentication → Users. | Bunday foydalanuvchi yoʻq. Avval uni Supabase → Authentication → Users boʻlimida yarating. |
| 522 | `teacher.roleFail` | Не удалось сохранить. | Saqlab boʻlmadi. |

## Подвал

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 523 | `footer.author` | Автор | Muallif |
| 524 | `footer.authorRole` | преподаватель арабского языка | arab tili oʻqituvchisi |
| 525 | `footer.contacts` | Связаться | Bogʻlanish |
| 526 | `footer.about` | О сайте | Sayt haqida |
| 527 | `footer.privacy` | Конфиденциальность | Maxfiylik |
