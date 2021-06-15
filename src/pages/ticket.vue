<template id="contact">
    <div class="st-ticket-container">
        <page-header>
            <span>Ticket</span>
        </page-header>
        <div class="st-ticket-order-info">
            <div>
                <span class="label">{{$t("label.orderNo")}}</span>
                <span class="value">{{ticketVO.order.id}}</span>
            </div>

            <div>
                <span class="label">{{$t("label.timeOfPayment")}}</span>
                <span class="value">{{paymentDate}}</span>
            </div>

        </div>

        <div class="st-ticket-select-container">
            <h2>{{$t("message.helpTip")}}?</h2>
            <div v-if="ticketVO.subjectSelections">
                <select v-model="selected" :class="{'redBorder':isRequired}" @change="isRequired=false">
                    <option disabled="disabled" value="666">Please select your question type</option>
                    <option v-for="option in ticketVO.subjectSelections" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <p>{{$t("message.responseTime")}}</p>
        </div>


        <div class="st-ticket-msg-container" ref="replyContainer" @scroll="ticketScroll">

            <div v-if="replyGroups">
                <div :key="key" v-for="(value , key) in replyGroups">
                    <div class="ticket-date">{{key}}</div>
                    <div class="ticket-msgs">
                        <ticket-msg :key="item.date" v-for="(item,index) in value" :reply="item" :ticketId="ticketVO.ticket.id"/>
                    </div>
                </div>
                <div class="ticket-msgs" v-if="isReplyRated && showAddRater" style="margin-top: 15px">
                    <ticket-msg :reply="replyRated" :ticketId="ticketVO.ticket.id" :showAddRater="showAddRater" @rateDataHandle="rateDataHandle"/>
                </div>
            </div>
        </div>

        <div class="st-type-message-container" :class="{down: typeDown}">
            <div class="textarea">
                <textarea :placeholder="$t('message.typemsg')+'...'" v-model="chart.message"></textarea>
            </div>

            <div class="sender">
                <div class="st-table">
                    <div class="st-cell">
                        <div class="image-loader">
                            <form ref="imageLoader">
                                <input id="imageFiles" @change="sendImage" name="imageFiles" class="opacity"
                                       multiple="multiple" type="file"
                                       accept="image/jpg,image/jpeg,image/png,image/gif">
                            </form>
                        </div>
                    </div>

                    <div v-if="canBeRated" class="st-cell">
                        <i class="iconfont el-rate-star">&#xe60d;</i>
                        <span class="el-rate-label" @click="giveRate">{{$t("label.rateMyService")}}</span>
                    </div>

                    <div class="st-cell">
                        <span class="btn black" @click="sendReply">{{$t("label.send")}}</span>
                    </div>

                </div>
            </div>
        </div>


        <transition name="uper">
            <div v-if="showRater" class="el-rate">
                <div class="evaluate">
                    <p>{{$t("message.rateYourExper")}}</p>
                    <div class="rate-flex">
                        <div class="box" :class="{'like-active': this.rateData.rate===5}" @click="rateHandle(5)"><i class="iconfont">&#xe756;</i>Satisfied</div>
                        <div class="box" :class="{'unlike-active': this.rateData.rate===1}" @click="rateHandle(1)"><i class="iconfont">&#xe757;</i>Unsatisfied</div>
                    </div>
                    <!--<star-list :score="rateData.rate" @star="rateHandle"></star-list>-->
                </div>
                <!--<div  class="rates" v-if="rateData.rate<4">
                    <p>{{$t("message.whichPart")}}</p>
                    <ul>
                        <li :class="{'active': isActive(rate.value)}" @click="reviewMsgHandle(rate.label, rate.value)" v-for="rate in reviewMsg" :data-rate="rate.value" :data-label="rate.label">
                            <span>{{rate.label}}</span>
                        </li>
                    </ul>
                </div>-->
                <div class="rate-text">
                    <textarea v-model="rateData.message" placeholder="Add a comment on the customer service here.(optional)"></textarea>
                </div>

                <div @click="rateSend" class="btn rate-submit">
                    Confirm
                </div>

            </div>
        </transition>
        <div v-if="showalert">
            <div class="mask"></div>
            <comment-alert :data="commentAlert" @hideAlert="hideAlert()"></comment-alert>
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
    .rate-flex{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .box{
            width: 48%;
            text-align: center;
            height: 33px;
            line-height: 33px;
            border: 1px solid #eee;
            border-radius: 2px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            cursor: pointer;
            i{
                display: inline-block;
                margin-right: 5px;
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
    }
    .st-type-message-container {
        transition: bottom .3s linear;
    }

    .st-type-message-container.down {
        bottom: -150px;
    }

    .el-rate-star {
        font-size: 25px;
        color: #00A0E9;
        vertical-align: middle;
    }

    .el-rate-label {
        color: #00A0E9;
        text-decoration: underline;
        cursor: pointer;
        vertical-align: middle;
    }

    .el-rate {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
        top: 0;
        z-index: 10;
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
        padding: 0 10px;
        margin-top: 10px;
        height: 115px;
    }

    .rate-text textarea {
        resize: none;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border:1px solid #ddd;
    }

    .rate-submit {
        width: 95%;
        height: 40px;
        line-height: 40px;
        margin: 20px auto;
        font-size: 16px;
        display: block;
        cursor: pointer;
        background-color: #222;
        border-radius: 4px;
        color: #fff;
    }
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        background-color: rgba(0,0,0,0.4);
        z-index: 200;
    }
    .redBorder{
        border: 1px solid #E64545;
    }
</style>

<script type="text/ecmascript-6">

    import _ from 'lodash'
    import TicketMsg from '../components/ticket-msg.vue'
    import store from '../store';
    import dateutil from 'dateutil'
    import GeekoSelect from '../components/geeko-select'
    import * as utils from '../utils/geekoutil'
    import starList from '../components/star-list.vue'
    import commentAlert from '../components/comment-alert.vue'
    import PageHeader from "../components/page-header.vue";

    export default {
        name: 'contact',
        data(){
            return {
                selected:'',
                chart: {
                    message: '',
                    operaId: '',
                    subject: ''
                },
                y: 0,
                typeDown: false,
                inited: false,
                rateData: {
                    rate: 5,
                    message: '',
                    id: '',
                    reviewMsg:''
                },
                reviewMsgArr:[],
                showRater: false,
                showalert:false,
                isRequired:false,
                lastSellerId:'',
                showAddRater:true
            };
        },
        computed: {
            paymentDate(){
                if(!this.ticketVO.order.paymentTime){
                    return '-'
                }else{
                    return dateutil.format(new Date(this.ticketVO.order.paymentTime), 'jS F Y h:m:s');
                }
            },
            ticketVO(){
                return this.$store.getters.ticketVO
            },
            replyGroups(){
                var _ticketvo = this.ticketVO;
                if (!_ticketvo || !_ticketvo.ticket || !_ticketvo.ticket.ticketReplies) return null;
                var mapedData = _ticketvo.ticket.ticketReplies.map((reply) => {
                    if(reply.sender === 'seller'){
                        this.lastSellerId = reply.date
                    }
                    return {
                        icon: 'https://image.geeko.ltd/icon/' + _ticketvo.headSculptureUrl,
                        message: reply.message,
                        imageUrls: reply.imageUrls,
                        position: reply.sender == 'buyers' ? 'right' : 'left',
                        date: reply.date,
                        type: 'normal',
                    };
                });

                var groups = _.groupBy(mapedData, function (obj) {
                    return utils.enDate(new Date(obj.date));
                });
                return groups;
            },
            replyRated(){
                let _ticketVO = this.ticketVO;
                if (!_ticketVO || !_ticketVO.ticket || _ticketVO.ticket.reviewFlag !== 1) return null;
                return{
                    message: _ticketVO.ticket.reviewPrompt ? _ticketVO.ticket.reviewPrompt : '',
                    position:  'left',
                    type: 'review',
                }
            },
            isReplyRated(){
                let _ticketVO = this.ticketVO;
                if(_ticketVO && _ticketVO.ticket && _ticketVO.ticket.reviewFlag && _ticketVO.ticket.reviewFlag === 1){
                    return true
                }else{
                    return false
                }
            },
            canBeRated(){
                if(this.ticketVO && this.ticketVO.ticket){
                    if(this.ticketVO.ticket.canBeRated){
                        this.rateData.rate = this.ticketVO.ticket.ticketRateService ? this.ticketVO.ticket.ticketRateService.rate : 5
                        this.rateData.message = this.ticketVO.ticket.ticketRateService ? this.ticketVO.ticket.ticketRateService.message : ''
                        this.rateData.id = this.ticketVO.ticket ? this.ticketVO.ticket.id: null
                        return true
                    }
                }else{
                    return false
                }
            },
            commentAlert(){
                return{
                    'isagree':true,
                    'message':'Thank you for your comments.Received goods. get <b style="color:#e5004f">50%</b> Coupon for useful reviews.',
                    'agreeText':'I Got it'
                }
            },
            reviewMsg(){
                return this.$store.getters.reviewMsg
            },
        },

        methods: {
            initChart(){
                this.selected = this.ticketVO.ticket ? this.ticketVO.ticket.subject : '666';
                this.chart.operaId = this.ticketVO.order ? this.ticketVO.order.id : '';
                this.chart.subject = '';
            },
            sendReply(evt){
                evt.preventDefault()
                let _this = this;
                if(_this.selected && _this.selected !== '666'){
                    _this.chart.subject = _this.selected
                }else{
                    _this.isRequired = true;
                    return ''
                }
                if (_this.chart.message && _this.chart.operaId) {
                    _this.$store.dispatch('sendTicket', this.chart).then(() => {
                        _this.chart.message = ''
                        _this.initScroll()
                    })
                }

            },
            sendImage(evt){
                evt.preventDefault()
                var files = evt.target.files;
                var maxSize = 10485760;
                if(files[0].size<maxSize){
                    var formData = new FormData(this.$refs.imageLoader);
                    formData.append('operaId', this.chart.operaId);
                    formData.append('subject', this.chart.subject);
                    formData.append('message', '-');

                    let _this = this;
                    this.$store.dispatch('sendImageTicket', {reply:formData, files}).then(() => {
                        _this.initScroll()
                    })
                }else{
                    alert("A single image should not exceed 10M");
                }
            },
            rateDataHandle(rate_data){
                this.showAddRater = false;
                this.rateData.rate = rate_data.rate;
                this.rateData.message = rate_data.message;
                this.ticketVO.ticketRateService = this.rateData.rate;
            },
            initScroll(){
                this.inited = false
                var $div = this.$refs.replyContainer;
                this.y = $div.scrollTop = $div.scrollHeight;
                setTimeout(() => {
                    this.inited = true
                }, 1000)

            },
            ticketScroll(evt){
                if (this.inited) {
                    if (evt.target.scrollTop - this.y < 0) {
                        this.typeDown = true
                    } else {
                        this.typeDown = false
                    }
                    this.y = evt.target.scrollTop
                }
            },
            rateHandle(r){
                this.rateData.rate = r;
            },

            reviewMsgHandle(label, value){
                var haveElem=false;
                for(let i=0;i<this.reviewMsgArr.length;i++){
                    if(this.reviewMsgArr[i].label==label){
                        this.reviewMsgArr.splice(i,1);
                        haveElem=true;
                    }
                }
                if(!haveElem){
                    this.reviewMsgArr.push({label, value});
                }
                this.rateData.reviewMsg = JSON.stringify(this.reviewMsgArr);
            },

            giveRate(){
                this.showRater = true
            },
            hideAlert(){
                this.showRater = false
                this.showalert=false
            },
            rateSend(){
                this.$store.dispatch('rate', this.rateData).then(() => {
                    this.ticketVO.ticketRateService = this.rateData
                    this.showRater = false
                })
            },
            isActive(v){
                var isActive = false;
                _.each(this.reviewMsgArr, (review) => {
                    if(review.value == v){
                        isActive = true;
                        return false;
                    }
                })
                return isActive;
            }
        },
        components: {
            'page-header':PageHeader,
            'ticket-msg': TicketMsg,
            'geeko-select': GeekoSelect
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('paging', true);
            store.dispatch('loadTicketById', {id: to.params.id}).then(() => {
                next(vm => {
                    vm.initChart()
                })
                store.dispatch('paging', false);
            });
        },
        mounted(){
            this.initScroll();
        }

    }
</script>