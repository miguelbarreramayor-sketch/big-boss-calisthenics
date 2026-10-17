/* BIG BOSS CALISTHENICS — Service Worker (v9)
   - precache con cache:"reload" (siempre trae la versión nueva al instalar)
   - activate: borra cachés anteriores
   - navegación: red primero; estáticos: stale-while-revalidate (sirve rápido y actualiza) */
const C="bb-v9";
const F=["./","./index.html","./styles.css?v=9","./app.js?v=9","./agent.js?v=9","./library.js?v=9","./fuentes.js?v=9","./manifest.webmanifest?v=9","./icon.svg","./logo.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:"reload"}).then(r=>{if(r&&r.ok)c.put(u,r)}).catch(()=>{})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;
  if(q.mode==="navigate"){e.respondWith(fetch(q,{cache:"no-store"}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put("./index.html",cp));return r}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(q).then(r=>{const net=fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));return res}).catch(()=>r);return r||net}))});
