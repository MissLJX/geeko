<template id="list">
    <div class="st-list" ref="viewBox">
        <ul>
            <slot name="li" :item="item" v-for="(item,key) in items">slot...</slot>
        </ul>
        <div class="list-loading" v-show="loading">loading...</div>
    </div>
</template>

<style scoped lang="scss">
    .st-list{
        text-decoration: none;
        padding: 0 5px;
    }
    ul:after{
       display: block;
        content: '';
        clear: both;
    }
    .list-loading{
        text-align: center;
        font-size: 12px;
        margin: 15px 0;
    }
</style>

<script>
    export default{
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                default: []
            },
            currentListing:{
                type: Boolean,
                default: true
            }
        },
        methods: {
            bindScroll(evt){
                evt.preventDefault()
                /*let [scrollTop , documentHeight, windowHeight] = [
                    document.body.scrollTop - document.documentElement.scrollTop >0 ?  document.body.scrollTop : document.documentElement.scrollTop,
                    document.body.scrollHeight - document.documentElement.scrollHeight > 0 ? document.body.scrollHeight : document.documentElement.scrollHeight,
                    document.body.clientHeight
                ];
                if (scrollTop + windowHeight >= documentHeight - 300) {
                    if (!this.loading) {
                        this.$emit('listing');
                    }
                }*/
                const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
                if(scrollTop + window.innerHeight >= document.body.offsetHeight-300) {
                    if (!this.loading) {
                        this.$emit('listing');
                    }
                }
            },
        },

        mounted(){
          document.addEventListener('scroll', this.bindScroll)
        },
        destroyed(){
          document.removeEventListener('scroll', this.bindScroll)
        },

        watch:{
            currentListing(newCurrentListing){
                if(!newCurrentListing){
                    document.removeEventListener('scroll', this.bindScroll)
                }else{
                    document.addEventListener('scroll', this.bindScroll)
                }
            }
        }
    }
</script>
