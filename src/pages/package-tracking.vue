<template>
    <div>
        <page-header>
            <span>Logistics Information</span>
            <span slot="oplabel">
            </span>
        </page-header>
        <div class="tracking-content" v-if="packagetracking">
            <div class="st-table el-tracking-hd" v-if="packagetracking.slug || packagetracking.trackingNumber">
                <div class="st-cell st-v-m --labels">
                    <p v-if="getShipFromMsg" class="__title">{{getShipFromMsg}}</p>
                    <p v-if="packagetracking.slug">Logistics Company  <span>{{packagetracking.slug}}</span></p>
                    <p v-if="packagetracking.trackingNumber">Tracking Number  <span>{{packagetracking.trackingNumber}}</span></p>
                    <p v-if="packagetracking.logisticsSupplierWebsiteURL">{{$t('label.trackingDetailInfo')}}  <span><a style="text-decoration: underline" :href="packagetracking.logisticsSupplierWebsiteURL">{{packagetracking.logisticsSupplierWebsiteURL}}</a></span></p>
                </div>
            </div>

            <div class="el-tracking-status">
                <div class="st-table">
                    <div class="st-cell __icon st-v-m">
                        <span class="iconfont __icon" v-if="$route.query.type === '1'">&#xe6a9;</span>
                        <span class="iconfont __icon" v-else-if="$route.query.type === '6'">&#xe6a7;</span>
                        <span class="iconfont __icon" v-else>&#xe6a5;</span>
                    </div>
                    <div class="st-cell st-v-m">
                        <span class="--label" v-if="packagetracking.statusView">Current Status: {{packagetracking.statusView}}</span>
                    </div>
                </div>
                
            </div>


            <div class="el-tracking-bd" v-if="originPoints || destinPoints">
                <div class="--bd">
                    <ul class="el-tracking-points">
                        <tracking-point :key="point.checkpointTime" v-for="(point, i) in destinPoints" :trackingPoint="point"
                                        :latest="i === 0"/>
                        <tracking-point :key="point.checkpointTime" v-for="(point, i) in originPoints" :trackingPoint="point"
                                        :latest="i === 0"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .tracking-content{
        padding-left: 10px;
    }
    .el-tracking-hd {
        width: 100%;
        padding: 10px 0;
        // border-bottom: 1px solid #e6e6e6;
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

        &.__title{
            font-family: SlatePro-Medium;
            font-size: 16px;
            color: #222222;
        }
    }
    .el-tracking-hd .--labels > p > span{
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
        background-color: #f7f7f7;
        padding: 10px 0;
        padding-left: 10px;

        .__icon{
            & > span.iconfont{
                font-size: 18px;
                color:#222222;
            }
        }

        .--label{
            font-family: SlatePro-Medium;
            font-size: 15px;
            color: #222222;
            padding-left: 5px;
        }
    }

    .el-tracking-bd{
        padding-top: 15px;
    }
</style>

<script type="text/ecmascript-6">
    import store from '../store'
    import TrackingPoint from '../components/trackingpoint.vue'
    import PageHeader from '../components/page-header.vue'

    export default{
        computed: {
            packagetracking(){
                return store.getters.packagetracking
            },
            originPoints(){
                return this.packagetracking.originPoints ? this.packagetracking.originPoints.reverse() : null;
            },
            destinPoints(){
                return this.packagetracking.destinPoints ? this.packagetracking.destinPoints.reverse() : null;
            },
            getShipFromMsg(){
                return this.$route.query.shipmsg ? this.$route.query.shipmsg : "";
            }
        },
        created(){
            this.$store.dispatch('loadPackageTracking',{type:this.$route.query.type,packageId:this.$route.query.packageid})
        },
        components: {
            'tracking-point': TrackingPoint,
            'page-header': PageHeader,
        }
    }
</script>