<template >

    <div v-if="reply.position == 'left'" class="ticket-msg st-table" :position="reply.position">
        <div class="st-cell ticket-icon">
            <custum-icon url="https://dgzfssf1la12s.cloudfront.net/icon/support.jpg"/>

        </div>
        <div class="st-cell ticket-content">
            <custum-msg :position="reply.position">
                <span v-if="reply.message && reply.message != '-'">{{reply.message}}</span>
                <div v-if="reply.imageUrls" class="reply-images">
                    <img v-for="image in reply.imageUrls" :src="fullimage(image)">
                </div>
            </custum-msg>

        </div>
    </div>

    <div v-else class="st-table ticket-msg" :position="reply.position">
        <div class="st-cell ticket-content">
            <custum-msg  :position="reply.position">
                <span v-if="reply.message && reply.message != '-'">{{reply.message}}</span>
                <div v-if="reply.imageUrls" class="reply-images">
                    <img v-for="image in reply.imageUrls" :src="fullimage(image)">
                </div>
            </custum-msg>

        </div>
        <div class="st-cell ticket-icon">
            <custum-icon :url="reply.icon"/>
        </div>
    </div>
</template>

<style scoped>

    .reply-images img{
        display: block;
        width: 100%;
        margin-top: 10px;
    }
</style>

<script type="text/ecmascript-6">
    import CustumIcon from './custum-icon.vue'
    import CustumMsg from './custum-msg.vue'
    export default{
        props:[
             'reply'
        ],
        components: {
            'custum-icon': CustumIcon,
            'custum-msg': CustumMsg
        },
        methods:{
            fullimage(src){
                return src;
            }
        }
    }
</script>