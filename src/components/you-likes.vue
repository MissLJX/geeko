<template>
    <div class="el-you-likes global-border-top-8">
        <div class="hd">
            OFTEN BOUGHT WITH
        </div>
        <div class="bd">
            <product-list :products="products" :loading="loading" :finished="finished" @listing="listingHandle"/>
        </div>

        <div v-if="finished" style="text-align:center;">
            no more data.
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-you-likes{
        padding-bottom: 10px;
        .hd{
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #e6e6e6;
        }
        .bd{
            padding-top: 10px;
        }
    }
</style>

<script type="text/ecmascript-6">
    import ProductList from './product-list.vue'
    import store from '../store'
    import api from '../api/order'
    export default{
        data(){
            return{
                loading:false,
                finished: false,
                empty: false
            }
        },
        props:['orderId'],
        computed: {
            products(){
                return store.getters.youlikeProducts
            },
            skip(){
                return store.getters.youlikeskip
            }
        },
        methods: {
            listingHandle(){
            //     this.loading = true
            //     store.dispatch("getYouLikeProducts",{orderId:this.orderId,skip: this.skip}).then(({empty, finished}) => {
            //         if(finished) this.finished = finished
            //         if(empty) this.empty = empty
            //         this.loading = false
            //         store.dispatch("getYouLikeSkip")
            //     })
            }
        },
        components: {
            'product-list': ProductList
        },
        created(){
            if(this.products && this.products.length > 0){
                return;
            }

            this.loading = true;

            store.dispatch("getYouLikeProducts",{orderId:this.orderId,skip: 0}).then((products) => {
                // store.dispatch("getYouLikeSkip")
                if(products && products.length <= 0){
                    this.finished = true;
                }
                this.loading = false;
            })
        },
    }
</script>



