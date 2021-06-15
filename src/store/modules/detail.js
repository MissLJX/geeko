/**
 * Created by shao_ on 2017/6/23.
 */
import * as types from '../mutation-types';
import api from '../../api/order'
import * as constant from '../../utils/constant'

const state = {
    order: null,
    latestTicket: null,
    cancelReasons:null,
    logisticsCompanies:null,
    returnLogistics:null
}

const getters = {
    order: state => state.order,
    latestTicket: state => state.latestTicket,
    cancelReasons: state => state.cancelReasons,
    logisticsCompanies: state => state.logisticsCompanies,
    returnLogistics: state => state.returnLogistics
}

const mutations = {
    [types.DETAIL_CONFIRM_ORDER](state, status){
        state.order.status = status
    },
    [types.DETAIL_CANCEL_ORDER](state, status){
        state.order.status = status
    },
    [types.DETAIL_LOAD_LAST_REPLY](state, reply){
        if(reply && reply.imageUrls && reply.imageUrls.length > 0)
            reply.imageUrls = reply.imageUrls.map(img => 'https://image.geeko.ltd/ticket/'+img)
        state.latestTicket = reply
    },
    [types.CANCEL_ORDER_REASONS](state,reasons){
        state.cancelReasons = _.cloneDeep(reasons)
    },
    [types.LOGISTICS_COMPANIES](state,logisticsCompanies){
        state.logisticsCompanies = logisticsCompanies;
    },
    [types.GET_RETURN_LOGISTICS](state,returnLogistics){
        state.returnLogistics = returnLogistics;
    }
}


const actions = {
    confirmOrder({commit}, id){
        return new Promise((resolve, reject) => {
            api.confirmOrder(id, () => {
                resolve()
                commit(types.DETAIL_CONFIRM_ORDER, constant.STATUS_CONFIRMED)
            })
        });
    },
    cancelOrder({commit}, {orderId,cancelReason}){
        return new Promise((resolve, reject) => {
            api.cancelOrder({orderId,cancelReason}, () => {
                resolve()
                commit(types.DETAIL_CANCEL_ORDER, constant.STATUS_CANCELED)
            })
        });
    },
    detailTicket({commit}, orderId){
        return new Promise((resolve, reject) => {
            api.getTicketVO(orderId , function(ticketVO){
                if(ticketVO && ticketVO.ticket && ticketVO.ticket.ticketReplies && ticketVO.ticket.ticketReplies.length > 0){
                    commit(types.DETAIL_LOAD_LAST_REPLY, ticketVO.ticket.ticketReplies[ticketVO.ticket.ticketReplies.length - 1])
                }else{
                    commit(types.DETAIL_LOAD_LAST_REPLY, null)
                }
                resolve(ticketVO)
            })
        })
    },
    clearTicket({commit}){
        commit(types.DETAIL_LOAD_LAST_REPLY, null)
    },
    getCancelReasons({commit}){
        return api.getMessageByTypeCode('cancel-order-reasons').then((result) => {
            commit(types.CANCEL_ORDER_REASONS, result)
        })
    },
    getLogisticsCompanies({commit}){
        return api.getLogisticsCompanies().then((result) => {
            commit(types.LOGISTICS_COMPANIES,result);
        });
    },
    addReturnLogistics({commit},uploadFiles){
        return api.addReturnLogistics(uploadFiles).then((result) => {
            console.log("result",result);
        });
    },
    getReturnLogistics({commit},orderId){
        return new Promise((reslove,reject) => {
            api.getReturnLogistics(orderId).then((result) => {
                if(!!result && result != null && result.length > 0 && result.length < 2){
                    commit(types.GET_RETURN_LOGISTICS,result);
                }else if(!!result && result != null && result.length > 1){
                    result.splice(0,result.length - 1);
                    commit(types.GET_RETURN_LOGISTICS,result);
                }
                reslove(result);
            });
        });
    }
}


export default{
    state,
    getters,
    mutations,
    actions
}