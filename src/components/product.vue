<template>
    <div class="el-list-product">
        <a :href="productUrl">
            <figure>
                <div class="img">
                    <img :src="imageUrl" :class="{'gray':isSoldOut}"/>
                </div>

                <figcaption>
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="el-product-price">{{price}}</span>
                            <del class="el-product-del">{{delPrice}}</del>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </a>
    </div>
</template>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot');
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .el-list-product {

        .el-product-name{
            font-size: 12px;
        }

        a{
            text-decoration: none;
            color: #222928;
        }
        .img{
            position: relative;
            &::after{
                content: '';
                display: block;
                margin-top: 133%;
            }
            overflow: hidden;
        }

        img {
            display: block;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
        }

        .el-product-price {
            font-size: 16px;
            font-weight: bold;
        }

        .el-product-del {
            color: #666;
            font-size: 12px;
            margin-left: 4px;
        }

        .el-product-like {
            font-size: 20px;
            &.red {
                color: #f00;
            }
            cursor: pointer;
        }

        figcaption {
            & > * {
                margin-top: 5px;
            }
            height: 20px;
        }
    }
    .gray{
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
    }
</style>

<script type="text/ecmascript-6">
    import {imageutil, unitprice , producturl} from '../utils/geekoutil'

    export default{
        props: {
            product: Object,
            required: true,
        },
        computed: {
            imageUrl(){
                return imageutil.getMedium(this.product.pcMainImage)
            },
            price(){
                if (this.product.promotion && this.product.promotion.enabled) {
                    return unitprice(this.product.promotion.promotionPrice)
                }
                return unitprice(this.product.price)
            },
            delPrice(){
                if (this.product.msrp && this.product.msrp.amount > 0)
                    return unitprice(this.product.msrp)
                if (this.product.promotion && this.product.promotion.enabled)
                    return unitprice(this.product.price)
                return ''
            },
            productUrl(){
                return window.ctx + "/product/"+this.product.name+"/"+this.product.parentSku+"/"+this.product.id+".html"
            },
            isSoldOut(){
                if(this.product.status === 2){
                    return true
                }else{
                    return false
                }
            }
        },
        methods: {
        }
    }
</script>