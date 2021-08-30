<template id="home-shipped">
    <div>
        <order-list :orders="shipped" :loading="shippedLoading" @listing="loadShipped(20)" :currentListing="currentListing"/>

        <empty-order v-if="!shippedLoading && (shipped && shipped.length <= 0)"></empty-order>
    </div>
</template>

<style scoped type="text/scss" lang="scss">
    #processing-tip{
        line-height: 18px;
        padding: 10px;
        border-top: 1px solid #efefef;

        a{
            color: #909393;
        }
    }
</style>

<script type="text/ecmascript-6">

    import {mapGetters,mapActions} from 'vuex';
    import OrderList from '../components/order-list.vue';
    import EmptyOrder from "../components/empty-order.vue"


    export default {
        name: 'home-shipped',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'shipped',
                'shippedLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadShipped'
            ])
        },
        components: {
            'order-list': OrderList,
            "empty-order":EmptyOrder
        },
        created(){
            this.loadShipped(20);
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                vm.currentListing = true
            })
        },
        beforeRouteLeave(to, from, next){
            this.currentListing = false
            next()
        }
    }
</script>