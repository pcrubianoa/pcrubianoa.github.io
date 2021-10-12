// Importar Libreria desde CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Activar Debug Workbox
workbox.setConfig({
  debug: true,
});

// Constantes modulos Workbox
const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { warmStrategyCache } = workbox.recipes;
const { offlineFallback } = workbox.recipes;
const { precacheAndRoute } = workbox.precaching;
const REVISION_VERSION = "v1.30";

// Nombres precache
workbox.core.setCacheNameDetails({
  prefix: "logisDistri",
  suffix: "1.1.3",
  precache: "precache",
  runtime: "runtime",
});

console.log({suffix: workbox.core.cacheNames.suffix});

// Registrar Archivos en Static Cache
workbox.precaching.precacheAndRoute([
  {
    url: 'manifest.json',
    revision: REVISION_VERSION,
  },
  {
    url: 'index.html',
    revision: REVISION_VERSION,
  },
  {
    url: 'src/js/app.js',
    revision: REVISION_VERSION,
  },
  {
    url: 'https://cdn.logis.com.co/js/lib/jquery-3.4.1.min.js',
    revision: '69bf746a9ecc6',
  },
  {
    url: 'https://cdn.logis.com.co/js/lib/bootstrap.min.js',
    revision: '69bf746a9ecc6',
  },
  {
    url: 'https://cdn.logis.com.co/js/lib/popper.min.js',
    revision: '69bf746a9ecc6',
  },
  {
    url: 'https://cdn.logis.com.co/img/icon/144x144.png',
    revision: '69bf746a9ecc6',
  },
  {
    url: 'https://cdn.logis.com.co/img/logo.png',
    revision: '69bf746a9ecc6',
  },
]);

// Limpiar Versiones anteriores
workbox.precaching.cleanupOutdatedCaches();

// Activar nuevo Service Worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// addEventListener('install', (event) => event.waitUntil(skipWaiting()));
// addEventListener('activate', (event) => event.waitUntil(clients.claim()));

// workbox.core.skipWaiting();
// workbox.core.clientsClaim();
// workbox.googleAnalytics.initialize();

// Registrar archivos en Cache Dinamico
workbox.routing.registerRoute(
  new RegExp('.*\\.(?:html|js|css|webp|png)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'DYNAMIC_CACHE',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif|webp)'),
  new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 60, // 30 Minutes
          })
     ]
})
);
