import json,urllib.request,random
from playwright.sync_api import sync_playwright
pins=json.load(open('pins.json'))
B='file://'+__import__('os').getcwd()+'/test/'
dump=lambda:json.loads(urllib.request.urlopen('http://localhost:8765/dump').read())
def page(ctx,f,errs):
    pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.abort());pg.goto(B+f);pg.wait_for_function("document.getElementById('who').options.length>2");return pg
def login(pg,i,pin):
    pg.select_option('#who',str(i));pg.fill('#pin',pin);pg.click('#go');pg.wait_for_timeout(400)
def cards(pg,n,errrate):
    for k in range(n):
        if random.random()<errrate: pg.click('#no');pg.click('#no')
        else: pg.click('#yes')
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    # студентка 1, список 1
    c1=b.new_context();pg=page(c1,'kartochki_100_slov.html',errs)
    login(pg,1,'0000');print('wrong pin msg:',pg.inner_text('#lmsg'))
    login(pg,1,pins['1']);print('logged as:',pg.inner_text('#uname'))
    pg.evaluate('sess.active=1500');cards(pg,40,0.3)
    pg.click('#tt')
    for i in range(20): pg.click('.opt >> nth=0');pg.wait_for_timeout(1750)
    print('test:',pg.inner_text('#test')[:10].replace('\n',' '));pg.wait_for_timeout(800)
    pg.click('#tb');pg.wait_for_timeout(1200);print('board:',pg.inner_text('#board')[:200].replace('\n',' | '))
    st1=pg.inner_text('#stats').replace('\n',' ');print('stats1:',st1)
    pg.click('#out');pg.wait_for_timeout(500)
    # тот же студент, новое устройство
    c2=b.new_context();pg2=page(c2,'kartochki_100_slov.html',errs);login(pg2,1,pins['1'])
    print('restored on new device:',pg2.inner_text('#stats').replace('\n',' ')==st1)
    # офлайн
    pg2.route('http://localhost:8765/**',lambda r:r.abort());cards(pg2,20,0.5);pg2.evaluate('sync()');pg2.wait_for_timeout(500)
    print('offline net:',pg2.inner_text('#net'),'queued:',pg2.evaluate('queue.length+(pending?pending.ev.length:0)'))
    pg2.unroute('http://localhost:8765/**');pg2.evaluate('sync()');pg2.wait_for_timeout(800);print('back online:',pg2.inner_text('#net'),pg2.evaluate('queue.length'),pg2.evaluate('pending'))
    # студенты 2–4, оба списка
    for i,f,n,e in [(2,'kartochki_100_slov.html',60,0.1),(3,'kartochki_100_slov_2.html',50,0.5),(4,'kartochki_100_slov_2.html',30,0.2),(2,'kartochki_100_slov_2.html',25,0.2)]:
        c=b.new_context();q=page(c,f,errs);login(q,i,pins[str(i)]);q.evaluate(f'sess.active={random.randint(300,2400)}');cards(q,n,e);q.click('#out');q.wait_for_timeout(500);c.close()
    # подбор ПИН
    c=b.new_context();q=page(c,'kartochki_100_slov.html',errs)
    for k in range(6): login(q,5,str(1000+k))
    print('lockout:',q.inner_text('#lmsg'));login(q,5,pins['5']);print('even right pin while locked:',q.inner_text('#lmsg'))
    # панель
    D=dump();key=[r for r in D['Настройки'] if r[0]=='Ключ учителя'][0][1]
    print('rows: events',len(D['Слова_ответы'])-1,'sessions',len(D['Сеансы'])-1,'tests',len(D['Тесты_карточек'])-1,'progress',len(D['Прогресс'])-1)
    print('dup events check (bid):',len(D['Слова_ответы'])-1,'== expected', 40+20+20+60+50+30+25)
    print('session rows:',[r[3:11] for r in D['Сеансы'][1:]])
    cp=b.new_context(viewport={'width':1200,'height':900});pp=cp.new_page();pp.on('pageerror',lambda e:errs.append(str(e)));pp.route('**/fonts.googleapis.com/**',lambda r:r.abort())
    pp.goto(B+'panel_uchitelya.html');pp.fill('#key','wrong');pp.click('#load');pp.wait_for_timeout(500);print('panel wrong key:',pp.inner_text('#kmsg'))
    pp.fill('#key',key);pp.click('#load');pp.wait_for_timeout(800)
    pp.screenshot(path='panel.png',full_page=True)
    pp.click('#tbl tbody tr >> nth=0');pp.wait_for_timeout(300);pp.screenshot(path='detail.png')
    pp.click('dialog .btn');pp.click('th[data-k=bad]')
    print('panel kpis:',pp.inner_text('#kpis').replace('\n',' '))
    pg.screenshot(path='stud.png',full_page=True)
    urllib.request.urlopen('http://localhost:8765/report')
    D=dump();print('Сводка:',D['Сводка'][:3]);print('Трудные:',D['Трудные_слова'][:3])
    b.close()
print('ERRORS',errs)
