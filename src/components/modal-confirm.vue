<template>
    <div class="st-confirm">
        <div class="hd">
            <h3>{{cfg.title || 'Geeko Online' }}</h3>
            <span class="close"></span>
        </div>
        <div class="bd">
            <p>{{cfg.message}}</p>
        </div>
        <div class="fd">
            <span class="btn no" @click="cfg.no">{{$t("label.no")}}</span>
            <span class="btn" @click="cfg.yes">{{$t("label.yes")}}</span>
        </div>
    </div>
</template>

<style>
    .st-confirm {
        position: fixed;
        width: 80%;
        max-width: 320px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: #dcdcdc 1px 1px 2px;
        z-index: 201;
    }

    .st-confirm > .hd{
        height: 40px;
        background-color: #efefef;
    }

    .st-confirm > .hd > h3{
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        border-bottom: 1px solid #efefef;
        padding: 0 10px;
    }

    .st-confirm > .bd{
        padding: 20px 10px;
    }

    .st-confirm > .fd{
        border-top: 1px solid #efefef;
        padding: 10px;
        text-align: right;
    }

    .st-confirm > .fd > .btn{
        padding: 5px 10px;
        margin-left: 10px;

    }

    .st-confirm > .fd > .btn.no{
        border:1px solid #dcdcdc;
        background-color: #fff;
        color: #000;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: [
            'cfg'
        ]
    }
</script>