<template id="order-li">
    <div class="bd">
        <div class="bd-product-list">
            <span class="_item">
                Items
            </span>
            <!-- <span class="statusColor" :style="{backgroundColor : status_color}"></span>
            <span v-if="packageLen > 1">{{package.statusView}}</span>
            <span v-if="packageLen === 1">{{orderStatusView}}</span> -->
            <a v-if="package.logisticsSupplierWebsiteURL" :href="package.logisticsSupplierWebsiteURL">{{$t("label.track")}} ></a>
            <a v-if="package.trackingId && !package.logisticsSupplierWebsiteURL" @click="checkPackageLogistics(package.status,package.trackingId)">{{$t("label.track")}} ></a>
        </div>
        <ul class="st-order-items">
            <product-item key="product.id"  :orderId="orderId" :status="orderStatus" v-for="product in package.products" :item="product"/>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .bd-product-list{
        height: 45px;
        line-height: 45px;
        span{
            display: inline-block;
        }
        a{
            color:#222;
            text-decoration: underline;
            float: right;
            margin-right: 12px;
            cursor: pointer;
        }
        .statusColor{
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin: 7px 4px 0 0;
        }

        ._item{
            font-family: SlatePro-Medium;
            font-size: 15px;
            color: #222222;
        }
    }

   .el-order-line{
       font-size: 13px;
       color: #222;
   }
   .st-order-items{
       display: block ;

   }
    .st-order{
        padding-left: 0;
    }
   .st-order > .bd{
       padding: 10px 0;
       border: none;
   }

</style>

<script type="text/ecmascript-6">
    import ProductItem from './product-detail-item.vue';
    import * as constant from '../utils/constant';

    export default {
        props:['package','packageLen','orderStatus','orderStatusView','orderId'],
        components: {
          'product-item': ProductItem,
        },
        computed: {
            status_color() {
                if(this.packageLen === 1){
                    return constant.STATUS_COLOR(this.orderStatus)
                }else{
                    if(this.package.status===0){
                        return '#d088e1'
                    }else if(this.package.status===1){
                        return '#57b936'
                    }else if(this.package.status===2){
                        return '#a4a4a7'
                    }
                }
            },
        },
        methods:{
            checkPackageLogistics(type,packageId){
                if(packageId){
                    this.$router.push({ path: constant.ROUTER_PATH_ORDER+'/packageTracking', query: { type:type , packageid: packageId } })
                }
            }
        }
    }
</script>
