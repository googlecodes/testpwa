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



///////////// 安装按钮

// 检测用户是否在iOS设备上
const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
// 检测用户是否在Android设备上使用Chrome浏览器
const isChrome = /Chrome/i.test(navigator.userAgent) && /Google Inc/i.test(navigator.vendor);
// DOM元素引用
const installButton = document.getElementById('installBtn');
// 检测是否可以安装PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // 阻止默认的安装提示
  e.preventDefault();
  // 保存事件，以便我们可以稍后触发它
  deferredPrompt = e;
  // 显示安装按钮
  installButton.style.display = 'block';
  // 点击安装
  installButton.addEventListener('click', () => {
    // 隐藏安装按钮
    installButton.style.display = 'none';
    // 显示安装提示
    deferredPrompt.prompt();
    // 等待用户响应
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装提示');
      } else {
        console.log('用户拒绝了安装提示');
      }
      deferredPrompt = null;
    });
  });
});

// 检测用户是否在iOS设备上，如果是，则显示一个指向苹果应用商店的链接
if (isiOS) {
  installButton.addEventListener('click', () => {
    // 在这里添加一个链接到您的应用在苹果应用商店的URL
    window.location.href = 'https://h5-188.tyf147.net/home/game?gameCategoryId=0';
  });
}

// 检测用户是否在Android设备上使用Chrome浏览器，如果是，则显示一个安装提示
if (isChrome) {
  installButton.addEventListener('click', () => {
    // 如果有保存的安装事件，则触发它
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('用户接受了安装提示');
        } else {
          console.log('用户拒绝了安装提示');
        }
        deferredPrompt = null;
      });
    }
  });
}
