<template>
    <div class="star-list-container">
        <span class="font_1">Rating</span>
        <ol class="star-list">
            <li class="iconfont" :class="{active: i <= score}" v-for="i in 5" :index="i" @click="clickHandle" :key="i"></li>
        </ol>
        <span class="font_2">Very Satisfied</span>
    </div>
</template>

<style lang="scss" scoped>
    .star-list-container{
        display: flex;
        align-items: center;
        .star-list{
            margin-left: 15px;
            & > li{
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-left: 4px;

                &::after{
                    content: "\e76b";
                    color: #e64545;
                }

                &:first-child{
                    margin-left: 0px;
                }
            }

            & > li.active{
                &::after{
                    content: "\e768";
                    color: #e64545;
                }
            }
        }

        .font_1{
            font-family: 'AcuminPro-Bold';
            font-size: 14px;
            color: #222222;
        }

        .font_2{
            font-family: 'AcuminPro-Bold';
            font-size: 12px;
            color: #e64545;
            margin-left: 15px;
        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            score: {
                type: Number,
                default: 5
            },
            index:{
                type:Number,
                default:0
            }
        },
        methods: {
            clickHandle(evt){
                evt.preventDefault();
                this.$emit('star' , {star: evt.target.getAttribute('index')},this.index);
            }
        }
    }
</script>