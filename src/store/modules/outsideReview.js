/**
 * Created by Administrator on 12/1/2017.
 */

import * as types from '../mutation-types'
import api from '../../api/order'
import {OUT_SITE_MESSAGE_TYPE, OUT_SITE_COUPON_CODE} from '../../utils/constant'

const state = {
    socials: [],
    socialCoupon: null
}

const getters = {
    socials: state => state.socials,
    socialCoupon: state => state.socialCoupon
}

const mutations = {
    [types.OUTSITE_LOAD_SOICALS](state, socials){
        state.socials = socials
    },
    [types.OUTSITE_LOAD_COUPON](state, coupon){
        state.socialCoupon = coupon
    }


}

const actions = {
    loadOutSite({commit}){
        return new Promise((resolve, reject) => {
            Promise.all([api.getMessagesByType(OUT_SITE_MESSAGE_TYPE), api.getMessage(OUT_SITE_COUPON_CODE)]).then((results) => {
                commit(types.OUTSITE_LOAD_SOICALS, results[0])
                commit(types.OUTSITE_LOAD_COUPON, results[1])

                resolve()
            }).catch((e) => {
                reject(e)
            })
        })
    },
    sendImages({commit}, image){
        return new Promise(function (resolve, reject) {
            api.sendImages(image).then(() => {
                resolve()
            })
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}