<template>
    <a :href="href" :title="title">
        <img :alt="title" :src="src">
        <!-- <span class="_status">
            <span class="_font">Cacale</span>
        </span> -->
    </a>
</template>

<style scoped lang="scss">
    a{
        display: block;
        position: relative;
        width: 75px;

        ._status{
            font-size: 14px;
            color: #ffffff;
            position: absolute;
            width: 100%;
            height: 100%;
            display: inline-block;
            background-color: rgba(0, 0, 0, 0.4);
            top: 0;
            left: 0;

            ._font{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }

        img{
            width: 100% !important;
            height: 100% !important;
        }
    }
</style>
<script>
    export default{
        props: [
            'href',
            'title',
            'src'
        ]
    }
</script>