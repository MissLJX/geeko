<template id="confirmed-order-list">
    <list class="st-order-list" :items="orders" :loading="loading" @listing="listing" :currentListing="currentListing">
        <template slot="li" slot-scope="props">
            <confirmed-order-li :key="props.item.id" :order="props.item" :index="props.index"/>
        </template>
    </list>
</template>

<script>
    import List from '../list.vue';
    import ConfirmedOrderLi from '../confirmed/comfirmed-order-li.vue';
    export default {
        name:"confirmed-order-list",
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
            ConfirmedOrderLi
        }
    }
</script>