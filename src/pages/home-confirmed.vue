<template id="home-confirmed">
    <div>
        <confirmed-order-list :orders="confirmed" :loading="confirmedLoading" @listing="loadConfirmed(20)" :currentListing="currentListing"/>
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

    import ConfirmedOrderList from '../components/confirmed/confirmed-order-list.vue'


    export default {
        name: 'home-confirmed',
        data(){
            return {
                currentListing: true
            }
        },
        computed: {
            ...mapGetters([
                'confirmed',
                'confirmedLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadConfirmed'
            ])
        },
        components: {
            ConfirmedOrderList
        },
        created(){
            this.loadConfirmed(20);
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