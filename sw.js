const CACHE_NAME = 'workout-tracker-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instala a nova versão e força o navegador a usá-la imediatamente
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Ativa a nova versão e apaga o cache da versão anterior (v1)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Apagando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepta os pedidos para funcionar offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
