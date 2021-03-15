<template >
    <div v-if="reply.position == 'left'" class="ticket-msg st-table" :position="reply.position">
        <div class="st-cell ticket-icon">
            <custum-icon url="https://image.geeko.ltd/icon/support.jpg"/>
        </div>
        <div class="st-cell ticket-content">
            <custum-msg :position="reply.position">
                <span v-if="reply.message && reply.message != '-'">{{reply.message}}</span>
                <div v-if="reply.imageUrls" class="reply-images">
                    <img v-for="image in reply.imageUrls" :src="fullimage(image)">
                </div>
                <div v-if="reply.type==='review'" class="el-rate">
                    <div class="rate-flex">
                        <div class="box" :class="{'like-active': this.rateData.rate===5}" @click="rateHandle(5)"><i class="iconfont">&#xe756;</i>Satisfied</div>
                        <div class="box" :class="{'unlike-active': this.rateData.rate===1}" @click="rateHandle(1)"><i class="iconfont">&#xe757;</i>Unsatisfied</div>
                    </div>
                    <div class="rate-text">
                        <textarea v-model="rateData.message" placeholder="You can comment customer service here."></textarea>
                    </div>
                    <div @click="rateSend" class="btn rate-submit">
                        Confirm
                    </div>
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

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot');
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.svg#iconfont') format('svg');
    }
    .reply-images img{
        display: block;
        width: 100%;
        margin-top: 10px;
    }
    .el-rate{
        min-width: 255px;
    }
    .rate-flex{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .box{
        width: 48%;
        text-align: center;
        height: 34px;
        line-height: 30px;
        border: 1px solid #eee;
        border-radius: 2px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        cursor: pointer;
            i{
                display: inline-block;
                margin-right: 5px;
                font-size: 19px;
            }
        }
    }
    .unlike-active{
        background-color: #f46e6d;
        color: #fff;
        border-color: #f46e6d;
    }
    .like-active{
        background-color: #57b936;
        color: #fff;
        border-color: #57b936;
    }
    .el-rate-label {
        color: #00A0E9;
        text-decoration: underline;
        cursor: pointer;
        vertical-align: middle;
    }

    .el-rate {
        width: 100%;
        background-color: #fff;
    }

    .el-rate .evaluate{
        padding:15px 12px;
        background:#fff;
    }

    .el-rate p {
        padding:0px 0px 12px 0px;
    }

    .el-rate .rates {
        padding: 0 10px;
        margin-top:10px;
        background:#fff;
    }

    .el-rate .rates p{
        padding:15px 0px 10px 0px;
    }

    .el-rate .rates li {
        height: 40px;
        border-top: 1px solid #efefef;
        line-height: 40px;
        position: relative;
        cursor: pointer;
    }

    .el-rate .rates li:first-child {
        border-top: none;
    }

    .el-rate .rates li::after {
        display: block;
        width: 15px;
        height: 15px;
        border: 1px solid #dcdcdc;
        content: '';
        position: absolute;
        right: 0;
        top: 13px;
    }

    .el-rate .rates li.active::after {
        background-image: url(https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1206/chic+me-26.png);
        background-size:cover ;
    }

    .rate-text {
        margin-top: 10px;
        height: 85px;
    }

    .rate-text textarea {
        resize: none;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border:1px solid #ddd;
    }

    .rate-submit {
        width: 100px;
        height: 26px;
        line-height: 24px;
        margin-top: 10px;
        font-size: 14px;
        display: block;
        cursor: pointer;
        background-color: #222;
        border-radius: 2px;
        color: #fff;
        word-break: initial;
        white-space: normal;
        float: right;
    }
</style>

<script type="text/ecmascript-6">
    import CustumIcon from './custum-icon.vue'
    import CustumMsg from './custum-msg.vue'
    export default{
        data(){
            return{
                rateData: {
                    rate: 5,
                    message: '',
                    id: this.ticketId ? this.ticketId:'',
                    reviewMsg:''
                },
            }
        },
        props:[
             'reply','addRated','showAddRater','ticketId'
        ],
        components: {
            'custum-icon': CustumIcon,
            'custum-msg': CustumMsg
        },
        methods:{
            fullimage(src){
                return src;
            },
            rateHandle(r){
                this.rateData.rate = r;
            },
            rateSend(){
                this.$store.dispatch('rate', this.rateData).then(() => {
                    this.$emit('rateDataHandle' , this.rateData)
                })
            }
        }
    }
</script>