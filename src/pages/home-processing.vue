<template id="home-processing">
    <div>
        <div id="processing-tip" v-if="!(!processingLoading && (processing && processing.length <= 0))">
            We usually take 3 to 7 business days to process your order. <a class="st-grey-link" :href="$GLOBAL.getUrl('/fs/shipping-policy')">{{$t("message.learnMore")}}</a>
        </div>
        <order-list :orders="processing" :loading="processingLoading" @listing="loadProcessing(20)" :currentListing="currentListing"/>

        <empty-order v-if="!processingLoading && (processing && processing.length <= 0)"></empty-order>
    </div>
</template>

<style scoped type="text/scss" lang="scss">
    #processing-tip{
        line-height: 18px;
        padding: 10px;
        padding-bottom: 0;
        // border-top: 1px solid #efefef;
        background-color: #f6f6f6;

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
            'order-list': OrderList,
            "empty-order":EmptyOrder
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