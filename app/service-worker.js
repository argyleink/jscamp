// HTML files: try the network first, then the cache.
// Other files: try the cache first, then the network.
// Both: cache a fresh version if possible.
// (beware: the cache will grow and grow; there's no cleanup)

self.addEventListener("activate", function(event) {
  // self.registration.unregister().then(function() {
  //   return self.clients.matchAll();
  // })
  // .then(function(clients) {
  //   clients.forEach(client => {
  //     if (client.url && "navigate" in client){
  //       client.navigate(client.url)
  //     }
  //   })
  // });

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// const cacheName = 'files';
// 
// addEventListener('fetch',  fetchEvent => {
//   const request = fetchEvent.request;
//   if (request.method !== 'GET') {
//     return;
//   }
//   fetchEvent.respondWith(async function() {
//     const responseFromFetch = fetch(request);
//     fetchEvent.waitUntil(async function() {
//       const responseCopy = (await responseFromFetch).clone();
//       const myCache = await caches.open(cacheName);
//       await myCache.put(request, responseCopy);
//     }());
//     if (request.headers.get('Accept').includes('text/html')) {
//       try {
//         return await responseFromFetch;
//       }
//       catch(error) {
//         return caches.match(request);
//       }
//     } else {
//       const responseFromCache = await caches.match(request);
//       return responseFromCache || responseFromFetch;
//     }
//   }());
// });