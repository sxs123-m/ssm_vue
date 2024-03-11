const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = {
    devServer: {
        port: 9999, //启动端口
        //设置代理，解决跨域问题
        proxy: {
            '/api': {
                target: 'http://localhost:8080/ssm', //这样设置/api就代表了http://localhost:8080/ssm
                changeOrigin: true, //是否设置同源，这样浏览器就允许跨域访问
                pathRewrite: { //路径重写
                    '/api': '' //选择忽略拦截器里面的单词
                }

            }
        }
    }
}
