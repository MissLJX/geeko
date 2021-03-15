/**
 * Created by shao_ on 2017/6/27.
 */
import * as types from '../mutation-types'
import api from '../../api/order'
import * as utils from '../../utils/geekoutil'
import _ from 'lodash'

const state = {
    ticketVO: null,
    reviewMsg:null
}

const getters = {
    ticketVO: state => {
        var vo = state.ticketVO
        if (vo && vo.ticket && vo.ticket.ticketReplies && vo.ticket.ticketReplies.length > 0) {
            _.each(vo.ticket.ticketReplies, (reply) => {
                reply.imageUrls && (reply.imageUrls = reply.imageUrls.map((url) => {
                    return url.indexOf('https://') == 0 || url.indexOf('blob') >= 0 ? url : 'https://image.geeko.ltd/ticket/' + url
                }))
            })
        }
        return vo
    },
    reviewMsg: state => state.reviewMsg
}

const mutations = {
    [types.CONTACT_LOAD_TICKET](state, ticketVO){
        state.ticketVO = ticketVO;
    },
    [types.CONTACT_SEND_MESSAGE](state, reply){
        var ticket = state.ticketVO.ticket
        if (!!!ticket) {
            var _ticket = {ticketReplies: []}
            ticket = state.ticketVO.ticket = _ticket
        }

        if (ticket && ticket.ticketReplies) {
            ticket.ticketReplies.push({
                completed: 0,
                date: utils.enDate(new Date()),
                imageUrls: reply.imageUrls,
                message: reply.message,
                sender: "buyers",
                locale: true
            })
        }
    },
    [types.CONTACT_REVIEW_MSG](state, reviewMsg){
        state.reviewMsg = reviewMsg;
    }
}

const actions = {
    loadTicket({commit}, {orderId}){
        return new Promise(function (resolve, reject) {
            api.getTicketVO(orderId, (vo) => {
                commit(types.CONTACT_LOAD_TICKET, vo);
                resolve(vo);
            });
        })
    },
    loadTicketByCode({commit}, {code}){
        return new Promise(function (resolve, reject) {
            api.getTicketVOByCode(code, (vo) => {
                commit(types.CONTACT_LOAD_TICKET, vo);
                resolve(vo);
            });

        })
    },
    loadTicketById({commit}, {id}){
        return new Promise(function (resolve, reject) {
            api.getTicketVOById(id, (vo) => {
                commit(types.CONTACT_LOAD_TICKET, vo);
                resolve(vo);
            });

        })
    },
    sendTicket({commit}, reply){
        return new Promise(function (resolve, reject) {
            api.sendTicket(reply).then(() => {
                commit(types.CONTACT_SEND_MESSAGE, reply)
                resolve()
            })
        })

    },
    sendImageTicket({commit}, {reply, files }){
        return new Promise(function (resolve, reject) {
            api.sendImageTicket(reply).then(() => {
                var file = files[0]
                var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                reply.imageUrls = [src]
                commit(types.CONTACT_SEND_MESSAGE, reply)
                resolve()
            })
        })
    },
    rate({commit}, rate){
        return api.rate(rate)
    },
    getReviewMsg({commit}){
        return api.getMessageByTypeCode('reviewMsg').then((result) => {
            commit(types.CONTACT_REVIEW_MSG, result)
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}