# Oʻzbekcha satrlarni tekshirish · Проверка узбекских строк

Здесь собраны **все строки интерфейса на узбекском** (латиница) рядом с русскими — 724 строк.
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
15. Пробные экзамены: раздел → **Mock imtihonlar** (так в задании), а в описании «Тестов» и в названии At-Tanāl — **sinov imtihoni**. Оставить оба или выбрать одно?
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
| 211 | `deck.tabs.cards` | Карточки | Kartochkalar |
| 212 | `deck.tabs.test` | Тест · 20 вопросов | Test · 20 ta savol |
| 213 | `deck.tabs.hard` | Мои трудные | Qiyin soʻzlarim |
| 214 | `deck.tabs.board` | Рейтинг класса | Sinf reytingi |
| 215 | `deck.which` | Какие слова показывать | Qaysi soʻzlarni koʻrsatish |
| 216 | `deck.all` | Все слова | Barcha soʻzlar |
| 217 | `deck.onlyHard` | Только трудные | Faqat qiyinlari |
| 218 | `deck.dir` | Направление | Yoʻnalish |
| 219 | `deck.dirs` | ар → рус · рус → ар · вперемешку | arabcha → tarjima · tarjima → arabcha · aralash |
| 220 | `deck.no` | Не знаю | Bilmayman |
| 221 | `deck.yes` | Знаю | Bilaman |
| 222 | `deck.below` | Новые слова и слова с ошибками попадаются чаще, выученные — реже. Нажмите «Знаю», если вспомнили перевод сами; иначе — «Не знаю», и ответ покажется. | Yangi va xato qilingan soʻzlar tez-tez, oʻrganilganlari kamroq chiqadi. Tarjimani oʻzingiz eslasangiz, «Bilaman»ni bosing; aks holda «Bilmayman»ni bosing — javob koʻrsatiladi. |
| 223 | `deck.net.guest` | Вы занимаетесь как гость — прогресс хранится только на этом устройстве. &lt;a href="{login}"&gt;Войти&lt;/a&gt; | Siz mehmon sifatida shugʻullanyapsiz — natijalar faqat shu qurilmada saqlanadi. &lt;a href="{login}"&gt;Kirish&lt;/a&gt; |
| 224 | `deck.net.saved` | ☁ Сохранено | ☁ Saqlandi |
| 225 | `deck.net.pending` | ☁ Сохраняю… | ☁ Saqlanmoqda… |
| 226 | `deck.net.offline` | ⚠ Нет связи — ответы сохранятся, когда появится интернет | ⚠ Aloqa yoʻq — javoblar internet paydo boʻlganda saqlanadi |
| 227 | `deck.net.relogin` | ⚠ Вход устарел. &lt;a href="{login}"&gt;Войдите снова&lt;/a&gt; | ⚠ Kirish muddati tugagan. &lt;a href="{login}"&gt;Qaytadan kiring&lt;/a&gt; |
| 228 | `deck.lv.new` | новые | yangi |
| 229 | `deck.lv.learn` | учу | oʻrganyapman |
| 230 | `deck.lv.good` | знаю | bilaman |
| 231 | `deck.lv.done` | выучено | oʻrganilgan |
| 232 | `deck.passed` | пройдено {k} из {n} | koʻrildi: {k}/{n} |
| 233 | `deck.inSet` | Слов в подборке: {n}, из них новых: {k} | Toʻplamda {n} ta soʻz, ulardan yangi: {k} |
| 234 | `deck.noHard` | Трудных слов пока нет | Hozircha qiyin soʻzlar yoʻq |
| 235 | `deck.empty` | Здесь пусто | Bu yer boʻsh |
| 236 | `deck.tagNew` | новое слово | yangi soʻz |
| 237 | `deck.tagErr` | ошибок: {n} | xatolar: {n} |
| 238 | `deck.tagRep` | повторение | takrorlash |
| 239 | `deck.tapHint` | нажмите, чтобы увидеть ответ | javobni koʻrish uchun bosing |
| 240 | `deck.remember` | Запомните ответ и нажмите любую кнопку | Javobni eslab qoling va istalgan tugmani bosing |
| 241 | `deck.grades` | Отлично · Хорошо · Удовлетворительно · Нужно повторить | Aʼlo · Yaxshi · Qoniqarli · Takrorlash kerak |
| 242 | `deck.result` | {s} из {n} | {s}/{n} |
| 243 | `deck.resultNote` | {lvl}. Слова с ошибками теперь будут попадаться чаще. | {lvl}. Xato qilingan soʻzlar endi tez-tez chiqadi. |
| 244 | `deck.again` | Пройти ещё раз | Yana bir bor |
| 245 | `deck.qOf` | Вопрос {i} из {n} · верно: {s} | Savol {i}/{n} · toʻgʻri: {s} |
| 246 | `deck.hardH` | Слова, в которых вы ошибались | Siz xato qilgan soʻzlar |
| 247 | `deck.relearned` | ✓ — слово уже выучено заново. | ✓ — soʻz qayta oʻrganildi. |
| 248 | `deck.noErr` | Ошибок пока нет. | Hozircha xatolar yoʻq. |
| 249 | `deck.boardLogin` | Рейтинг виден ученикам класса. &lt;a href="{href}"&gt;Войти в класс&lt;/a&gt; | Reyting sinf oʻquvchilariga koʻrinadi. &lt;a href="{href}"&gt;Sinfga kirish&lt;/a&gt; |
| 250 | `deck.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 251 | `deck.boardEmpty` | Пока пусто. | Hozircha boʻsh. |
| 252 | `deck.bTime` | Больше всех занимались | Eng koʻp shugʻullanganlar |
| 253 | `deck.bKnown` | Знают больше всего слов | Eng koʻp soʻz biladiganlar |
| 254 | `deck.bAcc` | Самые точные (от 50 ответов) | Eng aniqlari (50 ta javobdan) |
| 255 | `deck.uMin` | мин. | daq. |
| 256 | `deck.uWords` | сл. | soʻz |
| 257 | `deck.bNote` | Время считается только активное: когда вы отвечаете на карточки. | Faqat faol vaqt hisoblanadi: kartochkalarga javob berayotgan vaqtingiz. |
| 258 | `deck.offline` | Нет связи. Попробуйте позже. | Aloqa yoʻq. Keyinroq urinib koʻring. |

## Викторины и тесты

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 259 | `quiz.questions` | {n} вопросов | {n} ta savol |
| 260 | `quiz.start` | Начать ▶ | Boshlash ▶ |
| 261 | `quiz.whoPin` | Результат сохранится: &lt;b&gt;{name}&lt;/b&gt; · класс «{cls}» | Natija saqlanadi: &lt;b&gt;{name}&lt;/b&gt; · «{cls}» sinfi |
| 262 | `quiz.whoEmail` | Результат сохранится в вашем аккаунте: &lt;b&gt;{name}&lt;/b&gt; | Natija hisobingizda saqlanadi: &lt;b&gt;{name}&lt;/b&gt; |
| 263 | `quiz.whoGuest` | Вы проходите как гость: результат останется только на этом устройстве и не попадёт в рейтинг класса. | Siz mehmon sifatida oʻtyapsiz: natija faqat shu qurilmada qoladi va sinf reytingiga kirmaydi. |
| 264 | `quiz.login` | Войти в класс | Sinfga kirish |
| 265 | `quiz.guestBest` | Ваш лучший результат на этом устройстве: {p} очков ({c} из {t}). | Shu qurilmadagi eng yaxshi natijangiz: {p} ball ({c}/{t}). |
| 266 | `quiz.sound` | 🔊 Звук | 🔊 Ovoz |
| 267 | `quiz.soundOff` | 🔇 Без звука | 🔇 Ovozsiz |
| 268 | `quiz.part` | Часть {i} из {n} | Qism {i}/{n} |
| 269 | `quiz.toQuestions` | К вопросам ▶ | Savollarga ▶ |
| 270 | `quiz.text` | 📄 Текст | 📄 Matn |
| 271 | `quiz.openText` | 📄 Открыть текст | 📄 Matnni ochish |
| 272 | `quiz.textTitle` | Текст урока | Dars matni |
| 273 | `quiz.listen` | ▶ Прослушать диалог (осталось {n}) | ▶ Dialogni tinglash (qoldi: {n}) |
| 274 | `quiz.listened` | Прослушано 2 раза | 2 marta tinglandi |
| 275 | `quiz.playing` | 🔊 Звучит запись… | 🔊 Yozuv eshittirilmoqda… |
| 276 | `quiz.loadingAudio` | ⏳ Загрузка записи… | ⏳ Yozuv yuklanmoqda… |
| 277 | `quiz.audioOk` | Запись диалога. Можно прослушать два раза. | Dialog yozuvi. Ikki marta tinglash mumkin. |
| 278 | `quiz.ttsNote` | Диалог читает голос устройства. Лучше слушать запись или преподавателя. | Dialogni qurilma ovozi oʻqiydi. Yozuvni yoki oʻqituvchini tinglagan maʼqul. |
| 279 | `quiz.noVoice` | На этом устройстве нет арабского голоса — слушайте преподавателя. | Bu qurilmada arabcha ovoz yoʻq — oʻqituvchini tinglang. |
| 280 | `quiz.points` | {n} очков | {n} ball |
| 281 | `quiz.right` | ✅ Верно! +{n} | ✅ Toʻgʻri! +{n} |
| 282 | `quiz.wrong` | ❌ Неверно | ❌ Notoʻgʻri |
| 283 | `quiz.timeout` | ⏰ Время вышло | ⏰ Vaqt tugadi |
| 284 | `quiz.noAnswer` | (нет ответа) | (javob yoʻq) |
| 285 | `quiz.result` | {lvl} · верно {c} из {t} ({pct}%) | {lvl} · toʻgʻri: {c}/{t} ({pct}%) |
| 286 | `quiz.time` | Время: {t} | Vaqt: {t} |
| 287 | `quiz.myAnswers` | 📋 Мои ответы | 📋 Javoblarim |
| 288 | `quiz.again` | ↻ Ещё раз | ↻ Yana |
| 289 | `quiz.toList` | К списку | Roʻyxatga |
| 290 | `quiz.reviewTitle` | Мои ответы | Javoblarim |
| 291 | `quiz.question` | вопрос {n} | {n}-savol |
| 292 | `quiz.ok` | ✅ верно | ✅ toʻgʻri |
| 293 | `quiz.bad` | ❌ неверно | ❌ notoʻgʻri |
| 294 | `quiz.yourAnswer` | Ваш ответ: | Javobingiz: |
| 295 | `quiz.rightAnswer` | Правильный ответ: | Toʻgʻri javob: |
| 296 | `quiz.why` | Почему: | Izoh: |
| 297 | `quiz.sec` | с | s |
| 298 | `quiz.close` | Закрыть | Yopish |
| 299 | `quiz.saved` | ☁ Результат сохранён | ☁ Natija saqlandi |
| 300 | `quiz.pending` | ☁ Сохраняю результат… | ☁ Natija saqlanmoqda… |
| 301 | `quiz.offline` | ⚠ Нет связи — результат сохранён на телефоне и отправится, когда появится интернет | ⚠ Aloqa yoʻq — natija telefonda saqlandi va internet paydo boʻlganda yuboriladi |
| 302 | `quiz.relogin` | ⚠ Вход устарел — войдите снова, и результат отправится | ⚠ Kirish muddati tugagan — qaytadan kiring, natija yuboriladi |
| 303 | `quiz.guestSaved` | Результат не сохранён в облаке: вы не вошли. | Natija bulutda saqlanmadi: siz kirmagansiz. |
| 304 | `quiz.board` | 🏆 Рейтинг класса | 🏆 Sinf reytingi |
| 305 | `quiz.boardNote` | Лучший результат каждого за последние 3 часа. Только псевдонимы. | Har kimning oxirgi 3 soatdagi eng yaxshi natijasi. Faqat taxalluslar. |
| 306 | `quiz.boardEmpty` | Пока нет результатов. | Hozircha natijalar yoʻq. |
| 307 | `quiz.boardFail` | Рейтинг сейчас недоступен. | Reyting hozir mavjud emas. |
| 308 | `quiz.yourPlace` | Ваше место: {n} | Sizning oʻrningiz: {n} |
| 309 | `quiz.leaveConfirm` | Викторина ещё идёт. Выйти? | Viktorina hali davom etyapti. Chiqasizmi? |
| 310 | `quiz.secondsLeft` | секунд осталось | qolgan soniyalar |
| 311 | `quiz.noscript` | Для викторины нужен включённый JavaScript. | Viktorina uchun JavaScript yoqilgan boʻlishi kerak. |
| 312 | `quiz.contentRu` | — | Savollar va izohlar hozircha rus tilida. |

## Пробные экзамены

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 313 | `mock.meta` | {q} · {m} | {q} · {m} |
| 314 | `mock.questions` | {n} вопроса | {n} ta savol |
| 315 | `mock.minutes` | {n} минуты | {n} daqiqa |
| 316 | `mock.bookH` | Источник вопросов | Savollar manbasi |
| 317 | `mock.bookAuthor` | Автор: {list} | Muallif: {list} |
| 318 | `mock.bookAuthors` | Авторы: {list} | Mualliflar: {list} |
| 319 | `mock.bookRights` | Вопросы составлены по этой книге. Права на книгу принадлежат её авторам и издателю. | Savollar shu kitob asosida tuzilgan. Kitobga boʻlgan huquqlar uning mualliflari va noshiriga tegishli. |
| 320 | `mock.rulesH` | Правила | Qoidalar |
| 321 | `mock.ruleTimer` | Один общий таймер на весь экзамен — {m}. В 0:00 экзамен сдаётся автоматически; за 5 минут и за 1 минуту до конца появится предупреждение. | Butun imtihonga bitta umumiy taymer — {m}. 0:00 da imtihon avtomatik topshiriladi; tugashiga 5 daqiqa va 1 daqiqa qolganda ogohlantirish chiqadi. |
| 322 | `mock.ruleNav` | Вопросы можно листать в любом порядке, менять ответ и отмечать, чтобы вернуться к ним. Клавиши: 1–4 — вариант ответа, ← и → — предыдущий и следующий вопрос. | Savollarni istalgan tartibda varaqlash, javobni oʻzgartirish va keyin qaytish uchun belgilab qoʻyish mumkin. Tugmalar: 1–4 — javob varianti, ← va → — oldingi va keyingi savol. |
| 323 | `mock.ruleFocus` | Во время экзамена скрыты меню, поиск и подвал сайта, страница открывается во весь экран (где браузер это позволяет). Выделять, копировать и печатать текст нельзя. | Imtihon vaqtida sayt menyusi, qidiruv va pastki qismi yashiriladi, sahifa toʻliq ekranda ochiladi (brauzer imkon bergan joyda). Matnni belgilash, nusxalash va chop etish mumkin emas. |
| 324 | `mock.ruleExit` | Выход из окна экзамена — другая вкладка или приложение, сворачивание, выход из полноэкранного режима — засчитывается. Число выходов видно в результате и преподавателю. | Imtihon oynasidan chiqish — boshqa varaq yoki ilovaga oʻtish, oynani yigʻish, toʻliq ekran rejimidan chiqish — hisobga olinadi. Chiqishlar soni natijada va oʻqituvchiga koʻrinadi. |
| 325 | `mock.ruleExitMax` | Выйти из окна можно не больше {n} раза: при следующем выходе экзамен сдаётся автоматически. | Oynadan koʻpi bilan {n} marta chiqish mumkin: keyingi chiqishda imtihon avtomatik topshiriladi. |
| 326 | `mock.ruleReload` | Если страница случайно закроется или перезагрузится, откройте её снова: экзамен продолжится с того же места. Время при этом не останавливается, а закрытие страницы считается выходом из окна. | Sahifa tasodifan yopilsa yoki qayta yuklansa, uni yana oching: imtihon oʻsha joydan davom etadi. Vaqt toʻxtamaydi, sahifani yopish esa oynadan chiqish hisoblanadi. |
| 327 | `mock.ruleHonest` | Честно о пределах: браузер не может полностью запретить другую вкладку, второй телефон или ИИ. Эти правила сдерживают и ведут учёт, но это не наблюдение за экзаменом. | Cheklovlar haqida rostini aytsak: brauzer boshqa varaqni, ikkinchi telefonni yoki sunʼiy intellektni toʻliq taqiqlay olmaydi. Bu qoidalar tiyib turadi va hisob yuritadi, lekin bu imtihonni kuzatish emas. |
| 328 | `mock.whoGuest` | Вы проходите как гость: результат сохранится только на этом устройстве. | Siz mehmon sifatida topshiryapsiz: natija faqat shu qurilmada saqlanadi. |
| 329 | `mock.start` | Начать экзамен | Imtihonni boshlash |
| 330 | `mock.resumeH` | Экзамен идёт | Imtihon davom etyapti |
| 331 | `mock.resumeText` | Осталось времени: {t}. Время не останавливается. | Qolgan vaqt: {t}. Vaqt toʻxtamaydi. |
| 332 | `mock.resume` | Продолжить экзамен | Imtihonni davom ettirish |
| 333 | `mock.timeLeft` | Осталось времени | Qolgan vaqt |
| 334 | `mock.qOf` | Вопрос {i} из {n} | Savol {i}/{n} |
| 335 | `mock.answered` | Отвечено: {a} из {n} | Javob berildi: {a}/{n} |
| 336 | `mock.prev` | Назад | Orqaga |
| 337 | `mock.next` | Далее | Keyingi |
| 338 | `mock.mark` | Отметить | Belgilash |
| 339 | `mock.finish` | Завершить | Yakunlash |
| 340 | `mock.options` | Варианты ответа | Javob variantlari |
| 341 | `mock.palette` | Все вопросы | Barcha savollar |
| 342 | `mock.legendAnswered` | есть ответ | javob bor |
| 343 | `mock.legendEmpty` | без ответа | javobsiz |
| 344 | `mock.legendMarked` | отмечен | belgilangan |
| 345 | `mock.qState` | Вопрос {n}: {s} | {n}-savol: {s} |
| 346 | `mock.warn5` | Осталось 5 минут. | 5 daqiqa qoldi. |
| 347 | `mock.warn1` | Осталась 1 минута. | 1 daqiqa qoldi. |
| 348 | `mock.confirmH` | Завершить экзамен? | Imtihonni yakunlaysizmi? |
| 349 | `mock.confirmEmpty` | Без ответа: {n} вопроса. | Javobsiz savollar: {n} ta. |
| 350 | `mock.confirmAll` | Ответы есть на все вопросы. | Barcha savollarga javob berilgan. |
| 351 | `mock.confirmNote` | После сдачи ответы изменить нельзя. | Topshirgandan keyin javoblarni oʻzgartirib boʻlmaydi. |
| 352 | `mock.confirmYes` | Сдать экзамен | Imtihonni topshirish |
| 353 | `mock.confirmNo` | Вернуться к вопросам | Savollarga qaytish |
| 354 | `mock.exitH` | Вы вышли из окна экзамена | Siz imtihon oynasidan chiqdingiz |
| 355 | `mock.exitText` | Выходов из окна: {n}. Это записывается в результат и видно преподавателю. | Oynadan chiqishlar: {n}. Bu natijaga yoziladi va oʻqituvchiga koʻrinadi. |
| 356 | `mock.exitLimit` | Предел — {max}. При превышении экзамен сдаётся автоматически. | Chegara — {max}. Undan oshsa, imtihon avtomatik topshiriladi. |
| 357 | `mock.exitBack` | Вернуться к экзамену | Imtihonga qaytish |
| 358 | `mock.noPrint` | Печать во время экзамена недоступна. | Imtihon vaqtida chop etish mumkin emas. |
| 359 | `mock.resultH` | Результат | Natija |
| 360 | `mock.doneTime` | Время вышло — экзамен сдан автоматически. | Vaqt tugadi — imtihon avtomatik topshirildi. |
| 361 | `mock.doneExits` | Слишком много выходов из окна — экзамен сдан автоматически. | Oynadan juda koʻp chiqildi — imtihon avtomatik topshirildi. |
| 362 | `mock.sumAnswered` | Отвечено | Javob berilgan |
| 363 | `mock.sumCorrect` | Верных ответов | Toʻgʻri javoblar |
| 364 | `mock.sumTime` | Затрачено времени | Sarflangan vaqt |
| 365 | `mock.sumExits` | Выходов из окна | Oynadan chiqishlar |
| 366 | `mock.ofN` | {a} из {n} | {a}/{n} |
| 367 | `mock.tableH` | Ответы | Javoblar |
| 368 | `mock.cols.n` | № | № |
| 369 | `mock.cols.q` | Вопрос | Savol |
| 370 | `mock.cols.yours` | Ваш ответ | Javobingiz |
| 371 | `mock.cols.right` | Правильный ответ | Toʻgʻri javob |
| 372 | `mock.cols.topic` | Тема | Mavzu |
| 373 | `mock.noAnswer` | нет ответа | javob yoʻq |
| 374 | `mock.isOk` | верно | toʻgʻri |
| 375 | `mock.isBad` | неверно | notoʻgʻri |
| 376 | `mock.topic` | тема {n} | {n}-mavzu |
| 377 | `mock.topicsH` | По темам | Mavzular boʻyicha |
| 378 | `mock.topicCols.topic` | Тема | Mavzu |
| 379 | `mock.topicCols.n` | Вопросов | Savollar |
| 380 | `mock.topicCols.ok` | Верных | Toʻgʻri |
| 381 | `mock.detailH` | Все вопросы | Barcha savollar |
| 382 | `mock.yourMark` | ваш ответ | javobingiz |
| 383 | `mock.rightMark` | правильный ответ | toʻgʻri javob |
| 384 | `mock.print` | Печать / PDF | Chop etish / PDF |
| 385 | `mock.again` | Новый экзамен | Yangi imtihon |
| 386 | `mock.newConfirm` | Начать новый экзамен? Разбор этого экзамена исчезнет с экрана (если вы вошли, он сохранён в «Моём прогрессе»). | Yangi imtihon boshlansinmi? Bu imtihon tahlili ekrandan yoʻqoladi (agar kirgan boʻlsangiz, u «Mening natijalarim»da saqlangan). |
| 387 | `mock.toList` | К списку экзаменов | Imtihonlar roʻyxatiga |
| 388 | `mock.printDate` | Дата: {d} | Sana: {d} |
| 389 | `mock.guestSaved` | Результат сохранён только на этом устройстве: вы не вошли. | Natija faqat shu qurilmada saqlandi: siz kirmagansiz. |
| 390 | `mock.noscript` | Для экзамена нужен включённый JavaScript. | Imtihon uchun JavaScript yoqilgan boʻlishi kerak. |

## Табло для проектора

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 391 | `board.title` | Табло | Tablo |
| 392 | `board.classCode` | Код класса | Sinf kodi |
| 393 | `board.show` | Показать | Koʻrsatish |
| 394 | `board.hours` | за последние {n} ч. | oxirgi {n} soatda |
| 395 | `board.empty` | Пока нет результатов. Табло обновляется само. | Hozircha natijalar yoʻq. Tablo oʻzi yangilanadi. |
| 396 | `board.noClass` | Класс с таким кодом не найден. | Bunday kodli sinf topilmadi. |
| 397 | `board.offline` | Нет связи — пробую снова… | Aloqa yoʻq — qayta urinilmoqda… |
| 398 | `board.updated` | обновлено {t} | yangilandi: {t} |

## Страница-переадресация

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 399 | `moved.title` | Страница переехала | Sahifa koʻchirildi |
| 400 | `moved.text` | Эта страница теперь находится по новому адресу: | Bu sahifa endi yangi manzilda: |

## Спряжение глаголов

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 401 | `conj.title` | Спряжение глаголов | Feʼllar tuslanishi |
| 402 | `conj.description` | Таблицы спряжения арабских глаголов: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. С огласовками. | Arab feʼllarining tuslanish jadvallari: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Harakatlari bilan. |
| 403 | `conj.lead` | Таблицы спряжения {n} употребительных глаголов I породы — с огласовками, по всем 13 лицам. Любой другой глагол можно проспрягать ниже. | Keng qoʻllaniladigan {n} ta I bob feʼlining tuslanish jadvallari — harakatlari bilan, barcha 13 shaxs boʻyicha. Boshqa istalgan feʼlni quyida tuslash mumkin. |
| 404 | `conj.count` | {n} глагола | {n} ta feʼl |
| 405 | `conj.searchLabel` | Найти глагол | Feʼlni topish |
| 406 | `conj.searchPh` | например: писать, كتب, يكتب | masalan: كتب, يكتب |
| 407 | `conj.found` | Найдено: {n} | Topildi: {n} |
| 408 | `conj.notFound` | Такого глагола в списке нет. Попробуйте режим «Любой глагол» ниже. | Roʻyxatda bunday feʼl yoʻq. Quyidagi «Istalgan feʼl» rejimini sinab koʻring. |
| 409 | `conj.allTypes` | Все | Hammasi |
| 410 | `conj.types.sound` | правильные | salim |
| 411 | `conj.types.hamzated` | хамзованные | mahmuz |
| 412 | `conj.types.assimilated` | подобные правильным | misol |
| 413 | `conj.types.hollow` | пустые | ajvaf |
| 414 | `conj.types.defective` | недостаточные | noqis |
| 415 | `conj.types.doubled` | удвоенные | muzoaf |
| 416 | `conj.types.lafif` | дважды слабые | lafif |
| 417 | `conj.typesOne.sound` | правильный | salim |
| 418 | `conj.typesOne.hamzated` | хамзованный | mahmuz |
| 419 | `conj.typesOne.assimilated` | подобный правильному | misol |
| 420 | `conj.typesOne.hollow` | пустой | ajvaf |
| 421 | `conj.typesOne.defective` | недостаточный | noqis |
| 422 | `conj.typesOne.doubled` | удвоенный | muzoaf |
| 423 | `conj.typesOne.lafif` | дважды слабый | lafif |
| 424 | `conj.bab.فتحة` | фатха | fatha |
| 425 | `conj.bab.ضمة` | дамма | zamma |
| 426 | `conj.bab.كسرة` | кясра | kasra |
| 427 | `conj.babLabel` | Огласовка в настоящем-будущем | Hozirgi-kelasi zamondagi harakat |
| 428 | `conj.root` | Корень | Oʻzak |
| 429 | `conj.type` | Тип | Turi |
| 430 | `conj.form1` | I порода | I bob |
| 431 | `conj.transitive` | переходный | oʻtimli |
| 432 | `conj.intransitive` | непереходный | oʻtimsiz |
| 433 | `conj.print` | Печать | Chop etish |
| 434 | `conj.allVerbs` | Все глаголы | Barcha feʼllar |
| 435 | `conj.prev` | Предыдущий | Oldingi |
| 436 | `conj.next` | Следующий | Keyingi |
| 437 | `conj.auto` | Таблица построена автоматически (Qutrub). | Jadval avtomatik tuzilgan (Qutrub). |
| 438 | `conj.unchecked` | Формы ещё не проверены преподавателем. | Shakllar hali oʻqituvchi tomonidan tekshirilmagan. |
| 439 | `conj.checked` | Формы проверены преподавателем. | Shakllar oʻqituvchi tomonidan tekshirilgan. |
| 440 | `conj.doubtTitle` | Для преподавателя: что проверить | Oʻqituvchi uchun: nimani tekshirish kerak |
| 441 | `conj.report` | Заметили ошибку? Напишите нам: | Xato koʻrdingizmi? Bizga yozing: |
| 442 | `conj.pageTitle` | {verb} – {present}: спряжение глаголов | {verb} – {present}: feʼl tuslanishi |
| 443 | `conj.pageDesc` | Спряжение глагола {verb} ({present}){gloss}: прошедшее и настоящее-будущее время, наклонения, повелительная форма, страдательный залог. Все 13 лиц, с огласовками. | {verb} ({present}){gloss} feʼlining tuslanishi: oʻtgan va hozirgi-kelasi zamon, mayllar, buyruq shakli, majhul nisbat. Barcha 13 shaxs, harakatlari bilan. |
| 444 | `conj.active` | Действительный залог | Maʼlum nisbat |
| 445 | `conj.passive` | Страдательный залог | Majhul nisbat |
| 446 | `conj.person` | Лицо | Shaxs |
| 447 | `conj.past` | Прошедшее время | Oʻtgan zamon |
| 448 | `conj.present` | Настоящее-будущее время | Hozirgi-kelasi zamon |
| 449 | `conj.moods.present` | изъявительное | marfuʼ |
| 450 | `conj.moods.subjunctive` | сослагательное | mansub |
| 451 | `conj.moods.jussive` | повелительное (усечённое) | majzum |
| 452 | `conj.moodsLead` | Наклонения настоящего-будущего времени | Hozirgi-kelasi zamon mayllari |
| 453 | `conj.short.past` | Прош. | Oʻtgan |
| 454 | `conj.short.present` | Изъяв. | Marfuʼ |
| 455 | `conj.short.subjunctive` | Сослаг. | Mansub |
| 456 | `conj.short.jussive` | Усеч. | Majzum |
| 457 | `conj.short.passive_past` | Прош. | Oʻtgan |
| 458 | `conj.short.passive_present` | Наст.-буд. | Hoz.-kel. |
| 459 | `conj.showCol` | Показать колонку | Ustunni koʻrsatish |
| 460 | `conj.imperative` | Повелительная форма | Buyruq shakli |
| 461 | `conj.impersonal` | Непереходный глагол: в страдательном залоге только безличная форма (3-е лицо ед. ч. м. р., обычно с предлогом): | Oʻtimsiz feʼl: majhul nisbatda faqat shaxssiz shakl bor (III shaxs, birlik, muzakkar; odatda jar harfi bilan): |
| 462 | `conj.noForm` | нет формы | shakl yoʻq |
| 463 | `conj.persons` | я · ты м. · ты ж. · он · она · вы двое · они двое м. · они двое ж. · мы · вы м. · вы ж. · они м. · они ж. | men · sen (muz.) · sen (muan.) · u (muz.) · u (muan.) · siz ikkovingiz · ular ikkovi (muz.) · ular ikkovi (muan.) · biz · sizlar (muz.) · sizlar (muan.) · ular (muz.) · ular (muan.) |
| 464 | `conj.any` | Любой глагол | Istalgan feʼl |
| 465 | `conj.anyLead` | Проспрягать глагол, которого нет в списке: Qutrub запускается прямо в браузере. | Roʻyxatda yoʻq feʼlni tuslash: Qutrub toʻgʻridan-toʻgʻri brauzerda ishlaydi. |
| 466 | `conj.anyLoad` | Загрузить движок спряжения | Tuslash dasturini yuklash |
| 467 | `conj.anySize` | Загрузка около 7 МБ (Pyodide с cdn.jsdelivr.net и пакеты Qutrub с pypi.org), один раз — потом из кэша браузера. | Taxminan 7 MB yuklanadi (Pyodide — cdn.jsdelivr.net saytidan, Qutrub paketlari — pypi.org saytidan), bir marta — keyin brauzer keshidan olinadi. |
| 468 | `conj.anyLoading` | Загружаю Python и Qutrub… | Python va Qutrub yuklanmoqda… |
| 469 | `conj.anySteps` | Загружаю Python (Pyodide)… · Ставлю пакеты Qutrub… · Готово. | Python (Pyodide) yuklanmoqda… · Qutrub paketlari oʻrnatilmoqda… · Tayyor. |
| 470 | `conj.anyFail` | Не удалось загрузить движок. Проверьте интернет и попробуйте ещё раз. | Dasturni yuklab boʻlmadi. Internetni tekshirib, qaytadan urinib koʻring. |
| 471 | `conj.anyVerb` | Глагол в прошедшем времени, 3-е лицо ед. ч. м. р., с огласовками | Oʻtgan zamondagi feʼl (III shaxs, birlik, muzakkar), harakatlari bilan |
| 472 | `conj.anyVerbPh` | например: نَصَرَ | masalan: نَصَرَ |
| 473 | `conj.anyBab` | Огласовка второго корневого в настоящем-будущем (для глаголов I породы) | Hozirgi-kelasi zamonda ikkinchi oʻzak harfining harakati (I bob feʼllari uchun) |
| 474 | `conj.transBoth` | переходный и непереходный | oʻtimli va oʻtimsiz |
| 475 | `conj.anyTrans` | Переходность | Oʻtimlilik |
| 476 | `conj.anyGo` | Проспрягать | Tuslash |
| 477 | `conj.anyHint` | Глаголы II–X пород (например, عَلَّمَ، اِسْتَخْرَجَ) тоже можно; огласовка для них не важна. | II–X bob feʼllarini ham (masalan, عَلَّمَ، اِسْتَخْرَجَ) tuslash mumkin; ular uchun harakat muhim emas. |
| 478 | `conj.anyDict` | В словаре Qutrub есть: | Qutrub lugʻatida bor: |
| 479 | `conj.anyNoDict` | В словаре Qutrub такого глагола I породы нет — проверьте огласовку. | Qutrub lugʻatida bunday I bob feʼli yoʻq — harakatlarni tekshiring. |
| 480 | `conj.anyBad` | Qutrub не смог проспрягать этот глагол. Проверьте, что он в прошедшем времени (3-е л. ед. ч. м. р.) и с огласовками. | Qutrub bu feʼlni tuslay olmadi. Feʼl oʻtgan zamonda (III shaxs, birlik, muzakkar) va harakatlari bilan yozilganini tekshiring. |
| 481 | `conj.anyNeedAr` | Введите глагол арабскими буквами. | Feʼlni arab harflarida kiriting. |
| 482 | `conj.anyNeedBab` | Выберите огласовку настоящего-будущего времени. | Hozirgi-kelasi zamon harakatini tanlang. |
| 483 | `conj.anyNeedVowels` | Поставьте огласовки: у трёхбуквенного глагола они нужны (например, نَصَرَ, а не نصر). | Harakatlarni qoʻying: uch harfli feʼlda ular kerak (masalan, نَصَرَ, نصر emas). |
| 484 | `conj.anyNote` | Результат не проверен преподавателем. Для глаголов из списка выше лучше открыть их страницу. | Natija oʻqituvchi tomonidan tekshirilmagan. Yuqoridagi roʻyxatdagi feʼllar uchun ularning sahifasini ochgan maʼqul. |
| 485 | `conj.inList` | Этот глагол есть в списке: | Bu feʼl roʻyxatda bor: |
| 486 | `conj.creditQutrub` | Спряжение: Qutrub © Taha Zerrouki, GPL | Tuslash: Qutrub © Taha Zerrouki, GPL |
| 487 | `conj.creditArramooz` | Огласовка настоящего времени и переходность: словарь Arramooz © Taha Zerrouki, GPL | Hozirgi zamon harakati va oʻtimlilik: Arramooz lugʻati © Taha Zerrouki, GPL |
| 488 | `conj.creditCode` | исходный код | manba kodi |
| 489 | `conj.creditPyodide` | Python в браузере: Pyodide (MPL-2.0) | Brauzerda Python: Pyodide (MPL-2.0) |
| 490 | `conj.homeLabel` | Спряжение глагола | Feʼl tuslanishi |
| 491 | `conj.homePh` | введите глагол: كتب или «писать» | feʼlni kiriting: كتب |
| 492 | `conj.homeGo` | Показать | Koʻrsatish |
| 493 | `conj.dictLink` | спряжение | tuslanish |

## Панель учителя

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 494 | `teacher.title` | Панель учителя | Oʻqituvchi paneli |
| 495 | `teacher.logout` | Выйти | Chiqish |
| 496 | `teacher.classLabel` | Класс | Sinf |
| 497 | `teacher.newClassBtn` | + Новый класс | + Yangi sinf |
| 498 | `teacher.newClass` | Новый класс | Yangi sinf |
| 499 | `teacher.ncName` | Название | Nomi |
| 500 | `teacher.ncNamePh` | 2 курс ТГУВ, группа 1 | TDShU 2-kurs, 1-guruh |
| 501 | `teacher.ncYear` | Учебный год | Oʻquv yili |
| 502 | `teacher.ncYearPh` | 2026–2027 | 2026–2027 |
| 503 | `teacher.ncCount` | Сколько учеников | Oʻquvchilar soni |
| 504 | `teacher.ncNote` | Ученикам будут выданы коды 01, 02, … и случайные ПИН. ПИН показываются &lt;b&gt;один раз&lt;/b&gt; — сразу распечатайте лист с ПИН. | Oʻquvchilarga 01, 02, … kodlari va tasodifiy PIN beriladi. PIN &lt;b&gt;bir marta&lt;/b&gt; koʻrsatiladi — PIN varaqasini darhol chop eting. |
| 505 | `teacher.ncCreate` | Создать класс | Sinf yaratish |
| 506 | `teacher.tabs.stats` | Статистика | Statistika |
| 507 | `teacher.tabs.quizzes` | Викторины | Viktorinalar |
| 508 | `teacher.tabs.people` | Ученики и ПИН | Oʻquvchilar va PIN |
| 509 | `teacher.tabs.admin` | Администратор | Administrator |
| 510 | `teacher.period` | Период | Davr |
| 511 | `teacher.periods.d7` | Последние 7 дней | Oxirgi 7 kun |
| 512 | `teacher.periods.d30` | Последние 30 дней | Oxirgi 30 kun |
| 513 | `teacher.periods.sem` | С 1 сентября | 1-sentabrdan |
| 514 | `teacher.periods.all` | Всё время | Butun vaqt |
| 515 | `teacher.reload` | Обновить | Yangilash |
| 516 | `teacher.csv` | Скачать таблицу (CSV) | Jadvalni yuklab olish (CSV) |
| 517 | `teacher.print` | Печать | Chop etish |
| 518 | `teacher.pickClass` | Выберите класс. | Sinfni tanlang. |
| 519 | `teacher.quiz` | Викторина | Viktorina |
| 520 | `teacher.boardLink` | Табло для проектора ↗ | Proyektor uchun tablo ↗ |
| 521 | `teacher.allAnswersCsv` | Все ответы (CSV) | Barcha javoblar (CSV) |
| 522 | `teacher.quizNote` | Период — тот же, что во вкладке «Статистика». Табло показывает только псевдонимы и лучший результат каждого за 3 часа; откройте его на компьютере у проектора. | Davr «Statistika» boʻlimidagi bilan bir xil. Tabloda faqat taxalluslar va har kimning 3 soatdagi eng yaxshi natijasi koʻrsatiladi; uni proyektorga ulangan kompyuterda oching. |
| 523 | `teacher.addN` | Сколько добавить | Nechta qoʻshish |
| 524 | `teacher.addBtn` | Добавить учеников | Oʻquvchi qoʻshish |
| 525 | `teacher.resetSel` | Новый ПИН отмеченным | Belgilanganlarga yangi PIN |
| 526 | `teacher.namesBtn` | Настоящие имена… | Haqiqiy ismlar… |
| 527 | `teacher.namesNote` | Настоящие имена хранятся только в этом браузере, не на сервере. Чтобы видеть их на другом компьютере или в другом браузере, сохраните их в файл и загрузите там. | Haqiqiy ismlar serverda emas, faqat shu brauzerda saqlanadi. Ularni boshqa kompyuter yoki brauzerda koʻrish uchun faylga saqlang va u yerda yuklang. |
| 528 | `teacher.expBtn` | Сохранить имена в файл | Ismlarni faylga saqlash |
| 529 | `teacher.impBtn` | Загрузить имена из файла | Ismlarni fayldan yuklash |
| 530 | `teacher.expNone` | В этом браузере пока нет сохранённых имён. | Bu brauzerda hali saqlangan ismlar yoʻq. |
| 531 | `teacher.impReadFail` | Не удалось прочитать файл. Нужен файл, сохранённый кнопкой «Сохранить имена в файл». | Faylni oʻqib boʻlmadi. «Ismlarni faylga saqlash» tugmasi bilan saqlangan fayl kerak. |
| 532 | `teacher.impNoNames` | В файле нет имён учеников. | Faylda oʻquvchilar ismlari yoʻq. |
| 533 | `teacher.impConfirm` | Загрузить имена: классов — {c}, учеников — {n}? | Ismlar yuklansinmi: sinflar — {c}, oʻquvchilar — {n}? |
| 534 | `teacher.impClash` | Внимание: для классов ({n}) в этом браузере уже есть другие имена. Они будут заменены именами из файла. | Diqqat: {n} ta sinf uchun bu brauzerda boshqa ismlar bor. Ular fayldagi ismlar bilan almashtiriladi. |
| 535 | `teacher.impStoreFail` | Браузер не дал сохранить данные. | Brauzer maʼlumotlarni saqlashga ruxsat bermadi. |
| 536 | `teacher.impDone` | Готово: имена загружены. | Tayyor: ismlar yuklandi. |
| 537 | `teacher.namesTitle` | Настоящие имена (только на этом компьютере) | Haqiqiy ismlar (faqat shu kompyuterda) |
| 538 | `teacher.namesHelp` | По одной строке: код; имя и фамилия. Например: &lt;code&gt;07; Азиза Каримова&lt;/code&gt; | Har bir qatorda: kod; ism va familiya. Masalan: &lt;code&gt;07; Aziza Karimova&lt;/code&gt; |
| 539 | `teacher.save` | Сохранить | Saqlash |
| 540 | `teacher.roleTitle` | Сделать пользователя учителем | Foydalanuvchini oʻqituvchi qilish |
| 541 | `teacher.roleNote` | Пользователь сначала должен быть создан в Supabase → Authentication → Users. | Avval foydalanuvchi Supabase → Authentication → Users boʻlimida yaratilishi kerak. |
| 542 | `teacher.email` | Email | Email |
| 543 | `teacher.role` | Роль | Rol |
| 544 | `teacher.roles.teacher` | учитель | oʻqituvchi |
| 545 | `teacher.roles.user` | обычный пользователь | oddiy foydalanuvchi |
| 546 | `teacher.roles.admin` | администратор | administrator |
| 547 | `teacher.close` | Закрыть | Yopish |
| 548 | `teacher.pinsTitle` | ПИН учеников | Oʻquvchilarning PIN kodlari |
| 549 | `teacher.pinsWarn` | &lt;b&gt;Распечатайте или перепишите сейчас:&lt;/b&gt; после закрытия окна ПИН больше не будет видно (в базе хранится только зашифрованный вариант). Если потеряете — выдайте новый ПИН. | &lt;b&gt;Hozir chop eting yoki koʻchirib oling:&lt;/b&gt; oyna yopilgach PIN boshqa koʻrinmaydi (bazada faqat shifrlangan varianti saqlanadi). Yoʻqotsangiz — yangi PIN bering. |
| 550 | `teacher.pinsPrint` | Печать листа с ПИН | PIN varaqasini chop etish |
| 551 | `teacher.gateLogin` | Войдите по email учителя. | Oʻqituvchi emaili orqali kiring. |
| 552 | `teacher.login` | Войти | Kirish |
| 553 | `teacher.noRights` | У аккаунта {email} нет прав учителя. Обратитесь к администратору сайта. | {email} hisobida oʻqituvchi huquqlari yoʻq. Sayt administratoriga murojaat qiling. |
| 554 | `teacher.stale` | Вход устарел или нет связи. | Kirish muddati tugagan yoki aloqa yoʻq. |
| 555 | `teacher.loginAgain` | Войти снова | Qaytadan kirish |
| 556 | `teacher.archived` |  (архив) |  (arxiv) |
| 557 | `teacher.noClasses` | — классов пока нет — | — hozircha sinflar yoʻq — |
| 558 | `teacher.createFail` | Не удалось создать класс | Sinf yaratib boʻlmadi |
| 559 | `teacher.joinInfo` | Код класса для учеников: &lt;b class="join"&gt;{join}&lt;/b&gt; · вход: &lt;a href="{url}"&gt;{url}&lt;/a&gt; | Oʻquvchilar uchun sinf kodi: &lt;b class="join"&gt;{join}&lt;/b&gt; · kirish: &lt;a href="{url}"&gt;{url}&lt;/a&gt; |
| 560 | `teacher.th.all` | Отметить всех | Hammasini belgilash |
| 561 | `teacher.th.code` | Код | Kod |
| 562 | `teacher.th.nameLocal` | Имя (только у вас) | Ism (faqat sizda) |
| 563 | `teacher.th.nick` | Псевдоним (видят другие) | Taxallus (boshqalar koʻradi) |
| 564 | `teacher.th.sex` | Пол | Jins |
| 565 | `teacher.th.active` | Активен | Faol |
| 566 | `teacher.th.name` | Имя | Ism |
| 567 | `teacher.th.pin` | ПИН | PIN |
| 568 | `teacher.markOne` | Отметить {code} | Belgilash: {code} |
| 569 | `teacher.nickOf` | Псевдоним {code} | Taxallus: {code} |
| 570 | `teacher.sexOf` | Пол {code} | Jins: {code} |
| 571 | `teacher.activeOf` | Активен {code} | Faol: {code} |
| 572 | `teacher.sex.m` | м | yigit |
| 573 | `teacher.sex.f` | ж | qiz |
| 574 | `teacher.saved` | Сохранено ✓ | Saqlandi ✓ |
| 575 | `teacher.error` | Ошибка | Xato |
| 576 | `teacher.markFirst` | Отметьте учеников галочкой. | Oʻquvchilarni belgilang. |
| 577 | `teacher.resetConfirm` | Выдать новый ПИН {n} ученикам? Старые ПИН перестанут работать. | {n} ta oʻquvchiga yangi PIN berilsinmi? Eski PIN kodlar ishlamay qoladi. |
| 578 | `teacher.strip.classCode` | Код класса | Sinf kodi |
| 579 | `teacher.strip.myCode` | Мой код | Mening kodim |
| 580 | `teacher.strip.pin` | ПИН | PIN |
| 581 | `teacher.closePinsConfirm` | Вы распечатали или записали ПИН? После закрытия их не будет видно. | PIN kodlarni chop etdingizmi yoki yozib oldingizmi? Oyna yopilgach ular koʻrinmaydi. |
| 582 | `teacher.printTitle` | ПИН учеников — {name} | Oʻquvchilarning PIN kodlari — {name} |
| 583 | `teacher.printHint` | Если печать не открылась сама — нажмите Ctrl+P (на телефоне: «Поделиться» → «Печать» или «Сохранить в Файлы»). | Chop etish oʻzi ochilmasa — Ctrl+P ni bosing (telefonda: «Ulashish» → «Chop etish» yoki «Fayllarga saqlash»). |
| 584 | `teacher.popupBlocked` | Браузер заблокировал новое окно. Разрешите всплывающие окна для этого сайта и нажмите кнопку ещё раз. | Brauzer yangi oynani blokladi. Bu sayt uchun qalqib chiquvchi oynalarga ruxsat bering va tugmani yana bosing. |
| 585 | `teacher.createClass` | Создайте класс. | Sinf yarating. |
| 586 | `teacher.reportFail` | Не удалось загрузить отчёт. Проверьте интернет. | Hisobotni yuklab boʻlmadi. Internetni tekshiring. |
| 587 | `teacher.cols.name` | Имя | Ism |
| 588 | `teacher.cols.sex` | Пол | Jins |
| 589 | `teacher.cols.sessions` | Входов | Kirishlar |
| 590 | `teacher.cols.minutes` | Минут | Daqiqa |
| 591 | `teacher.cols.days` | Дней | Kunlar |
| 592 | `teacher.cols.known` | Знает слов | Biladigan soʻzlari |
| 593 | `teacher.cols.answers` | Ответов | Javoblar |
| 594 | `teacher.cols.acc` | Верно % | Toʻgʻri % |
| 595 | `teacher.cols.bad` | Ошибок | Xatolar |
| 596 | `teacher.cols.ct` | Тесты % | Testlar % |
| 597 | `teacher.cols.qz` | Викторины % | Viktorinalar % |
| 598 | `teacher.cols.qn` | Попыток викторин | Viktorina urinishlari |
| 599 | `teacher.cols.last` | Последний вход | Oxirgi kirish |
| 600 | `teacher.colTitle` | {l}: {v} мин. | {l}: {v} daq. |
| 601 | `teacher.noData` | пока нет данных | hozircha maʼlumot yoʻq |
| 602 | `teacher.units.min` | мин. | daq. |
| 603 | `teacher.units.words` | сл. | soʻz |
| 604 | `teacher.units.days` | дн. | kun |
| 605 | `teacher.units.times` | раз | marta |
| 606 | `teacher.units.errPct` | % ошибок | % xato |
| 607 | `teacher.units.people` | чел. | kishi |
| 608 | `teacher.noms.time` | ⏱ Больше всех времени | ⏱ Eng koʻp vaqt sarflagan |
| 609 | `teacher.noms.words` | 📚 Выучил больше слов | 📚 Eng koʻp soʻz oʻrgangan |
| 610 | `teacher.noms.acc` | 🎯 Самый точный (от 50 ответов) | 🎯 Eng aniq (50 ta javobdan) |
| 611 | `teacher.noms.days` | 📅 Больше всех дней занятий | 📅 Eng koʻp kun shugʻullangan |
| 612 | `teacher.noms.sessions` | 🔁 Чаще всех заходил | 🔁 Eng koʻp kirgan |
| 613 | `teacher.noms.ct` | 🧪 Лучший в тестах по словам | 🧪 Soʻzlar testlarida eng yaxshi |
| 614 | `teacher.noms.qz` | 🏆 Лучший в викторинах (средний %) | 🏆 Viktorinalarda eng yaxshi (oʻrtacha %) |
| 615 | `teacher.noms.help` | ⚠ Нужна помощь: низкая точность | ⚠ Yordam kerak: aniqlik past |
| 616 | `teacher.noms.idle` | 💤 Не занимались | 💤 Shugʻullanmaganlar |
| 617 | `teacher.allActive` | все занимались | hamma shugʻullangan |
| 618 | `teacher.kpi.active` | занимались | shugʻullangan |
| 619 | `teacher.kpi.minutes` | минут всего | jami daqiqa |
| 620 | `teacher.kpi.perLearner` | минут на ученика | bir oʻquvchiga daqiqa |
| 621 | `teacher.kpi.answers` | ответов | javob |
| 622 | `teacher.kpi.correct` | верных ответов | toʻgʻri javoblar |
| 623 | `teacher.kpi.sessions` | входов | kirish |
| 624 | `teacher.ofN` | {a} из {b} | {a}/{b} |
| 625 | `teacher.nominations` | Номинации | Nominatsiyalar |
| 626 | `teacher.nomsNote` | «Нужна помощь» и «Не занимались» видите только вы. Ученикам показываются только положительные номинации. | «Yordam kerak» va «Shugʻullanmaganlar»ni faqat siz koʻrasiz. Oʻquvchilarga faqat ijobiy nominatsiyalar koʻrsatiladi. |
| 627 | `teacher.learners` | Ученики | Oʻquvchilar |
| 628 | `teacher.learnersNote` | Нажмите на заголовок столбца, чтобы отсортировать, или на строку — чтобы открыть подробности. | Saralash uchun ustun sarlavhasini, batafsil maʼlumot uchun qatorni bosing. |
| 629 | `teacher.hardWords` | Трудные слова класса | Sinf uchun qiyin soʻzlar |
| 630 | `teacher.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 631 | `teacher.when` | Когда занимаются | Qachon shugʻullanishadi |
| 632 | `teacher.byWeekday` | По дням недели, минуты | Hafta kunlari boʻyicha, daqiqa |
| 633 | `teacher.weekdays` | пн · вт · ср · чт · пт · сб · вс | du · se · ch · pa · ju · sh · ya |
| 634 | `teacher.byHour` | По часам, минуты | Soatlar boʻyicha, daqiqa |
| 635 | `teacher.last30` | Последние 30 дней, минуты | Oxirgi 30 kun, daqiqa |
| 636 | `teacher.sexTitle` | Юноши и девушки | Yigitlar va qizlar |
| 637 | `teacher.sexCols.group` | Группа | Guruh |
| 638 | `teacher.sexCols.n` | Чел. | Kishi |
| 639 | `teacher.sexCols.minutes` | Минут | Daqiqa |
| 640 | `teacher.sexCols.known` | Знает слов | Biladigan soʻzlari |
| 641 | `teacher.sexCols.acc` | Точность % | Aniqlik % |
| 642 | `teacher.sexCols.ct` | Тесты % | Testlar % |
| 643 | `teacher.boys` | Юноши | Yigitlar |
| 644 | `teacher.girls` | Девушки | Qizlar |
| 645 | `teacher.sexMissing` | Не у всех указан пол: заполните его во вкладке «Ученики и ПИН». | Hammaning jinsi koʻrsatilmagan: uni «Oʻquvchilar va PIN» boʻlimida toʻldiring. |
| 646 | `teacher.sexNote` | Группа небольшая (n = {n}), поэтому разница даже в 10–15% может быть случайной. Это описание группы, а не вывод о юношах и девушках. | Guruh kichik (n = {n}), shuning uchun hatto 10–15% farq ham tasodifiy boʻlishi mumkin. Bu guruhning tavsifi, yigitlar va qizlar haqidagi xulosa emas. |
| 647 | `teacher.reportAt` | Отчёт на {t}. Подробно о викторинах — во вкладке «Викторины». | Hisobot vaqti: {t}. Viktorinalar haqida batafsil — «Viktorinalar» boʻlimida. |
| 648 | `teacher.wcols.word` | Слово | Soʻz |
| 649 | `teacher.wcols.tr` | Перевод | Tarjima |
| 650 | `teacher.wcols.studs` | Ошиблись | Xato qilganlar |
| 651 | `teacher.wcols.pct` | Ошибок % | Xato % |
| 652 | `teacher.noErrors` | Пока ошибок нет. | Hozircha xatolar yoʻq. |
| 653 | `teacher.noDataYet` | Пока нет данных. | Hozircha maʼlumot yoʻq. |
| 654 | `teacher.detail.head` | {name} · код {code} | {name} · kod {code} |
| 655 | `teacher.detail.boy` | юноша ·  | yigit ·  |
| 656 | `teacher.detail.girl` | девушка ·  | qiz ·  |
| 657 | `teacher.detail.line` | псевдоним «{nick}» · входов: &lt;b&gt;{s}&lt;/b&gt; · минут: &lt;b&gt;{m}&lt;/b&gt; · дней: &lt;b&gt;{d}&lt;/b&gt; · ответов: &lt;b&gt;{a}&lt;/b&gt; (верно {acc}%) · последний вход: {last} | taxallus «{nick}» · kirishlar: &lt;b&gt;{s}&lt;/b&gt; · daqiqa: &lt;b&gt;{m}&lt;/b&gt; · kunlar: &lt;b&gt;{d}&lt;/b&gt; · javoblar: &lt;b&gt;{a}&lt;/b&gt; (toʻgʻri {acc}%) · oxirgi kirish: {last} |
| 658 | `teacher.detail.decks` | Слова по наборам | Toʻplamlar boʻyicha soʻzlar |
| 659 | `teacher.detail.deckCols.deck` | Набор | Toʻplam |
| 660 | `teacher.detail.deckCols.seen` | Видел | Koʻrgan |
| 661 | `teacher.detail.deckCols.learn` | Учит | Oʻrganmoqda |
| 662 | `teacher.detail.deckCols.good` | Знает | Biladi |
| 663 | `teacher.detail.deckCols.done` | Выучил | Oʻrgangan |
| 664 | `teacher.detail.tests` | Тесты по словам | Soʻzlar testlari |
| 665 | `teacher.detail.testsLine` | {n} · средний {avg}% · лучший {best}% | {n} · oʻrtacha {avg}% · eng yaxshisi {best}% |
| 666 | `teacher.detail.noTests` | Тестов нет. | Testlar yoʻq. |
| 667 | `teacher.detail.themes` | Темы: доля ошибок | Mavzular: xatolar ulushi |
| 668 | `teacher.detail.pctOf` | {p}% из {n} | {p}% ({n} tadan) |
| 669 | `teacher.detail.noAnswers` | Нет ответов. | Javoblar yoʻq. |
| 670 | `teacher.detail.hard` | Самые трудные слова | Eng qiyin soʻzlar |
| 671 | `teacher.detail.errors` | ошибок: {n} | xatolar: {n} |
| 672 | `teacher.detail.noErr` | Ошибок нет. | Xatolar yoʻq. |
| 673 | `teacher.detail.daily` | Минуты по дням | Kunlar boʻyicha daqiqa |
| 674 | `teacher.detail.noDays` | Нет занятий. | Mashgʻulotlar yoʻq. |
| 675 | `teacher.detail.quizzes` | Викторины | Viktorinalar |
| 676 | `teacher.att.none` | Попыток нет. | Urinishlar yoʻq. |
| 677 | `teacher.att.when` | Когда | Qachon |
| 678 | `teacher.att.learner` | Ученик | Oʻquvchi |
| 679 | `teacher.att.quiz` | Викторина | Viktorina |
| 680 | `teacher.att.correct` | Верно | Toʻgʻri |
| 681 | `teacher.att.points` | Очки | Ball |
| 682 | `teacher.att.time` | Время | Vaqt |
| 683 | `teacher.att.level` | Уровень | Daraja |
| 684 | `teacher.att.exits` | Выходы | Chiqishlar |
| 685 | `teacher.att.review` | Разбор | Tahlil |
| 686 | `teacher.att.reviewBest` | Разбор лучшей | Eng yaxshisi tahlili |
| 687 | `teacher.reviewLine` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {p} очков · {time} · {lvl} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {p} ball · {time} · {lvl} |
| 688 | `teacher.reviewLineMock` | {at} · верно &lt;b&gt;{c} из {t}&lt;/b&gt; ({pct}%) · {time} · выходов из окна: {x} | {at} · toʻgʻri: &lt;b&gt;{c}/{t}&lt;/b&gt; ({pct}%) · {time} · oynadan chiqishlar: {x} |
| 689 | `teacher.reviewFail` | Не удалось загрузить разбор. | Tahlilni yuklab boʻlmadi. |
| 690 | `teacher.noQData` | Нет данных. | Maʼlumot yoʻq. |
| 691 | `teacher.testMark` |  (тест) |  (test) |
| 692 | `teacher.mockMark` |  (пробный экзамен) |  (mock imtihon) |
| 693 | `teacher.attemptsN` | {title}{test} — попыток: {n} | {title}{test} — urinishlar: {n} |
| 694 | `teacher.qkpi.done` | прошли | topshirgan |
| 695 | `teacher.qkpi.attempts` | попыток | urinish |
| 696 | `teacher.qkpi.avgBest` | средний лучший результат | oʻrtacha eng yaxshi natija |
| 697 | `teacher.qcols.name` | Имя | Ism |
| 698 | `teacher.qcols.n` | Попыток | Urinishlar |
| 699 | `teacher.qcols.best` | Лучший | Eng yaxshisi |
| 700 | `teacher.qcols.points` | Очки | Ball |
| 701 | `teacher.qcols.exits` | Выходы из окна | Oynadan chiqishlar |
| 702 | `teacher.qcols.last` | Последняя | Oxirgisi |
| 703 | `teacher.qParts` | Части викторины: доля верных | Viktorina qismlari: toʻgʻri javoblar ulushi |
| 704 | `teacher.noAnswersYet` | Пока нет ответов. | Hozircha javoblar yoʻq. |
| 705 | `teacher.allAttempts` | Все попытки | Barcha urinishlar |
| 706 | `teacher.hardQ` | Трудные вопросы | Qiyin savollar |
| 707 | `teacher.hardQNote` | Сверху — вопросы, в которых ошиблось больше всего учеников. | Yuqorida — eng koʻp oʻquvchi xato qilgan savollar. |
| 708 | `teacher.hq.q` | Вопрос | Savol |
| 709 | `teacher.hq.c` | Правильный ответ | Toʻgʻri javob |
| 710 | `teacher.hq.studs` | Ошиблись | Xato qilganlar |
| 711 | `teacher.hq.pct` | Ошибок % | Xato % |
| 712 | `teacher.exportFail` | Не удалось выгрузить. | Yuklab boʻlmadi. |
| 713 | `teacher.csvQ` | Код · Имя · Когда · Попытка · № · Часть · Вопрос · Ответ · Правильный · Верно · Секунд | Kod · Ism · Qachon · Urinish · № · Qism · Savol · Javob · Toʻgʻri javob · Toʻgʻrimi · Soniya |
| 714 | `teacher.csvCode` | Код | Kod |
| 715 | `teacher.yes` | да | ha |
| 716 | `teacher.no` | нет | yoʻq |
| 717 | `teacher.roleSaved` | Сохранено. | Saqlandi. |
| 718 | `teacher.noUser` | Такого пользователя нет. Сначала создайте его в Supabase → Authentication → Users. | Bunday foydalanuvchi yoʻq. Avval uni Supabase → Authentication → Users boʻlimida yarating. |
| 719 | `teacher.roleFail` | Не удалось сохранить. | Saqlab boʻlmadi. |

## Подвал

| № | Ключ | Русский | Oʻzbekcha |
|---|---|---|---|
| 720 | `footer.author` | Автор | Muallif |
| 721 | `footer.authorRole` | преподаватель арабского языка | arab tili oʻqituvchisi |
| 722 | `footer.contacts` | Связаться | Bogʻlanish |
| 723 | `footer.about` | О сайте | Sayt haqida |
| 724 | `footer.privacy` | Конфиденциальность | Maxfiylik |
