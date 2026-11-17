import re,base64,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','site')
P='/Endgame-app-designs/'
h=open(R+'/character/index.html').read()
def rd(p,b=False): return open(R+'/'+p,'rb' if b else 'r').read()
def css(m):
    p=m.group(1)[len(P):]
    t=rd(p)
    d=os.path.dirname(p)
    def fu(mm):
        f=os.path.normpath(os.path.join(d,mm.group(1)))
        return 'url(data:font/woff2;base64,%s)'%base64.b64encode(rd(f,True)).decode()
    t=re.sub(r'url\((?:")?(\.\./media/[^)"]+)(?:")?\)',fu,t)
    return '<style>'+t+'</style>'
h=re.sub(r'<link rel="preload"[^>]*>','',h)
h=re.sub(r'<link rel="stylesheet" href="('+P+r'[^"]+\.css)"[^>]*>',css,h)
h=re.sub(r'<script[^>]*src="'+P+r'(lab/lab\.js)"[^>]*></script>','',h)
h=h.replace('</body>','<script>'+rd('lab/lab.js').replace('</script','<\\/script')+'</script></body>')
def img(m):
    p=m.group(2)[len(P):]
    if os.path.exists(R+'/'+p):
        ext=p.rsplit('.',1)[1]; mt={'svg':'image/svg+xml','png':'image/png','webp':'image/webp','jpg':'image/jpeg','ico':'image/x-icon'}.get(ext,'application/octet-stream')
        return m.group(1)+'data:%s;base64,%s'%(mt,base64.b64encode(rd(p,True)).decode())
    return m.group(0)
h=re.sub(r'((?:src|href)=")('+P+r'[^"]+\.(?:svg|png|webp|jpg|ico))',img,h)
open(os.path.join(R,'..','dist','endgame-character-lab.html'),'w').write(h)
print(len(h), re.findall(r'(?:src|href)="/Endgame[^"]*"',h)[:8])
