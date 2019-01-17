<template>
    <a :href="href" :title="title">
        <img :alt="title" :src="src">
    </a>
</template>

<style>
    a{
        display: block;
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