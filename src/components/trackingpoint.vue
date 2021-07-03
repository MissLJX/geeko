<template>
    <li class="el-tracking-point" :class="{'active': latest}">
        <div class="--time">
            <p>{{trackingDate}}</p>
            <p>{{trackTime}}</p>
        </div>

        <div class="el-track-container">
            <i class="iconfont --icon" >&#xe63a;</i>
            <div class="--message">
                <p>{{location}} </p>
                <p>{{trackingPoint.message}}</p>
            </div>
        </div>
        
    </li>
</template>

<style scoped lang="scss">
    .el-tracking-point{
        // border-left: 1px dashed #cacaca;
        position: relative;
        display: flex;
        // padding: 5px 10px 20px 0px;

        .--icon{
            position: absolute;
            // background-color: #fff;
            top: 4px;
            left: -5px;
            // padding: 8px 0;
            display: inline-block;
            font-size: 12px;
            color: #e6e6e6;
            transform: scale(0.7);
        }

        &.active .--icon{
            color:#57b936;
            font-size: 14px;
            transform: scale(1);
            top: 0px;
            left: -6px;
        }

        &.active .--time , &.active .--message{
            color: #000;
        }

        & .--message{
            line-height: 20px;
            color: #999;
            display: inline-block;
            padding: 0px 10px 20px 20px;
            border-left: 1px solid #e6e6e6;
        }

        & .--time{
            line-height: 20px;
            display: inline-block;
            text-align: right;
            padding-right: 7px;

            & > p:first-child{
                font-family: SlatePro-Medium;
                font-size: 12px;
                color: #999999;
            }

            & > p:last-child{
                font-family: SlatePro;
                font-size: 11px;
                color: #999999;
            }
        }

        .el-track-container{
            display: inline-block;
            position: relative;
        }
    }

    // .el-tracking-point.active .--time, .el-tracking-point.active .--message{
    //     color: #000;
    // }
    

    // .el-tracking-point.active .--icon{
    //     color:#57b936;
    //     font-size: 14px;
    //     left: -8px;
    // }

    // .el-tracking-point .--location,  .el-tracking-point .--message{
    //     line-height: 20px;
    //     color: #999;
    //     display: inline-block;
    //     padding: 5px 10px 20px 20px;
    //     border-left: 1px solid #e6e6e6;
    // }

    // .el-tracking-point.active .--location{
    //     color: #57b936;
    // }

    
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
            trackingDate(){
                return fecha.format(this.trackingPoint.checkpointTime,'DD/MM')
            },
            trackTime(){
                return fecha.format(this.trackingPoint.checkpointTime,'hh:mm:ss')
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