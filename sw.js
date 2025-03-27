// sw.js
self.addEventListener("install", event => {
    console.log("Service Worker instalado");
    event.waitUntil(
        caches.open("v1").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/assets/styles.css",
                "/assets/script.js",
                "/manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});


