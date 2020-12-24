/**
 * Created by shao_ on 2017/6/28.
 */
import * as types from '../mutation-types'
import api from '../../api/order'
import _ from 'lodash'


const state = {
    youlikeProducts:[],
    youlikeskip:0,
}


const getters = {
    youlikeProducts: state => state.youlikeProducts,
    youlikeskip:state => state.youlikeskip,
}

const mutations = {
    [types.ME_GET_YOU_LIKE_PRODUCTS](state,youlikeProducts){
        // state.youlikeProducts = _.concat(state.youlikeProducts,youlikeProducts)
        state.youlikeProducts = _.concat(youlikeProducts)
    },
    [types.ME_GET_YOU_LIKE_SKIP](state){
        state.youlikeskip += 20
    },
}

const actions = {
    getYouLikeProducts({commit},{orderId,skip}){
        return new Promise((resolve, reject) => {
            api.getYouLikeProducts(orderId,skip).then((products) => {
                commit(types.ME_GET_YOU_LIKE_PRODUCTS, products)
                resolve(products)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    getYouLikeSkip({commit}){
        commit(types.ME_GET_YOU_LIKE_SKIP)
    },
}

export default{
    state,
    getters,
    mutations,
    actions
}