// O Pauta mudou de endereço: este service worker apaga o cache antigo e se desliga.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(list => list.forEach(c => c.navigate(c.url)))
  );
});
