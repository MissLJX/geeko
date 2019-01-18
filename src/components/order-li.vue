<template id="order-li">
    <li class="st-order">

            <div class="hd">
                <div class="el-order-line">
                    <span class="label">{{$t("label.orderNo")}}</span>
                    <span>{{order.id}}</span>
                    <span class="fl-r">{{status}}</span>
                    <span class="statusColor fl-r" :style="{backgroundColor : status_color}"></span>
                </div>
                <div class="el-order-line" v-if="showDetail">
                    <span class="label">{{$t("label.paymentDate")}}</span>
                    <span>{{payDate}}</span>
                </div>
            </div>

            <div class="bd">
                <router-link :to="{ name: 'detail', params: { orderId: order.id }}">
                    <ul class="st-order-items">
                        <product-item key="item.id" :status="order.status" :orderId="order.id" v-for="item in order.orderItems" :item="item"/>
                    </ul>
                </router-link>
            </div>

            <div class="pd">
                <span style="margin-right: 8px">{{ordercount}} items</span>
                <span>Total: <span class="b-total">{{orderTotal}}</span></span>
            </div>
        <div class="fd" v-if="showFooter">
            <router-link v-if="order.status===2||order.status===3" style="margin-right: 10px;" class="btn" :to="{ name: 'tracking', params: { orderId: order.id }}">
                {{$t("label.track")}}
            </router-link>
            <a @click="confirmHandle(order.id)" v-if="order.status===3" class="btn black" style="margin-right: 10px;">Order Confirm</a>

            <a v-if="order.boletoPayCodeURL && order.status === 0" class="btn black paycount" style="margin-right: 10px;" :href="order.boletoPayCodeURL" target="_blank">
                Imprimir boleto
                <div class="timeLeft" v-if="orderoffset >= 1000 && order.boletoPayCodeURL && order.status == 0">
                    <div class="triangle"></div>
                    <span class="label">Presente de cupão expirs</span>
                    <count-down :timeLeft="orderoffset"></count-down>
                </div>
            </a>

            <a v-if="order.mercadopagoPayURL && order.status === 0" class="btn black" style="margin-right: 10px;" :href="order.mercadopagoPayURL" target="_blank">
                Generar Ticket
                <div class="timeLeft" v-if="orderoffset >= 1000 && order.mercadopagoPayURL && order.status === 0">
                    <div class="triangle"></div>
                    <span class="label">Tiempo restante para realizar el pago</span>
                    <count-down :timeLeft="orderoffset"></count-down>
                </div>
            </a>
            <!--未付款订单-->
            <a v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0" class="btn black" style="margin-right: 10px;"  :href="checkoutUrl(order.id)">
                {{$t("label.paynow")}}
                <div class="timeLeft">
                    <div class="triangle"></div>
                    <span class="label">{{$t("label.remaining")}}:</span>
                    <count-down :timeLeft="orderoffset"></count-down>
                </div>
            </a>
            <!--根据订单号重新加入购物车-->
            <a @click="addProducts(order.orderItems)" v-if="order.status === 4 && order.orderItems" class="btn black" style="margin-right: 10px;">{{$t("label.repurchase")}}</a>
        </div>

        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>
    </li>
</template>

<style scoped lang="scss">
   .el-order-line{
       font-size: 13px;
       color: #222;
       text-decoration: none;
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
</style>

<script type="text/ecmascript-6">

    import ProductItem from './product-item.vue';
    import * as constant from '../utils/constant'
    import * as utils from '../utils/geekoutil'
    import CountDown from './countdow.vue';
    import api from '../api/order'


    export default {
        name: 'order-li',
        data(){
            return {
                paying: false,
                isAddProducts:false,
                isAddProductstTip:''
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
                        window.location.href = `${window.ctx || ''}/v8/order/confirm/free?transationId=${transactionId}`
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
                    return window.ctx + '/checkout/' +id
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
                        if(window.name === 'joyshoetique'){
                            window.ninimour.shoppingcartutil.notify(true);
                        }else{
                            window.countShoppingCart();
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
                        title: _this.$t('message.confirmReceipt'),
                        message: _this.$t('message.confirmReceiptTip'),
                        yes: function () {
                            _this.$store.dispatch('confirmOrder',orderId)
                                .then(() => {
                                    _this.$store.dispatch('updateStatusInOrders', {
                                        id: _this.order.id,
                                        status: constant.STATUS_CONFIRMED
                                    });
                                });
                            _this.$store.dispatch('closeConfirm');
                        },
                        no: function () {
                            _this.$store.dispatch('closeConfirm');
                        }
                    }
                });
            },
        },
        computed:{
            status(){
                return this.order.statusView
            },
            status_color(){
                return constant.STATUS_COLOR(this.order.status)
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

        },
        components: {
          'product-item': ProductItem,
          'count-down': CountDown
        }
    }
</script>
