<template>
    <div class="customer-msg" :position="position">
        <slot></slot>
    </div>
</template>


<style type="text/scss" lang="scss">
    .customer-msg{
        padding: 10px;
        border-radius: 2px;
        position: relative;
        display: inline-block;
        text-align: left;
        white-space: pre-line;
        word-break: break-all;
        word-wrap: break-word;
    }

    .customer-msg::after{
        display: block;
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        z-index: -1;
        transform: rotate(-45deg);
    }

    .customer-msg[position=left]{
        background-color: #fff;
        color: #222;
        border: solid 1px #cacaca;
    }

    .customer-msg[position=left]::after{
        background-color:  #fff;
        top: 8px;
        left: -3px;
        border: solid 1px #cacaca;
    }


    .customer-msg[position=right]{
        background-color: #1a95d3;
        color: #fff;
    }

    .customer-msg[position=right]::after{
        background-color: #1a95d3;
        top: 8px;
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