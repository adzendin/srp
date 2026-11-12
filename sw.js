/* SRP Service Worker - Beranda SRP PWA - FIX v3 */
const CACHE = 'srp-v3';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => k !== CACHE ? caches.delete(k) : Promise.resolve())))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // 1. BANK + JSON: WAJIB network-first, JANGAN DI-CACHE
  if (url.pathname.includes('/bank/') || url.pathname.endsWith('.json')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // 2. Navigasi: network-first, fallback ke cache
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 3. Static same-origin: cache-first, tapi HANYA kalau res.ok
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((hit) => {
        if (hit) return hit;
        return fetch(e.request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        }).catch(() => caches.match(e.request));
      })
    );
  }
});
