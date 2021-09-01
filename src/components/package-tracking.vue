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
            <div class="el-tracking-hd">
                <div class="--labels">
                    <div class="shipmsg" v-if="parcel.shipFromMsg">{{parcel.shipFromMsg}}</div>
                    <div class="slug _flex" v-if="parcel.slug">
                        <div class="name">{{$t('label.logisticsCompany')}}</div>
                        <div class="content">{{parcel.slug}}</div>
                    </div>

                    <div class="tracking _flex" v-if="parcel.trackingNumber">
                        <div class="name">{{$t('label.tracknum')}}</div>
                        <div class="content">{{parcel.trackingNumber}}</div>
                    </div>

                    <div class="tracking-detail-info" v-if="parcel.logisticsSupplierWebsiteURL">
                        <div class="name">{{$t('label.trackingDetailInfo')}}</div>
                        <div class="content">
                            <span>
                                <a style="text-decoration: underline" :href="parcel.logisticsSupplierWebsiteURL">{{parcel.logisticsSupplierWebsiteURL}}</a>
                            </span>
                        </div>
                    </div>
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
                        <span class="--label" v-if="parcel.trackingStatusView">{{$t('label.currentStatus')}}: {{parcel.trackingStatusView}}</span>
                    </div>
                </div>
                
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

    .el-tracking-hd{
        .--labels{
            width: 100%;
            .shipmsg{
                font-size: 16px;
                color: #222222;
                margin-top: 10px;
            }

            ._flex{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 5px 0px;

                .name{
                    font-size: 14px;
                    color: #999999;
                }

                .content{
                    font-size: 14px;
                    color: #222222;
                }
            }
        }
    }

    .el-tracking-bd{
        margin-top: 15px;
    }

    .el-tracking-status{
        background-color: #f7f7f7;
        padding: 10px 0;
        padding-left: 10px;
        margin-top: 10px    ;

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
</style>