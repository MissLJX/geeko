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
        url:'http://localhost:8080/joyshoetique/v8/msite/order/0/10/get-order-list',
        headers:{
            accessToken: 'b026e19c-1f72-4884-a6fe-7dc943d1d3f0'
        },
        method:'GET',
        success: function(data){
            cb(data);
        },
        error:eb
    });



}