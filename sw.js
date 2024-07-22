const workboxVersion = '5.1.3';
importScripts(`https://cdn.bootcdn.net/ajax/libs/workbox-sw/${workboxVersion}/workbox-sw.min.js`);
workbox.core.setCacheNameDetails({
    prefix: "PwdBymz-W"+"0722"
});
workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.cleanupOutdatedCaches();
workbox.routing.registerRoute(
    /\.(?:css|js|ico|gif|json|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "assets"+"0722",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);
var articleHandler = workboxSW.strategies.networkFirst({
    cacheName: 'pages1',
    cacheExpiration: {
      maxEntries: 50
    }
  });
  
  workboxSW.router.registerRoute('/*.html', args => {
    return articleHandler.handle(args);
  });