/**
 * Created by shao_ on 2017/6/28.
 */
import * as types from '../mutation-types'
import api from '../../api/order'


const state = {
    comment: {
        content: '',
        id: null,
        productId: null,
        score: 5,
        sizingRecommendation: '2'
    },
    reviewSending: false
}


const getters = {
    comment: state => state.comment,
    reviewSending: state => state.reviewSending
}

const mutations = {
    [types.REVIEW_LOAD_COMMENT](state, comment){
        if (!comment)
            comment = {
                content: '',
                id: null,
                productId: null,
                score: 5,
                sizingRecommendation: '2'
            };

        state.comment = comment;
    },

    [types.REVIEW_SEND_COMMENT](state, comment){
        state.comment = comment;
    },

    [types.REVIEW_SENDING](state, sending){
        state.reviewSending = sending
    }


}

const actions = {
    loadComment({commit}, {productId}){
        return new Promise((resolve) => {
            api.getComment(productId, (comment) => {
                commit(types.REVIEW_LOAD_COMMENT, comment);
                resolve(comment)
            })
        });
    },
    sendComment({commit},  {reply }){
        commit(types.REVIEW_SENDING, true)
        return new Promise((resolve) => {
            let send = api.sendComment
            if(reply.get('id') !== 'null'){
                send = api.updateComment
            }
            send(reply).then((comment) => {
                commit(types.REVIEW_SENDING, false)
                resolve(comment)
            }).catch((e) => {
                console.error(e)
                commit(types.REVIEW_SENDING, false)
            });
        });
    },

}

export default{
    state,
    getters,
    mutations,
    actions
}