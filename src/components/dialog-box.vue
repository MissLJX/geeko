<template>
    <div class="dialog-box">
        <div class="dialog-box-container">
            <slot name="title"></slot>

            <div class="btn-container">
                <slot name="btn"></slot>
            </div>
        </div>

        <div class="mask"></div>
    </div>
</template>

<script>
    export default {
        name:"DialogBox"
    }
</script>

<style scoped lang="scss">
    .dialog-box{
        .dialog-box-container{
            padding: 25px;
            width: 85%;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            border-radius: 4px;
            z-index: 51;

            .title{
                font-family: 'SlatePro-Medium';
                font-size: 14px;
                line-height: 17px;
                color: #222222;
                text-align: center;

                .time{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                    color: #e96060;
                }
            }

            .btn-container{
                margin-top: 20px;
                ._black{
                    height: 32px;
	                background-color: #222222;
                    line-height: 32px;
                    font-size: 14px;
                    color: #ffffff;
                    font-family: 'AcuminPro-Bold';
                    width: 100%;
                    border: none;
                    cursor: pointer;
                }

                ._white{
                    margin-top: 10px;
                    height: 32px;
	                border: solid 1px #222222;
                    font-family: 'AcuminPro-Bold';
                    color: #222222;
                    font-size: 14px;
                    cursor: pointer;
                    background-color: #ffffff;
                    width: 100%;
                }
            }
        }

        .mask{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: 50;
            cursor: pointer;
        }
    }
</style>