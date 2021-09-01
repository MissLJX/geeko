<template>
    <div class="detail-reminder">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{detailReminder.headerTitle}}</span>
            <router-link slot="right" :to="{ name: 'contact', params: { orderId: $route.params.orderId }}">
                <i class="iconfont myicon">&#xe716;</i>
            </router-link>
        </nav-bar>

        <div class="detail-reminder-container">
            <div class="success-icon">
                <span class="iconfont">&#xe6b7;</span>
            </div>

            <p class="title" v-if="detailReminder.title">{{detailReminder.title}}</p>

            <p class="font" v-if="detailReminder.font">{{detailReminder.font}}</p>

            <div class="btn-container">
                <router-link 
                    :to="$GLOBAL.getUrl(item.href)" 
                    style="margin-right:10px;"
                    v-for="(item,index) in detailReminder.btn" :key="index+item.name"
                >{{item.name}}</router-link>
                <!-- <a href="/">Success</a> -->
            </div>
        </div>

        <you-likes :orderId="$route.params.orderId"></you-likes>
    </div>
</template>

<script>
    import YouLikes from '../components/you-likes.vue';
    import NavBar from "../components/nav-bar.vue"

    export default {
        name:"DetailReminder",
        data(){
            let addToCart = {
                headerTitle:"Order Confirmed",
                title:"Add to Bag Successfully!",
                font:"",
                btn:[
                    {
                        name:"View Bag",
                        href:this.$GLOBAL.getUrl("/cart")
                    }
                ]
            };

            let orderConfirmed = {
                headerTitle:"Return Receipt",
                title:"Order Confirmed Successfully!",
                font:"You can view order details to check this order.",
                btn:[
                    {
                        name:"View Order",
                        href:this.$GLOBAL.getUrl("/me/m/order/all")
                    },
                    {
                        name:"To Review",
                        href:this.$GLOBAL.getUrl("/me/m/order/confirmed")
                    }
                ]
            };
            return {
                detailReminder:{},
                addToCart:addToCart,
                orderConfirmed:orderConfirmed
            }
        },
        components:{
            "you-likes":YouLikes,
            "nav-bar":NavBar
        },
        created(){
            let type = this.$route.params.type;
            if(type === "1"){
                this.detailReminder = this.addToCart;
            }else if(type === "2"){
                this.detailReminder = this.orderConfirmed;
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail-reminder{
        .detail-reminder-container{
            margin-top: 51px;
            margin-bottom: 30px;
            .success-icon{
                color: rgb(32, 183, 89);
                text-align: center;

                .iconfont{
                    font-size: 50px;
                }
            }

            .title{
                margin-top: 20px;
                font-family: 'AcuminPro-Bold';
                font-size: 16px;
                color: #222222;
                text-align: center;
            }

            .font{
                font-size: 14px;
                color: #666666;
                text-align: center;
                margin-top: 10px;
            }

            .btn-container{
                margin-top: 10px;
                text-align: center;
                a{
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    background-color: #222222;
                    font-size: 14px;
                    color: #ffffff;
                    font-family: 'AcuminPro-Bold';
                    text-decoration: none;
                    padding: 0px 15px;
                }
            }
        }

        .myicon{
            color: #222222;
            font-size: 30px;
        }
    }
</style>