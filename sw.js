/* BIG BOSS CALISTHENICS — Service Worker (v4)
   - precache de la app
   - activate: borra cachés anteriores (evita servir versiones viejas)
   - navigate: red primero (muestra siempre la versión nueva), caché como respaldo offline */
const C="bb-v4";
const F=["./","./index.html","./styles.css","./app.js","./agent.js","./library.js","./fuentes.js","./manifest.webmanifest","./icon.svg","./logo.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;
  if(q.method!=="GET")return;
  if(q.mode==="navigate"){e.respondWith(fetch(q).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put("./index.html",cp));return r}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));return res}).catch(()=>caches.match("./index.html"))));
});
