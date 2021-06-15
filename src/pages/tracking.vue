<template>
    <div>
        <page-header>
            <span>Logistics Information</span>
            <span slot="oplabel">
                <router-link :to="{ name: 'contact', params: { orderId: (this.$route.params ? this.$route.params.orderId : null) || $route.query.orderid }}">
                    <i class="iconfont contactseller">&#xe716;</i>
                </router-link>
            </span>
        </page-header>

            <ul v-if="tracking && tracking.packages" class="packageTab">
                <li class="tab" @click="changeTab(key)" :class="{'active': key===isActive}" v-for="(package,key) in tracking.packages" :key="key">
                    {{package.name}}{{trackName}}
                </li>
            </ul>


        <package-track :orderId="tracking.orderId" class="tracking-content" :package="changePackage"></package-track>
    </div>
</template>

<style lang="scss" scoped>
    .display{
        display: none;
    }
    .packageTab{
        height: 45px;
        line-height: 45px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        .tab{
            cursor: pointer;
        }
        li{
            margin: 0 10px;
            color: #666;
        }
        .active{
            border-bottom: 2px solid #222;
            color: #222;
        }
    }
    .tracking-content{
        padding-left: 10px;
    }
    .el-tracking-hd {
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #e6e6e6;
    }

    .el-tracking-hd .--icon i {
        font-size: 30px;
    }

    .el-tracking-hd .--icon {
        padding-right: 10px;
    }

    .el-tracking-hd .--labels {
        color: #666;
    }

    .el-tracking-hd .--labels > p {
        line-height: 25px;
    }
    .el-tracking-hd .--labels > p > span{
        color: #222;
    }
    /*.el-tracking-status {
        padding: 5px 15px;
    }*/

    .el-tracking-status .--icon {
        font-size: 20px;
        color: #1afa29;
        margin-right: 5px;
    }

    .el-tracking-status .--label {
        color: #222;
    }

    .el-tracking-points {
        padding: 0 10px;
    }
    .el-tracking-points.active{
        font-size: 13px;
    }

    .el-tracking-bd .--label {
        font-weight: bold;
        font-size: 16px;
        color: #4c5057;
        display: block;
        padding: 20px 10px 10px 15px;
    }
    .el-tracking-status{
        background-color: #fff;
        padding: 15px 0;
    }
</style>

<script type="text/ecmascript-6">
    import { mapGetters } from 'vuex';
    import store from '../store'
    import TrackingPoint from '../components/trackingpoint.vue'
    import PageHeader from '../components/page-header.vue'
    import PackageTrack from '../components/package-tracking.vue'

    export default{
        data: function(){
            return {
                isActive:0,
                changePackage:[],
                isLogin:window.__is_login__
            }
        },
        mouted(){
            this.changePackage = this.tracking.packages[0];
        },
        computed: {
            ...mapGetters([
                'tracking',
            ]),
            trackName(){
                this.changePackage = _.cloneDeep(this.tracking.packages[0])
            },
            getToContactUrl(){
                return (this.$route.params ? this.$route.params.orderId : null) || $route.query.orderid
            }
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('paging', true);
            store.dispatch('loadTracking', {orderId: (to.params ? to.params.orderId : null) || to.query.orderid}).then((tracking) => {
                next()
                store.dispatch('paging', false)
            }).catch((e) => {
                console.log(e)
            })
        },
        components: {
            'tracking-point': TrackingPoint,
            'page-header': PageHeader,
            'package-track':PackageTrack
        },
        methods:{
            changeTab(index){
                this.isActive = index;
                this.changePackage = this.tracking.packages[index];
            }
        },
        /*watcher: {
            $route() {
                this.$store.dispatch('loadTracking', { orderId: this.$route.params.orderId });
            }
        }*/
    }
</script>