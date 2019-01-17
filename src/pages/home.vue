<template id="order-home">
    <div class="st-order-home">
        <div v-if="bbmessage" class="bbtip" v-html="bbmessage"></div>
        <div class="st-flex hd">
            <!--未付款订单-->
            <p v-for="(item,key) in tabList" :key="item.value" :class="{'active': key===isActive}" :value="item.value" @click="changeHandle(item.value,key)">
                {{item.label}}
            </p>
            <!--<div class="st-cell">
                <geeko-select @change="changeHandle" :items="tabList"/>
            </div>-->
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style scoped lang="scss">
    .st-flex{
        display: flex;
        overflow-x: auto;
        cursor: pointer;
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
</style>

<script type="text/ecmascript-6">
    import GeekoSelect from '../components/geeko-select';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            var tab = this.$route.name;
            return {
                isActive:0,
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
                    {
                        label: this.$t('label.paid'),
                        value: 'home-paid',
                        selected: 'home-paid' === tab
                    },
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
                        label: this.$t('label.confirmed'),
                        value: 'home-confirmed',
                        selected: 'home-confirmed' === tab
                    },
                    {
                        label: this.$t('label.canceled'),
                        value: 'home-canceled',
                        selected: 'home-canceled' === tab
                    }
                ]
            };
        },

        computed: {
            ...mapGetters([
                'tab','bbmessage'
            ])
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
                this.isActive=key;
                this.changeList(tab);
            },
            /*changeHandle(evt) {
                var tab = evt.target.value;
                this.changeList(tab);
            },*/
            changeList(tab) {
                this.changeTab({ tab: tab })
                    .then((newTab) => {
                        this.$router.push({ name: newTab });
                    });
            }
        },
        components: {
            'geeko-select': GeekoSelect
        }
    };
</script>
