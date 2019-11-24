/**
 * Created by shao_ on 2017/6/23.
 */
import $ from 'jquery';

export const getAll = (cb, eb) => {
    //axios.get('/v7/msite/order/0/10/get-order-list').then((response) => {
    //    cb(response);
    //}).catch((error) => {
    //    eb(error);
    //});

    $.ajax({
        url:'http://localhost:8080/joyshoetique/v9/msite/order/0/10/get-order-list',
        headers:{
            accessToken: '2a4dd936-d42c-b1eb-17ba-4e6982c38661'
        },
        method:'GET',
        success: function(data){
            cb(data);
        },
        error:eb
    });



}