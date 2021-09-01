<template>
    <div class="st-address global-border-top-8">
        <div class="shipping-address address-item">
            <p class="_hd">
                Shipping Address
            </p>

            <div class="address-container">
                <div class="_left">
                    <span class="iconfont">&#xe691;</span>
                </div>
                <div>
                    <p class="_font1">{{address.name}} ({{address.phoneNumber}})</p>
                    <p class="_font2">{{addressLabel}},</p>
                    <p class="_font2">{{address.zipCode}}, {{address.city}},{{stateCountry}}</p>
                </div>
            </div>

            <span class="iconfont editicon" v-if="orderStatus === 0">&#xe778;</span>
        </div>

        <div class="biling-address address-item global-border-top-1">
            <p class="_hd">
                Billing Address
            </p>

            <div class="address-container">
                <div class="_left">
                    <span class="iconfont">&#xe691;</span>
                </div>
                <div>
                    <p class="_font1">{{address.name}} ({{address.phoneNumber}})</p>
                    <p class="_font2">{{addressLabel}},</p>
                    <p class="_font2">{{address.zipCode}}, {{address.city}},{{stateCountry}}</p>
                </div>
            </div>

            <span class="iconfont editicon" v-if="orderStatus === 0">&#xe778;</span>
        </div>

        <div class="payment-method global-border-top-1" v-if="payMethodName != null && showdetail">
            <div class="__title">
                Payment Method
            </div>
            <div class="__content">
                <img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/20210518/paypal.png" alt="PayPal" v-if="payMethodName === 'Paypal'">
                <span>{{payMethodName}}</span>
            </div>
        </div>

        <div class="_shipping-method global-border-top-8 st-table st-fullwidth" v-if="shipping">
            <p class="c-nine st-cell">Shpping Method</p>
            <p class="f-medium st-cell st-t-r">{{shipping}}</p>
        </div>

        <div class="_shipping-method global-border-top-1 st-table st-fullwidth" v-if="shipping">
            <p class="c-nine st-cell">Delivery Time</p>
            <p class="f-medium st-cell st-t-r">About 2021/0826 - 2121/0828</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:"ShippingDetail",
        props: [
            'address','shipping',"payMethodName","orderStatus","showdetail"
        ],
        computed: {
            state(){
                if (this.address.state) {
                    if (this.address.state.label) {
                        return this.address.state.label
                    } else {
                        return this.address.state.value
                    }
                }
                return null;
            },

            country(){
                if (this.address.country) {
                    if (this.address.country.label) {
                        return this.address.country.label
                    } else {
                        return this.address.country.value
                    }
                }
                return null;
            },

            stateCountry(){
                if (this.state) {
                    return this.state + ',' + this.country;
                }
                return this.country;

            },

            addressLabel(){
                if(this.address.unit){
                    return this.address.streetAddress1 + ', ' + this.address.unit
                }
                return this.address.streetAddress1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .st-address{
        .address-item{
            position: relative;
            margin-bottom: 5px;
            padding: 0px 10px;
            ._hd{
                font-size: 14px;
                color: #222222;
                font-family: 'SlatePro-Medium';
                height: 40px;
                line-height: 40px;
            }

            .address-container{
                display: flex;

                ._left{
                    width: 25px;

                    .iconfont{
                        font-size: 17px;
                    }
                }

                p{
                    line-height: 20px;
                }

                ._font1{
                    font-size: 14px;
                    color: #222222;
                    font-family: 'SlatePro-Medium';
                }

                ._font2{
                    font-size: 14px;
                    color: #666666;
                }
            }

            .editicon{
                position: absolute;
                right: 12px;
                font-size: 20px;
                top: 10px;
            }
        }

        .payment-method{
            padding: 10px;

            .__title{
                font-size: 14px;
                color: #222222;
                font-family: 'SlatePro-Medium';
            }

            .__content{
                margin-top: 5px;
                display: flex;
                align-items: center;

                span{
                    font-size: 14px;
                    color: #666666;
                }

                img{
                    width: 24px;
                    height: 16px;
                    margin-right: 5px;
                }
            }
        }

        ._shipping-method{
            padding: 10px;
            .c-nine{
                font-size: 14px;
                font-family: 'SlatePro-Medium';
                color: #222222;
            }

            .f-medium{
                font-size: 14px;
                color: #666666;
            }
        }
    }
</style>