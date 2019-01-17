<template id="product-item">
    <li class="st-product-item">
        <div class="content">
            <div class="">
                <link-image href="#" :src="item.productImageUrl" :title="item.productName"/>
            </div>
        </div>
    </li>
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