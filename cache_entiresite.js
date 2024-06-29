const cacheName = 'v10'


// intstall service worker
self.addEventListener('install', (e) => {
    console.log("Service Worker Installed");

    
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
        fetch(e.request)
        .then(res => {
            const resClone = res.clone()
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone)
            });
            return res
        }).catch(err => caches.match(e.request).then(res => res))
    );
});
