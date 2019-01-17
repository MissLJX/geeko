<template id="scroll-list">
    <div class="st-scroll-list">
        <ul>
            <slot name="li" :item="item" v-for="item in listData">这是空内容</slot>
        </ul>
        <div v-show="loading">loading...</div>
    </div>
</template>

<script>

    import * as URLUtil from '../utils/URLUtil';

    import api_order from '../api/order';

    export default{
        name: 'scroll-list',
        props: {
            url: {
                type: String,
                required: true
            },
            limit: {
                type: Number,
                default: 20
            },
            skip: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                listData: [],
                listCount: 0,
                loading:false
            };
        },
        methods: {
            bindScroll(event){

                let [scrollTop , documentHeight , windowHeight] = [
                    document.documentElement.scrollTop || document.body.scrollTop,
                    document.body.clientHeight,
                    window.screen.height
                ];


                if (scrollTop + windowHeight >= documentHeight - 100) {
                    if(!this.loading){
                        this.load();
                    }
                }

            },
            load(){
                var __this = this;

                __this.loading = true;
                setTimeout(function () {
                    api_order.getOrders(function (orders) {
                        __this.listData = __this.listData.concat(orders);
                    });
                    __this.next();
                    __this.loading = false;
                }, 2000);



            },
            next(){
                this.listCount += this.limit;
            }
        },
        created(){
            this.load();
        },
        computed: {
            _skip(){
                return this.skip + this.listCount;
            }
        },
        mounted(){
            document.addEventListener('scroll', this.bindScroll)
        },
        destroyed(){
            document.removeEventListener('scroll', this.bindScroll)
        }
    }
</script>