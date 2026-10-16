const C="bb-v1";const F=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icon.svg","./logo.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).catch(()=>{}))});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("./index.html"))))});
