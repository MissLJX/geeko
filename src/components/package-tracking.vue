<template>
    <div>
        <div class="bd">
            <ul class="st-order-items">
                <li v-for="product in parcel.products">
                    <img :src="product.imageURL">
                </li>
            </ul>
        </div>
        <div v-if="parcel.trackingId">
            <div class="st-table el-tracking-hd">
                <div class="st-cell st-v-m --labels">
                    <p v-if="parcel.shipFromMsg" style="color: #222;"><strong>{{parcel.shipFromMsg}}</strong></p>
                    <p v-if="parcel.slug">{{$t('label.logisticsCompany')}}  <span>{{parcel.slug}}</span></p>
                    <p v-if="parcel.trackingNumber">{{$t('label.tracknum')}}  <span>{{parcel.trackingNumber}}</span></p>
                    <p v-if="parcel.logisticsSupplierWebsiteURL">{{$t('label.trackingDetailInfo')}}  <span><a style="text-decoration: underline" :href="parcel.logisticsSupplierWebsiteURL">{{parcel.logisticsSupplierWebsiteURL}}</a></span></p>
                </div>
            </div>
            <div class="el-tracking-status">
                <span class="--label" v-if="parcel.trackingStatusView">{{$t('label.currentStatus')}}: {{parcel.trackingStatusView}}</span>
            </div>
            <div class="el-tracking-bd" v-if="parcel.originPoints || parcel.destinPoints">
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
                if(this.parcel && this.parcel.originPoints){
                    return this.parcel.originPoints
                }
            },
            destinPoints(){
                if(this.parcel && this.parcel.destinPoints){
                    return this.parcel.destinPoints
                }
            }
        },
        props:['parcel']
    }
</script>

<style scoped lang="scss">
    .st-order-items{
        padding: 10px;
        margin-left:-10px;
        border-bottom: 8px solid #f6f6f6;
        li{
            min-width: 75px;
            max-width: 75px;
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