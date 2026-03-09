self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('quiz-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/icon.png',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});