"""Generates the product illustrations (src/assets/products) and brand logos (src/assets/brands) as SVG files.
Run from the project root:  python3 scripts/generate-assets.py   -- or replace any file with your own photo."""
import os,re,math
OUT='src/assets/products';BR='src/assets/brands'
for d in(OUT,BR):os.makedirs(d,exist_ok=True)
slug=lambda s:re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def dk(c,f=.72):r,g,b=[int(c[i:i+2],16) for i in(1,3,5)];return '#%02x%02x%02x'%(int(r*f),int(g*f),int(b*f))
def lg(i,a,b):return f'<linearGradient id="{i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>'
def svg(body,defs='',w=400,h=400):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><defs>{defs}'
     '<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-opacity=".25"/></filter>'
     '<pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.7" fill="#000" opacity=".3"/></pattern></defs>'+body+'</svg>')
floor='<ellipse cx="200" cy="355" rx="120" ry="11" fill="#000" opacity=".13"/>'
# ---------- phones ----------
def pf(x,y,w,h,body):
    r=w*.13;gw=(w-44)/4
    s=f'<g filter="url(#sh)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{body}"/><rect x="{x+6}" y="{y+6}" width="{w-12}" height="{h-12}" rx="{r-5}" fill="url(#w)"/><circle cx="{x+w/2}" cy="{y+22}" r="6" fill="#0b0b0f"/>'
    s+=f'<text x="{x+w/2}" y="{y+h*.3:.0f}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="{w*.2:.0f}" fill="#fff" opacity=".9">9:41</text>'
    for i in range(4):s+=f'<rect x="{x+22+i*gw:.1f}" y="{y+h*.74:.1f}" width="{gw-8:.1f}" height="{gw-8:.1f}" rx="9" fill="#fff" opacity="{.35 if i%2 else .6}"/>'
    return s+'</g>'
def pb(x,y,w,h,body,acc):
    r=w*.13;cw=w*.5
    s=f'<g filter="url(#sh)"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{body}"/><rect x="{x+3}" y="{y+3}" width="{w-6}" height="{h-6}" rx="{r-3}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/><rect x="{x+12}" y="{y+12}" width="{cw}" height="{cw}" rx="{cw*.28}" fill="#0f1115"/>'
    for dx,dy in((.3,.3),(.3,.72),(.72,.5)):
        cx,cy=x+12+cw*dx,y+12+cw*dy
        s+=f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{cw*.17:.1f}" fill="#2b2f3a"/><circle cx="{cx:.1f}" cy="{cy:.1f}" r="{cw*.1:.1f}" fill="#0a0c12"/><circle cx="{cx-3:.1f}" cy="{cy-3:.1f}" r="{cw*.03:.1f}" fill="#8aa0ff"/>'
    return s+f'<circle cx="{x+w/2}" cy="{y+h*.62}" r="{w*.09}" fill="{acc}" opacity=".8"/></g>'
def fold(body):
    return (f'<g filter="url(#sh)"><rect x="40" y="95" width="320" height="220" rx="20" fill="{body}"/><rect x="48" y="103" width="304" height="204" rx="14" fill="url(#w)"/>'
     '<line x1="200" y1="103" x2="200" y2="307" stroke="#000" stroke-opacity=".28" stroke-width="3"/><text x="200" y="190" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="56" fill="#fff" opacity=".9">9:41</text>'
     +''.join(f'<rect x="{80+i*62}" y="235" width="50" height="50" rx="12" fill="#fff" opacity="{.35 if i%2 else .6}"/>' for i in range(5))+'</g>')
PH={1:('#8b8d96','#c4b5fd','#f472b6','#c4b5fd',0),2:('#2f3a4a','#38bdf8','#22d3ee','#38bdf8',0),3:('#e5e7eb','#fbbf24','#fb7185','#fb7185',0),4:('#1f2937','#34d399','#3b82f6','#34d399',0),5:('#6d28d9','#f472b6','#6366f1','#f9a8d4',1)}
def phone(k,i):
    body,c1,c2,acc,fd=PH[i];d=lg('w',c1,c2)
    if fd:front=fold(body);back=pb(125,60,150,280,body,acc);single=pf(125,50,150,300,body)
    else:front=single=pf(125,50,150,300,body);back=pb(125,50,150,300,body,acc)
    if k==0:b=front
    elif k==1:b=back
    elif k==2:b=pb(200,62,130,260,body,acc)+pf(70,92,130,260,body)
    else:b=f'<g transform="rotate(-14 200 200)">{front}</g>'
    return svg(b,d)
# ---------- laptops ----------
LP={6:('#cfd3da','#6366f1','#22d3ee',0),7:('#1c1f26','#ef4444','#f59e0b',1),8:('#4b5563','#a855f7','#22d3ee',0),9:('#9ca3af','#3b82f6','#10b981',0),10:('#334155','#f472b6','#60a5fa',0)}
def laptop(k,i):
    body,c1,c2,rgb=LP[i];d=lg('w',c1,c2)+lg('w2',c2,c1)+lg('rg','#ff3f6c','#3fa9ff')
    if k in(0,2):
        g='w' if k==0 else 'w2'
        b=(f'<g filter="url(#sh)"><rect x="75" y="70" width="250" height="170" rx="12" fill="{body}"/><rect x="85" y="80" width="230" height="150" rx="5" fill="url(#{g})"/>'
         '<rect x="100" y="95" width="95" height="62" rx="6" fill="#fff" opacity=".4"/><rect x="205" y="95" width="95" height="28" rx="6" fill="#fff" opacity=".28"/><rect x="205" y="130" width="95" height="27" rx="6" fill="#fff" opacity=".55"/>'
         '<rect x="100" y="170" width="200" height="12" rx="6" fill="#fff" opacity=".3"/><rect x="100" y="192" width="140" height="12" rx="6" fill="#fff" opacity=".2"/>'
         f'<polygon points="35,244 365,244 345,270 55,270" fill="{body}"/><polygon points="35,244 365,244 345,270 55,270" fill="#fff" opacity=".18"/><rect x="170" y="244" width="60" height="6" rx="3" fill="#000" opacity=".25"/>'
         +('<rect x="75" y="236" width="250" height="5" fill="url(#rg)"/>' if rgb else '')+'</g>')
    elif k==1:
        b=(f'<g filter="url(#sh)"><rect x="60" y="95" width="280" height="205" rx="18" fill="{body}"/>'
         +('<rect x="62" y="97" width="276" height="201" rx="16" fill="none" stroke="url(#rg)" stroke-width="4"/>' if rgb else '')
         +'<circle cx="200" cy="198" r="34" fill="#fff" opacity=".4"/><path d="M206 172 L184 202 H200 L194 226 L218 194 H201 Z" fill="#fff" opacity=".9"/></g>')
    else:
        keys=''.join(f'<rect x="{62+c*24}" y="{108+r*22}" width="20" height="18" rx="3" fill="#0f1115" opacity=".78"/>' for r in range(5) for c in range(12))
        b=f'<g filter="url(#sh)"><rect x="45" y="85" width="310" height="230" rx="16" fill="{body}"/>{keys}<rect x="145" y="232" width="110" height="64" rx="8" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2"/></g>'
    return svg(b,d)
# ---------- gadgets (mics + accessories) ----------
def G11(c,a):return ('<ellipse cx="200" cy="342" rx="75" ry="12" fill="#2d3340"/><rect x="190" y="258" width="20" height="84" fill="#3b4252"/><path d="M135 195 Q135 262 200 262 Q265 262 265 195" fill="none" stroke="#3b4252" stroke-width="10" stroke-linecap="round"/>'
 f'<rect x="150" y="45" width="100" height="195" rx="50" fill="url(#bd)"/><rect x="150" y="45" width="100" height="195" rx="50" fill="url(#mesh)"/><rect x="150" y="125" width="100" height="14" fill="{a}" opacity=".85"/>')
def G12(c,a):return (f'<path d="M165 150 L235 150 L222 325 Q200 342 178 325 Z" fill="url(#bd)"/><circle cx="200" cy="105" r="62" fill="url(#bd)"/><circle cx="200" cy="105" r="62" fill="url(#mesh)"/><rect x="168" y="146" width="64" height="16" rx="4" fill="{a}"/><rect x="186" y="318" width="28" height="26" rx="6" fill="#111"/>')
def G13(c,a):return (f'<rect x="150" y="190" width="100" height="105" rx="16" fill="url(#bd)"/><rect x="166" y="206" width="68" height="34" rx="6" fill="#0f1115"/><circle cx="200" cy="270" r="9" fill="{a}"/><line x1="165" y1="190" x2="150" y2="140" stroke="{dk(c,.6)}" stroke-width="5" stroke-linecap="round"/><line x1="235" y1="190" x2="250" y2="140" stroke="{dk(c,.6)}" stroke-width="5" stroke-linecap="round"/>'
 f'<rect x="52" y="140" width="52" height="96" rx="16" fill="url(#bd)"/><circle cx="78" cy="122" r="16" fill="#111827"/><circle cx="78" cy="196" r="6" fill="{a}"/><rect x="296" y="140" width="52" height="96" rx="16" fill="url(#bd)"/><circle cx="322" cy="122" r="16" fill="#111827"/><circle cx="322" cy="196" r="6" fill="{a}"/>')
def G14(c,a):
    fur=''.join(f'<path d="M{70+i*5.6:.1f} 152 l{(i%3)-1} -9 M{70+i*5.6:.1f} 218 l{(i%3)-1} 9" stroke="#3a3a46" stroke-width="3" stroke-linecap="round"/>' for i in range(48))
    return f'{fur}<rect x="60" y="150" width="280" height="70" rx="35" fill="url(#bd)"/><rect x="60" y="150" width="280" height="70" rx="35" fill="url(#mesh)" opacity=".6"/><path d="M130 220 Q130 262 160 262 H240 Q270 262 270 220" fill="none" stroke="{a}" stroke-width="8"/><rect x="170" y="262" width="60" height="22" rx="4" fill="#222"/>'
def G15(c,a):return ('<rect x="45" y="298" width="70" height="52" rx="8" fill="#3b4252"/><rect x="88" y="262" width="16" height="44" fill="#1f2430"/>'
 f'<path d="M96 275 L96 150 L268 108" stroke="url(#bd)" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="96" cy="150" r="11" fill="{a}"/><circle cx="96" cy="275" r="9" fill="{a}"/>'
 '<g transform="rotate(22 290 150)"><rect x="268" y="96" width="44" height="104" rx="22" fill="url(#bd)"/><rect x="268" y="96" width="44" height="104" rx="22" fill="url(#mesh)"/></g>')
def G16(c,a):return (f'<path d="M92 230 Q92 62 200 62 Q308 62 308 230" fill="none" stroke="url(#bd)" stroke-width="22" stroke-linecap="round"/><path d="M92 230 Q92 80 200 80 Q308 80 308 230" fill="none" stroke="{a}" stroke-width="4" opacity=".8"/>'
 f'<ellipse cx="92" cy="248" rx="44" ry="64" fill="url(#bd)"/><ellipse cx="100" cy="248" rx="30" ry="50" fill="#0f1115" opacity=".85"/><circle cx="82" cy="248" r="7" fill="{a}"/>'
 f'<ellipse cx="308" cy="248" rx="44" ry="64" fill="url(#bd)"/><ellipse cx="300" cy="248" rx="30" ry="50" fill="#0f1115" opacity=".85"/><circle cx="318" cy="248" r="7" fill="{a}"/>')
def G17(c,a):return (f'<rect x="95" y="180" width="210" height="140" rx="56" fill="url(#bd)"/><path d="M95 238 H305" stroke="#000" stroke-opacity=".18" stroke-width="3"/><circle cx="200" cy="270" r="7" fill="{a}"/>'
 '<g transform="rotate(-16 150 120)"><ellipse cx="150" cy="108" rx="28" ry="36" fill="#fff" stroke="#00000022" stroke-width="2"/><rect x="141" y="130" width="18" height="52" rx="9" fill="#fff" stroke="#00000022" stroke-width="2"/></g>'
 '<g transform="rotate(16 250 120)"><ellipse cx="250" cy="108" rx="28" ry="36" fill="#fff" stroke="#00000022" stroke-width="2"/><rect x="241" y="130" width="18" height="52" rx="9" fill="#fff" stroke="#00000022" stroke-width="2"/></g>')
def G18(c,a):return (f'<rect x="165" y="70" width="14" height="40" rx="3" fill="#b8bcc6"/><rect x="221" y="70" width="14" height="40" rx="3" fill="#b8bcc6"/><rect x="120" y="108" width="160" height="176" rx="24" fill="url(#bd)"/>'
 f'<rect x="142" y="132" width="64" height="16" rx="8" fill="#0b0d12"/><rect x="142" y="162" width="64" height="16" rx="8" fill="#0b0d12"/><rect x="142" y="192" width="64" height="16" rx="3" fill="#0b0d12"/><text x="222" y="145" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="#555">C1</text><text x="222" y="175" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="#555">C2</text><text x="222" y="205" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="#555">A</text><rect x="142" y="240" width="116" height="6" rx="3" fill="{a}"/>'
 '<path d="M200 284 Q200 342 258 342 T336 300" fill="none" stroke="#222" stroke-width="8" stroke-linecap="round"/>')
def G19(c,a):
    ks=''
    for r in range(4):
        for cc in range(13):ks+=f'<rect x="{54+cc*22.2:.1f}" y="{132+r*30}" width="19" height="25" rx="4" fill="{a if (r==0 and cc==0) or (r==2 and cc==12) else "#fff"}" opacity=".9"/>'
    return f'<g transform="skewX(-6) translate(18 0)"><rect x="40" y="112" width="322" height="178" rx="18" fill="url(#bd)"/>{ks}<rect x="110" y="252" width="170" height="24" rx="5" fill="#fff" opacity=".9"/></g>'
def G20(c,a):return (f'<path d="M200 60 C270 60 302 122 302 202 C302 292 262 346 200 346 C138 346 98 292 98 202 C98 122 130 60 200 60 Z" fill="url(#bd)"/><path d="M200 60 V172 M104 172 H298" stroke="#000" stroke-opacity=".22" stroke-width="3" fill="none"/><rect x="189" y="92" width="22" height="46" rx="11" fill="{a}"/>')
GD={11:('#cbd5e1','#e11d48',G11),12:('#2d3340','#e11d48',G12),13:('#e5e7eb','#14b8a6',G13),14:('#111827','#14b8a6',G14),15:('#475569','#e11d48',G15),16:('#1f2937','#f59e0b',G16),17:('#f3f4f6','#10b981',G17),18:('#e5e7eb','#10b981',G18),19:('#d1d5db','#ef4444',G19),20:('#6b7280','#10b981',G20)}
def gadget(k,i):
    c,a,fn=GD[i];t=['','rotate(-16 200 200)','translate(200 215) scale(1.5) translate(-200 -200)','translate(400 0) scale(-1 1)'][k]
    b=fn(c,a);return svg(floor+(f'<g transform="{t}">{b}</g>' if t else b),lg('bd',c,dk(c)))
# ---------- brand logos ----------
def star(n,ro,ri):return ' '.join(f'{50+(ro if j%2==0 else ri)*math.sin(j*math.pi/n):.1f},{50-(ro if j%2==0 else ri)*math.cos(j*math.pi/n):.1f}' for j in range(2*n))
MK={
'Aurora':lambda:'<circle cx="50" cy="50" r="46" fill="url(#g)"/><path d="M14 64 Q32 38 50 58 T88 46" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M14 46 Q34 22 52 40 T88 30" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>',
'Nova':lambda:f'<polygon points="{star(8,48,22)}" fill="url(#g)"/><circle cx="50" cy="50" r="10" fill="#fff"/>',
'Pixelio':lambda:''.join(f'<rect x="{10+i*30}" y="{10+j*30}" width="26" height="26" rx="5" fill="url(#g)" opacity="{[1,.55,.8][(i+j)%3]}"/>' for i in range(3) for j in range(3) if (i,j)!=(2,0)),
'Aero':lambda:'<path d="M6 78 L50 12 L94 78 L50 62 Z" fill="url(#g)"/><path d="M30 84 L50 54 L70 84 L50 75 Z" fill="#fff" opacity=".9"/>',
'Titan':lambda:'<polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill="url(#g)"/><rect x="28" y="30" width="44" height="13" fill="#fff"/><rect x="43.5" y="30" width="13" height="42" fill="#fff"/><rect x="28" y="78" width="44" height="4" fill="#ef4444"/>',
'Lumen':lambda:'<circle cx="50" cy="50" r="19" fill="url(#g)"/>'+''.join(f'<line x1="{50+30*math.cos(j*math.pi/4):.1f}" y1="{50+30*math.sin(j*math.pi/4):.1f}" x2="{50+44*math.cos(j*math.pi/4):.1f}" y2="{50+44*math.sin(j*math.pi/4):.1f}" stroke="url(#g)" stroke-width="7" stroke-linecap="round"/>' for j in range(8)),
'Sonex':lambda:''.join(f'<rect x="{10+i*18}" y="{(100-h)/2}" width="11" height="{h}" rx="5.5" fill="url(#g)"/>' for i,h in enumerate([30,60,88,52,36])),
'Voxa':lambda:'<rect x="6" y="6" width="88" height="88" rx="24" fill="url(#g)"/><polyline points="26,30 50,72 74,30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M82 42 Q92 50 82 58" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>'}
BC={'Aurora':('#7c3aed','#ec4899'),'Nova':('#f59e0b','#ef4444'),'Pixelio':('#2563eb','#06b6d4'),'Aero':('#0ea5e9','#6366f1'),'Titan':('#111827','#4b5563'),'Lumen':('#10b981','#a3e635'),'Sonex':('#e11d48','#fb7185'),'Voxa':('#14b8a6','#0ea5e9')}
def brand(n):
    a,b=BC[n];g=lg('g',a,b);m=MK[n]()
    open(f'{BR}/{slug(n)}-mark.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>{g}</defs>{m}</svg>')
    open(f'{BR}/{slug(n)}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 100"><defs>{g}</defs>{m}<text x="112" y="64" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="40" letter-spacing="2" fill="{a}">{n.upper()}</text></svg>')
for n in BC:brand(n)
for i,cat,name in re.findall(r"\[(\d+),'(\w+)','([^']+)'",open('src/data/products.js').read()):
    i=int(i)
    for k in range(4):
        f=f"{OUT}/{slug(name)}{'' if k==0 else '-%d'%(k+1)}.svg"
        open(f,'w').write(phone(k,i) if i<=5 else laptop(k,i) if i<=10 else gadget(k,i))
print('generated',len(os.listdir(OUT)),'product images and',len(os.listdir(BR)),'brand logos')
