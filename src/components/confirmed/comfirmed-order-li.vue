<template id="order-li">
    <li class="l-new-order">
        <div class="hd">
            <div class="__container"  v-if="order.status === 4">
                <div class="el-order-line">
                    <span class="order-no">Order No</span>
                    <span class="order-id">{{order.id}}</span>
                    <!-- <span class="order-status">Refunded</span> -->
                </div>
            </div>
        </div>

        <div class="bd">
            <a @click="toOrderDetail(order.id)" style="cursor: pointer;">
                <confirmed-order-li-item :key="item.productId" v-for="item in order.orderItems" :item="item"></confirmed-order-li-item>
            </a>
        </div>

        <div class="pd">
        </div>
        <div class="fd">
            <a :class="[orderItemCount > 1 ? 'b-btn' : 'w-btn']" @click="toReviewPage(order.id)" v-if="order.status === 5">
                {{orderItemCount > 1 ? 'To Review' : 'Reviewed'}}
            </a>
            <div v-if="index === 0 && order.status === 5" class="_message">Review to get 100 Ponits (100 Ponits=$1USD) </div>

            <!--根据订单号重新加入购物车-->
            <a @click="addProducts(order.orderItems)" v-if="order.status === 4 && order.orderItems" class="btn black">{{$t("label.repurchase")}}</a>
        </div>

        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>
    </li>
</template>



<script type="text/ecmascript-6">
    import ConfirmedOrderLiItem from './confirmed-order-li-item.vue'


    export default {
        name: 'confirmed-order-li',
        data(){
            return {
                isAddProductstTip:'',
                isAddProducts:false
            }
        },
        props: {
            order: {
                type: Object,
                default:{},
                required: true
            },
            index:{
                type:Number,
                default:0
            }
        },
        components: {
          ConfirmedOrderLiItem
        },
        computed:{
            orderItemCount(){
                return this.order.orderItems.length;
            }
        },
        methods:{
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
            toOrderDetail(orderId){
                this.$router.push({ name: 'detail', params: { orderId: orderId }});
            },
            toReviewPage(orderId){
                this.$router.push({ name: 'review', params: {orderId: orderId}});
            }
        }
    }
</script>

<style scoped lang="scss">
    .st-order-list{
        &  .l-new-order:first-child{
            border-top: none;
        }

        .l-new-order{
            padding: 0px 8px;
            border-top: 8px solid #f7f7f7;

            .hd{
                .__container{
                    padding: 10px 0px 0px 0;
                    .el-order-line {
                        font-size: 12px;
                        font-family: SlatePro;
                        color: #222222;
                        text-decoration: none;
                        height: 27px;
                        line-height: 27px;

                        .order-no{
                            font-family: SlatePro;
                            font-size: 14px;
                            color: #999999;
                        }

                        .order-id{
                            font-family: SlatePro-Medium;
                            font-size: 14px;
                            color: #222222;
                            margin-left: 5px;
                        }

                        .order-status{
                            font-family: SlatePro;
                            font-size: 14px;
                            color: #222222;
                            float: right;
                        }

                        &::after{
                            content: '';
                            clear: both;
                            display: block;
                        }
                    }
                }
            }

            .fd{
                text-align: right;
                
                .b-btn{
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    background-color: #222222;
                    border-radius: 2px;
                    font-family: SlatePro;
                    font-size: 15px;
                    color: #ffffff;
                    display: inline-block;
                    text-align: center;
                }

                .w-btn{
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 2px;
                    font-family: SlatePro;
                    font-size: 15px;
                    color: #222222;
                    border: solid 1px #222222;
                    display: inline-block;
                    text-align: center;
                }

                a{
                    text-decoration: none;
                    margin-bottom: 13px;
                    cursor: pointer;
                }

                ._message{
                    font-family: SlatePro;
                    font-size: 12px;
                    line-height: 18px;
                    color: #e64545;
                    margin-bottom: 10px;
                }

                .btn{
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    background-color: #222222;
                    border-radius: 2px;
                    font-family: SlatePro;
                    font-size: 15px;
                    color: #ffffff;
                }
            }

            .bd{
                padding-top: 10px;
                a{
                    text-decoration: none;
                }
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
        }
    }
</style>
