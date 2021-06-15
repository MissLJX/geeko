<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:"NavBar"
    }
</script>

<style soped lang="scss">
    .nav-bar{
        height: 44px;
        line-height: 44px;
        text-align: center;
        display: flex;
        .left,.right{
            width: 60px;
        }

        .center{
            flex: 1;
            font-family: SlatePro-Medium;
	        font-size: 17px;
            color: #222222;
        }

        .left{
            .el-back-font{
                font-size: 20px;
                color: #222222;
                cursor: pointer;
            }
        }
    }
</style>