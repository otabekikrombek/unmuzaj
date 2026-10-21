# Oʻzbekcha satrlarni tekshirish · Проверка узбекских строк

Здесь собраны **все строки интерфейса на узбекском** (латиница) рядом с русскими — 733 строк.
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
15. Пробные экзамены: раздел → **Mock imtihonlar** (так в задании), а в описании «Тестов» и в названии At-Tanal — **sinov imtihoni**. Оставить оба или выбрать одно?
16. Пробные экзамены: «выход из окна» → **oynadan chiqish**, «вкладка» → **varaq**, «отметить вопрос» → **belgilash**, «сдать экзамен» → **imtihonni topshirish**.

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
| 12 | `nav.mock` | Пробные экзамены | Mock imtihonlar |
| 13 | `nav.exercises` | Упражнения | Mashqlar |
| 14 | `nav.grammar` | Грамматика | Grammatika |
| 15 | `nav.texts` | Тексты | Matnlar |
| 16 | `nav.courses` | Курсы | Kurslar |
| 17 | `nav.dictionary` | Словарь | Lugʻat |
| 18 | `nav.conjugation` | Спряжение | Tuslanish |
| 19 | `nav.login` | Войти | Kirish |
| 20 | `nav.me` | Мой прогресс | Mening natijalarim |
| 21 | `nav.teacher` | Панель учителя | Oʻqituvchi paneli |
| 22 | `nav.menu` | Меню | Menyu |
| 23 | `nav.close` | Закрыть | Yopish |
| 24 | `nav.home` | Главная | Bosh sahifa |
| 25 | `nav.sections` | Разделы сайта | Sayt boʻlimlari |
| 26 | `nav.more` | Ещё | Yana |
| 27 | `nav.skip` | К содержанию | Asosiy qismga oʻtish |
| 28 | `nav.youAreHere` | Вы здесь | Siz shu yerdasiz |

## Группы меню

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 29 | `navGroups.learn` | Учить | Oʻrganish |
| 30 | `navGroups.tasks` | Задания | Topshiriqlar |
| 31 | `navGroups.read` | Читать | Oʻqish |
| 32 | `navGroups.courses` | Курсы | Kurslar |

## Окно «Оформление»

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 33 | `look.button` | Оформление | Koʻrinish |
| 34 | `look.title` | Оформление | Koʻrinish |
| 35 | `look.mode` | Режим | Rejim |
| 36 | `look.modes.light` | Светлая | Yorugʻ |
| 37 | `look.modes.dark` | Тёмная | Qorongʻi |
| 38 | `look.modes.auto` | Как в системе | Tizimdagidek |
| 39 | `look.palette` | Цвета | Ranglar |
| 40 | `look.palettes.turquoise` | Бирюза | Feruza |
| 41 | `look.palettes.lapis` | Лазурит | Lojuvard |
| 42 | `look.palettes.parchment` | Пергамент | Pergament |
| 43 | `look.palettes.contrast` | Контраст | Kontrast |
| 44 | `look.paletteHint.turquoise` | по умолчанию | standart |
| 45 | `look.paletteHint.lapis` | синяя | koʻk |
| 46 | `look.paletteHint.parchment` | тёплая, книжная | iliq, kitobiy |
| 47 | `look.paletteHint.contrast` | для слабого зрения | zaif koʻruvchilar uchun |
| 48 | `look.fontSize` | Размер текста | Matn oʻlchami |
| 49 | `look.arSize` | Арабский шрифт | Arabcha shrift |
| 50 | `look.sizes` | А− · А · А+ · А++ | A− · A · A+ · A++ |
| 51 | `look.sizeNames` | меньше · обычный · крупнее · самый крупный | kichikroq · odatiy · kattaroq · eng katta |
| 52 | `look.sample` | Пример: | Namuna: |
| 53 | `look.reset` | Сбросить | Asliga qaytarish |
| 54 | `look.saved` | Настройки сохраняются на этом устройстве. | Sozlamalar shu qurilmada saqlanadi. |

## Поиск по сайту

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 55 | `search.button` | Поиск | Qidirish |
| 56 | `search.hotkey` | Поиск по сайту ( / или Ctrl+K ) | Saytdan qidirish ( / yoki Ctrl+K ) |
| 57 | `search.label` | Искать на сайте | Saytdan qidirish |
| 58 | `search.placeholder` | слово, тема, задание… например: книга, كتاب | soʻz, mavzu, topshiriq… masalan: كتاب |
| 59 | `search.hint` | Ищите по-русски или по-арабски — с огласовками или без. Клавиши: / или Ctrl+K — открыть, ↑ ↓ — выбрать, Enter — перейти, Esc — закрыть. | Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz (soʻzlarning tarjimalari hozircha rus tilida). Tugmalar: / yoki Ctrl+K — ochish, ↑ ↓ — tanlash, Enter — oʻtish, Esc — yopish. |
| 60 | `search.loading` | Загрузка… | Yuklanmoqda… |
| 61 | `search.empty` | Ничего не нашлось. Попробуйте другое слово или откройте словарь. | Hech narsa topilmadi. Boshqa soʻz bilan urinib koʻring yoki lugʻatni oching. |
| 62 | `search.noIndex` | Поиск по страницам появится после публикации сайта (сейчас ищутся только слова). | Sahifalar boʻyicha qidiruv sayt eʼlon qilingach ishlaydi (hozircha faqat soʻzlar qidiriladi). |
| 63 | `search.groups.words` | Слова | Soʻzlar |
| 64 | `search.groups.tasks` | Задания | Topshiriqlar |
| 65 | `search.groups.sections` | Разделы | Boʻlimlar |
| 66 | `search.groups.grammar` | Грамматика | Grammatika |
| 67 | `search.groups.texts` | Тексты | Matnlar |
| 68 | `search.groups.articles` | Статьи | Maqolalar |
| 69 | `search.allInDict` | Все совпадения в словаре → | Lugʻatdagi barcha mosliklar → |
| 70 | `search.found` | Найдено: {n} | Topildi: {n} |

## Описания разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 71 | `sectionsDesc.words` | Карточки с интервальным повторением и тест на 20 вопросов. | Oraliqli takrorlash kartochkalari va 20 ta savollik test. |
| 72 | `sectionsDesc.quizzes` | Викторины по текстам уроков и темам. | Dars matnlari va mavzular boʻyicha viktorinalar. |
| 73 | `sectionsDesc.tests` | Контрольные и пробный экзамен. | Nazorat ishlari va sinov imtihoni. |
| 74 | `sectionsDesc.mock` | Экзамен на время: случайные вопросы, разбор после сдачи. | Vaqtli imtihon: tasodifiy savollar, topshirgandan keyin tahlil. |
| 75 | `sectionsDesc.exercises` | Интерактивные упражнения по грамматике. | Grammatika boʻyicha interaktiv mashqlar. |
| 76 | `sectionsDesc.grammar` | Короткие памятки с примерами. | Misollar bilan qisqa eslatmalar. |
| 77 | `sectionsDesc.texts` | Тексты для чтения с переводом. | Tarjimasi bilan oʻqish uchun matnlar. |
| 78 | `sectionsDesc.courses` | Упорядоченные подборки заданий. | Tartib bilan joylashgan topshiriqlar toʻplamlari. |
| 79 | `sectionsDesc.dictionary` | Тематический словарь с поиском. | Qidiruvli mavzuli lugʻat. |
| 80 | `sectionsDesc.conjugation` | Таблицы спряжения глаголов. | Feʼllarning tuslanish jadvallari. |

## Общие слова

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 81 | `common.soon` | Скоро | Tez orada |
| 82 | `common.soonLong` | Материалы этого раздела добавляются постепенно. | Bu boʻlim materiallari asta-sekin qoʻshib boriladi. |
| 83 | `common.gradually` | Материалы добавляются постепенно. | Materiallar asta-sekin qoʻshib boriladi. |
| 84 | `common.open` | Открыть | Ochish |
| 85 | `common.start` | Начать | Boshlash |
| 86 | `common.items` | {n} материала | {n} ta material |
| 87 | `common.words` | {n} слова | {n} ta soʻz |
| 88 | `common.decks` | {n} набора | {n} ta toʻplam |
| 89 | `common.courses` | {n} курса | {n} ta kurs |
| 90 | `common.tasks` | {n} задания | {n} ta topshiriq |
| 91 | `common.level` | Уровень | Daraja |
| 92 | `common.added` | Добавлено | Qoʻshilgan |
| 93 | `common.oldVersion` | Открывается прежняя версия задания. Скоро она переедет на новый сайт. | Topshiriqning avvalgi (rus tilidagi) versiyasi ochiladi. Tez orada u yangi saytga koʻchiriladi. |
| 94 | `common.back` | Назад | Orqaga |
| 95 | `common.loading` | Загрузка… | Yuklanmoqda… |
| 96 | `common.tryExercises` | Пока можно потренироваться в разделе &lt;a href="{href}"&gt;«Упражнения»&lt;/a&gt;. | Hozircha &lt;a href="{href}"&gt;«Mashqlar»&lt;/a&gt; boʻlimida mashq qilishingiz mumkin. |

## Типы заданий

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 97 | `kinds.deck` | Слова | Soʻzlar |
| 98 | `kinds.quiz` | Викторина | Viktorina |
| 99 | `kinds.test` | Тест | Test |
| 100 | `kinds.mock` | Пробный экзамен | Mock imtihon |
| 101 | `kinds.exercise` | Упражнение | Mashq |
| 102 | `kinds.grammar` | Грамматика | Grammatika |
| 103 | `kinds.text` | Текст | Matn |

## Главная страница

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 104 | `home.lead` | Сайт для изучения арабского языка: слова, викторины, упражнения и грамматика. Начинайте без регистрации. | Arab tilini oʻrganish uchun sayt: soʻzlar, viktorinalar, mashqlar va grammatika. Roʻyxatdan oʻtmasdan boshlang. |
| 105 | `home.gloss` | &lt;i&gt;‘аллимнӣ&lt;/i&gt; — «научи меня». С этой просьбы начинается учёба. | &lt;i&gt;allimniy&lt;/i&gt; — «menga oʻrgat». Oʻqish shu iltimosdan boshlanadi. |
| 106 | `home.h1` | Арабский язык — с первого слова | Arab tili — birinchi soʻzdan |
| 107 | `home.startWords` | Учить слова | Soʻz oʻrganish |
| 108 | `home.iAmInClass` | Я из класса | Men sinfdanman |
| 109 | `home.cardLabel` | Карточка-пример: нажмите, чтобы увидеть перевод | Namuna kartochka: tarjimani koʻrish uchun bosing |
| 110 | `home.cardHint` | нажмите, чтобы увидеть перевод | tarjimani koʻrish uchun bosing |
| 111 | `home.otherWord` | Другое слово | Boshqa soʻz |
| 112 | `home.allCards` | Все карточки | Barcha kartochkalar |
| 113 | `home.contents` | Содержание | Mundarija |
| 114 | `home.fresh` | Новое на сайте | Saytdagi yangiliklar |
| 115 | `home.courses` | Курсы | Kurslar |

## Страницы разделов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 116 | `pages.words.desc` | Наборы арабских слов с карточками, интервальным повторением и тестом. | Kartochkalar, oraliqli takrorlash va testli arabcha soʻzlar toʻplamlari. |
| 117 | `pages.words.lead` | Карточки подбирают слова сами: новые и трудные чаще, выученные реже. Без входа прогресс хранится на этом устройстве, после входа — в облаке. | Kartochkalar soʻzlarni oʻzi tanlaydi: yangi va qiyin soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Kirmasangiz, natijalar shu qurilmada, kirsangiz — bulutda saqlanadi. |
| 118 | `pages.quizzes.desc` | Викторины по арабскому языку: тексты уроков, лексика, грамматика. | Arab tili boʻyicha viktorinalar: dars matnlari, leksika, grammatika. |
| 119 | `pages.tests.desc` | Тесты и пробный экзамен по арабскому языку. | Arab tili boʻyicha testlar va sinov imtihoni. |
| 120 | `pages.tests.wordTest` | Тест по словам: {title} | Soʻzlar testi: {title} |
| 121 | `pages.tests.q20` | 20 вопросов | 20 ta savol |
| 122 | `pages.tests.wordTestMeta` | Вопросы выбираются по вашим трудным и новым словам. | Savollar siz uchun qiyin va yangi soʻzlardan tanlanadi. |
| 123 | `pages.mock.desc` | Пробные экзамены по арабскому языку: общий таймер, случайные вопросы, разбор и сводка по темам после сдачи. | Arab tili boʻyicha mock imtihonlar: umumiy taymer, tasodifiy savollar, topshirgandan keyin tahlil va mavzular boʻyicha xulosa. |
| 124 | `pages.mock.lead` | Как на настоящем экзамене: один таймер на всё время, вопросы можно листать и менять ответ, результат и разбор — после сдачи. | Haqiqiy imtihondagidek: butun imtihonga bitta taymer, savollarni varaqlash va javobni oʻzgartirish mumkin, natija va tahlil — topshirgandan keyin. |
| 125 | `pages.exercises.desc` | Интерактивные упражнения по арабской грамматике. | Arab grammatikasi boʻyicha interaktiv mashqlar. |
| 126 | `pages.courses.desc` | Курсы арабского языка: задания по порядку. | Arab tili kurslari: topshiriqlar tartib bilan. |
| 127 | `pages.courses.forWhom` | Для кого: | Kim uchun: |
| 128 | `pages.dictionary.desc` | Тематический арабско-русский словарь с поиском: огласовки, множественное число, пары антонимов. | Qidiruvli mavzuli arabcha-ruscha lugʻat: harakatlar, koʻplik shakli, antonim juftlari. |
| 129 | `pages.dictionary.lead` | {words} по {topics}. Ищите по-русски или по-арабски — с огласовками или без. | {words}, {topics}. Arabcha yoki ruscha qidiring — harakatli yoki harakatsiz. |
| 130 | `pages.dictionary.topics` | {n} темам | {n} ta mavzu |
| 131 | `pages.dictionary.search` | Поиск | Qidirish |
| 132 | `pages.dictionary.placeholder` | например: книга, كتاب | masalan: كتاب |
| 133 | `pages.dictionary.found` | Найдено: {n} | Topildi: {n} |
| 134 | `pages.notFound.title` | Страница не найдена | Sahifa topilmadi |
| 135 | `pages.notFound.h1` | Такой страницы нет | Bunday sahifa yoʻq |
| 136 | `pages.notFound.text` | Возможно, адрес изменился. Начните с &lt;a href="{home}"&gt;главной страницы&lt;/a&gt; или откройте &lt;a href="{words}"&gt;слова&lt;/a&gt;. | Ehtimol, manzil oʻzgargan. &lt;a href="{home}"&gt;Bosh sahifadan&lt;/a&gt; boshlang yoki &lt;a href="{words}"&gt;soʻzlarni&lt;/a&gt; oching. |

## О сайте

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 137 | `about.title` | О сайте | Sayt haqida |
| 138 | `about.desc` | {name} ({nameAr}) — сайт для изучения арабского языка. Автор — {author}. | {name} ({nameAr}) — arab tilini oʻrganish uchun sayt. Muallif — {author}. |
| 139 | `about.intro` | &lt;b&gt;{name}&lt;/b&gt; — сайт для всех, кто учит арабский язык: слова с карточками, викторины, тесты, упражнения, а со временем — грамматика и тексты для чтения. Всем можно пользоваться без регистрации. | &lt;b&gt;{name}&lt;/b&gt; — arab tilini oʻrganayotgan barcha uchun sayt: kartochkali soʻzlar, viktorinalar, testlar, mashqlar, keyinchalik esa grammatika va oʻqish uchun matnlar. Saytdan roʻyxatdan oʻtmasdan foydalanish mumkin. |
| 140 | `about.whyH` | Почему «{nameAr}» | Nega «{nameAr}» |
| 141 | `about.why` | «‘Аллимнӣ» значит «научи меня»: повелительная форма глагола «‘аллама» (учить, обучать) со слитным местоимением «-нӣ» («меня»). Это просьба каждого, кто приходит учиться. | «Allimniy» — «menga oʻrgat» degani: «allama» (oʻrgatmoq, taʼlim bermoq) feʼlining buyruq shakli va «-niy» («meni», «menga») qoʻshilgan olmoshi. Bu — oʻqishga kelgan har bir kishining iltimosi. |
| 142 | `about.former` | Ранее сайт назывался {formerName} ({formerNameAr}) — по краткой грамматике аз-Замахшари для начинающих «ал-Унмӯзадж фӣ-н-наҳв». | Avval sayt {formerName} ({formerNameAr}) deb atalgan — az-Zamaxshariyning boshlovchilar uchun yozgan qisqa grammatikasi «Al-Unmuzaj fin-nahv» nomi bilan. |
| 143 | `about.forWhomH` | Для кого | Kim uchun |
| 144 | `about.forWhom` | Для студентов-востоковедов и всех, кто изучает арабский самостоятельно. Преподаватели могут вести на сайте свои классы: ученики входят по коду и ПИН, а преподаватель видит их прогресс. | Sharqshunos talabalar va arab tilini mustaqil oʻrganayotgan barcha uchun. Oʻqituvchilar saytda oʻz sinflarini yuritishi mumkin: oʻquvchilar kod va PIN orqali kiradi, oʻqituvchi esa ularning natijalarini koʻradi. |
| 145 | `about.authorH` | Автор | Muallif |
| 146 | `about.notice` | Материалы добавляются постепенно. Нашли ошибку — напишите автору. | Materiallar asta-sekin qoʻshib boriladi. Xato topsangiz — muallifga yozing. |

## Конфиденциальность

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 147 | `privacy.title` | Конфиденциальность | Maxfiylik |
| 148 | `privacy.desc` | Какие данные собирает сайт {name} и как их удалить. | {name} sayti qanday maʼlumotlarni yigʻadi va ularni qanday oʻchirish mumkin. |
| 149 | `privacy.draft` | Черновик. Текст будет уточнён. | Qoralama. Matn aniqlashtiriladi. |
| 150 | `privacy.guestH` | Без входа | Kirmasdan |
| 151 | `privacy.guest` | Если вы не входите на сайт, мы ничего о вас не сохраняем. Ваш прогресс по карточкам хранится только в браузере на вашем устройстве. На сайте нет рекламы и сторонних счётчиков посещений. | Agar saytga kirmasangiz, biz siz haqingizda hech narsa saqlamaymiz. Kartochkalar boʻyicha natijalaringiz faqat qurilmangizdagi brauzerda saqlanadi. Saytda reklama va begona tashriflar hisoblagichlari yoʻq. |
| 152 | `privacy.conjH` | Спряжение: «Любой глагол» | Tuslanish: «Istalgan feʼl» |
| 153 | `privacy.conj` | Если на странице «Спряжение» нажать «Загрузить движок спряжения», браузер скачает программу Pyodide с cdn.jsdelivr.net и пакеты Qutrub с pypi.org. Эти сайты видят ваш IP-адрес, как при любой загрузке файла. Без нажатия кнопки ничего не загружается. Введённые глаголы обрабатываются только в вашем браузере. | «Tuslanish» sahifasida «Tuslash dasturini yuklash» tugmasi bosilsa, brauzer cdn.jsdelivr.net saytidan Pyodide dasturini va pypi.org saytidan Qutrub paketlarini yuklab oladi. Bu saytlar har qanday fayl yuklanganidagidek IP-manzilingizni koʻradi. Tugma bosilmasa, hech narsa yuklanmaydi. Kiritilgan feʼllar faqat brauzeringizda qayta ishlanadi. |
| 154 | `privacy.classH` | Ученики классов | Sinf oʻquvchilari |
| 155 | `privacy.class` | Ученик входит по коду класса, своему коду и ПИН. В базе хранятся только код, псевдоним, пол (по желанию преподавателя) и учебная статистика: какие задания выполнены, ответы, время занятий. Настоящие имена в базу не записываются: соответствие «код — имя» есть только у преподавателя. | Oʻquvchi sinf kodi, oʻz kodi va PIN orqali kiradi. Bazada faqat kod, taxallus, jins (oʻqituvchi xohlasa) va oʻquv statistikasi saqlanadi: qaysi topshiriqlar bajarilgan, javoblar, mashgʻulot vaqti. Haqiqiy ismlar bazaga yozilmaydi: «kod — ism» mosligi faqat oʻqituvchida boʻladi. |
| 156 | `privacy.emailH` | Вход по email | Email orqali kirish |
| 157 | `privacy.email` | Хранятся email (для входа), псевдоним и учебная статистика. | Email (kirish uchun), taxallus va oʻquv statistikasi saqlanadi. |
| 158 | `privacy.whereH` | Где хранятся данные | Maʼlumotlar qayerda saqlanadi |
| 159 | `privacy.where` | В базе данных Supabase (сервер в Европейском союзе, Франкфурт). | Supabase maʼlumotlar bazasida (server Yevropa Ittifoqida, Frankfurtda). |
| 160 | `privacy.deleteH` | Удаление | Oʻchirish |
| 161 | `privacy.delete` | Чтобы удалить свои данные, напишите автору: {email} или {telegram}. Ученик класса может также обратиться к своему преподавателю. | Maʼlumotlaringizni oʻchirish uchun muallifga yozing: {email} yoki {telegram}. Sinf oʻquvchisi oʻz oʻqituvchisiga ham murojaat qilishi mumkin. |

## Вход

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 162 | `login.title` | Вход | Kirish |
| 163 | `login.desc` | Вход на сайт {name}: для учеников класса и по email. | {name} saytiga kirish: sinf oʻquvchilari uchun va email orqali. |
| 164 | `login.lead` | Заниматься можно и без входа. Вход нужен, чтобы прогресс сохранялся в облаке и был виден на любом устройстве. | Kirmasdan ham shugʻullanish mumkin. Kirish natijalaringiz bulutda saqlanishi va istalgan qurilmada koʻrinishi uchun kerak. |
| 165 | `login.classH` | Я из класса | Men sinfdanman |
| 166 | `login.classNote` | Код класса, свой код и ПИН дал преподаватель. | Sinf kodi, oʻz kodingiz va PIN-ni oʻqituvchi beradi. |
| 167 | `login.join` | Код класса | Sinf kodi |
| 168 | `login.joinPh` | например, K7MQ2D | masalan, K7MQ2D |
| 169 | `login.code` | Мой код | Mening kodim |
| 170 | `login.pin` | ПИН | PIN |
| 171 | `login.remember` | Запомнить меня на этом телефоне | Meni shu telefonda eslab qolish |
| 172 | `login.rememberNote` | (на общем компьютере снимите галочку) | (umumiy kompyuterda belgini olib tashlang) |
| 173 | `login.enterClass` | Войти в класс | Sinfga kirish |
| 174 | `login.mailH` | Вход по email | Email orqali kirish |
| 175 | `login.mailNote` | Для преподавателей и тех, кто уже зарегистрирован. | Oʻqituvchilar va roʻyxatdan oʻtganlar uchun. |
| 176 | `login.email` | Email | Email |
| 177 | `login.pass` | Пароль | Parol |
| 178 | `login.enter` | Войти | Kirish |
| 179 | `login.regLater` | Открытая регистрация по email появится позже. Пока занимайтесь как гость: прогресс сохранится на вашем устройстве. | Email orqali ochiq roʻyxatdan oʻtish keyinroq paydo boʻladi. Hozircha mehmon sifatida shugʻullaning: natijalaringiz qurilmangizda saqlanadi. |
| 180 | `login.already` | Вы уже вошли. &lt;a href="{href}"&gt;Мой прогресс&lt;/a&gt; | Siz allaqachon kirgansiz. &lt;a href="{href}"&gt;Mening natijalarim&lt;/a&gt; |
| 181 | `login.fill` | Заполните все поля. ПИН — 4 цифры. | Barcha maydonlarni toʻldiring. PIN — 4 ta raqam. |
| 182 | `login.checking` | Проверяю… | Tekshirilmoqda… |
| 183 | `login.errClass` | Класс с таким кодом не найден. Проверьте код класса. | Bunday kodli sinf topilmadi. Sinf kodini tekshiring. |
| 184 | `login.errLocked` | Слишком много неверных попыток. Подождите 10 минут. | Notoʻgʻri urinishlar juda koʻp. 10 daqiqa kuting. |
| 185 | `login.errPin` | Неверный код или ПИН. Если забыли ПИН — спросите преподавателя. | Kod yoki PIN notoʻgʻri. PIN-ni unutgan boʻlsangiz, oʻqituvchidan soʻrang. |
| 186 | `login.offline` | Нет связи с сервером. Проверьте интернет и попробуйте ещё раз. | Server bilan aloqa yoʻq. Internetni tekshirib, qaytadan urinib koʻring. |
| 187 | `login.errMail` | Неверный email или пароль. | Email yoki parol notoʻgʻri. |
| 188 | `login.failMail` | Не удалось войти: {err} | Kirib boʻlmadi: {err} |

## Мой прогресс

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 189 | `me.title` | Мой прогресс | Mening natijalarim |
| 190 | `me.guest` | Вы занимаетесь как гость: прогресс хранится только на этом устройстве. | Siz mehmon sifatida shugʻullanyapsiz: natijalar faqat shu qurilmada saqlanadi. |
| 191 | `me.login` | Войти | Kirish |
| 192 | `me.headPin` | &lt;b&gt;{nick}&lt;/b&gt; · класс «{cls}» · код {code} | &lt;b&gt;{nick}&lt;/b&gt; · «{cls}» sinfi · kod {code} |
| 193 | `me.totals` | Всего занятий: &lt;b&gt;{v}&lt;/b&gt; · активное время: &lt;b&gt;{m}&lt;/b&gt; мин. | Jami mashgʻulotlar: &lt;b&gt;{v}&lt;/b&gt; · faol vaqt: &lt;b&gt;{m}&lt;/b&gt; daq. |
| 194 | `me.words` | Слова | Soʻzlar |
| 195 | `me.know` | знаю {k} из {n} | bilaman: {k}/{n} |
| 196 | `me.deckMeta` | видел {seen} · учу {learn} · выучено {done} | koʻrilgan {seen} · oʻrganyapman {learn} · oʻrganilgan {done} |
| 197 | `me.lastTests` | Последние тесты по словам | Soʻzlar boʻyicha oxirgi testlar |
| 198 | `me.testLine` | {date} — {c} из {t} | {date} — {c}/{t} |
| 199 | `me.noTests` | Тестов пока нет. | Hozircha testlar yoʻq. |
| 200 | `me.quizzes` | Викторины | Viktorinalar |
| 201 | `me.quizLine` | {date}: &lt;b&gt;{c} из {t}&lt;/b&gt;, {p} очков, {time} | {date}: &lt;b&gt;{c}/{t}&lt;/b&gt;, {p} ball, {time} |
| 202 | `me.quizLineMock` | {date}: &lt;b&gt;{c} из {t}&lt;/b&gt;, {time}, выходов из окна: {x} | {date}: &lt;b&gt;{c}/{t}&lt;/b&gt;, {time}, oynadan chiqishlar: {x} |
| 203 | `me.noQuizzes` | Викторин пока нет. | Hozircha viktorinalar yoʻq. |
| 204 | `me.review` | Разбор | Tahlil |
| 205 | `me.teacher` | Панель учителя | Oʻqituvchi paneli |
| 206 | `me.logout` | Выйти | Chiqish |
| 207 | `me.stale` | Вход устарел. &lt;a href="{href}"&gt;Войдите снова&lt;/a&gt;. | Kirish muddati tugagan. &lt;a href="{href}"&gt;Qaytadan kiring&lt;/a&gt;. |
| 208 | `me.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |
| 209 | `me.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |

## Карточки слов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 210 | `deck.descTail` | {words} с карточками и тестом. | {words}: kartochkalar va test. |
| 211 | `deck.tabs.list` | Список | Roʻyxat |
| 212 | `deck.tabs.cards` | Карточки | Kartochkalar |
| 213 | `deck.tabs.test` | Тест · 20 вопросов | Test · 20 ta savol |
| 214 | `deck.tabs.hard` | Мои трудные | Qiyin soʻzlarim |
| 215 | `deck.tabs.board` | Рейтинг класса | Sinf reytingi |
| 216 | `deck.listH` | Все слова набора | Toʻplamdagi barcha soʻzlar |
| 217 | `deck.goCards` | К карточкам и викторинам | Kartochkalar va viktorinalarga oʻtish |
| 218 | `deck.close` | Закрыть | Yopish |
| 219 | `deck.closeLabel` | Закрыть тест и вернуться к списку слов | Testni yopib, soʻzlar roʻyxatiga qaytish |
| 220 | `deck.which` | Какие слова показывать | Qaysi soʻzlarni koʻrsatish |
| 221 | `deck.all` | Все слова | Barcha soʻzlar |
| 222 | `deck.onlyHard` | Только трудные | Faqat qiyinlari |
| 223 | `deck.dir` | Направление | Yoʻnalish |
| 224 | `deck.dirs` | ар → рус · рус → ар · вперемешку | arabcha → tarjima · tarjima → arabcha · aralash |
| 225 | `deck.no` | Не знаю | Bilmayman |
| 226 | `deck.yes` | Знаю | Bilaman |
| 227 | `deck.below` | Новые слова и слова с ошибками попадаются чаще, выученные — реже. Нажмите «Знаю», если вспомнили перевод сами; иначе — «Не знаю», и ответ покажется. | Yangi va xato qilingan soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Tarjimani oʻzingiz eslasangiz, «Bilaman»ni bosing; aks holda «Bilmayman»ni bosing — javob koʻrsatiladi. |
| 228 | `deck.net.guest` | Вы занимаетесь как гость — прогресс хранится только на этом устройстве. &lt;a href="{login}"&gt;Войти&lt;/a&gt; | Siz mehmon sifatida shugʻullanyapsiz — natijalar faqat shu qurilmada saqlanadi. &lt;a href="{login}"&gt;Kirish&lt;/a&gt; |
| 229 | `deck.net.saved` | ☁ Сохранено | ☁ Saqlandi |
| 230 | `deck.net.pending` | ☁ Сохраняю… | ☁ Saqlanmoqda… |
| 231 | `deck.net.offline` | ⚠ Нет связи — ответы сохранятся, когда появится интернет | ⚠ Aloqa yoʻq — javoblar internet paydo boʻlganda saqlanadi |
| 232 | `deck.net.relogin` | ⚠ Вход устарел. &lt;a href="{login}"&gt;Войдите снова&lt;/a&gt; | ⚠ Kirish muddati tugagan. &lt;a href="{login}"&gt;Qaytadan kiring&lt;/a&gt; |
| 233 | `deck.lv.new` | новые | yangi |
| 234 | `deck.lv.learn` | учу | oʻrganyapman |
| 235 | `deck.lv.good` | знаю | bilaman |
| 236 | `deck.lv.done` | выучено | oʻrganilgan |
| 237 | `deck.passed` | пройдено {k} из {n} | koʻrildi: {k}/{n} |
| 238 | `deck.inSet` | Слов в подборке: {n}, из них новых: {k} | Toʻplamda {n} ta soʻz, ulardan yangi: {k} |
| 239 | `deck.noHard` | Трудных слов пока нет | Hozircha qiyin soʻzlar yoʻq |
| 240 | `deck.empty` | Здесь пусто | Bu yer boʻsh |
| 241 | `deck.tagNew` | новое слово | yangi soʻz |
| 242 | `deck.tagErr` | ошибок: {n} | xatolar: {n} |
| 243 | `deck.tagRep` | повторение | takrorlash |
| 244 | `deck.tapHint` | нажмите, чтобы увидеть ответ | javobni koʻrish uchun bosing |
| 245 | `deck.remember` | Запомните ответ и нажмите любую кнопку | Javobni eslab qoling va istalgan tugmani bosing |
| 246 | `deck.grades` | Отлично · Хорошо · Удовлетворительно · Нужно повторить | Aʼlo · Yaxshi · Qoniqarli · Takrorlash kerak |
| 247 | `deck.result` | {s} из {n} | {s}/{n} |
| 248 | `deck.resultNote` | {lvl}. Слова с ошибками теперь будут попадаться чаще. | {lvl}. Xato qilingan soʻzlar endi tez-tez chiqadi. |
| 249 | `deck.again` | Пройти ещё раз | Yana bir bor |
| 250 | `deck.qOf` | Вопрос {i} из {n} · верно: {s} | Savol {i}/{n} · toʻgʻri: {s} |
| 251 | `deck.hardH` | Слова, в которых вы ошибались | Siz xato qilgan soʻzlar |
| 252 | `deck.relearned` | ✓ — слово уже выучено заново. | ✓ — soʻz qayta oʻrganildi. |
| 253 | `deck.noErr` | Ошибок пока нет. | Hozircha xatolar yoʻq. |
| 254 | `deck.boardLogin` | Рейтинг виден ученикам класса. &lt;a href="{href}"&gt;Войти в класс&lt;/a&gt; | Reyting sinf oʻquvchilariga koʻrinadi. &lt;a href="{href}"&gt;Sinfga kirish&lt;/a&gt; |
| 255 | `deck.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 256 | `deck.boardEmpty` | Пока пусто. | Hozircha boʻsh. |
| 257 | `deck.bTime` | Больше всех занимались | Eng koʻp shugʻullanganlar |
| 258 | `deck.bKnown` | Знают больше всего слов | Eng koʻp soʻz biladiganlar |
| 259 | `deck.bAcc` | Самые точные (от 50 ответов) | Eng aniqlari (50 ta javobdan) |
| 260 | `deck.uMin` | мин. | daq. |
| 261 | `deck.uWords` | сл. | soʻz |
| 262 | `deck.bNote` | Время считается только активное: когда вы отвечаете на карточки. | Faqat faol vaqt hisoblanadi: kartochkalarga javob berayotgan vaqtingiz. |
| 263 | `deck.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |

## Викторины и тесты

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 264 | `quiz.questions` | {n} вопросов | {n} ta savol |
| 265 | `quiz.start` | Начать ▶ | Boshlash ▶ |
| 266 | `quiz.whoPin` | Результат сохранится: &lt;b&gt;{name}&lt;/b&gt; · класс «{cls}» | Natija saqlanadi: &lt;b&gt;{name}&lt;/b&gt; · «{cls}» sinfi |
| 267 | `quiz.whoEmail` | Результат сохранится в вашем аккаунте: &lt;b&gt;{name}&lt;/b&gt; | Natija hisobingizda saqlanadi: &lt;b&gt;{name}&lt;/b&gt; |
| 268 | `quiz.whoGuest` | Вы проходите как гость: результат останется только на этом устройстве и не попадёт в рейтинг класса. | Siz mehmon sifatida oʻtyapsiz: natija faqat shu qurilmada qoladi va sinf reytingiga kirmaydi. |
| 269 | `quiz.login` | Войти в класс | Sinfga kirish |
| 270 | `quiz.guestBest` | Ваш лучший результат на этом устройстве: {p} очков ({c} из {t}). | Shu qurilmadagi eng yaxshi natijangiz: {p} ball ({c}/{t}). |
| 271 | `quiz.sound` | 🔊 Звук | 🔊 Ovoz |
| 272 | `quiz.soundOff` | 🔇 Без звука | 🔇 Ovozsiz |
| 273 | `quiz.part` | Часть {i} из {n} | Qism {i}/{n} |
| 274 | `quiz.toQuestions` | К вопросам ▶ | Savollarga ▶ |
| 275 | `quiz.text` | 📄 Текст | 📄 Matn |
| 276 | `quiz.openText` | 📄 Открыть текст | 📄 Matnni ochish |
| 277 | `quiz.textTitle` | Текст урока | Dars matni |
| 278 | `quiz.listen` | ▶ Прослушать диалог (осталось {n}) | ▶ Dialogni tinglash (qoldi: {n}) |
| 279 | `quiz.listened` | Прослушано 2 раза | 2 marta tinglandi |
| 280 | `quiz.playing` | 🔊 Звучит запись… | 🔊 Yozuv eshittirilmoqda… |
| 281 | `quiz.loadingAudio` | ⏳ Загрузка записи… | ⏳ Yozuv yuklanmoqda… |
| 282 | `quiz.audioOk` | Запись диалога. Можно прослушать два раза. | Dialog yozuvi. Ikki marta tinglash mumkin. |
| 283 | `quiz.ttsNote` | Диалог читает голос устройства. Лучше слушать запись или преподавателя. | Dialogni qurilma ovozi oʻqiydi. Yozuvni yoki oʻqituvchini tinglagan maʼqul. |
| 284 | `quiz.noVoice` | На этом устройстве нет арабского голоса — слушайте преподавателя. | Bu qurilmada arabcha ovoz yoʻq — oʻqituvchini tinglang. |
| 285 | `quiz.points` | {n} очков | {n} ball |
| 286 | `quiz.right` | ✅ Верно! +{n} | ✅ Toʻgʻri! +{n} |
| 287 | `quiz.wrong` | ❌ Неверно | ❌ Notoʻgʻri |
| 288 | `quiz.timeout` | ⏰ Время вышло | ⏰ Vaqt tugadi |
| 289 | `quiz.noAnswer` | (нет ответа) | (javob yoʻq) |
| 290 | `quiz.result` | {lvl} · верно {c} из {t} ({pct}%) | {lvl} · toʻgʻri: {c}/{t} ({pct}%) |
| 291 | `quiz.time` | Время: {t} | Vaqt: {t} |
| 292 | `quiz.myAnswers` | 📋 Мои ответы | 📋 Javoblarim |
| 293 | `quiz.again` | ↻ Ещё раз | ↻ Yana |
| 294 | `quiz.toList` | К списку | Roʻyxatga |
| 295 | `quiz.reviewTitle` | Мои ответы | Javoblarim |
| 296 | `quiz.question` | вопрос {n} | {n}-savol |
| 297 | `quiz.ok` | ✅ верно | ✅ toʻgʻri |
| 298 | `quiz.bad` | ❌ неверно | ❌ notoʻgʻri |
| 299 | `quiz.yourAnswer` | Ваш ответ: | Javobingiz: |
| 300 | `quiz.rightAnswer` | Правильный ответ: | Toʻgʻri javob: |
| 301 | `quiz.why` | Почему: | Izoh: |
| 302 | `quiz.sec` | с | s |
| 303 | `quiz.close` | Закрыть | Yopish |
| 304 | `quiz.saved` | ☁ Результат сохранён | ☁ Natija saqlandi |
| 305 | `quiz.pending` | ☁ Сохраняю результат… | ☁ Natija saqlanmoqda… |
| 306 | `quiz.offline` | ⚠ Нет связи — результат сохранён на телефоне и отправится, когда появится интернет | ⚠ Aloqa yoʻq — natija telefonda saqlandi va internet paydo boʻlganda yuboriladi |
| 307 | `quiz.relogin` | ⚠ Вход устарел — войдите снова, и результат отправится | ⚠ Kirish muddati tugagan — qaytadan kiring, natija yuboriladi |
| 308 | `quiz.guestSaved` | Результат не сохранён в облаке: вы не вошли. | Natija bulutda saqlanmadi: siz kirmagansiz. |
| 309 | `quiz.board` | 🏆 Рейтинг класса | 🏆 Sinf reytingi |
| 310 | `quiz.boardNote` | Лучший результат каждого за последние 3 часа. Только псевдонимы. | Har kimning oxirgi 3 soatdagi eng yaxshi natijasi. Faqat taxalluslar. |
| 311 | `quiz.boardEmpty` | Пока нет результатов. | Hozircha natijalar yoʻq. |
| 312 | `quiz.boardFail` | Рейтинг сейчас недоступен. | Reyting hozir mavjud emas. |
| 313 | `quiz.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 314 | `quiz.leaveConfirm` | Викторина ещё идёт. Выйти? | Viktorina hali davom etyapti. Chiqasizmi? |
| 315 | `quiz.secondsLeft` | секунд осталось | qolgan soniyalar |
| 316 | `quiz.noscript` | Для викторины нужен включённый JavaScript. | Viktorina uchun JavaScript yoqilgan boʻlishi kerak. |
| 317 | `quiz.contentRu` | — | Savollar va izohlar hozircha rus tilida. |

## Пробные экзамены

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 318 | `mock.meta` | {q} · {m} | {q} · {m} |
| 319 | `mock.questions` | {n} вопроса | {n} ta savol |
| 320 | `mock.minutes` | {n} минуты | {n} daqiqa |
| 321 | `mock.bookH` | Источник вопросов | Savollar manbasi |
| 322 | `mock.bookAuthor` | Автор: {list} | Muallif: {list} |
| 323 | `mock.bookAuthors` | Авторы: {list} | Mualliflar: {list} |
| 324 | `mock.bookPublisher` | Издатель: {x} | Nashriyot: {x} |
| 325 | `mock.bookEdition` | Издание {x} | {x} yilgi nashr |
| 326 | `mock.bookDeposit` | Номер депозита Национальной библиотеки Иордании: {x} | Iordaniya Milliy kutubxonasidagi depozit raqami: {x} |
| 327 | `mock.bookPart` | Вопросы — из части {part} (мабхасы {ch}). | Savollar {part} qismidan olingan ({ch}-mabhaslar). |
| 328 | `mock.bookRights` | Вопросы составлены по этой книге. Права на книгу принадлежат её правообладателям. | Savollar shu kitob asosida tuzilgan. Kitobga boʻlgan huquqlar uning huquq egalariga tegishli. |
| 329 | `mock.rulesH` | Правила | Qoidalar |
| 330 | `mock.ruleTimer` | Один общий таймер на весь экзамен — {m}. В 0:00 экзамен сдаётся автоматически; за 5 минут и за 1 минуту до конца появится предупреждение. | Butun imtihonga bitta umumiy taymer — {m}. 0:00 da imtihon avtomatik topshiriladi; tugashiga 5 daqiqa va 1 daqiqa qolganda ogohlantirish chiqadi. |
| 331 | `mock.ruleNav` | Вопросы можно листать в любом порядке, менять ответ и отмечать, чтобы вернуться к ним. Клавиши: 1–4 — вариант ответа, ← и → — предыдущий и следующий вопрос. | Savollarni istalgan tartibda varaqlash, javobni oʻzgartirish va keyin qaytish uchun belgilab qoʻyish mumkin. Tugmalar: 1–4 — javob varianti, ← va → — oldingi va keyingi savol. |
| 332 | `mock.ruleFocus` | Во время экзамена скрыты меню, поиск и подвал сайта, страница открывается во весь экран (где браузер это позволяет). Выделять, копировать и печатать текст нельзя. | Imtihon vaqtida sayt menyusi, qidiruv va pastki qismi yashiriladi, sahifa toʻliq ekranda ochiladi (brauzer imkon bergan joyda). Matnni belgilash, nusxalash va chop etish mumkin emas. |
| 333 | `mock.ruleExit` | Выход из окна экзамена — другая вкладка или приложение, сворачивание, выход из полноэкранного режима — засчитывается. Число выходов видно в результате и преподавателю. | Imtihon oynasidan chiqish — boshqa varaq yoki ilovaga oʻtish, oynani yigʻish, toʻliq ekran rejimidan chiqish — hisobga olinadi. Chiqishlar soni natijada va oʻqituvchiga koʻrinadi. |
| 334 | `mock.ruleExitMax` | Выйти из окна можно не больше {n} раза: при следующем выходе экзамен сдаётся автоматически. | Oynadan koʻpi bilan {n} marta chiqish mumkin: keyingi chiqishda imtihon avtomatik topshiriladi. |
| 335 | `mock.ruleReload` | Если страница случайно закроется или перезагрузится, откройте её снова: экзамен продолжится с того же места. Время при этом не останавливается, а закрытие страницы считается выходом из окна. | Sahifa tasodifan yopilsa yoki qayta yuklansa, uni yana oching: imtihon oʻsha joydan davom etadi. Vaqt toʻxtamaydi, sahifani yopish esa oynadan chiqish hisoblanadi. |
| 336 | `mock.ruleHonest` | Честно о пределах: браузер не может полностью запретить другую вкладку, второй телефон или ИИ. Эти правила сдерживают и ведут учёт, но это не наблюдение за экзаменом. | Cheklovlar haqida rostini aytsak: brauzer boshqa varaqni, ikkinchi telefonni yoki sunʼiy intellektni toʻliq taqiqlay olmaydi. Bu qoidalar tiyib turadi va hisob yuritadi, lekin bu imtihonni kuzatish emas. |
| 337 | `mock.whoGuest` | Вы проходите как гость: результат сохранится только на этом устройстве. | Siz mehmon sifatida topshiryapsiz: natija faqat shu qurilmada saqlanadi. |
| 338 | `mock.start` | Начать экзамен | Imtihonni boshlash |
| 339 | `mock.resumeH` | Экзамен идёт | Imtihon davom etyapti |
| 340 | `mock.resumeText` | Осталось времени: {t}. Время не останавливается. | Qolgan vaqt: {t}. Vaqt toʻxtamaydi. |
| 341 | `mock.resume` | Продолжить экзамен | Imtihonni davom ettirish |
| 342 | `mock.timeLeft` | Осталось времени | Qolgan vaqt |
| 343 | `mock.qOf` | Вопрос {i} из {n} | Savol {i}/{n} |
| 344 | `mock.answered` | Отвечено: {a} из {n} | Javob berildi: {a}/{n} |
| 345 | `mock.prev` | Назад | Orqaga |
| 346 | `mock.next` | Далее | Keyingi |
| 347 | `mock.mark` | Отметить | Belgilash |
| 348 | `mock.finish` | Завершить | Yakunlash |
| 349 | `mock.options` | Варианты ответа | Javob variantlari |
| 350 | `mock.palette` | Все вопросы | Barcha savollar |
| 351 | `mock.legendAnswered` | есть ответ | javob bor |
| 352 | `mock.legendEmpty` | без ответа | javobsiz |
| 353 | `mock.legendMarked` | отмечен | belgilangan |
| 354 | `mock.qState` | Вопрос {n}: {s} | {n}-savol: {s} |
| 355 | `mock.warn5` | Осталось 5 минут. | 5 daqiqa qoldi. |
| 356 | `mock.warn1` | Осталась 1 минута. | 1 daqiqa qoldi. |
| 357 | `mock.confirmH` | Завершить экзамен? | Imtihonni yakunlaysizmi? |
| 358 | `mock.confirmEmpty` | Без ответа: {n} вопроса. | Javobsiz savollar: {n} ta. |
| 359 | `mock.confirmAll` | Ответы есть на все вопросы. | Barcha savollarga javob berilgan. |
| 360 | `mock.confirmNote` | После сдачи ответы изменить нельзя. | Topshirgandan keyin javoblarni oʻzgartirib boʻlmaydi. |
| 361 | `mock.confirmYes` | Сдать экзамен | Imtihonni topshirish |
| 362 | `mock.confirmNo` | Вернуться к вопросам | Savollarga qaytish |
| 363 | `mock.exitH` | Вы вышли из окна экзамена | Siz imtihon oynasidan chiqdingiz |
| 364 | `mock.exitText` | Выходов из окна: {n}. Это записывается в результат и видно преподавателю. | Oynadan chiqishlar: {n}. Bu natijaga yoziladi va oʻqituvchiga koʻrinadi. |
| 365 | `mock.exitLimit` | Предел — {max}. При превышении экзамен сдаётся автоматически. | Chegara — {max}. Undan oshsa, imtihon avtomatik topshiriladi. |
| 366 | `mock.exitBack` | Вернуться к экзамену | Imtihonga qaytish |
| 367 | `mock.noPrint` | Печать во время экзамена недоступна. | Imtihon vaqtida chop etish mumkin emas. |
| 368 | `mock.resultH` | Результат | Natija |
| 369 | `mock.doneTime` | Время вышло — экзамен сдан автоматически. | Vaqt tugadi — imtihon avtomatik topshirildi. |
| 370 | `mock.doneExits` | Слишком много выходов из окна — экзамен сдан автоматически. | Oynadan juda koʻp chiqildi — imtihon avtomatik topshirildi. |
| 371 | `mock.sumAnswered` | Отвечено | Javob berilgan |
| 372 | `mock.sumCorrect` | Верных ответов | Toʻgʻri javoblar |
| 373 | `mock.sumTime` | Затрачено времени | Sarflangan vaqt |
| 374 | `mock.sumExits` | Выходов из окна | Oynadan chiqishlar |
| 375 | `mock.ofN` | {a} из {n} | {a}/{n} |
| 376 | `mock.tableH` | Ответы | Javoblar |
| 377 | `mock.cols.n` | № | № |
| 378 | `mock.cols.q` | Вопрос | Savol |
| 379 | `mock.cols.yours` | Ваш ответ | Javobingiz |
| 380 | `mock.cols.right` | Правильный ответ | Toʻgʻri javob |
| 381 | `mock.cols.topic` | Тема | Mavzu |
| 382 | `mock.noAnswer` | нет ответа | javob yoʻq |
| 383 | `mock.isOk` | верно | toʻgʻri |
| 384 | `mock.isBad` | неверно | notoʻgʻri |
| 385 | `mock.topic` | тема {n} | {n}-mavzu |
| 386 | `mock.topicsH` | По темам | Mavzular boʻyicha |
| 387 | `mock.topicCols.topic` | Тема | Mavzu |
| 388 | `mock.topicCols.n` | Вопросов | Savollar |
| 389 | `mock.topicCols.ok` | Верных | Toʻgʻri |
| 390 | `mock.detailH` | Все вопросы | Barcha savollar |
| 391 | `mock.yourMark` | ваш ответ | javobingiz |
| 392 | `mock.rightMark` | правильный ответ | toʻgʻri javob |
| 393 | `mock.print` | Печать / PDF | Chop etish / PDF |
| 394 | `mock.again` | Новый экзамен | Yangi imtihon |
| 395 | `mock.newConfirm` | Начать новый экзамен? Разбор этого экзамена исчезнет с экрана (если вы вошли, он сохранён в «Моём прогрессе»). | Yangi imtihon boshlansinmi? Bu imtihon tahlili ekrandan yoʻqoladi (agar kirgan boʻlsangiz, u «Mening natijalarim»da saqlangan). |
| 396 | `mock.toList` | К списку экзаменов | Imtihonlar roʻyxatiga |
| 397 | `mock.printDate` | Дата: {d} | Sana: {d} |
| 398 | `mock.guestSaved` | Результат сохранён только на этом устройстве: вы не вошли. | Natija faqat shu qurilmada saqlandi: siz kirmagansiz. |
| 399 | `mock.noscript` | Для экзамена нужен включённый JavaScript. | Imtihon uchun JavaScript yoqilgan boʻlishi kerak. |

## Табло для проектора

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 400 | `board.title` | Табло | Tablo |
| 401 | `board.classCode` | Код класса | Sinf kodi |
| 402 | `board.show` | Показать | Koʻrsatish |
| 403 | `board.hours` | за последние {n} ч. | oxirgi {n} soatda |
| 404 | `board.empty` | Пока нет результатов. Табло обновляется само. | Hozircha natijalar yoʻq. Tablo oʻzi yangilanadi. |
| 405 | `board.noClass` | Класс с таким кодом не найден. | Bunday kodli sinf topilmadi. |
| 406 | `board.offline` | Нет связи — пробую снова… | Aloqa yoʻq — qayta urinilmoqda… |
| 407 | `board.updated` | обновлено {t} | yangilandi: {t} |

## Страница-переадресация

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 408 | `moved.title` | Страница переехала | Sahifa koʻchirildi |
| 409 | `moved.text` | Эта страница теперь находится по новому адресу: | Bu sahifa endi yangi manzilda: |

## Спряжение глаголов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 410 | `conj.title` | Спряжение глаголов | Feʼllar tuslanishi |
| 411 | `conj.description` | Таблицы спряжения арабских глаголов: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. С огласовками. | Arab feʼllarining tuslanish jadvallari: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Harakatlari bilan. |
| 412 | `conj.lead` | Таблицы спряжения {n} употребительных глаголов I породы — с огласовками, по всем 13 лицам. Любой другой глагол можно проспрягать ниже. | Keng qoʻllaniladigan {n} ta I bob feʼlining tuslanish jadvallari — harakatlari bilan, barcha 13 shaxs boʻyicha. Boshqa istalgan feʼlni quyida tuslash mumkin. |
| 413 | `conj.count` | {n} глагола | {n} ta feʼl |
| 414 | `conj.searchLabel` | Найти глагол | Feʼlni topish |
| 415 | `conj.searchPh` | например: писать, كتب, يكتب | masalan: كتب, يكتب |
| 416 | `conj.found` | Найдено: {n} | Topildi: {n} |
| 417 | `conj.notFound` | Такого глагола в списке нет. Попробуйте режим «Любой глагол» ниже. | Roʻyxatda bunday feʼl yoʻq. Quyidagi «Istalgan feʼl» rejimini sinab koʻring. |
| 418 | `conj.allTypes` | Все | Hammasi |
| 419 | `conj.types.sound` | правильные | salim |
| 420 | `conj.types.hamzated` | хамзованные | mahmuz |
| 421 | `conj.types.assimilated` | подобные правильным | misol |
| 422 | `conj.types.hollow` | пустые | ajvaf |
| 423 | `conj.types.defective` | недостаточные | noqis |
| 424 | `conj.types.doubled` | удвоенные | muzoaf |
| 425 | `conj.types.lafif` | дважды слабые | lafif |
| 426 | `conj.typesOne.sound` | правильный | salim |
| 427 | `conj.typesOne.hamzated` | хамзованный | mahmuz |
| 428 | `conj.typesOne.assimilated` | подобный правильному | misol |
| 429 | `conj.typesOne.hollow` | пустой | ajvaf |
| 430 | `conj.typesOne.defective` | недостаточный | noqis |
| 431 | `conj.typesOne.doubled` | удвоенный | muzoaf |
| 432 | `conj.typesOne.lafif` | дважды слабый | lafif |
| 433 | `conj.bab.فتحة` | фатха | fatha |
| 434 | `conj.bab.ضمة` | дамма | zamma |
| 435 | `conj.bab.كسرة` | кясра | kasra |
| 436 | `conj.babLabel` | Огласовка в настоящем-будущем | Hozirgi-kelasi zamondagi harakat |
| 437 | `conj.root` | Корень | Oʻzak |
| 438 | `conj.type` | Тип | Turi |
| 439 | `conj.form1` | I порода | I bob |
| 440 | `conj.transitive` | переходный | oʻtimli |
| 441 | `conj.intransitive` | непереходный | oʻtimsiz |
| 442 | `conj.print` | Печать | Chop etish |
| 443 | `conj.allVerbs` | Все глаголы | Barcha feʼllar |
| 444 | `conj.prev` | Предыдущий | Oldingi |
| 445 | `conj.next` | Следующий | Keyingi |
| 446 | `conj.auto` | Таблица построена автоматически (Qutrub). | Jadval avtomatik tuzilgan (Qutrub). |
| 447 | `conj.unchecked` | Формы ещё не проверены преподавателем. | Shakllar hali oʻqituvchi tomonidan tekshirilmagan. |
| 448 | `conj.checked` | Формы проверены преподавателем. | Shakllar oʻqituvchi tomonidan tekshirilgan. |
| 449 | `conj.doubtTitle` | Для преподавателя: что проверить | Oʻqituvchi uchun: nimani tekshirish kerak |
| 450 | `conj.report` | Заметили ошибку? Напишите нам: | Xato koʻrdingizmi? Bizga yozing: |
| 451 | `conj.pageTitle` | {verb} – {present}: спряжение глаголов | {verb} – {present}: feʼl tuslanishi |
| 452 | `conj.pageDesc` | Спряжение глагола {verb} ({present}){gloss}: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. Все 13 лиц, с огласовками. | {verb} ({present}){gloss} feʼlining tuslanishi: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Barcha 13 shaxs, harakatlari bilan. |
| 453 | `conj.active` | Действительный залог | Maʼlum nisbat |
| 454 | `conj.passive` | Страдательный залог | Majhul nisbat |
| 455 | `conj.person` | Лицо | Shaxs |
| 456 | `conj.past` | Прошедшее время | Oʻtgan zamon |
| 457 | `conj.present` | Настоящее-будущее время | Hozirgi-kelasi zamon |
| 458 | `conj.moods.present` | изъявительное | marfuʼ |
| 459 | `conj.moods.subjunctive` | сослагательное | mansub |
| 460 | `conj.moods.jussive` | повелительное (усечённое) | majzum |
| 461 | `conj.moodsLead` | Наклонения настоящего-будущего времени | Hozirgi-kelasi zamon mayllari |
| 462 | `conj.short.past` | Прош. | Oʻtgan |
| 463 | `conj.short.present` | Изъяв. | Marfuʼ |
| 464 | `conj.short.subjunctive` | Сослаг. | Mansub |
| 465 | `conj.short.jussive` | Усеч. | Majzum |
| 466 | `conj.short.passive_past` | Прош. | Oʻtgan |
| 467 | `conj.short.passive_present` | Наст.-буд. | Hoz.-kel. |
| 468 | `conj.showCol` | Показать колонку | Ustunni koʻrsatish |
| 469 | `conj.imperative` | Повелительная форма | Buyruq shakli |
| 470 | `conj.impersonal` | Непереходный глагол: в страдательном залоге только безличная форма (3-е лицо ед. ч. м. р., обычно с предлогом): | Oʻtimsiz feʼl: majhul nisbatda faqat shaxssiz shakl bor (III shaxs, birlik, muzakkar; odatda jar harfi bilan): |
| 471 | `conj.noForm` | нет формы | shakl yoʻq |
| 472 | `conj.persons` | я · ты м. · ты ж. · он · она · вы двое · они двое м. · они двое ж. · мы · вы м. · вы ж. · они м. · они ж. | men · sen (muz.) · sen (muan.) · u (muz.) · u (muan.) · siz ikkovingiz · ular ikkovi (muz.) · ular ikkovi (muan.) · biz · sizlar (muz.) · sizlar (muan.) · ular (muz.) · ular (muan.) |
| 473 | `conj.any` | Любой глагол | Istalgan feʼl |
| 474 | `conj.anyLead` | Проспрягать глагол, которого нет в списке: Qutrub запускается прямо в браузере. | Roʻyxatda yoʻq feʼlni tuslash: Qutrub toʻgʻridan-toʻgʻri brauzerda ishlaydi. |
| 475 | `conj.anyLoad` | Загрузить движок спряжения | Tuslash dasturini yuklash |
| 476 | `conj.anySize` | Загрузка около 7 МБ (Pyodide с cdn.jsdelivr.net и пакеты Qutrub с pypi.org), один раз — потом из кэша браузера. | Taxminan 7 MB yuklanadi (Pyodide — cdn.jsdelivr.net saytidan, Qutrub paketlari — pypi.org saytidan), bir marta — keyin brauzer keshidan olinadi. |
| 477 | `conj.anyLoading` | Загружаю Python и Qutrub… | Python va Qutrub yuklanmoqda… |
| 478 | `conj.anySteps` | Загружаю Python (Pyodide)… · Ставлю пакеты Qutrub… · Готово. | Python (Pyodide) yuklanmoqda… · Qutrub paketlari oʻrnatilmoqda… · Tayyor. |
| 479 | `conj.anyFail` | Не удалось загрузить движок. Проверьте интернет и попробуйте ещё раз. | Dasturni yuklab boʻlmadi. Internetni tekshirib, qaytadan urinib koʻring. |
| 480 | `conj.anyVerb` | Глагол в прошедшем времени, 3-е лицо ед. ч. м. р., с огласовками | Oʻtgan zamondagi feʼl (III shaxs, birlik, muzakkar), harakatlari bilan |
| 481 | `conj.anyVerbPh` | например: نَصَرَ | masalan: نَصَرَ |
| 482 | `conj.anyBab` | Огласовка второго корневого в настоящем-будущем (для глаголов I породы) | Hozirgi-kelasi zamonda ikkinchi oʻzak harfining harakati (I bob feʼllari uchun) |
| 483 | `conj.transBoth` | переходный и непереходный | oʻtimli va oʻtimsiz |
| 484 | `conj.anyTrans` | Переходность | Oʻtimlilik |
| 485 | `conj.anyGo` | Проспрягать | Tuslash |
| 486 | `conj.anyHint` | Глаголы II–X пород (например, عَلَّمَ، اِسْتَخْرَجَ) тоже можно; огласовка для них не важна. | II–X bob feʼllarini ham (masalan, عَلَّمَ، اِسْتَخْرَجَ) tuslash mumkin; ular uchun harakat muhim emas. |
| 487 | `conj.anyDict` | В словаре Qutrub есть: | Qutrub lugʻatida bor: |
| 488 | `conj.anyNoDict` | В словаре Qutrub такого глагола I породы нет — проверьте огласовку. | Qutrub lugʻatida bunday I bob feʼli yoʻq — harakatlarni tekshiring. |
| 489 | `conj.anyBad` | Qutrub не смог проспрягать этот глагол. Проверьте, что он в прошедшем времени (3-е л. ед. ч. м. р.) и с огласовками. | Qutrub bu feʼlni tuslay olmadi. Feʼl oʻtgan zamonda (III shaxs, birlik, muzakkar) va harakatlari bilan yozilganini tekshiring. |
| 490 | `conj.anyNeedAr` | Введите глагол арабскими буквами. | Feʼlni arab harflarida kiriting. |
| 491 | `conj.anyNeedBab` | Выберите огласовку настоящего-будущего времени. | Hozirgi-kelasi zamon harakatini tanlang. |
| 492 | `conj.anyNeedVowels` | Поставьте огласовки: у трёхбуквенного глагола они нужны (например, نَصَرَ, а не نصر). | Harakatlarni qoʻying: uch harfli feʼlda ular kerak (masalan, نَصَرَ, نصر emas). |
| 493 | `conj.anyNote` | Результат не проверен преподавателем. Для глаголов из списка выше лучше открыть их страницу. | Natija oʻqituvchi tomonidan tekshirilmagan. Yuqoridagi roʻyxatdagi feʼllar uchun ularning sahifasini ochgan maʼqul. |
| 494 | `conj.inList` | Этот глагол есть в списке: | Bu feʼl roʻyxatda bor: |
| 495 | `conj.creditQutrub` | Спряжение: Qutrub © Taha Zerrouki, GPL | Tuslash: Qutrub © Taha Zerrouki, GPL |
| 496 | `conj.creditArramooz` | Огласовка настоящего времени и переходность: словарь Arramooz © Taha Zerrouki, GPL | Hozirgi zamon harakati va oʻtimlilik: Arramooz lugʻati © Taha Zerrouki, GPL |
| 497 | `conj.creditCode` | исходный код | manba kodi |
| 498 | `conj.creditPyodide` | Python в браузере: Pyodide (MPL-2.0) | Brauzerda Python: Pyodide (MPL-2.0) |
| 499 | `conj.homeLabel` | Спряжение глагола | Feʼl tuslanishi |
| 500 | `conj.homePh` | введите глагол: كتب или «писать» | feʼlni kiriting: كتب |
| 501 | `conj.homeGo` | Показать | Koʻrsatish |
| 502 | `conj.dictLink` | спряжение | tuslanish |

## Панель учителя

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 503 | `teacher.title` | Панель учителя | Oʻqituvchi paneli |
| 504 | `teacher.logout` | Выйти | Chiqish |
| 505 | `teacher.classLabel` | Класс | Sinf |
| 506 | `teacher.newClassBtn` | + Новый класс | + Yangi sinf |
| 507 | `teacher.newClass` | Новый класс | Yangi sinf |
| 508 | `teacher.ncName` | Название | Nomi |
| 509 | `teacher.ncNamePh` | 2 курс ТГУВ, группа 1 | TDShU 2-kurs, 1-guruh |
| 510 | `teacher.ncYear` | Учебный год | Oʻquv yili |
| 511 | `teacher.ncYearPh` | 2026–2027 | 2026–2027 |
| 512 | `teacher.ncCount` | Сколько учеников | Oʻquvchilar soni |
| 513 | `teacher.ncNote` | Ученикам будут выданы коды 01, 02, … и случайные ПИН. ПИН показываются &lt;b&gt;один раз&lt;/b&gt; — сразу распечатайте лист с ПИН. | Oʻquvchilarga 01, 02, … kodlari va tasodifiy PIN beriladi. PIN &lt;b&gt;bir marta&lt;/b&gt; koʻrsatiladi — PIN varaqasini darhol chop eting. |
| 514 | `teacher.ncCreate` | Создать класс | Sinf yaratish |
| 515 | `teacher.tabs.stats` | Статистика | Statistika |
| 516 | `teacher.tabs.quizzes` | Викторины | Viktorinalar |
| 517 | `teacher.tabs.people` | Ученики и ПИН | Oʻquvchilar va PIN |
| 518 | `teacher.tabs.admin` | Администратор | Administrator |
| 519 | `teacher.period` | Период | Davr |
| 520 | `teacher.periods.d7` | Последние 7 дней | Oxirgi 7 kun |
| 521 | `teacher.periods.d30` | Последние 30 дней | Oxirgi 30 kun |
| 522 | `teacher.periods.sem` | С 1 сентября | 1-sentabrdan |
| 523 | `teacher.periods.all` | Всё время | Butun vaqt |
| 524 | `teacher.reload` | Обновить | Yangilash |
| 525 | `teacher.csv` | Скачать таблицу (CSV) | Jadvalni yuklab olish (CSV) |
| 526 | `teacher.print` | Печать | Chop etish |
| 527 | `teacher.pickClass` | Выберите класс. | Sinfni tanlang. |
| 528 | `teacher.quiz` | Викторина | Viktorina |
| 529 | `teacher.boardLink` | Табло для проектора ↗ | Proyektor uchun tablo ↗ |
| 530 | `teacher.allAnswersCsv` | Все ответы (CSV) | Barcha javoblar (CSV) |
| 531 | `teacher.quizNote` | Период — тот же, что во вкладке «Статистика». Табло показывает только псевдонимы и лучший результат каждого за 3 часа; откройте его на компьютере у проектора. | Davr «Statistika» boʻlimidagi bilan bir xil. Tabloda faqat taxalluslar va har kimning 3 soatdagi eng yaxshi natijasi koʻrsatiladi; uni proyektorga ulangan kompyuterda oching. |
| 532 | `teacher.addN` | Сколько добавить | Nechta qoʻshish |
| 533 | `teacher.addBtn` | Добавить учеников | Oʻquvchi qoʻshish |
| 534 | `teacher.resetSel` | Новый ПИН отмеченным | Belgilanganlarga yangi PIN |
| 535 | `teacher.namesBtn` | Настоящие имена… | Haqiqiy ismlar… |
| 536 | `teacher.namesNote` | Настоящие имена хранятся только в этом браузере, не на сервере. Чтобы видеть их на другом компьютере или в другом браузере, сохраните их в файл и загрузите там. | Haqiqiy ismlar serverda emas, faqat shu brauzerda saqlanadi. Ularni boshqa kompyuter yoki brauzerda koʻrish uchun faylga saqlang va u yerda yuklang. |
| 537 | `teacher.expBtn` | Сохранить имена в файл | Ismlarni faylga saqlash |
| 538 | `teacher.impBtn` | Загрузить имена из файла | Ismlarni fayldan yuklash |
| 539 | `teacher.expNone` | В этом браузере пока нет сохранённых имён. | Bu brauzerda hali saqlangan ismlar yoʻq. |
| 540 | `teacher.impReadFail` | Не удалось прочитать файл. Нужен файл, сохранённый кнопкой «Сохранить имена в файл». | Faylni oʻqib boʻlmadi. «Ismlarni faylga saqlash» tugmasi bilan saqlangan fayl kerak. |
| 541 | `teacher.impNoNames` | В файле нет имён учеников. | Faylda oʻquvchilar ismlari yoʻq. |
| 542 | `teacher.impConfirm` | Загрузить имена: классов — {c}, учеников — {n}? | Ismlar yuklansinmi: sinflar — {c}, oʻquvchilar — {n}? |
| 543 | `teacher.impClash` | Внимание: для классов ({n}) в этом браузере уже есть другие имена. Они будут заменены именами из файла. | Diqqat: {n} ta sinf uchun bu brauzerda boshqa ismlar bor. Ular fayldagi ismlar bilan almashtiriladi. |
| 544 | `teacher.impStoreFail` | Браузер не дал сохранить данные. | Brauzer maʼlumotlarni saqlashga ruxsat bermadi. |
| 545 | `teacher.impDone` | Готово: имена загружены. | Tayyor: ismlar yuklandi. |
| 546 | `teacher.namesTitle` | Настоящие имена (только на этом компьютере) | Haqiqiy ismlar (faqat shu kompyuterda) |
| 547 | `teacher.namesHelp` | По одной строке: код; имя и фамилия. Например: &lt;code&gt;07; Азиза Каримова&lt;/code&gt; | Har bir qatorda: kod; ism va familiya. Masalan: &lt;code&gt;07; Aziza Karimova&lt;/code&gt; |
| 548 | `teacher.save` | Сохранить | Saqlash |
| 549 | `teacher.roleTitle` | Сделать пользователя учителем | Foydalanuvchini oʻqituvchi qilish |
| 550 | `teacher.roleNote` | Пользователь сначала должен быть создан в Supabase → Authentication → Users. | Avval foydalanuvchi Supabase → Authentication → Users boʻlimida yaratilishi kerak. |
| 551 | `teacher.email` | Email | Email |
| 552 | `teacher.role` | Роль | Rol |
| 553 | `teacher.roles.teacher` | учитель | oʻqituvchi |
| 554 | `teacher.roles.user` | обычный пользователь | oddiy foydalanuvchi |
| 555 | `teacher.roles.admin` | администратор | administrator |
| 556 | `teacher.close` | Закрыть | Yopish |
| 557 | `teacher.pinsTitle` | ПИН учеников | Oʻquvchilarning PIN kodlari |
| 558 | `teacher.pinsWarn` | &lt;b&gt;Распечатайте или перепишите сейчас:&lt;/b&gt; после закрытия окна ПИН больше не будет видно (в базе хранится только зашифрованный вариант). Если потеряете — выдайте новый ПИН. | &lt;b&gt;Hozir chop eting yoki koʻchirib oling:&lt;/b&gt; oyna yopilgach PIN boshqa koʻrinmaydi (bazada faqat shifrlangan varianti saqlanadi). Yoʻqotsangiz — yangi PIN bering. |
| 559 | `teacher.pinsPrint` | Печать листа с ПИН | PIN varaqasini chop etish |
| 560 | `teacher.gateLogin` | Войдите по email учителя. | Oʻqituvchi emaili orqali kiring. |
| 561 | `teacher.login` | Войти | Kirish |
| 562 | `teacher.noRights` | У аккаунта {email} нет прав учителя. Обратитесь к администратору сайта. | {email} hisobida oʻqituvchi huquqlari yoʻq. Sayt administratoriga murojaat qiling. |
| 563 | `teacher.stale` | Вход устарел или нет связи. | Kirish muddati tugagan yoki aloqa yoʻq. |
| 564 | `teacher.loginAgain` | Войти снова | Qaytadan kirish |
| 565 | `teacher.archived` |  (архив) |  (arxiv) |
| 566 | `teacher.noClasses` | — классов пока нет — | — hozircha sinflar yoʻq — |
| 567 | `teacher.createFail` | Не удалось создать класс | Sinf yaratib boʻlmadi |
| 568 | `teacher.joinInfo` | Код класса для учеников: &lt;b class="join"&gt;{join}&lt;/b&gt; · вход: &lt;a href="{url}"&gt;{url}&lt;/a&gt; | Oʻquvchilar uchun sinf kodi: &lt;b class="join"&gt;{join}&lt;/b&gt; · kirish: &lt;a href="{url}"&gt;{url}&lt;/a&gt; |
| 569 | `teacher.th.all` | Отметить всех | Hammasini belgilash |
| 570 | `teacher.th.code` | Код | Kod |
| 571 | `teacher.th.nameLocal` | Имя (только у вас) | Ism (faqat sizda) |
| 572 | `teacher.th.nick` | Псевдоним (видят другие) | Taxallus (boshqalar koʻradi) |
| 573 | `teacher.th.sex` | Пол | Jins |
| 574 | `teacher.th.active` | Активен | Faol |
| 575 | `teacher.th.name` | Имя | Ism |
| 576 | `teacher.th.pin` | ПИН | PIN |
| 577 | `teacher.markOne` | Отметить {code} | Belgilash: {code} |
| 578 | `teacher.nickOf` | Псевдоним {code} | Taxallus: {code} |
| 579 | `teacher.sexOf` | Пол {code} | Jins: {code} |
| 580 | `teacher.activeOf` | Активен {code} | Faol: {code} |
| 581 | `teacher.sex.m` | м | yigit |
| 582 | `teacher.sex.f` | ж | qiz |
| 583 | `teacher.saved` | Сохранено ✓ | Saqlandi ✓ |
| 584 | `teacher.error` | Ошибка | Xato |
| 585 | `teacher.markFirst` | Отметьте учеников галочкой. | Oʻquvchilarni belgilang. |
| 586 | `teacher.resetConfirm` | Выдать новый ПИН {n} ученикам? Старые ПИН перестанут работать. | {n} ta oʻquvchiga yangi PIN berilsinmi? Eski PIN kodlar ishlamay qoladi. |
| 587 | `teacher.strip.classCode` | Код класса | Sinf kodi |
| 588 | `teacher.strip.myCode` | Мой код | Mening kodim |
| 589 | `teacher.strip.pin` | ПИН | PIN |
| 590 | `teacher.closePinsConfirm` | Вы распечатали или записали ПИН? После закрытия их не будет видно. | PIN kodlarni chop etdingizmi yoki yozib oldingizmi? Oyna yopilgach ular koʻrinmaydi. |
| 591 | `teacher.printTitle` | ПИН учеников — {name} | Oʻquvchilarning PIN kodlari — {name} |
| 592 | `teacher.printHint` | Если печать не открылась сама — нажмите Ctrl+P (на телефоне: «Поделиться» → «Печать» или «Сохранить в Файлы»). | Chop etish oʻzi ochilmasa — Ctrl+P ni bosing (telefonda: «Ulashish» → «Chop etish» yoki «Fayllarga saqlash»). |
| 593 | `teacher.popupBlocked` | Браузер заблокировал новое окно. Разрешите всплывающие окна для этого сайта и нажмите кнопку ещё раз. | Brauzer yangi oynani blokladi. Bu sayt uchun qalqib chiquvchi oynalarga ruxsat bering va tugmani yana bosing. |
| 594 | `teacher.createClass` | Создайте класс. | Sinf yarating. |
| 595 | `teacher.reportFail` | Не удалось загрузить отчёт. Проверьте интернет. | Hisobotni yuklab boʻlmadi. Internetni tekshiring. |
| 596 | `teacher.cols.name` | Имя | Ism |
| 597 | `teacher.cols.sex` | Пол | Jins |
| 598 | `teacher.cols.sessions` | Входов | Kirishlar |
| 599 | `teacher.cols.minutes` | Минут | Daqiqa |
| 600 | `teacher.cols.days` | Дней | Kunlar |
| 601 | `teacher.cols.known` | Знает слов | Biladigan soʻzlari |
| 602 | `teacher.cols.answers` | Ответов | Javoblar |
| 603 | `teacher.cols.acc` | Верно % | Toʻgʻri % |
| 604 | `teacher.cols.bad` | Ошибок | Xatolar |
| 605 | `teacher.cols.ct` | Тесты % | Testlar % |
| 606 | `teacher.cols.qz` | Викторины % | Viktorinalar % |
| 607 | `teacher.cols.qn` | Попыток викторин | Viktorina urinishlari |
| 608 | `teacher.cols.last` | Последний вход | Oxirgi kirish |
| 609 | `teacher.colTitle` | {l}: {v} мин. | {l}: {v} daq. |
| 610 | `teacher.noData` | пока нет данных | hozircha maʼlumot yoʻq |
| 611 | `teacher.units.min` | мин. | daq. |
| 612 | `teacher.units.words` | сл. | soʻz |
| 613 | `teacher.units.days` | дн. | kun |
| 614 | `teacher.units.times` | раз | marta |
| 615 | `teacher.units.errPct` | % ошибок | % xato |
| 616 | `teacher.units.people` | чел. | kishi |
| 617 | `teacher.noms.time` | ⏱ Больше всех времени | ⏱ Eng koʻp vaqt sarflagan |
| 618 | `teacher.noms.words` | 📚 Выучил больше слов | 📚 Eng koʻp soʻz oʻrgangan |
| 619 | `teacher.noms.acc` | 🎯 Самый точный (от 50 ответов) | 🎯 Eng aniq (50 ta javobdan) |
| 620 | `teacher.noms.days` | 📅 Больше всех дней занятий | 📅 Eng koʻp kun shugʻullangan |
| 621 | `teacher.noms.sessions` | 🔁 Чаще всех заходил | 🔁 Eng koʻp kirgan |
| 622 | `teacher.noms.ct` | 🧪 Лучший в тестах по словам | 🧪 Soʻzlar testlarida eng yaxshi |
| 623 | `teacher.noms.qz` | 🏆 Лучший в викторинах (средний %) | 🏆 Viktorinalarda eng yaxshi (oʻrtacha %) |
| 624 | `teacher.noms.help` | ⚠ Нужна помощь: низкая точность | ⚠ Yordam kerak: aniqlik past |
| 625 | `teacher.noms.idle` | 💤 Не занимались | 💤 Shugʻullanmaganlar |
| 626 | `teacher.allActive` | все занимались | hamma shugʻullangan |
| 627 | `teacher.kpi.active` | занимались | shugʻullangan |
| 628 | `teacher.kpi.minutes` | минут всего | jami daqiqa |
| 629 | `teacher.kpi.perLearner` | минут на ученика | bir oʻquvchiga daqiqa |
| 630 | `teacher.kpi.answers` | ответов | javob |
| 631 | `teacher.kpi.correct` | верных ответов | toʻgʻri javoblar |
| 632 | `teacher.kpi.sessions` | входов | kirish |
| 633 | `teacher.ofN` | {a} из {b} | {a}/{b} |
| 634 | `teacher.nominations` | Номинации | Nominatsiyalar |
| 635 | `teacher.nomsNote` | «Нужна помощь» и «Не занимались» видите только вы. Ученикам показываются только положительные номинации. | «Yordam kerak» va «Shugʻullanmaganlar»ni faqat siz koʻrasiz. Oʻquvchilarga faqat ijobiy nominatsiyalar koʻrsatiladi. |
| 636 | `teacher.learners` | Ученики | Oʻquvchilar |
| 637 | `teacher.learnersNote` | Нажмите на заголовок столбца, чтобы отсортировать, или на строку — чтобы открыть подробности. | Saralash uchun ustun sarlavhasini, batafsil maʼlumot uchun qatorni bosing. |
| 638 | `teacher.hardWords` | Трудные слова класса | Sinf uchun qiyin soʻzlar |
| 639 | `teacher.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 640 | `teacher.when` | Когда занимаются | Qachon shugʻullanishadi |
| 641 | `teacher.byWeekday` | По дням недели, минуты | Hafta kunlari boʻyicha, daqiqa |
| 642 | `teacher.weekdays` | пн · вт · ср · чт · пт · сб · вс | du · se · ch · pa · ju · sh · ya |
| 643 | `teacher.byHour` | По часам, минуты | Soatlar boʻyicha, daqiqa |
| 644 | `teacher.last30` | Последние 30 дней, минуты | Oxirgi 30 kun, daqiqa |
| 645 | `teacher.sexTitle` | Юноши и девушки | Yigitlar va qizlar |
| 646 | `teacher.sexCols.group` | Группа | Guruh |
| 647 | `teacher.sexCols.n` | Чел. | Kishi |
| 648 | `teacher.sexCols.minutes` | Минут | Daqiqa |
| 649 | `teacher.sexCols.known` | Знает слов | Biladigan soʻzlari |
| 650 | `teacher.sexCols.acc` | Точность % | Aniqlik % |
| 651 | `teacher.sexCols.ct` | Тесты % | Testlar % |
| 652 | `teacher.boys` | Юноши | Yigitlar |
| 653 | `teacher.girls` | Девушки | Qizlar |
| 654 | `teacher.sexMissing` | Не у всех указан пол: заполните его во вкладке «Ученики и ПИН». | Hammaning jinsi koʻrsatilmagan: uni «Oʻquvchilar va PIN» boʻlimida toʻldiring. |
| 655 | `teacher.sexNote` | Группа небольшая (n = {n}), поэтому разница даже в 10–15% может быть случайной. Это описание группы, а не вывод о юношах и девушках. | Guruh kichik (n = {n}), shuning uchun hatto 10–15% farq ham tasodifiy boʻlishi mumkin. Bu guruhning tavsifi, yigitlar va qizlar haqidagi xulosa emas. |
| 656 | `teacher.reportAt` | Отчёт на {t}. Подробно о викторинах — во вкладке «Викторины». | Hisobot vaqti: {t}. Viktorinalar haqida batafsil — «Viktorinalar» boʻlimida. |
| 657 | `teacher.wcols.word` | Слово | Soʻz |
| 658 | `teacher.wcols.tr` | Перевод | Tarjima |
| 659 | `teacher.wcols.studs` | Ошиблись | Xato qilganlar |
| 660 | `teacher.wcols.pct` | Ошибок % | Xato % |
| 661 | `teacher.noErrors` | Пока ошибок нет. | Hozircha xatolar yoʻq. |
| 662 | `teacher.noDataYet` | Пока нет данных. | Hozircha maʼlumot yoʻq. |
| 663 | `teacher.detail.head` | {name} · код {code} | {name} · kod {code} |
| 664 | `teacher.detail.boy` | юноша ·  | yigit ·  |
| 665 | `teacher.detail.girl` | девушка ·  | qiz ·  |
| 666 | `teacher.detail.line` | псевдоним «{nick}» · входов: &lt;b&gt;{s}&lt;/b&gt; · минут: &lt;b&gt;{m}&lt;/b&gt; · дней: &lt;b&gt;{d}&lt;/b&gt; · ответов: &lt;b&gt;{a}&lt;/b&gt; (верно {acc}%) · последний вход: {last} | taxallus «{nick}» · kirishlar: &lt;b&gt;{s}&lt;/b&gt; · daqiqa: &lt;b&gt;{m}&lt;/b&gt; · kunlar: &lt;b&gt;{d}&lt;/b&gt; · javoblar: &lt;b&gt;{a}&lt;/b&gt; (toʻgʻri {acc}%) · oxirgi kirish: {last} |
| 667 | `teacher.detail.decks` | Слова по наборам | Toʻplamlar boʻyicha soʻzlar |
| 668 | `teacher.detail.deckCols.deck` | Набор | Toʻplam |
| 669 | `teacher.detail.deckCols.seen` | Видел | Koʻrgan |
| 670 | `teacher.detail.deckCols.learn` | Учит | Oʻrganmoqda |
| 671 | `teacher.detail.deckCols.good` | Знает | Biladi |
| 672 | `teacher.detail.deckCols.done` | Выучил | Oʻrgangan |
| 673 | `teacher.detail.tests` | Тесты по словам | Soʻzlar testlari |
| 674 | `teacher.detail.testsLine` | {n} · средний {avg}% · лучший {best}% | {n} · oʻrtacha {avg}% · eng yaxshisi {best}% |
| 675 | `teacher.detail.noTests` | Тестов нет. | Testlar yoʻq. |
| 676 | `teacher.detail.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 677 | `teacher.detail.pctOf` | {p}% из {n} | {p}% ({n} tadan) |
| 678 | `teacher.detail.noAnswers` | Нет ответов. | Javoblar yoʻq. |
| 679 | `teacher.detail.hard` | Самые трудные слова | Eng qiyin soʻzlar |
| 680 | `teacher.detail.errors` | ошибок: {n} | xatolar: {n} |
| 681 | `teacher.detail.noErr` | Ошибок нет. | Xatolar yoʻq. |
| 682 | `teacher.detail.daily` | Минуты по дням | Kunlar boʻyicha daqiqa |
| 683 | `teacher.detail.noDays` | Нет занятий. | Mashgʻulotlar yoʻq. |
| 684 | `teacher.detail.quizzes` | Викторины | Viktorinalar |
| 685 | `teacher.att.none` | Попыток нет. | Urinishlar yoʻq. |
| 686 | `teacher.att.when` | Когда | Qachon |
| 687 | `teacher.att.learner` | Ученик | Oʻquvchi |
| 688 | `teacher.att.quiz` | Викторина | Viktorina |
| 689 | `teacher.att.correct` | Верно | Toʻgʻri |
| 690 | `teacher.att.points` | Очки | Ball |
| 691 | `teacher.att.time` | Время | Vaqt |
| 692 | `teacher.att.level` | Уровень | Daraja |
| 693 | `teacher.att.exits` | Выходы | Chiqishlar |
| 694 | `teacher.att.review` | Разбор | Tahlil |
| 695 | `teacher.att.reviewBest` | Разбор лучшей | Eng yaxshisi tahlili |
| 696 | `teacher.reviewLine` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {p} очков · {time} · {lvl} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {p} ball · {time} · {lvl} |
| 697 | `teacher.reviewLineMock` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {time} · выходов из окна: {x} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {time} · oynadan chiqishlar: {x} |
| 698 | `teacher.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |
| 699 | `teacher.noQData` | Нет данных. | Maʼlumot yoʻq. |
| 700 | `teacher.testMark` |  (тест) |  (test) |
| 701 | `teacher.mockMark` |  (пробный экзамен) |  (mock imtihon) |
| 702 | `teacher.attemptsN` | {title}{test} — попыток: {n} | {title}{test} — urinishlar: {n} |
| 703 | `teacher.qkpi.done` | прошли | topshirgan |
| 704 | `teacher.qkpi.attempts` | попыток | urinish |
| 705 | `teacher.qkpi.avgBest` | средний лучший результат | oʻrtacha eng yaxshi natija |
| 706 | `teacher.qcols.name` | Имя | Ism |
| 707 | `teacher.qcols.n` | Попыток | Urinishlar |
| 708 | `teacher.qcols.best` | Лучший | Eng yaxshisi |
| 709 | `teacher.qcols.points` | Очки | Ball |
| 710 | `teacher.qcols.exits` | Выходы из окна | Oynadan chiqishlar |
| 711 | `teacher.qcols.last` | Последняя | Oxirgisi |
| 712 | `teacher.qParts` | Части викторины: доля верных | Viktorina qismlari: toʻgʻri javoblar ulushi |
| 713 | `teacher.noAnswersYet` | Пока нет ответов. | Hozircha javoblar yoʻq. |
| 714 | `teacher.allAttempts` | Все попытки | Barcha urinishlar |
| 715 | `teacher.hardQ` | Трудные вопросы | Qiyin savollar |
| 716 | `teacher.hardQNote` | Сверху — вопросы, в которых ошиблось больше всего учеников. | Yuqorida — eng koʻp oʻquvchi xato qilgan savollar. |
| 717 | `teacher.hq.q` | Вопрос | Savol |
| 718 | `teacher.hq.c` | Правильный ответ | Toʻgʻri javob |
| 719 | `teacher.hq.studs` | Ошиблись | Xato qilganlar |
| 720 | `teacher.hq.pct` | Ошибок % | Xato % |
| 721 | `teacher.exportFail` | Не удалось выгрузить. | Yuklab boʻlmadi. |
| 722 | `teacher.csvQ` | Код · Имя · Когда · Попытка · № · Часть · Вопрос · Ответ · Правильный · Верно · Секунд | Kod · Ism · Qachon · Urinish · № · Qism · Savol · Javob · Toʻgʻri javob · Toʻgʻrimi · Soniya |
| 723 | `teacher.csvCode` | Код | Kod |
| 724 | `teacher.yes` | да | ha |
| 725 | `teacher.no` | нет | yoʻq |
| 726 | `teacher.roleSaved` | Сохранено. | Saqlandi. |
| 727 | `teacher.noUser` | Такого пользователя нет. Сначала создайте его в Supabase → Authentication → Users. | Bunday foydalanuvchi yoʻq. Avval uni Supabase → Authentication → Users boʻlimida yarating. |
| 728 | `teacher.roleFail` | Не удалось сохранить. | Saqlab boʻlmadi. |

## Подвал

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 729 | `footer.author` | Автор | Muallif |
| 730 | `footer.authorRole` | преподаватель арабского языка | arab tili oʻqituvchisi |
| 731 | `footer.contacts` | Связаться | Bogʻlanish |
| 732 | `footer.about` | О сайте | Sayt haqida |
| 733 | `footer.privacy` | Конфиденциальность | Maxfiylik |
