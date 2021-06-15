<template id="product-item">
    <!-- <li class="st-product-item ">
        <div class="content">
            <div class="">
                <link-image href="#" :src="item.productImageUrl" :title="item.productName"/>
            </div>
        </div>
    </li> -->
    <div class="swiper-slide st-product-item">
        <div class="content">
            <div class="">
                <link-image href="#" :src="item.productImageUrl" :title="item.productName"/>
            </div>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
    import * as utils from '../utils/geekoutil';
    import LinkImage from './link-image.vue';

    export default{
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
                    return item.size + ',' + item.color;
                if (item.size)
                    return item.size;
                if (item.color)
                    return item.color;
                return '';
            }

        }
    }
</script>

<style lang="scss" scoped>
    /deep/{
        .st-product-item {
            height: 100%;
            .content {
                & > div {
                    a{
                        @media screen and (min-width: 300px) and (max-width: 321px){
                            height: 71px;
                        }

                        @media screen and (min-width: 325px) and (max-width: 376px){
                            height: 81px;
                        }

                        @media screen and (min-width: 380px) and (max-width: 415px){
                            height: 101px;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 2px;
                        }
                    }
                    
                }
            }
        }
    }
</style>