/* Service worker: permite usar la web sin conexión y que se instale como app.
   Si cambias una foto manteniendo su nombre, sube el número de VERSION. */
const VERSION = 'rha-v2';
const CORE = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "site.js",
  "logo.png",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "fotos/1-cocina-blanca-l.jpg",
  "fotos/2-bano-mueble-negro.jpg",
  "fotos/3-cocina-led.jpg",
  "fotos/4-bano-espejo-led.jpg",
  "fotos/5-aseo-pared-curva.jpg",
  "fotos/6-reforma-antes.jpg",
  "fotos/7-reforma-despues.jpg"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const isImage = req => req.destination === 'image';

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const fonts = /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname);
  if(!sameOrigin && !fonts) return;

  if(sameOrigin && !isImage(req)){
    /* páginas, textos y datos: primero la red (siempre lo último), si no hay conexión la copia guardada */
    e.respondWith(fetch(req).then(res => {
      if(res.ok){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined))));
    return;
  }
  /* fotos y tipografías: salen de la copia guardada y se refrescan en segundo plano */
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if(res.ok || res.type === 'opaque'){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
