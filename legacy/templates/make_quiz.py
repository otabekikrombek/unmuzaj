# python3 make_quiz.py unit01.js  → viktorina_matn_01.html
import json,re,subprocess,sys,random
unit=sys.argv[1]
U=json.loads(subprocess.check_output(['node','-e',open(unit,encoding='utf-8').read()+';process.stdout.write(JSON.stringify(U))']))
R=random.Random(U['num']*101)
ALL=[s for p in U['paras'] for s in p[1]]
DIG=str.maketrans('0123456789','٠١٢٣٤٥٦٧٨٩')
def ref(n): return 'Заголовок текста.' if n==0 else f'Предложение ({str(n).translate(DIG)}): {ALL[n-1]}'
def distract(correct,pool,k=3):
    c=[x for x in dict.fromkeys(pool) if x!=correct]; R.shuffle(c); return [correct]+c[:k]
P=[]
def add(s,q,o,e): P.append({'id':len(P)+1,'s':s,'q':q,'o':o,'e':e})
for i,(q,o) in enumerate(U['mc']): add('F',q,o,ref(U['mcRef'][i]) if U.get('mcRef') else 'См. текст.')
for i,(t,v,e) in enumerate(U['tf']):
    add('F','صَحِيحٌ أَمْ خَطَأٌ؟ '+t,['صَحِيحٌ','خَطَأٌ'] if v else ['خَطَأٌ','صَحِيحٌ'],(('Неверно: '+e+'. ') if (not v and e) else '')+(ref(U['tfRef'][i]) if U.get('tfRef') else ''))
pls=[b for a,b in U['plural']]
for a,b in U['plural']: add('V',f'مَا جَمْعُ «{a}»؟',distract(b,pls),f'{a} – {b}')
ants=[b for a,b in U['antonyms']]
for a,b in U['antonyms']: add('V',f'مَا ضِدُّ «{a}» فِي النَّصِّ؟',distract(b,ants),f'{a} ≠ {b}')
gw=[b for a,b in U['gaps']]
for a,b in U['gaps']: add('V',a,distract(b,gw),'Слово из текста: '+b)
for q,ans,rule in U['choose']:
    m=re.search(r'\((.+?)\)',q); opts=[x.strip() for x in m.group(1).split('/')]
    qq=q.replace(m.group(0),'…'); o=[ans]+[x for x in opts if x!=ans]
    add('G',qq,o,rule)
for sg,du,pl in U['transform']:
    add('G',f'الْمُثَنَّى: {sg}',[du,pl,sg],'Двойственное число: '+du)
    add('G',f'الْجَمْعُ: {sg}',[pl,du,sg],'Множественное число: '+pl)
wr=[w for w,c,r in U['errors']]
for w,c,r in U['errors']:
    others=[x for x in wr if x!=w]; R.shuffle(others)
    add('E','اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ:',[c,w]+others[:2],'Ошибка: '+w+' → '+c+' · '+r)
plan={'F':8,'V':4,'G':5,'E':3}
tpl=open('quiz_tpl.html',encoding='utf-8').read()
num2=f"{U['num']:02d}"
rep={'__PAGETITLE__':f"Урок {U['num']} · {U['topicRu']}",'__LOGO__':f"Урок {U['num']}",'__H1__':f"Урок {U['num']}: {U['topicRu']}",
 '__SUB__':f"20 вопросов на арабском по тексту урока: понимание, слова, грамматика, исправление ошибок. У каждого свой набор вопросов.",
 '__QUIZ__':U['code'],'__NF__':str(plan['F']),'__NV__':str(plan['V']),'__NG__':str(plan['G']),'__NE__':str(plan['E']),
 '__POOL__':json.dumps(P,ensure_ascii=False),'__TITLEJS__':json.dumps(U['title'],ensure_ascii=False),'__PARAJS__':json.dumps(U['paras'],ensure_ascii=False)}
for k,v in rep.items(): tpl=tpl.replace(k,v)
assert '__' not in re.sub(r'__proto__','',tpl.split('<script>')[1][:400])
out=f"/mnt/user-data/outputs/viktorina_matn_{num2}.html"
open(out,'w',encoding='utf-8').write(tpl)
from collections import Counter
print(out,len(P),Counter(p['s'] for p in P))
