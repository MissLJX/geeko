<template id="home-all">
    <div>
        <order-list :orders="all" :loading="allLoading" @listing="loadAll(20)" :currentListing="currentListing"/>

        <empty-order v-if="!allLoading && (all && all.length <= 0)"></empty-order>
    </div>
</template>

<script type="text/ecmascript-6">

    import {mapGetters,mapActions} from 'vuex';
    import OrderList from '../components/order-list.vue';
    import EmptyOrder from "../components/empty-order.vue"


    export default {
        name: 'home-all',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'all',
                'allLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadAll'
            ])
        },
        components: {
            'order-list': OrderList,
            "empty-order":EmptyOrder
        },
        created(){
            this.loadAll(20);
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