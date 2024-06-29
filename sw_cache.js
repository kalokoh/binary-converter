const cacheName = 'v1'
const cacheAsset = [
    'index.html',
    'index.css',
    'index.js'
] 

// intstall service worker
self.addEventListener('install', (e) => {
    console.log("Service Worker Installed");

    e.waitUntil(
       caches.open(cacheName)
       .then(cache => {
        console.log('caching files');
        cache.addAll(cacheAsset)
       })
       .then(self.skipWaiting())
    );
})

// activate service worker
self.addEventListener('activate', (e) => {
    console.log("Service Worker activated");

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache != cacheName){
                        console.log('clearing old cache');
                        return caches.delete(cache)
                    }
                })
            )
        })

    )
})

self.addEventListener('fetch', (e) =>{
    console.log('Fetching data')
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})
