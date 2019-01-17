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
        countryCode: Utils.getCountry(),
        wid: Utils.getWid(),
        accessToken: window.accessToken || ''
    }
});

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
                _api_result(res, resolve, reject)
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
                _api_result(res, resolve, reject)
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
