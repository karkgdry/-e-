//导入axios
import axios from 'axios'
//引入elm ui 的message提示
import { Message } from 'element-ui';
//引入路由
import router from '../router'

//请求拦截器
axios.interceptors.request.use(config => {
    //请求如果存在token,请求携带token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
    }
    return config
}, error => {
    console.log(error);
})


//配置拦截器  用来提示请求/响应失败,方便及时处理
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {   //业务逻辑响应码判断
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({ message: success.data.message });
            return;
        }
        if (success.data.Message) {
            Message.success({ message: success.data.message });
        }
    }
    return success.data;
},//接口访问失败
    error => {
        if (error.response.code == 504 || error.response.code == 404) {
            Message.error({ message: '服务器被吃了o(╯□╰)o' });
        }
        else if (error.response.code == 403) {
            Message.error({ message: '权限不足,请联系管理员' });
        }
        else if (error.response.code == 401) {
            Message.error({ message: '尚未登录,请登录' });
            //跳转到登录界面
            router.replace('/')
        }
        else {
            if (error.response.data.message) {
                Message.error({ message: error.response.data.message });
            }
            else {
                Message.error({ message: '未知错误!' });
            }
        }
        return;
    })

let base = "";

//传送post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
//传送put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
//传送get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
//传送delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
