<template id="home-canceled">
    <div>

        <order-list :orders="canceled" :loading="canceledLoading" @listing="loadCanceled(20)" :currentListing="currentListing"/>
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
    // import OrderList from '../components/order-list.vue';
    import ConfirmedOrderList from '../components/confirmed/confirmed-order-list.vue'


    export default {
        name: 'home-canceled',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'canceled',
                'canceledLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadCanceled'
            ])
        },
        components: {
            'order-list': ConfirmedOrderList
        },
        created(){
            this.loadCanceled(20);
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