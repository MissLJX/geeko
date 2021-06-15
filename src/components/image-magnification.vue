<template>
    <div class="image-magnification">
        <!-- 过渡动画 -->
        <transition name="fade">
            <div>
                <div class="container" @click="bigImg">
                    <div class="__position">
                        <div class="__image">
                            <img :src="imageSrc" alt="">
                        </div>
                    </div>
                </div>

                <div class="mask" @click="bigImg"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name:"ImageMagnification",
        props:{
            imageSrc:{
                type:String,
                default:'',
                required: true
            }
        },
        methods:{
           bigImg(){
               this.$emit('update:closeImageMask',false);
           } 
        }
    }
</script>

<style lang="scss" scoped>
    .image-magnification{
        .container{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 50;
            cursor: pointer;

            .__position{
                position: relative;
                width: 100%;
                height: 100%;

                .__image{
                    position: absolute;
                    left: 0;
                    right: 0px;
                    max-width: 100%;
                    height: 100%;
                    max-height: 100%;

                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: contain;
                    }
                }
            }
        }

        .mask{
            position: fixed;
            z-index: 49;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }


    /*动画*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s linear;
        transform: translate3D(0, 0, 0);
    }

    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }
</style>