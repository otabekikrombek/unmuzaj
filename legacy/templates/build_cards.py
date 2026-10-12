import json,os
D='/tmp/claude-0/-home-claude/9079683e-34bb-5296-a7e3-7faf2f83a9d4/scratchpad/'
API='https://script.google.com/macros/s/AKfycbwDMEfbi19gOwmBIO7Ulbc8XXLIPR_-zBkdwlIAhuQjXjukHVVLkWlsrejdTPv15KZSFA/exec'
import sys
out=sys.argv[1] if len(sys.argv)>1 else '/mnt/user-data/outputs'
api=sys.argv[2] if len(sys.argv)>2 else API
T=open(D+'db/tpl_cards.html',encoding='utf-8').read()
for src,fn,title,k in [('w100.json','kartochki_100_slov.html','100 слов недели','w100'),('w100b.json','kartochki_100_slov_2.html','100 слов · список 2','w100b')]:
    data=json.load(open(D+'dict/'+src,encoding='utf-8'))
    W=[{'t':t,'a':a,'r':r} for t,items in data for a,r in items]
    h=T.replace('__TITLE__',title).replace('__API__',api).replace('__DECK__',k).replace('__DATA__',json.dumps(W,ensure_ascii=False))
    open(os.path.join(out,fn),'w',encoding='utf-8').write(h);print(fn)
P=open(D+'db/tpl_panel.html',encoding='utf-8').read().replace('__API__',api) if os.path.exists(D+'db/tpl_panel.html') else None
if P: open(os.path.join(out,'panel_uchitelya.html'),'w',encoding='utf-8').write(P);print('panel')
