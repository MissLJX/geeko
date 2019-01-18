<template id="product-item">
    <li class="st-product-item">
        <div class="st-table content">
            <div class="st-cell">
                <link-image :href="productUrl" :src="item.imageURL" :title="item.name"/>
            </div>
            <div class="st-cell dsc">
                <div>
                    <p class="item-name">{{item.name}}</p>
                </div>
                <div style="margin: 10px 0px;" v-if="item.sku">
                    <span>SKU: {{item.sku}}</span>
                </div>
                <div>
                    <span>{{sizeColor(item)}}  x{{item.qty}}</span>
                </div>

            </div>
            <div class="st-cell">
                <div class="st-p-price">{{price(item.price)}}</div>
                <div v-if="orderId && status === 5">
                    <router-link class="btn reviewbtn"
                                 :to="{ name: 'review', params: { productId: item.productId , orderId: orderId}}">
                        Review
                    </router-link>
                </div>
                <div class="repurchase" v-if="orderId && status === 4">
                    <a @click="addProducts(item.variantId)">{{$t("label.repurchase")}}</a>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>
    </li>
</template>

<style scoped lang="scss">
    .repurchase{
        a{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .st-p-price{
        color: #222222;
        line-height: 22px;
        font-size: 15px;
        margin-bottom: 24px;
    }
    .reviewbtn{
        width: 80px;
        line-height: 16px;
    }
    .st-product-item{
        float: none;
        padding: 0 10px 10px 0;
    }
    .st-product-item .content{
        width: 100%;
        table-layout:fixed;
    }
    .st-product-item .content > div {
        vertical-align: top;

        &:first-child {
          width: 85px;
          img {
            display: block;
            width: 100%;
          }

          border-bottom: none;
        }
        &:last-child {
          width: 80px;
          text-align: right;
            padding-top: 10px;
        }
    }
    .dsc{
        text-decoration: none;
        color: #222;
        padding-top: 10px;
        text-transform: capitalize;
        .item-name{
            color: #999;
            /*max-height: 64px;*/
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
</style>
<script type="text/ecmascript-6">
    import * as utils from '../utils/geekoutil';
    import LinkImage from './link-image.vue';
    import _ from 'lodash'

    const _url_analyst = function (name) {
        if (name) {
            return name.replace(new RegExp(/\s/g), '-');
        }
        return 'empty-name';
    }
    export default{
        data(){
            return {
                isAddProducts:false,
                isAddProductstTip:''
            }
        },
        props: [
            'item',
            'orderId',
            'status'
        ],
        components: {
            'link-image': LinkImage
        },
        methods: {
            price: (money) => (utils.price(money)),
            sizeColor: function (item) {

                if (item.size && item.color)
                    return item.color + ' ; ' + item.size;
                if (item.size)
                    return item.size;
                if (item.color)
                    return item.color;
                return '';
            },
            addProducts(variantId){
                let products = [];
                if(variantId){
                    products.push({"variantId":variantId,"quantity":'1'})
                    this.$store.dispatch('addProducts',products).then(()=>{
                        this.isAddProductstTip = 'Add Success'
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
                            this.isAddProductstTip = 'Add Failed'
                            this.isAddProducts = true;
                            alert(e);
                            setTimeout(() => {
                                this.isAddProducts = false;
                            }, 2000);
                        })
                }
            }
        },
        computed:{
            productUrl(){
                return window.ctx + '/w-product/anon/detail?productId=' + this.item.productId
            },
        }
    }
</script>