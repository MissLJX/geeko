/**
 * Created by shao_ on 2017/6/20.
 */
import axios from './apiconfig'
import qs from 'qs'

export default{
    getOrders({skip, api_suffix}, callBack){

        axios.get('/v8/order/' + skip + '/20/' + api_suffix).then((orders) => {
            callBack(orders)
        }).catch((e) => {
            console.log(e)
        });
    },
    getOrder(orderId, callBack){
        axios.post('/v8/order/anon/get-order-details',orderId).then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        });
    },
    cancelOrder({orderId,cancelReason}, callBack){
        axios.get('/v8/order/cancel',{orderId,cancelReason}).then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        })
    },
    confirmOrder(orderId, callBack){
        axios.get('/v8/order/'+orderId+'/receipt').then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        })
    },
    getTicketVO(orderId, callBack){
        axios.get('/ticket/' + orderId + '/order/get').then((ticketVO) => {
            callBack(ticketVO);
        }).catch((e) => {
            console.log(e)
        });

    },
    getTicketVOById(id, callBack){
        axios.get('/ticket/' + id + '/get').then((ticketVO) => {
            callBack(ticketVO);
        }).catch((e) => {
            console.log(e)
        });
    },
    sendTicket(ticket){
        return new Promise((resolve, reject) => {
            axios.post('/ticket/order/add', ticket).then((ticket) => {
                resolve(ticket)
            }).catch(e => reject(e))
        })
    },
    sendImageTicket(ticket){
        return new Promise((resolve, reject) => {
            axios.form('/ticket/order/add', ticket).then((ticket) => {
                resolve(ticket)
            }).catch(e => reject(e))
        })
    },
    getComment(productId, callBack){
        axios.get('/comment/' + productId + '/get').then((comment) => {
            callBack(comment);
        }).catch((e) => {
            console.log(e)
        })

    },
    sendComment(comment){
        return new Promise((resolve, reject) => {
            axios.form('/comment/add2', comment).then((comment) => {
                resolve(comment);
            }).catch((e) => {
                reject(e)
            })
        });
    },
    updateComment(comment){
        return new Promise((resolve, reject) => {
            axios.form('/comment/update2', comment).then((comment) => {
                resolve(comment);
            }).catch((e) => {
                reject(e)
            })
        });
    },
    rate(rate){
        return axios.post('/ticket/rate-service', rate)
    },
    getTracking(orderId){
        return axios.get('/v8/tracking/anon/get-by-order-id',{orderId})
    },
    getPackageTracking(type,id){
        return axios.get('/v8/tracking/get-by-id',{type,id})
    },

    getMessage(code){
        return axios.get('/message/get/'+ code)
    },

    getMessagesByType(type){
        return axios.get('/message/getByType/'+ type)
    },
    getMessageByTypeCode(typeCode){
        return axios.get('/dictionary/anon/get',{typeCode})
    },
    sendImages(imgs){
        return new Promise((resolve, reject) => {
            axios.form('/outsite-comment/add', imgs).then((imgs) => {
                resolve(imgs)
            }).catch(e => reject(e))
        })
    },

    getM1135(){
        return axios.get('/message/get-m1135')
    },

    getOrderApacPay(orderId){
        return axios.get('/v8/apacpay/get-pay-params-by-order',{orderId})
    },

    /*getOrderApacPay(orderId){
        return axios.get('/v7/apacpay/get-pay-params-by-order',{orderId})
    },*/

    getYouLikeProducts(orderId,skip){
        return axios.get('/v8/order/anon/'+skip+'/20/get-same-category-products', {orderId}, {})
    },

    addProducts(products){
        return axios.cpost('/v8/shopping-cart/add-products', products)
    },
}
