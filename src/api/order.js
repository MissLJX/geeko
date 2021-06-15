/**
 * Created by shao_ on 2017/6/20.
 */
import axios from './apiconfig'
import qs from 'qs'

export default{
    getOrders({skip, api_suffix}, callBack){

        axios.get('/v9/order/' + skip + '/20/' + api_suffix).then((orders) => {
            callBack(orders)
        }).catch((e) => {
            console.log(e)
        });
    },
    getOrder(orderId, callBack){
        axios.post('/v9/order/get-order-details',orderId).then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        });
    },
    getOrderByCode(code, callBack){
        axios.post('/v9/order/anon/get-order-details-by-code',code).then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        });
    },
    cancelOrder({orderId,cancelReason}, callBack){
        axios.get('/v9/order/cancel',{orderId,cancelReason}).then((order) => {
            callBack(order);
        }).catch((e) => {
            console.log(e)
        })
    },
    confirmOrder(orderId, callBack){
        axios.get('/v9/order/'+orderId+'/receipt').then((order) => {
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
    getTicketVOByCode(code, callBack){
        axios.get('/ticket/' + code + '/get-by-order').then((ticketVO) => {
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
            axios.form('/product-comment/add', comment).then((comment) => {
                resolve(comment);
            }).catch((e) => {
                reject(e)
            })
        });
    },
    updateComment(comment){
        return new Promise((resolve, reject) => {
            axios.form('/product-comment/update', comment).then((comment) => {
                console.log("comment",comment);
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
        return axios.get('/v9/tracking/anon/get-by-order-id',{orderId})
    },
    getPackageTracking(type,id){
        return axios.get('/v9/tracking/get-by-id',{type,id})
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
        return axios.get('/v9/apacpay/get-pay-params-by-order',{orderId})
    },

    /*getOrderApacPay(orderId){
        return axios.get('/v7/apacpay/get-pay-params-by-order',{orderId})
    },*/

    getYouLikeProducts(orderId,skip){
        return axios.get('/v9/order/anon/'+skip+'/20/get-same-category-products', {orderId}, {})
    },

    addProducts(products){
        return axios.cpost('/v9/shopping-cart/add-products', products)
    },
    // http://localhost:8080/wanna/comment/get-curr-customer-comments-by-product-ids/?productIds=adc23415-3edb-4cbe-8962-1fdee8a69022,BT857-daisysChic
    getCommentByProductIds(productIds,callback){
        return axios.get('/comment/get-curr-customer-comments-by-product-ids',{productIds}).then(comments => {
            callback(comments);
        }).catch((e) => {
            console.log(e)
        })
    },
    getLogisticsCompanies(){
        return axios.get('/context/anon/get-logistics-companies');
    },
    addReturnLogistics(logistics){
        return axios.cpost('/v9/order/add-return-logistics',JSON.stringify(logistics),{'Content-Type':"application/json"});
    },
    getReturnLogistics(orderId){
        return axios.get("/v9/order/get-return-logistics",{orderId});
    },
    generalUploadImage(imageFile){
        return axios.form('/context/upload',imageFile);
    }
}
