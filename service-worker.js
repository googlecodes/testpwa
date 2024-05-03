// 监听 'install' 事件
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);

  // 等待缓存打开
  event.waitUntil(
    caches.open('static').then(function(cache) {
      // 添加静态资源到缓存中
      cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
    })
  );
});

// 监听 'activate' 事件
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

// 监听 'fetch' 事件
self.addEventListener('fetch', function(event) {
  // 尝试从缓存中匹配请求
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // 如果缓存命中，则直接返回缓存响应
        return response;
      } else {
        // 如果缓存未命中，则尝试从网络获取资源
        return fetch(event.request).then(function(res) {
          // 打开名为 'dynamic' 的缓存
          return caches.open('dynamic').then(function(cache) {
            // 将获取的资源克隆一份并放入缓存中
            cache.put(event.request.url, res.clone());
            // 返回网络获取的资源
            return res;
          });
        });
      }
    })
  );
});
