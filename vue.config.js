let proxyObj = {}

proxyObj['/'] = {
  //websocket
  ws: false,
  //目标地址
  target: 'http://192.168.3.46:8081',

  //发送请求头host会被设置成target
  changeOrigin: true,
  //不重写请求地址
  pathReWrite: {
    '^/': '/'
  }
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: proxyObj
  }
}

