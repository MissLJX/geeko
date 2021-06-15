<template>
    <div class="st-table st-v-t order-li-item">
        <div class="st-cell bd-image">
            <img :src="item.productImageUrl" :alt="item.productName">
        </div>
        <div class="st-cell st-v-t bd-name">
            <div class="_name">{{item.productName}}</div>
            <div class="_size">
                <span>{{sizeColorItem}}</span>
                <span class="_f_rright" v-if="item.quantity > 1">x{{item.quantity}}</span>
            </div>
        </div>
        <div class="st-cell bd-price st-v-t">
            {{orderTotal}}
        </div>
    </div>
</template>

<script>
    import * as utils from '../../utils/geekoutil'

    export default {
        name:"confirmed-order-li-item",
        props:{
            item:{
                type:Object,
                default:{},
                required: true
            }
        },
        computed:{
            orderTotal:function(){
                return utils.price(this.item.price);
            },
            sizeColorItem:function(){
                return this.item.color ? this.item.color + " / " + this.item.size : this.item.size;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-li-item{
        width: 100%;
        margin-bottom: 10px;
        .bd-image{
            width: 80px;
            height: 100px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 2px;
            }
        }

        .bd-price{
            width: 80px;
            font-family: SlatePro-Medium;
            font-size: 15px;
            color: #222222;
            text-align: right;
        }

        .bd-name{
            padding: 0px 10px;
            font-family: SlatePro;
            font-size: 13px;

            ._name{
                color: #999999;
                visibility: visible;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 2;
            }

            ._size{
                color: #222222;
                margin-top: 15px;

                & > span:first-child{
                    text-transform: capitalize;
                }

                ._f_rright{
                    float: right;
                }
            }
        }
    }
</style>