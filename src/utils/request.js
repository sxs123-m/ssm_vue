//引入axios
import axios from "axios";
//通过axios创建request对象
const request = axios.create({
    timeout: 5000 //设置超时时长为5秒
})
//创建request的拦截器，在请求之前做统一的处理，这里是设置Content-Type
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    return config
}, error => {
    //如果出错则不继续执行
    return Promise.reject(error)
})
//response拦截器，统一处理返回结果，总之这样前端得到的数据就是response.data了
request.interceptors.response.use(
    response => {
        let res = response.data
        //如果response是文件类型的就直接返回
        if (response.config.responseType === 'blob') {
            return res
        }
        //如果data是string类型的就转换成json
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res
    }
)

//导出
export default request
