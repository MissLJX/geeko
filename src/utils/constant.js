/**
 * Created by shao_ on 2017/6/22.
 */


export const DOMAIN = ''

//version
export const VERSION = 'v9'
/*export const VERSION = 'v7'*/
export const VPATH = '/'+VERSION
export const APP_VERSION = '3.2.0'
export const DEFAULT_DOMAIN = 'chicme.com'
// export const PROJECT = '/joyshoetique'
export const PROJECT = window.ctx || ''
export const ROUTER_PATH_ORDER = PROJECT + '/me/m/order'
export const ROUTER_PATH_ME = PROJECT + '/me'

//image
export const BASE_IMAGE_PATH = 'https://image.geeko.ltd'
export const BASE_PRODUCT_IMAGE_SMALL = 'https://image.geeko.ltd/small'


//order status
export const STATUS_PENDING = 1
export const STATUS_REVIEWING = 2
export const STATUS_PROCESSING = 3
export const STATUS_SHIPPED = 4
export const STATUS_PARTIALLY_REFUNDED = 5
export const STATUS_REFUNDED = 6
export const STATUS_CANCELED = 7
export const STATUS_HELD = 8
export const STATUS_CONFIRMED = 10


export const STATUS_LABEL = function (value) {
    var label;
    switch (value) {

        case STATUS_PENDING:
            label = 'Pending'
            break
        case STATUS_REVIEWING:
            label = 'paid'
            break
        case STATUS_PROCESSING:
            label = 'Processing'
            break
        case STATUS_SHIPPED:
            label = 'Shipped'
            break
        case STATUS_PARTIALLY_REFUNDED:
            label = 'Partially refunded'
            break
        case STATUS_REFUNDED:
            label = 'Refunded'
            break
        case STATUS_CANCELED:
            label = 'Canceled'
            break
        case STATUS_HELD:
            label = 'Held'
            break
        case STATUS_CONFIRMED:
            label = 'Confirmed'
            break
        default:
            label = ''
    }

    return label
}


export const OUT_SITE_MESSAGE_TYPE = 6
export const OUT_SITE_COUPON_CODE = 'M1105'

export const STATUS_COLOR = function (value) {
    var label;
    let color;
    switch (value) {

        case 0:
            label = 'Waiting for Payment'
            color = '#f9a646'
            break
        case 1:
            label = 'Paid'
            color = '#d088e1'
            break
        case 2:
            label = 'Processing'
            color = '#d088e1'
            break
        case 3:
            label = 'Shipped'
            color = '#57b936'
            break
        case 4:
            label = 'Cancel'
            color = '#e64545'
            break
        case 5:
            label = 'Confirm'
            color = '#a4a4a7'
            break
        default:
            color = ''
    }

    return color
}


export const disposeComments = (comments,orderItem,productIds) => {
    let newComments = [];
    productIds = productIds.split(",");
    for(var i = 0;i<productIds.length;i++){
        for(var j = 0;j<productIds.length;j++){
            if(productIds[i] === orderItem[j].productId){
                comments[j]['productImageUrl'] = orderItem[j].productImageUrl;
                comments[j]['productName'] = orderItem[j].productName;;
                comments[j]['color'] = orderItem[j].color;;
                comments[j]['size'] = orderItem[j].size;
                comments[j]['variantId'] = orderItem[j].variantId;
                comments[j]['uploadedImages'] = [];
                comments[j]['fits'] = [
                    {label: "Small", value: '3'},
                    {label: "True to size", value: '2'},
                    {label: "Large", value: '1'}
                ],
                comments[j]['files'] = [];
                comments[j]['newfiles'] = [];
                newComments.push(comments[j]);
            }
        }
    }
    return newComments;
}   




