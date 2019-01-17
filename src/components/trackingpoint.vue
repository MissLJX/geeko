<template>
    <li class="el-tracking-point" :class="{'active': latest}">
        <i class="iconfont --icon" >&#xe63a;</i>
        <div class="--time">{{trackingTime}}</div>
        <!--<div class="&#45;&#45;location"></div>-->
        <div class="--message">{{location}} {{trackingPoint.message}}</div>
    </li>
</template>

<style scoped lang="scss">
    .el-tracking-point{
        border-left: 1px dashed #cacaca;
        position: relative;
        padding: 5px 10px 20px 20px;
    }

    .el-tracking-point .--icon{
        position: absolute;
        background-color: #fff;
        top: 0px;
        left: -7px;
        padding: 8px 0;
        display: inline-block;
        font-size: 12px;
        color: #797979;
    }
    .el-tracking-point.active .--time, .el-tracking-point.active .--message{
        color: #000;
    }
    

    .el-tracking-point.active .--icon{
        color:#57b936;
        font-size: 14px;
        left: -8px;
    }

    .el-tracking-point .--location,  .el-tracking-point .--message{
        line-height: 20px;
        color: #999;
    }

    .el-tracking-point.active .--location{
        color: #57b936;
    }

    .el-tracking-point .--message{
    }

    .el-tracking-point .--time{
        font-size: 12px;
        color: #797979;
        line-height: 20px;
    }
</style>

<script type="text/ecmascript-6">

    import fecha from 'fecha'

    export default{
        props: {
            trackingPoint: {
                type: Object,
                required: true
            },

            latest: {
                type: Boolean
            }
        },
        computed: {
            trackingTime(){
                return fecha.format(this.trackingPoint.checkpointTime)
            },
            location(){
                if(this.trackingPoint.location){
                    return '【'+this.trackingPoint.location+'】'
                }
                return ''
            }
        }
    }
</script>