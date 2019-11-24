/**
 * Created by shao_ on 2017/6/20.
 */

import api from '../api/order';
import * as types from './mutation-types';

export default {
    loadOrder: function ({commit}, {id}) {
        return new Promise(function (resolve, reject) {
            api.getOrder({orderId:id}, (order)=> {
                commit(types.DETAIL_LOAD_ORDER, order);
                resolve(order);
            });
        });
    },
    loadOrderByCode: function ({commit}, {id}) {
        return new Promise(function (resolve, reject) {
            api.getOrderByCode({code:id}, (order)=> {
                commit(types.DETAIL_LOAD_ORDER, order);
                resolve(order);
            });
        });
    },
    //Add To Cart
    addProducts({commit},products){
        return  api.addProducts(products);
    },
    paging: function ({commit}, paging) {
        commit(types.APP_PAGE_LOADING, paging);
    },
    confirmShow: function ({commit}, shower) {
        commit(types.APP_CONFIRM_SHOW, shower)
    },
    closeConfirm: function ({commit}) {
        commit(types.APP_CONFIRM_SHOW, {show: false, cfg: null})
    }
}