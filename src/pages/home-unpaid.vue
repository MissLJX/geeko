<template id="home-unpaid">
    <div>
        <order-list :orders="unpaid" :loading="unpaidLoading" @listing="loadUnpaid(20)" :currentListing="currentListing"/>
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
        name: 'home-unpaid',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'unpaid',
                'unpaidLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadUnpaid'
            ])
        },
        components: {
            'order-list': OrderList
        },
        created(){
            this.loadUnpaid(20);
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
