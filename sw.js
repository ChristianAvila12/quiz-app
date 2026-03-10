
// Name of the cache
const CACHE_NAME = "quiz-app-cache-v1";

// Files to cache
const urlsToCache = [
  "./",              // root
  "./index.html",    // main HTML
  "./icon.png",
  "./correct.wav",
  "./correct1.mp3",
  "./correct2.mp3",
  "./correct3.mp3",
  "./correct4.mp3",
  "./wrong.wave",
  "./wrong1.mp3",
  "./wrong2.mp3",
  "./wrong3.mp3",
  "./wrong4.mp3",
  "./wrong5.mp3",
  "./wrong6.mp3",
  "./decks/hpge-default.csv",
  "./decks/mstc-default.csv",
  "./decks/psad-default.csv",
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
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // If we got a good response, update the cache
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, just return cached response
          return cachedResponse;
        });

        // Return cached response immediately if available, else wait for network
        return cachedResponse || fetchPromise;
      });
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






