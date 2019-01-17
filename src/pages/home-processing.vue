<template id="home-processing">
    <div>
        <div id="processing-tip">
            {{$t("message.orderTip")}}<a class="st-grey-link" href="/fs/shipping-policy">{{$t("message.learnMore")}}</a>
        </div>
        <order-list :orders="processing" :loading="processingLoading" @listing="loadProcessing(20)" :currentListing="currentListing"/>
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
        name: 'home-processing',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'processing',
                'processingLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadProcessing'
            ])
        },
        components: {
            'order-list': OrderList
        },
        created(){
            this.loadProcessing(20);
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