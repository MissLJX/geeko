<template id="order-home">
    <div class="st-order-home">
        <div v-if="bbmessage" class="bbtip" v-html="bbmessage"></div>
        <div class="st-flex hd global-border-top-1">
            <!--未付款订单-->
            <div v-swiper:mySwiper="swiperHomeOption">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in tabList" :key="item.value" :class="{'active': item.value === isActive}" :value="item.value" @click="changeHandle(item.value,key)">
                        {{item.label}}
                    </div>
                </div>
            </div>
            
            <!--<div class="st-cell">
                <geeko-select @change="changeHandle" :items="tabList"/>
            </div>-->
        </div>
        <div class="__bd">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .st-flex{
        // display: flex;
        // overflow-x: auto;
        cursor: pointer;
        // position: fixed;
        // top: -1px;
        // left: 0;
        // background-color: #ffffff;
        // z-index: 2;
    }
    .st-flex p{
        line-height: 50px;
        text-align: center;
        padding: 0 20px;
        cursor: pointer !important;
    }
    .st-flex .active{
        border-bottom: 2px solid #222;
    }
    .bbtip{
        background-color: #fdeff5;
        padding: 10px;

    }

    .swiper-wrapper{
        text-align: center;
        .swiper-slide{
            height: 30px;
        }
    }

    .st-order-home{
        & > .hd{
            margin: 0px;
            padding: 10px 10px 3px 10px;
            // box-shadow: 0px 0px 10px rgba(0,0,0,.2);
        }

        & .__bd{
            margin-top: 8px;
        }
    }
    
</style>

<script type="text/ecmascript-6">
    import GeekoSelect from '../components/geeko-select';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            var tab = this.$route.name;
            if(!!tab && tab === 'special-home-all'){
                // 选中头部导航
                tab = "home-all";
            }
            return {
                isActive:tab,
                tabList: [
                    {
                        label: this.$t('label.all'),
                        value: 'home-all',
                        selected: 'home-all' === tab
                    },
                    {
                        label: this.$t('label.unpaid'),
                        value: 'home-unpaid',
                        selected: 'home-unpaid' === tab
                    },
                    // {
                    //     label: this.$t('label.paid'),
                    //     value: 'home-paid',
                    //     selected: 'home-paid' === tab
                    // },
                    {
                        label: this.$t('label.processing'),
                        value: 'home-processing',
                        selected: 'home-processing' === tab
                    },
                    {
                        label: this.$t('label.shipped'),
                        value: 'home-shipped',
                        selected: 'home-shipped' === tab
                    },
                    {
                        // label: this.$t('label.confirmed'),
                        label: "Review",
                        value: 'home-confirmed',
                        selected: 'home-confirmed' === tab
                    },
                    {
                        label: "Returns",
                        value: 'home-canceled',
                        selected: 'home-canceled' === tab
                    }
                ],
                swiperHomeOption:{
                    slidesPerView: 4
                }
            };
        },

        computed: {
            ...mapGetters([
                'tab','bbmessage'
            ])
        },
        mounted(){
            let routeName = ["home-shipped","home-confirmed","home-canceled"];
            let name = this.$route.name;
            if(routeName.includes(name)){
                this.mySwiper.slideTo(2,500,false);
            }
        },
        created() {
            this.changeList(this.$route.name);
            this.getM1135();
        },
        methods: {
            ...mapActions([
                'changeTab','getM1135'
            ]),
            /*未付款订单*/
            changeHandle(tab,key) {
                this.isActive = tab;
                this.changeList(tab);
            },
            /*changeHandle(evt) {
                var tab = evt.target.value;
                this.changeList(tab);
            },*/
            changeList(tab) {
                this.changeTab({ tab: tab })
                    .then((newTab) => {
                        this.$router.replace({ name: newTab });
                    });
            }
        },
        watch: {
            $route(to,form) {
                if(to.meta && to.meta.headerShow){
                    this.isActive = to.name;
                }
            }
        },
        components: {
            'geeko-select': GeekoSelect
        }
    };
</script>
