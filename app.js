// 检查浏览器是否支持 Service Worker 功能
if ('serviceWorker' in navigator) {
  // 尝试注册 Service Worker 脚本
  navigator.serviceWorker
    .register('/service-worker.js')
    // Service Worker 注册成功时的回调函数
    .then(function(registration) {
      // 打印 Service Worker 注册成功信息，并包含作用域信息
      console.log(
        'Service Worker 注册成功，作用域：',
        registration.scope
      );
    })
    // Service Worker 注册失败时的回调函数
    .catch(function(err) {
      // 打印 Service Worker 注册失败信息，并包含错误信息
      console.log('Service Worker 注册失败：', err);
    });
}
