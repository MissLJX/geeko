<template id="order-list">
    <list class="st-order-list" :items="orders" :loading="loading" @listing="listing" :currentListing="currentListing">
        <template slot="li" scope="props">
            <order-li :key="props.item.id" :order="props.item"/>
        </template>
    </list>
</template>

<script>
    import List from './list.vue';
    import OrderLi from './order-li.vue';
    export default {
        props: {
            orders: {
                type: Array
            },
            loading: {
                type: Boolean
            },
            currentListing: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            listing(){
                this.$emit('listing');
            }
        },
        components: {
            'list': List,
            'order-li': OrderLi
        }
    }
</script>