<template>
    <div>
        <div class="bd">
            <ul class="st-order-items">
                <li v-for="product in package.products">
                    <img :src="product.imageURL">
                </li>
            </ul>
        </div>
        <div v-if="package.trackingId">
            <div class="st-table el-tracking-hd">
                <div class="st-cell st-v-m --labels">
                    <p v-if="package.shipFromMsg" style="color: #222;"><strong>{{package.shipFromMsg}}</strong></p>
                    <p v-if="package.slug">{{$t('label.logisticsCompany')}}  <span>{{package.slug}}</span></p>
                    <p v-if="package.trackingNumber">{{$t('label.tracknum')}}  <span>{{package.trackingNumber}}</span></p>
                    <p v-if="package.logisticsSupplierWebsiteURL">{{$t('label.trackingDetailInfo')}}  <span><a style="text-decoration: underline" :href="package.logisticsSupplierWebsiteURL">{{package.logisticsSupplierWebsiteURL}}</a></span></p>
                </div>
            </div>
            <div class="el-tracking-status">
                <span class="--label" v-if="package.trackingStatusView">{{$t('label.currentStatus')}}: {{package.trackingStatusView}}</span>
            </div>
            <div class="el-tracking-bd" v-if="package.originPoints || package.destinPoints">
                <div class="--bd">
                    <ul class="el-tracking-points">
                        <tracking-point :key="point.checkpointTime" v-for="(point, i) in originPoints" :trackingPoint="point"
                                        :latest="i === 0"/>
                        <tracking-point :key="point.checkpointTime" v-for="(point, i) in destinPoints" :trackingPoint="point"
                                        :latest="i === 0"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import TrackingPoint from '../components/trackingpoint.vue'
    export default {
        components: {
            'tracking-point': TrackingPoint,
        },
        computed: {
            originPoints(){
                if(this.package && this.package.originPoints){
                    return this.package.originPoints
                }
            },
            destinPoints(){
                if(this.package && this.package.destinPoints){
                    return this.package.destinPoints
                }
            }
        },
        props:['package']
    }
</script>

<style scoped lang="scss">
    .st-order-items{
        padding: 10px;
        margin-left:-10px;
        border-bottom: 8px solid #f6f6f6;
        li{
            width: 75px;
            height: 100px;
            margin-right: 12px;
            &:last-child{
                margin-right: 0;
            }
            img{
                width:100%;
                height: 100%;
            }
        }
    }
</style>