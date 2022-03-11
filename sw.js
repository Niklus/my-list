const cacheName = "cache-v4";

const precacheResources = [
  "/",
  "index.html",
  "js/index.js",
  "manifest.json",
  "icons/192x192.png",
  "icons/512x512.png",
  "icons/180x180.png",
  "js/storage.js",
  "css/styles.css",
];

self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");

  let cacheKeeplist = [cacheName];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
