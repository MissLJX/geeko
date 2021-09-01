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
            <div class="s-pd-right" v-if="order.status === 2">
                <div class="process-module">
                    <div class="st-table">
                        <div class="st-cell st-v-m __icon">
                            <span class="iconfont">&#xe6a6;</span>
                        </div>
                        <div class="st-cell st-v-m __font">Your package is being packed</div>
                    </div>

                    <div class="_item">
                        It normally takes 3-7 business days for us to process your order. <a href="/fs/shipping-policy">Learn More</a>
                    </div>
                </div>
            </div>

            <div class="s-pd-right" v-if="order.status === 5">
                <div class="process-module">
                    <div class="st-table">
                        <div class="st-cell st-v-m __icon">
                            <span class="iconfont">&#xe6a5;</span>
                        </div>
                        <div class="st-cell st-v-m __font">Your package has been signed for.</div>
                    </div>

                    <div class="_item">
                        If you have any questions, please contact customer service.
                    </div>
                </div>
            </div>

            <div class="return-record" v-if="false">
                <p class="title">Return Record</p>
                <div class="container">
                    <div class="return-item">
                        <p class="hd">Return Requested</p>
                        <p class="bd">Please fill out and upload the return receipt</p>
                    </div>

                    <div class="return-item">
                        <p class="hd">Refund Requested</p>
                        <p class="bd">The refund will be made to your original payment after verifying the return receipt within 24h.</p>
                    </div>

                    <div class="return-item active">
                        <p class="hd">Refunded</p>
                    </div>
                </div>
            </div>

            <div class="st-order-bgline">
                <div class="orderheader">
                    <div class="st-table st-fullwidth" style="border-bottom:1px solid #e6e6e6;">
                        <div class="st-cell st-v-m special-color">{{$t('label.orderNo')}}.</div>
                        <div class="st-cell st-v-m t-right">
                            <span>{{order.id}}</span>
                            <span 
                                class="iconfont"
                                v-clipboard:copy="order.id"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            >&#xe776;</span>
                        </div>
                    </div>
                    <!-- <div class="st-row" v-if="showdetail"> -->
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m special-color">Payment Date:</div>
                        <div class="st-cell st-v-m t-right">{{disposeTime}}</div>
                    </div>

                    <div class="st-table st-fullwidth" v-if="!logisticsPackageShow && changePackage.slug != null && (order.status === 3 || order.status === 5)">
                        <div class="st-cell st-v-m special-color">Logistics Company</div>
                        <div class="st-cell st-v-m t-right">{{changePackage.slug}}</div>
                    </div>

                    <div class="st-table st-fullwidth"  v-if="!logisticsPackageShow && changePackage.trackingNumber != null && (order.status === 3 || order.status === 5)">
                        <div class="st-cell st-v-m special-color">Tracking Number</div>
                        <div class="st-cell st-v-m t-right">{{changePackage.trackingNumber}}</div>
                    </div>
                </div>
            </div>


            <shipping-detail 
                :address="order.shippingDetail" 
                :shipping="order.shippingMethodName"
                :pay-method-name="order.payMethodName"
                :order-status="order.status"
                :showdetail="showdetail"
                v-if="order.status === 0"
            />

            <div class="package-con global-border-top-8">
                <div>
                    <order-detail-li 
                        :orderId="order.id" 
                        :packages="logisticsPackages" 
                        :packageLen="Object.keys(logisticsPackages).length" 
                        :orderStatus="order.status" 
                        :logistics-package-show="logisticsPackageShow"
                        :statusView="order.statusView"
                    />
                </div>
            </div>

            <order-total-detail 
                :payment-item-total="paymentItemTotal"
                :order-total="orderTotal"
                :shipping-price="shippingPrice"
                :shipping-insurance-price="shippingInsurancePrice"
            >
            </order-total-detail>


            <div class="fd">
                <span v-if="order.isCanCanceled" class="btn cancel" @click="dialogBoxCancleOrderISSHow = true;">{{$t('label.cancelOrder')}}</span>
                <!-- <router-link v-if="order.trackingId" class="btn" :to="{ name: 'tracking', params: { orderId: order.id }}">
                    {{$t('label.track')}}
                </router-link> -->
                <span v-if="order.hasReturnLabel" class="btn">
                    <a :href="getReturnLabel()">{{$t('label.returnlabel')}}</a>
                </span>

                <!-- <span v-if="order.status === 3" class="btn" @click="confirmHandle">Order Confirm</span> -->

                <router-link 
                    :to="{name : 'returnLogistics' , params: {orderId:order.id}}" 
                    class="btn b-black" 
                    v-if="order.status === 3 && order.hasReturnLabel"
                >
                    Return Logistics
                </router-link>

                <div class="tipmsg" v-if="order && order.unPayMessage">
                    <p>{{order.unPayMessage}}</p>
                </div>
            </div>

            <shipping-detail 
                :address="order.shippingDetail" 
                :shipping="order.shippingMethodName"
                :pay-method-name="order.payMethodName"
                :order-status="order.status"
                :showdetail="showdetail"
                v-if="order.status !== 0"
            />


            <div class="fd_fixed" ref="footerFixed" :class="{'no-border-top' : strutBottomPaddingNumber === 'p-b-0'}">
                <!-- unpaid status:0  Shipped status:3   Confirm status:5  :class="l-container-padding-0"-->
                <div 
                    class="l-container" 
                    v-if="order.status === 0 || order.status === 3 || order.status === 5 || order.status === 4"
                    :style="strutBottomPaddingNumber === 'p-b-0' ? '' :'padding: 14px 12px;'"
                >
                    <a @click="toReviews(order.id)" class="btn" v-if="order.status === 5">
                        To Review
                    </a>
                    
                    <a class="paybtn global-overflow" :href="checkoutUrl(order.id)" v-if="getPayUrl && getBtnText && getBtnText2 && order.status === 0 && orderoffset >= 0">{{getBtnText2}}</a>

                    <a :href="getPayUrl" v-if="getPayUrl && order.status === 0" class="btn" style="margin-right:10px;" target="_blank">
                        {{getBtnText}}
                        <!-- 未付款订单  Unpaid  status:0 -->
                        <div v-if="getPayUrl && order.status === 0" class="order-unpid">
                            <!-- 由于页面显示按钮太长其他支付的倒计时隐藏 -->
                            <!-- <div class="timeLeft" v-if="orderoffset >= 1000 && getBtnText==='Imprimir boleto' && order.status == 0 && getPayUrl">
                                <count-down :timeLeft="orderoffset">
                                    <span class="iconfont icon" slot="icon">&#xe6c3;</span>
                                    <span class="label" slot="font">Presente de cupão expirs</span>
                                </count-down>
                            </div>
                            <div class="timeLeft" v-if="orderoffset >= 1000 && (getBtnText==='Generar Ticket' || getBtnText==='Gerar Ticket') && order.status == 0 && getPayUrl">
                                <count-down :timeLeft="orderoffset">
                                    <span class="iconfont icon" slot="icon">&#xe6c3;</span>
                                    <span class="label" slot="font">Tiempo restante para realizar el pago</span>
                                </count-down>
                            </div> -->
                        </div>
                    </a>

                    <!--未付款订单-->
                    <a v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0" class="btn black" :href="checkoutUrl(order.id)">
                        {{$t("label.paynow")}}
                        <!--未付款订单-->
                        <div class="order-unpid" v-if="!order.mercadopagoPayURL && !order.boletoPayCodeURL && order.status === 0 && orderoffset >= 0">
                            <div class="timeLeft"  v-if="orderoffset >= 1000 && order.status === 0">
                                <count-down :timeLeft="orderoffset" @getCountDown="getCountDown">
                                    <!-- <span class="iconfont icon" slot="icon">&#xe6c3;</span> -->
                                    <span class="label" slot="font">{{$t("label.remaining")}}:</span>
                                </count-down>
                            </div>
                        </div>
                    </a>

                    <!-- <a class="cancel-btn" v-if="order.isCanCanceled" @click="dialogBoxCancleOrderISSHow = true;">Cancel Order</a> -->

                    <a class="btn" v-if="order.status === 3" @click="confirmHandle" :class="{'w-100' : logisticsPackageShow}">Confirm</a>

                    <router-link 
                        v-if="order.status === 3 && !logisticsPackageShow && changePackage.trackingId" 
                        class="cancel-btn"
                        :to="{ name: 'tracking', params: { orderId: order.id }}">
                        Logistics Status
                    </router-link>

                    <!--根据订单号重新加入购物车-->
                    <a @click="addProducts()" v-if="order.status === 4 || order.status === 5 && order.orderItems" class="btn black">{{$t("label.repurchase")}}</a>
                </div>
            </div>

        </div>
        <!-- <div @click="aaaa">aaaa</div> -->
        <you-likes class="el-me-like-area"  :orderId="order.id"/>

        <!-- 为了让当底部有按钮时会遮挡一些内容 -->
        <div class="strut-bottom-padding" :class="strutBottomPaddingNumber"></div>

        <div v-if="getBtnText==='Imprimir boleto' && order.status == 0 && orderoffset >= 1000 && couponshow && getPayUrl">
            <div class="mask"></div>
            <div class="coupon-window">
                <span class="coupon-close" @click="() => {this.couponshow = false}">X</span>
                <div>
                    <div class="white top-line">
                        <h2>Atenção</h2>
                        <img src="https://image.geeko.ltd/upgrade/20180529/001.png">
                    </div>
                    <div class="middle-line">
                        <img src="https://image.geeko.ltd/upgrade/20180529/002.png">
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
                        <img src="https://image.geeko.ltd/upgrade/20180529/001.png">
                    </div>
                    <div class="middle-line">
                        <img src="https://image.geeko.ltd/upgrade/20180529/002.png">
                    </div>
                    <div class="white bottom-line">
                        <p>Después de realizar el pago, recibirás un cupón de regalo con un <span class="fc-r">15%</span> de descuento para tu siguiente compra.</p>
                        <a  class="blackbtn" :href="getPayUrl">Pague ahora</a>
                    </div>
                </div>
            </div>
        </div>

        <transition name="cancel">
            <div class="cancel-window" v-if="isCancelOrder">
                <div>
                    <div class="flex-con">
                        <p class="_font">Select a reason</p>
                        <p class="iconfont" style="cursor:pointer;" @click="isCancelOrder=false">&#xe69a;</p>
                    </div>
                    <ul class="reason-select" v-if="cancelReasons">
                        <li v-for="(reason,index) in cancelReasons" @click="selectedResaon=reason.value" :key="reason+index">
                            <label :for="reason.value">{{reason.label}}</label>
                            <input type="radio" :class="reason.value===selectedResaon ? 'active' : ''">
                        </li>
                    </ul>
                    <div class="cancel-btn" :class="{'active':selectedResaon!==''}" @click="cancelHandle">Submit</div>
                </div>
            </div>
        </transition>

        <div class="mask" v-if="isCancelOrder"></div>

        
        
        <dialog-box 
            :count-down-time="countDownTime"
             v-if="dialogBoxCancleOrderISSHow"
             :isCancelOrder.sync="isCancelOrder"
             :dialogBoxCancleOrderISSHow.sync="dialogBoxCancleOrderISSHow"
        ></dialog-box>
    </div>
</template>


<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_vnxx9qw9ud.woff2?t=1620286802692') format('woff2'),
            url('//at.alicdn.com/t/font_384296_vnxx9qw9ud.woff?t=1620286802692') format('woff'),
            url('//at.alicdn.com/t/font_384296_vnxx9qw9ud.ttf?t=1620286802692') format('truetype');
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

    .st-order-body{
        border-top: 8px solid #f6f6f6;
        .st-order-bgline{
            .orderheader{
                width: 100%;

                .st-table{
                    padding:10px;
                }

                .t-right{
                    text-align: right;
                }

                .st-v-m{
	                font-size: 14px;
                    color: #222222;

                    .iconfont{
                        cursor: pointer;
                    }
                }

                .special-color{
                    font-family: SlatePro;
                    color: #666666;
                    font-size: 14px;
                }
            }
        }


        .st-order-title{
            font-family: SlatePro-Medium;
            font-size: 16px;
            color: #222222;
            height: 44px;
            line-height: 44px;

            border-bottom: 1px solid #eeeeee;;
        }

        .package-con{
            // border-bottom: 8px solid #f6f6f6;
            // padding: 0px 10px;
        }

        .s-pd-right{
            // padding-right: 10px;
            .process-module{
                background-color: #f7f7f7;
                padding: 10px;

                .iconfont{
                    font-size: 18px;
                    color: #222222;
                }

                .__font{
                    font-family: SlatePro-Medium;
	                font-size: 14px;
                    color: #222222;
                    margin-left: 5px;
                }

                .__icon{
                    width: 25px;
                }

                ._item{
                    font-family: SlatePro;
                    font-size: 14px;
                    line-height: 20px;
                    color: #666666;

                    & > a{
                        color: #666666;
                        display: inline;
                    }
                }
            }
        }

        .return-record{
            padding: 0px 10px;

            .title{
                font-size: 14px;
                color: #222222;
                font-family: 'SlatePro-Medium';
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .container{
                padding-left: 10px;
                .return-item{
                    position: relative;
                    display: inline-block;
                    padding-left: 10px;
                    padding-bottom: 10px;
                    border-left: 1px solid #f2f2f2;

                    .hd{
                        font-size: 12px;
                        color: #666666;
                        font-family: 'SlatePro-Medium';
                    }

                    .bd{
                        font-size: 12px;
                        color: #666666;
                        margin-top: 2px;
                    }

                    &::after{
                        content: "";
                        position: absolute;
                        width: 7px;
                        height: 7px;
                        background-color: #f2f2f2;
                        border-radius: 50%;
                        display: inline-block;
                        top: 2px;
                        left: -4px;
                    }

                    &.active{
                        &::after{
                            background-color: #222222;
                        }

                        .hd{
                            color: #222222;
                            font-family: 'AcuminPro-Bold';
                        }
                    }
                }
            }
        }

        .payment-method{
            border-bottom: 8px solid #f7f7f7;
            .__title{
                height: 45px;
                line-height: 45px;
                font-family: SlatePro-Medium;
                color: #222222;
                border-bottom: 1px solid #eeeeee;
            }

            .__content{
                font-family: SlatePro-Medium;
                font-size: 14px;
                color: #222222;
                height: 45px;
                line-height: 45px;

                & > img{
                    height: 20px;
                    width: 30px;
                    vertical-align: middle;
                    margin-right: 5px;
                }

                & > span{
                    vertical-align: middle;
                }
            }
        }
    }
    
    .rednum{
        color: #e64545;
        text-decoration: underline;
    }
    .el-me-like-area {
        background-color: #fff;
    }
    .fd_fixed{
        width: 100%;
        text-align: right;
        position: fixed;
        bottom: 51px;
        left: 0;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
        z-index: 20;
        // box-shadow: 0px 2px 20px 0px 
		//     rgba(153, 153, 153, 0.5);

        // padding: 5px 10px;
        .paybtn{
            width: 165px;
            padding: 0px 10px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            background-color: #222222;
            border-radius: 1px;
            text-align: center;
            display: inline-block;
            text-decoration: none;
            font-family: SlatePro-Medium;
	        font-size: 15px;
        }
        .btn{
            // width: 120px;
            padding: 0px 15px;
            line-height: 36px;
            background-color: #222;
            color: #fff;
            border-radius: 1px;
            position: relative;
            display: inline-block;
            margin-right: 10px;

            a{
                display: block;
                width: 100%;
            }

            .timeLeft{
                position: absolute;
                line-height: normal;
                // height: 32px;
                width: 155px;
                line-height: 18px;
                top: -1px;
                /* left: -100%; */
                right: 118%;
                background-color: #f46e6d;
                color: #fff;
                border: none;
            }
        }

        .l-container{
            // text-align: center;
            // display: flex;
            // justify-content: space-between;
            // width: 100%;
            margin-right: -10px;

            .l-btn{
                height: 36px;
                line-height: 36px;
                background-color: #121314;
                border-radius: 2px;
                color: #ffffff;
                font-family: SlatePro-Medium;
	            font-size: 16px;
                width: 100%;
            }

            a{
                text-decoration: none;
                height: 36px;
                line-height: 36px;
                float: right;
            }

            .cancel-btn{
                border-radius: 2px;
                border: solid 1px #222222;
                background-color: #ffffff;
                margin-right: 20px;
                text-align: center;
                font-family: SlatePro-Medium;
                font-size: 15px;
                color: #121314;
            }

            &::after{
                display: block;
                content: '';
                clear: both;
            }

            .w-100{
                width: 100%;
            }
        }
    }

    .no-border-top{
        border-top: none;
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
    
    .st-order-body > .fd{
        border-top: none;
        margin-top: 0;
        // margin-bottom: 13px;
        .tipmsg{
            width: 100%;
            background-color: #fff9e8;
            border: 1px solid #f4c954;
            font-size: 13px;
            color: #666;
            text-align: left;
            padding: 10px;
        }

        .b-black{
            background-color: #222222;
            color: #ffffff;
        }

        .w-white{
            background-color: #ffffff;
            color: #222222;
        }

        .cancel{
            color: #666666;
        }
    }
    .st-order-body > .fd .btn{
        margin-top: 0;
        margin-bottom: 13px;
        a{
            display: block;
            width: 100%;
            text-decoration: none;
            color: #222;
        }
    }
    .st-order{
        border: none;
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
            background: url(https://image.geeko.ltd/site/ninimour/msite/me/icon01.png) center/100% no-repeat;
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
        bottom: 51px;
        padding: 0 12px 15px 10px;
        box-shadow: 0px -1px 8px 0px 
		rgba(0, 0, 0, 0.2);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .flex-con{
            line-height: 40px;
            position: relative;
            // border-bottom: 1px solid #f9f9f9;
            text-align: center;
            margin-top: 10px;

            ._font{
                font-family: 'AcuminPro-Bold';
                font-size: 16px;
                color: #222222;
            }

            .iconfont{
                color: rgb(153, 153, 153);
                cursor: pointer;
                position: absolute;
                right: 0;
                top: 0;
                color: #222222;
                font-size: 18px;
            }
        }

        .reason-select{
            margin-bottom: 30px;
            li{
                display: flex;
                justify-content: space-between;
                line-height: 35px;
                cursor: pointer;
                input{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    // background-color: #222;
                    -webkit-appearance: none;
                    border-radius: 50%;
                    border: 1px solid #222222;
                    color: #fff;
                    text-align: center;
                    line-height: 18px;
                    margin-top: 15px;

                    &.active{
                        &:after{
                            content: '\E638';
                            font-family: iconfont;
                            background: #222222;
                            font-size: 12px;
                            border-radius: 50%;
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            position: relative;
                            top: -2px;
                            left: -1px;
                        }
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

    .strut-bottom-padding.p-b-69{
        height: 69px;
        line-height: 69px;;
    }

    .strut-bottom-padding.p-b-99{
        height: 99px;
        line-height: 99px;;
    }

    // .uper-enter-active, .uper-leave-to{
    //     top:0 !important;
    // }

    .cancel-enter-active , .cancel-leave-active{
        transition: bottom .5s !important;
    }

    .cancel-leave-active , .cancel-enter{
        bottom:0 !important;
    }
</style>

<script type="text/ecmascript-6">

    import { mapGetters, mapActions } from 'vuex';
    import ShippingDetail from '../components/shipping-detail.vue';
    import OrderDetailLi2 from '../components/order-detail-li2.vue';
    import * as utils from '../utils/geekoutil';
    import store from '../store';
    import * as types from '../store/mutation-types';
    import * as constant from '../utils/constant';
    import PageHeader from '../components/page-header.vue'
    import CountDown2 from '../components/countdow2.vue';
    import YouLikes from '../components/you-likes.vue';
    
    import OrderTotalDetail from '../components/order-total-detail.vue'

    import DialogBox from "../components/dialog-box.vue"

    import _ from 'lodash'
    import fecha from "fecha"

    export default {
        name: 'order-detail2',
        data: function(){
            return {
                couponshow: true,
                changePackage:{},
                isCancelOrder:false,
                selectedResaon:'',
                strutBottomPaddingNumber:"",
                countDownTime:"",
                dialogBoxCancleOrderISSHow:false,
            }
        },
        components: {
            'shipping-detail': ShippingDetail,
            'order-detail-li': OrderDetailLi2,
            'page-header': PageHeader,
            'count-down': CountDown2,
            'you-likes': YouLikes,
            'order-total-detail':OrderTotalDetail,
            "dialog-box":DialogBox,
        },
        beforeRouteEnter(to, from, next) {
        store.dispatch('clearTicket');
        store.dispatch('paging', true);
        store.dispatch('loadOrder', { id: to.params.orderId })
            .then((order) => {
            next((vm) => {
                if(!order){
                    vm.$router.replace({path:vm.$GLOBAL.getUrl('/me/m/order/all')});
                    return false;
                }
                vm.$store.dispatch('detailTicket', vm.$route.params.orderId);
            });
            store.dispatch('paging', false);
            });

        store.dispatch('getCancelReasons')
        },
        created:function(){
            this.changePackage = _.cloneDeep(this.order.logistics.packages[0])
        },
        mounted(){
            if(window.GeekoSensors){
                window.GeekoSensors.Track('EventEnter', {
                    page: 'order',
                    orderId:this.order.id
                })
            }
            this.strutBottomPaddingNumber = this.strutBottomPadding();
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
                return utils.price(this.order.paymentItemTotal);
            },
            orderTotal() {
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
            disposeTime(){
                return fecha.format(this.order.orderTime,"DD/MM/YYYY HH:mm:ss");
                // return utils.dateFormat();
            },
            logisticsPackageShow(){
                return !!(this.order && this.order.logistics && this.order.logistics.packages && this.order.logistics.packages.length > 1);
            },
            logisticsPackages(){
                let sortValue = this.order.logistics.packages.sort(
                    (a,b) => {
                        return a.status - b.status;
                    }
                );
                let value = _.groupBy(sortValue,logistics => logistics.statusView);
                return value;
            }
        },
        methods: {
            cancelHandle() {
                let _this = this;
                if(this.selectedResaon){
                    _this.$store.dispatch('cancelOrder', {orderId:_this.order.id,cancelReason:this.selectedResaon}).then(() => {
                        _this.$store.dispatch('loadOrder', { id: this.$route.params.orderId });
                        this.isCancelOrder=false;

                        _this.$store.dispatch('confirmShow', {
                            show: true,
                            cfg: {
                                btnFont:{
                                    yes:"Add To Bag",
                                    no:"Continue Shopping"
                                },
                                message: "Submitted successfully! Would you like to add the product to your shopping bag again?",
                                yes: function () {
                                    _this.addProducts();
                                    _this.$store.dispatch('closeConfirm');
                                    _this.$router.replace({name:"success-reminder",params:{orderId:_this.order.id,type:"1"}});
                                },
                                no: function () {
                                    _this.$store.dispatch('closeConfirm');
                                    window.location.href = _this.$GLOBAL.getUrl("/");
                                }
                            }
                        });
                    }).catch((e) => {
                        alert(e);
                        this.isCancelOrder=false
                    })
                }
            },
            getReturnLabel(){
                let _this = this;
                window.recordReturnLabel ? window.recordReturnLabel(_this.order.id) : "";
                return constant.PROJECT + "/v9/order/report-return-label?orderId="+_this.order.id ;
            },
            confirmHandle(evt) {
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"Confirm",
                            no:"Cancel"
                        },
                        message: _this.$t('message.confirmReceiptTip'),
                        yes: function () {
                            _this.$store.dispatch('confirmOrder', _this.order.id)
                            .then(() => {
                                _this.$store.dispatch('updateStatusInOrders', {
                                    id: _this.order.id,
                                    status: constant.DISPLAY_STATUS_REVIEW
                                });
                            });
                            _this.$store.dispatch('closeConfirm');
                            _this.$router.replace({name:"success-reminder",params:{orderId:_this.order.id,type:"2"}});
                        },
                        no: function () {
                            _this.$store.dispatch('closeConfirm');
                        }
                    }
                });
            },
            checkoutUrl(id){
                if(id){
                    return constant.PROJECT + '/checkout/' +id
                }
            },
            strutBottomPadding(){
                // 1 29 69 99
                let height = this.$refs.footerFixed ? this.$refs.footerFixed.offsetHeight : 0;
                // 只有按钮没有时间时：69
                if(height > 30 && height < 70){
                    return 'p-b-69';
                // 有按钮也有时间时：99
                }else if(height > 70 && height < 100){
                    return 'p-b-99';
                }else{
                    return 'p-b-0';
                }
            },
            toReviews(orderId){
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ELClick', {
                        clicks: 'Order Review',
                        orderId:orderId
                    })
                }

                this.$router.push({ name: 'review', params: { orderId: orderId}});
            },
            onCopy: function (e) {
                // alert('You just copied: ' + e.text)
            },
            onError: function (e) {
                // alert('Failed to copy texts')
            },
            getCountDown(time){
                this.countDownTime = time;
            },
            addProducts(){
                let orderItems = this.order.orderItems;
                let formData = [];
                if(orderItems){
                    orderItems.forEach(product => {
                        formData.push({"variantId":product.variantId,"quantity":'1'})
                    })
                    this.$store.dispatch('addProducts',formData).then(()=>{
                        this.$message({
                            content:"Add Success",
                            type:"customization",
                            timer:2000
                        }).show();

                        if(window.name === 'chicme' || window.name === 'boutiquefeel' || window.name === 'ivrose'){
                            window.countShoppingCart ? window.countShoppingCart() : "";
                        }else{
                            window.ninimour.shoppingcartutil.notify ? window.ninimour.shoppingcartutil.notify(true) : "";
                        }
                    }).catch((e) => {
                        alert(e);
                        this.$message({
                            content:"Add Failed",
                            type:"err",
                            timer:2000
                        }).show();
                    })
                }
            },
            // aaaa(){
            //     this.$router.replace({name:"home-all"});
            // }
        },
        watcher: {
            $route() {
                console.log("天啊")
                this.$store.dispatch('loadOrder', { id: this.$route.params.orderId });
            }
        }


    };
</script>
