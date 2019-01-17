<template id="home-unpaid">
    <div>
        <order-list :orders="paid" :loading="paidLoading" @listing="loadPaid(20)" :currentListing="currentListing"/>
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


    export default {
        name: 'home-paid',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'paid',
                'paidLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadPaid'
            ])
        },
        components: {
            'order-list': OrderList
        },
        created(){
            this.loadPaid(20);
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
