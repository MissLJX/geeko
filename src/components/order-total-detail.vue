<template>
    <div class="order-total-detail global-border-top-1">
        <!-- <div class="_title">
            Order Total
        </div> -->

        <div class="spend_price st-table">
            <div class="st-row">
                <div class="st-cell st-v-m special-color">Item total:</div>
                <div class="st-cell st-v-m t-right">{{paymentItemTotal}}</div>
            </div>
            <div class="st-row" v-if="!!shippingPrice && shippingPrice != null">
                <div class="st-cell st-v-m special-color">{{$t('label.shippingPrice')}}:</div>
                <div class="st-cell st-v-m t-right">{{shippingPrice}}</div>
            </div>
            <div class="st-row" v-if="!!shippingInsurancePrice && shippingInsurancePrice != null">
                <div class="st-cell st-v-m special-color">{{$t('label.shippingInsurance')}}:</div>
                <div class="st-cell st-v-m t-right">{{shippingInsurancePrice}}</div>
            </div>
            <div class="st-row special_row">
                <div class="st-cell st-v-m special-color">Total</div>
                <div class="st-cell st-v-m t-right">{{orderTotal}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as utils from '../utils/geekoutil.js';

    export default {
        name:"order-total-detail",
        props:{
            paymentItemTotal:{
                type:String,
                default:""
            },
            orderTotal:{
                type:String,
                default:""
            },
            shippingPrice:{
                type:String,
                default:""
            },
            shippingInsurancePrice:{
                type:String,
                default:""
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-total-detail{
        margin-top: 10px;
        padding: 0px 10px 12px 10px;
        ._title{
            height: 45px;
            line-height: 45px;
	        font-family: SlatePro-Medium;
            color: #222222;
            border-bottom: 1px solid #eeeeee;;
        }

        .spend_price{
            width: 100%;
            padding-right: 10px;
            padding-top: 5px;

            .st-row{
                height: 25px;
                line-height: 25px;
            }

            .t-right{
                text-align: right;
                font-family: SlatePro-Medium;
	            font-size: 14px;
            }

            .special-color{
                color: #666666;
                font-family: SlatePro;
	            font-size: 14px;
            }

            .special_row{
                & > div:first-child{
                    font-family: SlatePro-Medium;
                    font-size: 14px;
                    color: #222222;
                }

                & > div:last-child{
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #222222;
                }
            }
        }
    }
</style>