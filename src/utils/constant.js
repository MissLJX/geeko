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



//display stauts
export const DISPLAY_STATUS_UPAID = 0
export const DISPLAY_STATUS_PAID = 1
export const DISPLAY_STATUS_PROCESSING = 2
export const DISPLAY_STATUS_SHIPPED = 3
export const DISPLAY_STATUS_CANCELED = 4
export const DISPLAY_STATUS_REVIEW = 5




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


export const disposeComments = (comments,orderItem,variantIds) => {
    if(comments && comments.length <= 0){
       return orderItem.map(item => {
            item['content'] = "";
            item['score'] = 5;
            item['uploadedImages'] = [];
            item['images'] = [];
            item['sizingRecommendation'] = "";
            item['fits'] = [
                {label: "Small", value: '3'},
                {label: "True to size", value: '2'},
                {label: "Large", value: '1'}
            ],
            item['files'] = [];
            item['newfiles'] = [];
            return {...item}
        });
    }
    let newComments = [];
    let commentLength = comments.length;
    let commentsVaraintId = [];
    variantIds = variantIds.split(",");

    for(var i = 0;i<commentLength;i++){
        for(var j = 0;j<orderItem.length;j++){
            if(comments[i].varaintId === orderItem[j].variantId){
                console.log("comments[j]",comments[i]);
                // if(!comments[i]){
                //     comments[i] = {};
                //     comments[j]['content'] = "";
                //     comments[j]['score'] = 5;
                //     comments[j]['images'] = [];
                //     comments[j]['sizingRecommendation'] = "";
                //     comments[j]['productId'] = orderItem[j].productId;
                // }
                comments[i]['productImageUrl'] = orderItem[j].productImageUrl;
                comments[i]['productName'] = orderItem[j].productName;;
                comments[i]['color'] = orderItem[j].color;;
                comments[i]['size'] = orderItem[j].size;
                comments[i]['uploadedImages'] = [];
                comments[i]['fits'] = [
                    {label: "Small", value: '3'},
                    {label: "True to size", value: '2'},
                    {label: "Large", value: '1'}
                ],
                comments[i]['files'] = [];
                comments[i]['newfiles'] = [];
                if(!comments[i].images){
                    comments[i]['images'] = [];
                }

                newComments.push(comments[i]);
                commentsVaraintId.push(comments[i].varaintId);
            }
        }
    }
    
    const items = orderItem.filter(item => !(comments||[]).some(comment => comment.varaintId === item.variantId));
    items.forEach(item => {
        console.log("111");
        let comment = {};
        comment['content'] = "";
        comment['score'] = 5;
        comment['images'] = [];
        comment['sizingRecommendation'] = "";
        comment['productId'] = item.productId;
        comment['productImageUrl'] = item.productImageUrl;
        comment['productName'] = item.productName;;
        comment['color'] = item.color;;
        comment['varaintId'] = item.variantId;
        comment['size'] = item.size;
        comment['uploadedImages'] = [];
        comment['fits'] = [
            {label: "Small", value: '3'},
            {label: "True to size", value: '2'},
            {label: "Large", value: '1'}
        ],
        comment['files'] = [];
        comment['newfiles'] = [];
        comment['images'] = [];
        newComments.push(comment);
    });

    

    // let newCommentList = [];
    // orderItem.forEach(item => {
    //     console.log("item",item);
    //     commentsVaraintId.forEach(item2 => {
    //         console.log("item2",item2);
    //         if(item.variantId !== item2){
    //             console.log("111");
    //             let comment = {};
    //             comment['content'] = "";
    //             comment['score'] = 5;
    //             comment['images'] = [];
    //             comment['sizingRecommendation'] = "";
    //             comment['productId'] = item.productId;
    //             comment['productImageUrl'] = item.productImageUrl;
    //             comment['productName'] = item.productName;;
    //             comment['color'] = item.color;;
    //             comment['varaintId'] = item.variantId;
    //             comment['size'] = item.size;
    //             comment['uploadedImages'] = [];
    //             comment['fits'] = [
    //                 {label: "Small", value: '3'},
    //                 {label: "True to size", value: '2'},
    //                 {label: "Large", value: '1'}
    //             ],
    //             comment['files'] = [];
    //             comment['newfiles'] = [];
    //             comment['images'] = [];
    //             newCommentList.push(comment);
    //         }
    //     });
    // });

    // commentsVaraintId.forEach(item2 => {
    //     orderItem.forEach();
    // });

    // console.log("newCommentList",newCommentList);
    // let product = _.uniqBy(newCommentList,'varaintId');
    // console.log("product",product)


    // console.log("orderItem",orderItem);
    // for(let j=0, len= orderItem.length; j< len; j++){
    //     comments[j]['productImageUrl'] = orderItem[j].productImageUrl;
    //     comments[j]['productName'] = orderItem[j].productName;;
    //     comments[j]['color'] = orderItem[j].color;;
    //     comments[j]['size'] = orderItem[j].size;
    //     comments[j]['variantId'] = orderItem[j].variantId;
    //     comments[j]['uploadedImages'] = [];
    //     if(!comments[j]['images']){
    //         comments[j]['images'] = [];
    //     }
    //     comments[j]['fits'] = [
    //         {label: "Small", value: '3'},
    //         {label: "True to size", value: '2'},
    //         {label: "Large", value: '1'}
    //     ],
    //     comments[j]['files'] = [];
    //     comments[j]['newfiles'] = [];
    //     newComments.push(comments[j]);
    // }




    return newComments;
}   




