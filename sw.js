
// Name of the cache
const CACHE_NAME = "quiz-app-cache-v1";

// Files to cache
const urlsToCache = [
  "./",              // root
  "./index.html",    // main HTML
  "./icon.png",
  "./correct.wav",
  "./wrong.mp3",
  "./decks/hpge-default.csv",
  "./decks/mstc-default.csv",
  "./decks/decks.json"
];

// Install event: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached files if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});



