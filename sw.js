// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests



 var CACHE_NAME = 'my-site-cache-v1';
 var urlsToCache = [
   'https://cse110lab6.herokuapp.com/entries'
 ];
 
 self.addEventListener('install', function(event) {
   // Perform install steps
   console.log("Service Worker installing");
   event.waitUntil(
     caches.open(CACHE_NAME)
       .then(function(cache) {
         console.log('Opened cache');
         return cache.addAll(urlsToCache);
       })
   );
 });


self.addEventListener('activate', event => {
  console.log("Service Worker activating");
  event.waitUntil(clients.claim());
});


self.addEventListener('fetch', function(event) {
  console.log("Service Worker fetching");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
