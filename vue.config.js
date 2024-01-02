const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    allowedHosts: "all",
    proxy: {
      '/api': {
        pathRewrite: {
          '^/api': ''
        },
        target: 'http://127.0.0.1:8090',
        changeOrigin: true
      }
    },
    port:8088
  }
})
