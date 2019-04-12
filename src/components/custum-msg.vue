<template>
    <div class="custum-msg" :position="position">
        <slot></slot>
    </div>
</template>


<style scoped>
    .custum-msg{
        padding: 10px;
        border-radius: 2px;
        color: #fff;
        position: relative;
        display: inline-block;
        text-align: left;
        white-space: pre-line;
        word-break: break-all;
        word-wrap: break-word;
    }

    .custum-msg::after{
        display: block;
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        z-index: -1;
        transform: rotate(-45deg);
    }

    .custum-msg[position=left]{
        background-color: #dcdcdc;
    }

    .custum-msg[position=left]::after{
        background-color: #dcdcdc;
        top: 3px;
        left: -3px;
    }


    .custum-msg[position=right]{
        background-color: #1a95d3;
    }

    .custum-msg[position=right]::after{
        background-color: #1a95d3;
        top: 3px;
        right: -3px;
    }

</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            position: {
                type: String,
                default: 'left'
            }
        }
    }
</script>