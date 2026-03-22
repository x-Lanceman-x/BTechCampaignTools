const CACHE_NAME = 'bt-aces-v1';
const ASSETS = [
  './BattleTechAcesLog.html',
  // Google Fonts will be cached on first load
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      // Cache Google Fonts requests too
      if (e.request.url.includes('fonts.g')) {
        return caches.open(CACHE_NAME).then(c => {
          c.put(e.request, res.clone());
          return res;
        });
      }
      return res;
    }))
  );
});