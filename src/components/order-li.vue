<template id="order-li">
    <li class="st-order">
        <div class="hd">
            <div class="el-order-line">
                <span>{{$t("label.orderNo")}}:</span><span>{{order.id}}</span>
                <span class="_status fl-r">{{status}}</span>
            </div>
            <div class="el-order-line" v-if="showDetail">
                <span class="label">{{$t("label.paymentDate")}}</span>
                <span>{{payDate}}</span>
            </div>
        </div>
        
        <div class="order-li-container">
            <div class="bd">
                <a @click="toOrderClickDetail(order.id)" style="cursor: pointer;">
                    <div class="l-order-li-container">
                        <div v-swiper:myOrderLiSwiper="swiperOrderLiOptions" class="_swiper-container swiper-container">
                            <div class="swiper-wrapper">
                                <product-item :key="item.productId+order.id" :status="order.status" :orderId="order.id" v-for="item in order.orderItems" :item="item"/>
                            </div>
                        </div>
                        <div class="_viewmore" v-show="order.orderItems.length > 4 && viewMoreShow">
                            <img :alt="order.orderItems[order.orderItems.length -1].productImageUrl.productName" :src="order.orderItems[order.orderItems.length -1].productImageUrl" />
                            <span>+{{order.orderItems.length - 4}}</span>
                            <div class="view-mask"></div>
                        </div>
                    </div>
                    
                </a>
            </div>

            <div class="pd global-border-top-1">
                <span>{{ordercount}} item(s):</span><span>Total: <span class="b-total">{{orderTotal}}</span></span>
            </div>
            <div class="fd" v-if="showFooter">
                <!-- 状态:status  Processing:2  Shipped:3 -->
                <router-link v-if="order.status===2||order.status===3" style="margin-right:10px;" class="btn" :to="{ name: 'tracking', params: { orderId: order.id }}">
                    {{$t("label.track")}}
                </router-link>

                <!-- 状态  Shipped -->
                <a @click="confirmHandle(order.id)" v-if="order.status===3" style="margin-right:10px;" class="btn black">Order Confirm</a>

                <!-- 未付款订单  Unpaid  status:0 -->
                <a :href="getPayUrl(order)" v-if="getPayUrl(order) && order.status === 0" class="btn black paycount" target="_blank">
                    {{getBtnText(order)}}
                    <!-- 未付款订单  Unpaid  status:0 -->
                    <div v-if="getPayUrl(order) && order.status === 0" class="order-unpid">
                        <div class="timeLeft" v-if="orderoffset >= 1000 && getBtnText(order)==='Imprimir boleto' && order.status == 0 && getPayUrl(order)">
                            <count-down :timeLeft="orderoffset">
                                <span class="label" slot="font">Presente de cupão expirs</span>
                            </count-down>
                        </div>
                        <div class="timeLeft" v-if="orderoffset >= 1000 && (getBtnText(order)==='Generar Ticket' || getBtnText(order)==='Gerar Ticket') && order.status === 0 && getPayUrl(order)">
                            <count-down :timeLeft="orderoffset">
                                <span class="label" slot="font">Tiempo restante para realizar el pago</span>
                            </count-down>
                        </div>
                    </div>
                </a>
                <!--未付款订单-->

                <!-- <a v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0" class="cancel-btn">Cancel</a> -->

                <a v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0" class="btn black" :href="checkoutUrl(order.id)">
                    {{$t("label.paynow")}}
                    <!--未付款订单-->
                    <div class="order-unpid" v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0">
                        <div class="timeLeft">
                            <count-down :timeLeft="orderoffset">
                                <span class="label" slot="font">{{$t("label.remaining")}}:</span>
                            </count-down>
                        </div>
                    </div>
                </a>
                <!--根据订单号重新加入购物车-->
                <a @click="addProducts(order.orderItems)" v-if="order.status === 4 && order.orderItems" class="btn black" style="margin-right: 10px;">{{$t("label.repurchase")}}</a>
            </div>
        </div>

        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>
    </li>
</template>

<style scoped lang="scss">
    .el-order-line{
        font-size: 14px;
        font-family: SlatePro;
        color: #222222;
        text-decoration: none;
        padding: 0px 15px;

        ._status{
            font-family: SlatePro-Medium;
            font-size: 12px;
            vertical-align: middle;
        }
    }
    a{
        text-decoration: none;
    }
    .addProductsMask{
        position: fixed;
        top: calc(50% - 20px);
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        color:#fff;
        width: 210px;
        height: 40px;
        line-height: 40px;
        left: calc(50% - 110px);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .st-order{
        padding: 0px;
        border-bottom: 0px;
        border-top: 8px solid #f6f6f6;

        & .hd {
            border-bottom: none;
            line-height: 40px;
            border-bottom: 1px solid #e6e6e6;

            .label {
                font-family: SlatePro;
                color: #999999;
                margin-right: 5px;
            }
            & > div {
                .statusColor{
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin: 0px 4px 0 0;
                }
            }
        }

        .order-li-container{
            padding: 0px 15px;

            & .bd {
                padding: 0;
                border-bottom: none;
                margin-top: 10px;

                .l-order-li-container{
                    width:100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    ._swiper-container{
                        width:80%;
                        margin-left:0; 

                        @media screen and (min-width: 300px) and (max-width: 321px){
                            .swiper-slide{
                                width: 50.5px;
                                margin-right: 10px;
                            }
                        }

                        @media screen and (min-width: 325px) and (max-width: 376px){
                            .swiper-slide{
                                width: 61.5px;
                                margin-right: 10px;
                            }
                        }

                        @media screen and (min-width: 380px) and (max-width: 415px){
                            .swiper-slide{
                                width: 69.25px;
                                margin-right: 10px;
                            }
                        }
                        
                    }

                    ._viewmore{
                        width:calc(20% - 10px);
                        position: relative;

                        & > span{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            color: #fff;
                            z-index: 1;
                        }

                        @media screen and (min-width: 300px) and (max-width: 321px){
                            & > img{
                                width:100%;
                                height:71px;
                                display:block;
                            }
                        }

                        @media screen and (min-width: 325px) and (max-width: 376px){
                            & > img{
                                width:100%;
                                height:81px;
                                display:block;
                            }
                        }

                        @media screen and (min-width: 380px) and (max-width: 415px){
                            & > img{
                                width:100%;
                                height:101px;
                                display:block;
                            }
                        }

                        .view-mask{
                            position: absolute;
                            top: 0px;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, .3);
                            pointer-events: none;
                        }
                    }
                }
            }

            .pd{
                // display: flex;
                // justify-content: space-between;

                & > span:first-child{
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #999999;
                }

                & > span:last-child{
                    font-family: SlatePro-Medium;
                    font-size: 14px;
                    color: #222222;
                }
            }

            // .l-time-out{
            //     margin-top: 10px;
            //     .order-unpid{
            //         .timeLeft{
            //             color: #f9a646;
            //         }
            //     }
            // }

            .btn{
                // width: 120px;
                padding: 0px 15px;
                height: 36px;
                line-height: 36px;
                border-radius: 2px;
            }

            .timeLeft{
                position: absolute;
                line-height: normal;
                // height: 36px;
                width: 155px;
                line-height: 18px;
                top: -1px;
                /* left: -100%; */
                right: 118%;
                background-color: #f46e6d;
                color: #fff;
                border: none;
            }

            .cancel-btn{
                display: inline-block;
                // width: 120px;
                padding: 0px 15px;
                height: 32px;
                line-height: 32px;
                border-radius: 2px;
                border: solid 1px #222222;
                background-color: #ffffff;
                font-family: SlatePro;
                font-size: 14px;
                color: #222222;
                margin-right: 10px;
                text-align: center;
            }
        }
    }
</style>

<script type="text/ecmascript-6">

    import ProductItem from './product-item.vue';
    import * as constant from '../utils/constant'
    import * as utils from '../utils/geekoutil'
    import CountDown2 from './countdow2.vue';
    import api from '../api/order'


    export default {
        name: 'order-li',
        data(){
            return {
                paying: false,
                isAddProducts:false,
                isAddProductstTip:'',
                viewMoreShow:true,
                swiperOrderLiOptions:{
                    slidesPerView: 4,
                    spaceBetween: 10,
                    on:{
                        transitionEnd:(swiper) => {
                            if(swiper.isEnd){
                                this.viewMoreShow = false;
                            }else{
                                this.viewMoreShow = true;
                            }
                        }
                    }
                }
            }
        },
        props: {
            order: {
                type: Object,
                required: true
            },
            showFooter: {
                type: Boolean,
                default: true
            },
            showDetail: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            apacPayBB(evt){
                evt.preventDefault();
                this.paying = true;
                api.getOrderApacPay(this.order.id).then((result) => {
                    const {isFree, transactionId} = result
                    if (isFree) {
                        window.location.href = `${window.ctx || ''}/v9/order/confirm/free?transationId=${transactionId}`
                    } else {
                      utils.submit(result)
                    }
                   
                }).catch((result) => {
                    alert(result);
                    this.paying = false;
                })
            },
            checkoutUrl(id){
                if(id){
                    return this.$GLOBAL.getUrl('/checkout/' +id);
                }
            },
            addProducts(orderItems){
                let formData = [];
                if(orderItems){
                    orderItems.forEach(product => {
                        formData.push({"variantId":product.variantId,"quantity":'1'})
                    })
                    this.$store.dispatch('addProducts',formData).then(()=>{
                        this.isAddProductstTip = 'Add Success';
                        this.isAddProducts = true;
                        setTimeout(() => {
                            this.isAddProducts = false;
                        }, 2000);
                        if(window.name === 'chicme' || window.name === 'boutiquefeel' || window.name === 'ivrose'){
                            window.countShoppingCart();
                        }else{
                            window.ninimour.shoppingcartutil.notify(true);
                        }
                    }).catch((e) => {
                        this.isAddProductstTip = 'Add Failed';
                        this.isAddProducts = true;
                        alert(e);
                        setTimeout(() => {
                            this.isAddProducts = false;
                        }, 2000);
                    })
                }
            },
            confirmHandle(orderId) {
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"Confirm",
                            no:"Cancel"
                        },
                        message: "The item (s) is still in transit, are you sure you want to click confirm to receive it?",
                        yes: function () {

                            api.confirmOrder(orderId, function(){
                                _this.$store.dispatch('updateStatusInOrders', {
                                    id: orderId,
                                    status: constant.DISPLAY_STATUS_REVIEW
                                });
                            })

                            _this.$store.dispatch('closeConfirm');
                        },
                        no: function () {
                            _this.$store.dispatch('closeConfirm');
                        }
                    }
                });
            },
            getPayUrl(item){
                switch(item.payMethod){
                    case '20':
                    case '21':
                        return item.mercadopagoPayURL
                    case '16':
                    case '23':
                    case '25':
                    case '29':
                    case '27':
                    case '28':
                    case '30':
                    case '31':
                    case '34':
                    case '35':
                    case '37':
                    case '38':
                    case '40':
                    case '41':
                    case '43':
                    case '44':
                        return item.boletoPayCodeURL
                        return null
                }
            },
            getBtnText(item){
                switch(item.payMethod){
                    case '20':
                    case '21':
                    case '27':
                    case '28':
                    case '30':
                    case '31':
                    case '34':
                    case '35':
                    case '37':
                    case '38':
                    case '40':
                    case '41':
                    case '43':
                    case '44':
                        return 'Generar Ticket'
                    case '29':
                        return 'Gerar Ticket'
                    case '16':
                    case '23':
                    case '25':
                        return 'Imprimir boleto'
                    default:
                        return null
                }
            },
            toOrderClickDetail(orderId){
                this.$router.push({ name: 'detail', params: { orderId: orderId }});
            }
        },
        computed:{
            status(){
                // if(this.order.statusView === "Unpaid"){
                //     return "Waiting for Payment";
                // }
                return this.order.statusView;
            },
            country(){
                var order = this.order;
                console.log(order)
                return order.orderItems[0].shippedCountryCode ? order.orderItems[0].shippedCountryCode : 'Overseas Warehouse'
            },
            payDate(){
                var order = this.order;
                if(order && order.paymentTime){
                    return utils.enTime(new Date(order.paymentTime))
                }else{
                    return '-'
                }

            },
            orderoffset(){
              var orderVO = this.order;
              if(orderVO && orderVO.expiredPaymentTime){
                  return  orderVO.expiredPaymentTime - orderVO.serverTime;
              }
            },
            orderTotal() {
                return utils.price(this.order.orderTotal);
            },
            ordercount(){
                let order = this.order;
                let count = 0
                if(order.orderItems){
                    _.each(order.orderItems, (orderitem) => {
                        count += orderitem.quantity
                    })
                }
                return count
            },
            getProductIdsComment(){
                return this.order.orderItems && this.order.orderItems.reduce((preValue,item) => {
                    if(this.order.orderItems.length < 2){
                        return preValue  + item.productId;
                    }
                    
                    if(this.order.orderItems[this.order.orderItems.length - 1].productId === item.productId){
                        return preValue  + item.productId;
                    }
                    return preValue  + item.productId + ",";
                },"")
            }
        },
        components: {
          'product-item': ProductItem,
          'count-down': CountDown2
        }
    }
</script>
