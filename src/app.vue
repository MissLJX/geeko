<template>
    <div class="st-container">
        <div class="st-header" id="vue-header">
            <div id="progress" >
                <span :class="{processing: paging}"></span>
            </div>
        </div>

        <template v-if="$route.meta.headerShow">
            <page-header>
                <span>My Order</span>
                <span slot="oplabel">
                    <a :href="$GLOBAL.getUrl('/f/mobile/contact_us')">
                        <i class="iconfont contactseller">&#xe716;</i>
                    </a>
                </span>
            </page-header>
        </template>
        

        <div class="st-main">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <div class="st-footer">

        </div>


        <!-- modals -->
        <transition name="fade-alert">
            <modal-confirm v-if="modalconfirmshow" :cfg="confirmCfg" />
        </transition>

        <div v-if="modalconfirmshow" class="mask"></div>
        <div class="Testfixed">

        </div>
    </div>
</template>


<style scoped>
    .st-container{
        background-color: #fff;
        padding-bottom: 51px;
    }

    .Testfixed{
        background-color: rgb(35, 32, 192);
        height: 51px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: solid 1px #eeeeee;  
        display: flex;
        padding-top: 7px;
        z-index: 10;
    }

    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background-color: rgba(0,0,0,0.4);
        z-index: 200;
    }

    .fade-alert-enter{
        width: calc(80% - 20px);
        opacity: 0;
        top: calc(50% + 20px);
    }

    .fade-alert-enter-active{
        transition: all .1s linear;
    }

    .fade-alert-leave-active{
        opacity: 0;
        width: calc(80% - 20px);
        top: calc(50% + 20px);
        transition: all .1s linear;
    }

</style>

<script>

    import Confirm from './components/modal-confirm.vue'
    import store from './store'
    import PageHeader from './components/page-header.vue'


    export default {
        computed:{
            paging(){
                return this.$store.getters.paging;
            },
            confirmCfg(){
                return this.$store.getters.confirmCfg
            },
            modalconfirmshow(){
                return this.$store.getters.modalconfirmshow
            }
        },
        components:{
            'modal-confirm':Confirm,
            'page-header':PageHeader
        }
    }
</script>