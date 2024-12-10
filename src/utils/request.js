import axios from 'axios'
import _ from 'lodash'
// import { notification } from 'ant-design-vue';
// import Cookies from 'js-cookie'
// import { useRouter } from 'vue-router'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: '',
    timeout: 300000 // 请求超时时间
})



// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        if (error.response.data?.code === 401) {
            // notification.error({
            //     message: '提示!',
            //     description: error.response.data?.msg
            // })
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        } else {
            // notification.error({
            //     message: '提示!',
            //     description: error.response.data?.msg
            // })
        }
    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    const headers = _.cloneDeep(config.headers) || {}
    // 解决ie不重新请求问题
    config.header = headers
    // const userInfo = localStorage.getItem('userInfo')
    // if (userInfo) {
    //     const access_token = Cookies.get('access_token')
    //     config.headers['Blade-Auth'] = `bearer ${access_token}`
    //     // config.headers['Cookie'] = `saber-access-token=${access_token}`
    // }
    return config
}, errorHandler)

request.interceptors.response.use((response) => {
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
        return response
    }
    // 登录进口单独处理
    if ((response?.config?.url || '').includes('/blade-auth/oauth/token')) {
        if (!response.data.access_token) {
            return Promise.reject(response.data.error_description)
        }
        return response.data
    }
    if ((response?.config?.url || '').includes('/tia/getpublickeystring')) {
        if (!response.data) {
            return Promise.reject(response.data.error_description)
        }
        return response.data
    }
    if ((response?.config?.url || '').includes('/tia/login')) {
        if (!response.data) {
            return Promise.reject(response.data.error_description)
        }
        return response.data
    }
    if (_.get(response, 'statusCode') === 401) {
        // notification.error({
        //     message: '提示',
        //     description: '登录已过期!',
        //     duration: 2
        // })
        window.location.href = '/login'
        return Promise.reject('登录已过期!')
    } else if (_.get(response, 'data.retCode') !== 'SUCCESS') {
        const msg = _.get(response, 'data.msg')
        // notification.error({

        //     message: '提示',
        //     description: msg || '网络请求失败!',
        //     duration: 1
        // })
        return Promise.reject('网络请求失败!')
    }
    // else if (_.get(response, 'data.code') !== 200) {
    //     const msg = _.get(response, 'data.msg')
    //     // notification.error({
    //     //     message: '提示',
    //     //     description: msg || '网络请求失败!',
    //     //     duration: 1
    //     // })
    //     return Promise.reject('网络请求失败!')
    // }
    return response.data

}, errorHandler)

export default request