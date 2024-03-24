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
        // target: 'http://10.168.1.158:8090',
        target: 'http://localhost:8090',
        changeOrigin: true
      }
    },
    port:8088
  }
})
