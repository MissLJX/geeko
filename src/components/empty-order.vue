<template>
    <div class="empty-order">
        <div class="icon">
            <span class="iconfont">&#xe6d8;</span>
        </div>
        <p>You don't have any orders yet, go pick your favorite products !</p>

        <a :href="$GLOBAL.getUrl('/')">Go Shopping</a>
    </div>
</template>

<script>
    export default {
        name:"EmptyOrder"
    }
</script>

<style scoped lang="scss">
    .empty-order{
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 5;
        width: 80%;

        .icon{
            .iconfont{
                font-size: 80px;
                color: #b2b2b2;
            }
        }

        p{
            font-size: 14px;
            color: #999999;
            line-height: 20px;
            margin-top: 20px;
        }

        a{
            height: 32px;
            line-height: 32px;
	        background-color: #222222;
            padding: 0px 15px;
            color: #ffffff;
            font-size: 14px;
            border: none;
            cursor: pointer;
            margin-top: 20px;
            display: inline-block;
            text-decoration: none;
        }
    }
</style>