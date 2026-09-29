/* =====================================================================
 * Pilares · service worker
 * ---------------------------------------------------------------------
 * Solo recibe notificaciones push y abre la app en el lugar indicado al
 * tocarlas. No guarda nada en caché: la app sigue cargando como siempre.
 * ================================================================== */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { cuerpo: e.data ? e.data.text() : '' }; }
  var tareas = [
    // Todo push debe mostrarse (iOS retira el permiso si llegan push "mudos").
    self.registration.showNotification(d.titulo || 'Pilares', {
      body: d.cuerpo || '',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: d.id || undefined,
      data: { url: d.url || './' },
    }),
  ];
  // Número en el ícono de la app (iPhone con la app instalada, Chrome, Edge).
  if (self.navigator && self.navigator.setAppBadge && typeof d.pendientes === 'number') {
    tareas.push((d.pendientes > 0 ? self.navigator.setAppBadge(d.pendientes) : self.navigator.clearAppBadge()).catch(function () {}));
  }
  e.waitUntil(Promise.all(tareas));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (lista) {
    // Si la app ya está abierta, se lleva al frente y se le dice a dónde ir.
    for (var i = 0; i < lista.length; i++) {
      var c = lista[i];
      if ('focus' in c) {
        c.postMessage({ tipo: 'abrir-aviso', url: url });
        return c.focus();
      }
    }
    return self.clients.openWindow(url);
  }));
});
