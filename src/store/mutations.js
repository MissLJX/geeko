/**
 * Created by shao_ on 2017/6/26.
 */

import * as types from './mutation-types';

export default {
    [types.DETAIL_LOAD_ORDER](state , order){
        state.detail.order = order;
    },

    [types.APP_PAGE_LOADING](state , paging){
        state.paging = paging;
    },

    [types.APP_CONFIRM_SHOW](state, {show , cfg}){
        state.confirmCfg = cfg
        state.modalconfirmshow = show
    }

}