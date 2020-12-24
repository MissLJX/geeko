/**
 * Created by shao_ on 2017/6/23.
 */
import axios from 'axios';
import qs from 'qs'
import * as Constant from '../utils/constant'
import * as Utils from '../utils/geekoutil'


const CODE_OK = '200'
const ACCESS_ERROR_300 = '300'
const ACCESS_ERROR_600 = '600'

const instance = axios.create({
    baseURL: typeof window.ctx == 'undefined' ? '/api' : window.ctx,
    timeout: 50000,
    headers: {
        version: Constant.VERSION,
        appVersion: Constant.APP_VERSION,
        /*countryCode: Utils.getCountry(),*/
        wid: Utils.getWid(),
        // wid: "6fd3b003-507f-43d7-9f06-e3244ae34dde",
        accessToken: window.accessToken || '',
        // accessToken: "cc416293-8398-4a6c-a73f-00af03a9193c" || '',
        deviceType: 'msite',
        xtoken: window.secret || ''
    }
});


const reRequest = () => instance.get('/context/anon/gat', {}, []).then((res) => {
    window.xtoken = res.data.result
    instance.defaults.headers.common['xtoken'] = window.xtoken
    return window.xtoken
}).catch(() => {
    window.location.reload()
})

const _api_result = function (res, resolve, reject) {
    var data = res.data
    if (data.code == CODE_OK) {
        resolve(data.result)
    } else if (data.code == ACCESS_ERROR_300 || data.code == ACCESS_ERROR_600) {

    } else {
        reject(data.result)
    }
}

export default {
    get(url, params, headers){
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params,
                headers: {
                    ...headers
                }
            }).then((res) => {
                if (res.data.code === 310) {
                    reRequest().then((res) => {
                        this.get(url, params, headers)
                    }).catch((e) => {
                        console.error(e)
                        reject(e)
                    })
                } else {
                    _api_result(res, resolve, reject)
                }
            }).catch(e => console.error(e))
        })
    },
    post(url, data, headers){
        return new Promise((resolve, reject) => {
            instance.post(url,
                qs.stringify(data),
                {
                    headers: {
                        ...headers,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then((res) => {
                if (res.data.code === 310) {
                    reRequest().then((res) => {
                        this.get(url, params, headers)
                    }).catch((e) => {
                        console.error(e)
                        reject(e)
                    })
                } else {
                    _api_result(res, resolve, reject)
                }
            }).catch(e => console.error(e))
        })
    },
    form(url, data, headers){
        return new Promise((resolve, reject) => {
            instance.post(url,
                data,
                {
                    headers: {
                        ...headers,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then((res) => {
                _api_result(res, resolve, reject)
            }).catch(e => console.error(e))
        })
    },
    cpost(url, data, headers = {}){
        return new Promise((resolve, reject) => {
            instance.post(url, data, {
                headers: {...headers}
            }).then((res) => {
                _api_result(res, resolve, reject)
            }).catch((e) => {
                console.error(e)
                reject(e)
            })
        })
    },
}
