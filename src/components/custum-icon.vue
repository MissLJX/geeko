<template>
    <div class="custum-icon"
         :style="{ 'background-image': 'url(' + url + ') , url(https://image.geeko.ltd/site/pc/icon35.png)' }">

    </div>
</template>


<style>
    .custum-icon {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background: center/cover no-repeat;
        display: inline-block;
    }

</style>

<script type="text/ecmascript-6">
    export default{
        props: [
            'url'
        ]
    }
</script>