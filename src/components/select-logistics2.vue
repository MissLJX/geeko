<template>
    <div class="select-logistics">
        <div class="__header">
            <nav-bar>
                <i class="iconfont el-back-font" slot="left" @click="closeHandle">&#xe693;</i>
                <span slot="center">Logistics Company</span>
            </nav-bar>
        </div>

        <div class="logistics-company">
            <!-- Commonly Used -->
            <div class="__list">
                <div class="__title commonly-used">Commonly Used</div>
                
                <ul>
                    <template v-if="logisticsCompanies != null && logisticsCompanies.commonlyUsed.length > 0">
                        <li 
                            class="__item" 
                            v-for="(commonly,index) in logisticsCompanies.commonlyUsed" 
                            @click="getLogisticsValue(commonly.name)" 
                            :key="commonly.name+index"
                        >
                            <img class="__image" :src="commonly.iconURL" :alt="commonly.name">
                            <span class="__font" :class="{'active' : commonly.name === itemName}">{{commonly.name}}</span>
                        </li>
                    </template>

                    <template v-else>
                        <div class="__lodding">
                            loading...
                        </div>
                    </template>
                </ul>
            </div>

            <!-- normal -->
            <div class="__list">
                <div class="__title">#</div>
                <ul>
                    <template v-if="logisticsCompanies != null && logisticsCompanies.logisticsCompanies.length > 0">
                        <li 
                            class="__item" 
                            v-for="(logistics,index) in logisticsCompanies.logisticsCompanies"  
                            @click="getLogisticsValue(logistics.name)"
                            :key="logistics.name+index"
                        >
                            <span class="__font">{{logistics.name}}</span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'

    export default {
        name:"select-logistics",
        components:{
            NavBar
        },
        data(){
            return {
                itemName:"",
            }
        },
        props:{
            logisticsCompanies:{
                type:Object,
                default:function(){
                    return {};
                }
            }
        },
        computed:{
            
        },
        methods:{
            closeHandle(){
                this.$emit('update:close',false);
            },
            getLogisticsValue(name){
                this.$emit('getSelectValue',name);
                this.$emit('update:close',false);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select-logistics{
        position: fixed;
        top:0px;
        left: 0px;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        .__header{
            padding-bottom: 10px;
        }

        .logistics-company{
            .__list{
                .__title{
                    height: 22px;
                    line-height: 22px;
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #121314;
                    background-color: #f7f7f7;
                    padding-left: 10px;
                }

                .commonly-used{
                    height: 36px;
                    line-height: 36px;
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #121314;
                }

                .__item{
                    height: 44px;
                    line-height: 44px;
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #121314;
                    padding-left: 20px;

                    .__font{
                        // display: block;
                        position: relative;
                        font-family: SlatePro;
                        font-size: 14px;
	                    color: #121314;
                        vertical-align: middle;
                    }

                    .__image{
                        width: 42px;
                        height: 21px;
                        background-color: #eeeeee;
                        vertical-align: middle;
                        margin-right: 10px;
                    }

                    & > .active::after{
                        font-family: iconfont;
                        content: '\e638';
                        margin-left: 15px;
                        font-size: 15px;
                        color: #222222;
                    }
                }

                .__lodding{
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    font-size: 16px;
                }
            }
        }
    }
</style>