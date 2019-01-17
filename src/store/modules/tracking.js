/**
 * Created by shao_ on 2017/9/18.
 */
import * as types from '../mutation-types'
import api from '../../api/order'

var state = {
    tracking: null,
    packagetracking:null
}

var getters = {
    tracking: state => state.tracking,
    packagetracking:state => state.packagetracking
}

var mutations = {
    [types.TRACKING_LOAD](state, tracking){
        state.tracking = tracking
    },
    [types.PACKAGE_TRACKING_LOAD](state, packagetracking){
        state.packagetracking = packagetracking
    }
}

var actions = {
    loadTracking({commit}, {orderId}){
        return new Promise((resolve, reject) => {
            api.getTracking(orderId).then((tracking) => {
                commit(types.TRACKING_LOAD, tracking)
                resolve(tracking)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    loadPackageTracking({commit}, {type,packageId}){
        return new Promise((resolve, reject) => {
            api.getPackageTracking(type,packageId).then((tracking) => {
                commit(types.PACKAGE_TRACKING_LOAD, tracking)
                resolve(tracking)
            }).catch((e) => {
                reject(e)
            })
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}