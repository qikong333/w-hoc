import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import qs from 'qs'

interface Params {
    baseURL: string
    timeout: number
    headers: any
    reqValue: any
}

const useHttp = ({ baseURL, timeout = 5000, headers, reqValue }: Params) => {
    const instance = axios.create({
        baseURL,
        // process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/apis',
        timeout,
        headers,
        // 如果前端配置了这个withCredentials=true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址啊
        // withCredentials: true
    })

    instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            // 获取token，并将其添加到请求头中
            //   const token = localStorage.getItem('token')
            //   if (token) {
            //     config.headers.Authorization = `${token}`
            //   }

            config.params = qs.stringify(config.params)
            return config
        },
        (error: any) => {
            // 错误抛出，在具体业务代码中处理
            error.data = {}
            error.data.message = '请求出错，请联系管理员！'
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log(response)

            // const status: number = response.status
            // const message = ''
            // if(status<200 || status>= 300){
            //   // 处理 http 错误，抛出到业务代码处理
            //   message =
            // }
            // 直接返回
            const r = response[reqValue]
            return r
        },
        (error: any) => {
            // 可以做一些处理，401，403，500 等等，直接统一处理，也可以抛出到业务代码中处理
            message.error(error, 3)
            return Promise.reject(error)
        }
    )

    const get = (url: string, params?: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            instance
                .get(url, {
                    params,
                })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
            .then(r => {
                return r
            })
            .catch(e => {
                return e
            })
            .finally()
    }
    const post = (url: string, params = {}, body?: any, option = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url,
                method: 'post',
                params, // query参数 显式
                data: body, // body参数 隐式
                ...option,
            })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    const request = instance

    return {
        get,
        post,
        request,
    }
}

export default useHttp
