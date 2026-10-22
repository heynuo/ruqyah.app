/* =========================================================
   Ruqyah Service Worker - Resilient Offline PWA Engine
   Caches app shell, scripture pages, CSS, JS, and Quranic text.
   ========================================================= */

// Cache version. The registration code in js/script.js appends a build stamp
// (e.g. `sw.js?v=2026-10-14`) as a query string; we derive the cache name from
// it so a fresh deploy retires the old cache without anyone hand-editing this
// file. Falls back to the literal version when no stamp is present.
const BUILD_STAMP = new URL(self.location.href).searchParams.get('v') || 'v6';
const CACHE_NAME = `heynuo-cache-${BUILD_STAMP}`;

const PRECACHE_URLS = [
  './',
  'index.html',
  'quran.html',
  'quran-verses.html',
  'about.html',
  'contact.html',
  'privacy.html',
  '404.html',
  'manifest.json',
  'rss.xml',
  /* Canonical design tokens + chrome isolation. Every page links this file,
     and the header/footer are injected by js/shared-layout.js - both must be
     available offline or the whole shell disappears. */
  'css/shared-layout.css',
  'buttons.js',
  'js/shell.js',
  'js/shared-layout.js',
  'js/tailwind-config.js',
  'js/script.js',
  'assets/js/quran-player.js',
  'js/quran-page.js',
  'js/master-verses.js',
  'js/data/master-verses-data.js',
  'assets/banners/og-banner.jpg',
  'assets/banners/hero-banner.jpg',
  'assets/banners/hero-banner-800.jpg',
  'assets/banners/about-sanad.jpg',
  'assets/banners/quran-cover.jpg',
  'assets/icons/quran.png',
  'assets/icons/rocket.png',
  'assets/icons/sparkles.png',
  'assets/icons/search.png',
  'assets/icons/github.png',
  'assets/icons/moon.png',
  'assets/icons/sun.png',
  'assets/icons/menu.png',
  'assets/icons/email.png',
  'assets/icons/astronaut.png',
  'assets/icons/bookmark.png',
  'assets/icons/books.png',
  'assets/icons/calendar.png',
  'assets/icons/clock.png',
  'assets/icons/html5.png',
  'assets/icons/java.png',
  'assets/icons/lightning.png',
  'assets/icons/open-book.png',
  'assets/icons/share.png',
  'assets/icons/star.png',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// Install Event - Pre-cache the app shell before taking control.
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // A missing optional asset should not prevent the site shell from installing.
      await Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name.startsWith('heynuo-cache-') && name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Allow the page to promote a waiting worker immediately after a deploy.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const AUDIO_HOSTS = ['everyayah.com', 'alislam.cloud', 'mp3quran.net'];

function isAudioRequest(request, url) {
  return request.destination === 'audio' ||
    url.pathname.toLowerCase().endsWith('.mp3') ||
    AUDIO_HOSTS.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
}

function isCacheableResponse(response) {
  return response && response.ok && response.type === 'basic';
}

async function fetchAndCache(request, cache) {
  const response = await fetch(request);
  if (isCacheableResponse(response)) {
    await cache.put(request, response.clone()).catch(() => {
      // A cache quota error should not prevent a successful network response.
    });
  }
  return response;
}

// Fetch Event - network-first pages and stale-while-revalidate local assets.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Stream recitations directly; do not store large audio files in the app cache.
  if (isAudioRequest(request, url)) {
    event.respondWith(fetch(request));
    return;
  }

  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (request.mode === 'navigate') {
      try {
        return await fetchAndCache(request, cache);
      } catch (error) {
        return await cache.match(request) ||
          await cache.match(new URL('index.html', self.registration.scope)) ||
          await cache.match(new URL('404.html', self.registration.scope));
      }
    }

    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Keep the update alive after returning the cached response to the page.
      event.waitUntil(fetchAndCache(request, cache).catch(() => undefined));
      return cachedResponse;
    }

    return fetchAndCache(request, cache);
  })());
});
