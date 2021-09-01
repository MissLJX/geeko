<template id="order-li">
    <div class="order-detail-li">
        <div  v-for="(logistics,index) in packages" :class="{'__container' : packageLen > 1}" :key="index+logistics">
            <div class="__header" v-if="packageLen > 1 && index !== 'Canceled'">{{index}}</div>
            <div v-for="(parcel,index2) in logistics" :key="parcel.status+index2">
                <div v-if="logisticsPackageShow">
                    <div class="__hd st-table">
                        <div 
                            class="st-cell __name" 
                            :class="{'__color' : parcel.status === 2}">
                            {{parcel.status === 2 && orderStatus === 3 ? "Returns" : parcel.name}}
                        </div>
                        <div class="st-cell __status">
                            <a 
                                v-if="parcel.logisticsSupplierWebsiteURL" 
                                :href="parcel.logisticsSupplierWebsiteURL"
                            >Logistics Status ></a>
                            <a 
                                v-if="parcel.trackingId && !parcel.logisticsSupplierWebsiteURL" 
                                @click="checkPackageLogistics(parcel.status,parcel.trackingId)"
                            >Logistics Status ></a>
                        </div>
                    </div>

                    <div class="st-table logistics-information" v-if="parcel.status === 1">
                        <div class="st-cell">Logistics Company</div>
                        <div class="st-cell">{{parcel.slug}}</div>
                    </div>

                    <div class="st-table logistics-information" style="margin-bottom:10px;" v-if="parcel.status === 1">
                        <div class="st-cell">Tracking Number</div>
                        <div class="st-cell">{{parcel.trackingNumber}}</div>
                    </div>
                </div>

                <div class="__hd _flex" v-else>
                    <div class="__name">
                        Items
                    </div>

                    <div class="status">
                        {{statusView}}
                    </div>
                </div>
                <ul class="st-order-items">
                    <product-item 
                        :key="product.id"  
                        :orderId="orderId" 
                        :status="orderStatus" 
                        v-for="(product,inedx3) in parcel.products" 
                        :item="product"
                        :itemStatus="parcel.status"
                        :index="inedx3"
                    />
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .order-detail-li{
        .__hd{
            height: 35px;
            line-height: 35px;
            padding: 0px 10px;
            width: 100%;

            .__name{
                font-family: SlatePro-Medium;
                font-size: 15px;
                color: #222222;
            }

            .__status{
                font-family: SlatePro;
                text-decoration: underline;
                font-size: 13px;
                color: #222222;
                text-align: right;
            }

            .__color{
                color: #e64545;
            }
        }

        ._flex{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .status{
                font-family: 'SlatePro-Medium';
                font-size: 14px;
                color: #222222;
            }
        }

        .logistics-information{
            height: 25px;
            line-height: 25px;
            width: 100%;
            padding-right: 10px;

            & > div:first-child{
                font-family: SlatePro;
                font-size: 14px;
                color: #666666;
            }

            & > div:last-child{
                font-family: SlatePro-Medium;
                font-size: 14px;
                color: #222222;
                text-align: right;
            }
        }

        .__header{
            height: 30px;
            line-height:30px;
            font-family: SlatePro-Medium;
            font-size: 16px;
            color: #222222;
        }

        & > .__container:last-child{
            border-bottom: none;
        }

        .__container{
            border-bottom: 1px solid #eeeeee;
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
        props:['packages','packageLen','orderStatus','orderId','logisticsPackageShow',"statusView"],
        components: {
          'product-item': ProductItem,
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
