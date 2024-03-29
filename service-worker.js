const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/pages/home.html",
    "pages/about.html",
    "pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
];

self.addEventListener("install", function(event) {  
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset cache: ", response.url)
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        cache.keys().then(function(cacheName) {
            return Promise.all(
                cacheName.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                    console.log("ServiceWorker: cache"+ cacheName +" dihapus");
                    return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})