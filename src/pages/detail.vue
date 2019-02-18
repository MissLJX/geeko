<template id="order-detail">
    <div>
        <page-header>
            <span>Order Details</span>
            <span slot="oplabel">
                <router-link :to="{ name: 'contact', params: { orderId: $route.params.orderId }}">
                    <i class="iconfont contactseller">&#xe716;</i>
                </router-link>
            </span>
        </page-header>
        <div v-if="order" class="st-order-body">
            <div class="st-order-bgline">
                <div class="orderheader">
                    <p><span>{{$t('label.orderNo')}}:</span> {{order.id}}</p>
                    <p class="bold">Total: {{orderTotal}}</p>
                    <p><span class="shipping grey">(ItemTotal {{paymentItemTotal}}<span v-if="(paymentItemTotal && shippingPrice) || (paymentItemTotal && shippingInsurancePrice)"> / </span><span v-if="shippingPrice">{{$t('label.shippingPrice')}} {{shippingPrice}}</span> <span v-if="shippingInsurancePrice && shippingPrice">/</span> <span v-if="shippingInsurancePrice">{{$t('label.shippingInsurance')}} {{shippingInsurancePrice}}</span>)</span></p>
                </div>
            </div>

            <shipping-detail :address="order.shippingDetail"/>
            <div class="paydetail" v-if="showdetail">
                <p v-if="order.paymentTime">
                    <span>{{$t("label.paymentTime")}}</span>
                    <span class="detail-info">{{payDate}}</span>
                </p>
                <p v-if="order.paymentMethod">
                    <span>{{$t("label.paymentMethod")}}</span>
                    <span class="detail-info">{{payMethod}}</span>
                </p>
            </div>
            <div class="package-con">
                <ul v-if="order && order.logistics && order.logistics.packages && order.logistics.packages.length > 1" class="packageTab">
                    <li class="tab" @click="changeTab(key)" :class="{'active': key===isActive}" v-for="(package,key) in order.logistics.packages" :key="key">
                        {{package.name}}
                    </li>
                </ul>
                <div>
                    <order-detail-li :orderId="order.id" :package="changePackage" :packageLen="order.logistics.packages.length" :orderStatusView="order.statusView" :orderStatus="order.status" />
                </div>

            </div>

            <div class="fd">
                <span v-if="order.isCanCanceled" class="btn" @click="isCancelOrder=true">{{$t('label.cancelOrder')}}</span>
                <router-link v-if="order.trackingId" class="btn" :to="{ name: 'tracking', params: { orderId: order.id }}">
                    {{$t('label.track')}}
                </router-link>

                <span v-if="order.status === 3" class="btn" @click="confirmHandle">Order Confirm</span>
                <div class="tipmsg" v-if="order && order.unPayMessage">
                    <p>{{order.unPayMessage}}</p>
                </div>
            </div>
            <div class="fd_fixed">
                <a class="paybtn" :href="checkoutUrl(order.id)" v-if="getPayUrl && getBtnText && getBtnText2 && order.status === 0 && orderoffset >= 0">{{getBtnText2}}</a>
                <a :href="getPayUrl" v-if="getPayUrl && order.status === 0" class="btn" target="_blank">
                    {{getBtnText}}
                    <div class="timeLeft" v-if="orderoffset >= 1000 && getBtnText==='Imprimir boleto' && order.status == 0 && getPayUrl">
                        <div class="triangle"></div>
                        <span class="label">Presente de cupão expirs</span>
                        <count-down :timeLeft="orderoffset"></count-down>
                    </div>
                    <div class="timeLeft" v-if="orderoffset >= 1000 && (getBtnText==='Generar Ticket' || getBtnText==='Gerar Ticket') && order.status == 0 && getPayUrl">
                        <div class="triangle"></div>
                        <span class="label">Tiempo restante para realizar el pago</span>
                        <count-down :timeLeft="orderoffset"></count-down>
                    </div>
                </a>
                <!--未付款订单-->
                <a v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0" class="btn black" style="margin-right: 10px;" :href="checkoutUrl(order.id)">
                    {{$t("label.paynow")}}
                    <div class="timeLeft" v-if="orderoffset >= 1000 && order.status === 0">
                        <div class="triangle"></div>
                        <span class="label">{{$t("label.remaining")}}:</span>
                        <count-down :timeLeft="orderoffset"></count-down>
                    </div>
                </a>
            </div>

        </div>

        <div v-else>no data..</div>


        <div v-if="getBtnText==='Imprimir boleto' && order.status == 0 && orderoffset >= 1000 && couponshow && getPayUrl">
            <div class="mask"></div>
            <div class="coupon-window">
                <span class="coupon-close" @click="() => {this.couponshow = false}">X</span>
                <div>
                    <div class="white top-line">
                        <h2>Atenção</h2>
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/001.png">
                    </div>
                    <div class="middle-line">
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/002.png">
                    </div>
                    <div class="white bottom-line">
                        <p>O cupom de <span class="fc-r">15%</span> de desconto será enviado para sua conta após o pagamento. Não perca</p>
                        <a  class="blackbtn" :href="getPayUrl">Pague agora</a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="(getBtnText==='Generar Ticket' || getBtnText==='Gerar Ticket') && order.status == 0 && orderoffset >= 1000 && couponshow && getPayUrl">
            <div class="mask"></div>
            <div class="coupon-window">
                <span class="coupon-close" @click="() => {this.couponshow = false}">X</span>
                <div>
                    <div class="white top-line">
                        <h2>Atención</h2>
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/001.png">
                    </div>
                    <div class="middle-line">
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/002.png">
                    </div>
                    <div class="white bottom-line">
                        <p>Después de realizar el pago, recibirás un cupón de regalo con un <span class="fc-r">15%</span> de descuento para tu siguiente compra.</p>
                        <a  class="blackbtn" :href="getPayUrl">Pague ahora</a>
                    </div>
                </div>
            </div>
        </div>
        <you-likes class="el-me-like-area"  :orderId="order.id"/>

        <div v-if="isCancelOrder">
            <div class="mask"></div>
            <div class="cancel-window">
                <div class="flex-con">
                    <p style="font-weight: bold">Select a reason</p>
                    <p style="color:#999;cursor:pointer;" @click="isCancelOrder=false">Cancel</p>
                </div>
                <ul class="reason-select">
                    <li v-if="cancelReasons" v-for="reason in cancelReasons" @click="selectedResaon=reason.value">
                        <label :for="reason.value">{{reason.value}}.{{reason.label}}</label>
                        <input type="radio" v-if="reason.value===selectedResaon">
                    </li>
                </ul>
                <div class="cancel-btn" :class="{'active':selectedResaon!==''}" @click="cancelHandle">Submit</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot');
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.svg#iconfont') format('svg');
    }
    .packageTab{
        height: 45px;
        line-height: 45px;
        display: flex;
        margin-left: -10px;
        border-bottom: 1px solid #f5f5f5;
        .tab{
            cursor: pointer;
        }
        li{
            margin: 0 10px;
            color: #666;
        }
        .active{
            border-bottom: 2px solid #222;
            color: #222;
        }
    }
    .bold{
        font-weight: bold;
    }
    .statusColor{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 7px 4px 0 0;
    }
    .st-order-price{
        font-size: 14px;
        line-height: 20px;
        padding: 14px 0;
        color: #222;
        .bold{
            font-weight: bold;
        }
        .shipping{
            color: #666;
        }
    }
    .st-order-bgline{
        margin-left: -10px;
        padding-left: 10px;
    }
    .rednum{
        color: #e64545;
        text-decoration: underline;
    }
    .el-me-like-area {
        background-color: #fff;
        margin-top: 15px;
    }
    .fd_fixed{
        width: 100%;
        line-height: 54px;
        text-align: right;
        position: fixed;
        bottom: 0;
        margin-left: -10px;
        border-top: 1px solid #e6e6e6;
        padding-right: 10px;
        background-color: #fff;
        z-index: 20;
        .paybtn{
            width: 200px;
            height: 36px;
            line-height: 36px;
            color: #fff;
            background-color: #222222;
            border-radius: 1px;
            text-align: center;
            display: inline-block;text-decoration: none;
        }
        .btn{
            width: 130px;
            line-height: 36px;
            background-color: #222;
            color: #fff;
            border-radius: 1px;
            position: relative;
            display: inline-block;
            .timeLeft{
                position: absolute;
                width: 192px;
                height: 50px;
                line-height: 25px;
                top: -59px;
                left: -65px;
                background-color: #f46e6d;
                color: #fff;
                .triangle{
                    position: absolute;
                    right: 53px;
                    top: 50px;
                    width:0;
                    height:0;
                    border:6px solid;
                    border-color: #f46e6d transparent transparent transparent;
                }
            }
        }
    }
    .orderstatus{
        line-height: 40px;
        display: inline-block;
    }
    .paydetail{
        padding: 10px;
        margin-left: -10px;
        border-bottom: 8px solid #f6f6f6;
        p{
            color: #666;
            line-height: 23px;

            .detail-info{
                color: #222;
                display: inline-block;
                min-width: 90px;
                padding-left: 10px;
            }
        }
    }
    .st-order-body{
        border-bottom: 8px solid #f6f6f6;
    }
    .st-order-body > .fd{
        border-top: none;
        margin-top: 0;
        margin-bottom: 13px;
        .tipmsg{
            width: 100%;
            background-color: #fff9e8;
            border: 1px solid #f4c954;
            font-size: 13px;
            color: #666;
            text-align: left;
            padding: 10px;
        }
    }
    .st-order-body > .fd .btn{
        margin-top: 0;
    }
    .st-order{
        border: none;
    }
    .orderheader{
        font-size: 14px;
        color: #222;
        padding: 14px 0;
        line-height: 20px;
        border-bottom: 1px solid #e6e6e6;
        .grey{
            color: #999;
        }
    }
    .fc-r{
        color: #e5004f;
    }
    .blackbtn{
        background-color: #000;
        color: #fff;
        width: 200px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin: 15px auto 0 auto;
        display:block;
        cursor: pointer;
        text-decoration: none;
    }

    .mask{
        background: rgba(0,0,0,.4);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        position: fixed;
    }

    .coupon-window{
        width: 80%;
        max-width: 400px;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:9999;

        .white{
            background-color: #fff;
        }

        .top-line{
            padding: 40px 0 0 0;
            text-align: center;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            img{
                width: 80%;
                max-width: 293px;
            }
        }

        .middle-line{
            display: block;
            margin: -2px;
            img{
                display: block;
                width: 100%;
            }
        }

        .bottom-line{
            padding: 5px 20px 40px 20px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .coupon-close{
            position: absolute;
            right: 0;
            text-align:center;
            line-height: 30px;
            font-size: 18px;
            top: -40px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }
    }


    #last-ticket {
        border-top: 1px solid #efefef;
        padding: 10px;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            display: block;
            width: 10px;
            height: 30px;
            background: url(https://dgzfssf1la12s.cloudfront.net/site/ninimour/msite/me/icon01.png) center/100% no-repeat;
            right: 10px;
            top: calc(50% - 15px);
        }
        cursor: pointer;

        .images {
            li {
                display: inline-block;
                width: 50px;
                img {
                    display: block;
                    width: 100%;
                }
            }

        }

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 30px;
        }
    }

    .mask{
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 20;
        position: fixed;
    }
    .cancel-window{
        width: 100%;
        position: fixed;
        z-index: 30;
        background-color: #fff;
        bottom: 0;
        padding: 0 12px 15px 10px;
        .flex-con{
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            border-bottom: 1px solid #f9f9f9
        }
        .reason-select{
            margin-bottom: 30px;
            li{
                display: flex;
                justify-content: space-between;
                line-height: 45px;
                border-bottom: 1px solid #f9f9f9;
                cursor: pointer;
                input{
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    background-color: #222;
                    -webkit-appearance: none;
                    border-radius: 50%;
                    color: #fff;
                    text-align: center;
                    line-height: 18px;
                    margin-top: 15px;
                    &:after{
                        content: '\E638';
                        font-family: iconfont;
                    }
                }
            }
        }
        .cancel-btn{
            width: 100%;
            background-color: #e6e6e6;
            color: #fff;
            line-height: 46px;
            text-align: center;
            text-transform: uppercase;
            cursor: pointer;
        }
        .cancel-btn.active{
            background-color: #222;
            color: #fff;
        }
    }
</style>

<script type="text/ecmascript-6">

  import { mapGetters, mapActions } from 'vuex';
  import ShippingDetail from '../components/shipping-detail.vue';
  import OrderDetailLi from '../components/order-detail-li.vue';
  import * as utils from '../utils/geekoutil';
  import store from '../store';
  import * as types from '../store/mutation-types';
  import * as constant from '../utils/constant';
  import PageHeader from '../components/page-header.vue'
  import CountDown from '../components/countdow.vue';
  import YouLikes from '../components/you-likes.vue';


  export default {
    name: 'order-detail',
    data: function(){
      return {
        couponshow: true,
          isActive:0,
          changePackage:[],
          isCancelOrder:false,
          selectedResaon:''
      }
    },
    components: {
      'shipping-detail': ShippingDetail,
      'order-detail-li': OrderDetailLi,
        'page-header': PageHeader,
        'count-down': CountDown,
        'you-likes': YouLikes,
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('clearTicket');
      store.dispatch('paging', true);
      store.dispatch('loadOrder', { id: to.params.orderId })
        .then(() => {

          next((vm) => {
            vm.$store.dispatch('detailTicket', vm.$route.params.orderId);
          });
          store.dispatch('paging', false);
        });

      store.dispatch('getCancelReasons')
    },


    computed: {
      ...mapGetters([
        'order',
        'latestTicket',
      'cancelReasons'
      ]),
        getPayUrl(){
            switch(this.order.payMethod){
                case '20':
                case '21':
                    return this.order.mercadopagoPayURL
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
                    return this.order.boletoPayCodeURL
                    return null
            }
        },
        getBtnText(){
            switch(this.order.payMethod){
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
        getBtnText2(){
            switch(this.order.payMethod){
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
                    return 'Otro método de pago'
                case '16':
                case '23':
                case '25':
                case '29':
                    return 'Outro método de pagamento'
                default:
                    return null
            }
        },
      paymentItemTotal() {
        return utils.price(this.order. paymentItemTotal);
      },
      orderTotal() {
          this.changePackage = _.cloneDeep(this.order.logistics.packages[0])
          this.isActive = 0
        return utils.price(this.order.orderTotal);
      },
      shippingPrice() {
          if(this.order.shippingPrice && this.order.shippingPrice.amount > 0){
              return utils.price(this.order.shippingPrice);
          }else{
              return ''
          }
      },
      shippingInsurancePrice() {
          if(this.order.shippingInsurancePrice && this.order.shippingInsurancePrice.amount > 0 ){
              return utils.price(this.order.shippingInsurancePrice);
          }else{
              return ''
          }
      },
      orderoffset() {
        var orderVO = this.order;
          if(orderVO && orderVO.expiredPaymentTime){
              return  orderVO.expiredPaymentTime - orderVO.serverTime;
          }else{
              return  orderVO.orderTime + 5*24*60*60*1000 - orderVO.serverTime;
          }
      },
        country(){
            var order = this.order;
            return order.orderItems[0].shippedCountryCode ? order.orderItems[0].shippedCountryCode : 'Overseas Warehouse'
        },
        status(){
            return this.order.statusView
        },
        status_color(){
            return constant.STATUS_COLOR(this.order.status)
        },
        payDate(){
            var order = this.order;
            if(order && order.paymentTime){
                return utils.enTime(new Date(order.paymentTime))
            }else{
                return '-'
            }

        },
        payMethod(){
            if(this.order && this.order.paymentMethod){
                return this.order.paymentMethod
            }
        },
        showdetail(){
            var order = this.order;
            if(order && order.status !== 0){
                return true
            }else{
                return false
            }
        },
    },
    methods: {
      cancelHandle() {
          let _this = this;
          if(this.selectedResaon){
              _this.$store.dispatch('cancelOrder', {orderId:_this.order.id,cancelReason:this.selectedResaon}).then(() => {
                  _this.$store.dispatch('loadOrder', { id: this.$route.params.orderId });
                  this.isCancelOrder=false
              }).catch((e) => {
                  alert(e);
                  this.isCancelOrder=false
              })
          }
      },
      confirmHandle(evt) {
        let _this = this;
        this.$store.dispatch('confirmShow', {
          show: true,
          cfg: {
            title: _this.$t('message.confirmReceipt'),
            message: _this.$t('message.confirmReceiptTip'),
            yes: function () {
              _this.$store.dispatch('confirmOrder', _this.order.id)
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
      lastMessageHandle(evt) {
        /*this.$router.push({
          name: 'contact',
          params: { orderId: this.$route.params.orderId }
        });*/
      },
        changeTab(index){
            this.isActive = index;
            this.changePackage = _.cloneDeep(this.order.logistics.packages[index])
        },
        checkoutUrl(id){
            if(id){
                return window.ctx + '/checkout/' +id
            }
        },
    },
    watcher: {
      $route() {
          this.$store.dispatch('loadOrder', { id: this.$route.params.orderId });
      }
    }


  };
</script>
