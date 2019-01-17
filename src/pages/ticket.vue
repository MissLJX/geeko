<template id="contact">
    <div class="st-ticket-container">
        <page-header>
            <span>Ticket</span>
        </page-header>
        <div class="st-ticket-order-info">
            <div>
                <span class="label">Order No.: </span>
                <span class="value">{{ticketVO.order.id}}</span>
            </div>

            <div>
                <span class="label">Time of payment: </span>
                <span class="value">{{paymentDate}}</span>
            </div>

        </div>

        <div class="st-ticket-select-container">
            <h2>How can we help you?</h2>
            <div>
                <geeko-select :items="questions" @change="changeQuestion"/>
            </div>
            <p>Expected response time:1 business days(s)</p>
        </div>


        <div class="st-ticket-msg-container" ref="replyContainer" @scroll="ticketScroll">

            <div v-if="replyGroups">
                <div :key="key" v-for="(value , key) in replyGroups">
                    <div class="ticket-date">{{key}}</div>
                    <div class="ticket-msgs">
                        <ticket-msg :key="item.date" v-for="item in value" :reply="item"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="st-type-message-container" :class="{down: typeDown}">
            <div class="textarea">
                <textarea placeholder="Type a message..." v-model="chart.message"></textarea>
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
                        <span class="el-rate-label" @click="giveRate">Rate My Service</span>
                    </div>

                    <div class="st-cell">
                        <span class="btn black" @click="sendReply">Send</span>
                    </div>

                </div>
            </div>
        </div>


        <transition name="uper">
            <div v-if="showRater" class="el-rate">
                <div class="hd">
                    <span>Rate My Service</span>
                    <i class="iconfont close" @click="showRater=false">&#xe69a;</i>
                </div>
                <div class="bd">
                    <p>Please rate your experience of the service</p>
                    <ul class="rates">
                        <li @click="rateHandle(rate.value)" v-for="rate in rates" :data-rate="rate.value"
                            :class="{'active':rateData.rate === rate.value}">
                            <span>{{rate.label}}</span>
                        </li>
                    </ul>

                    <div class="rate-text">
                        <textarea v-model="rateData.message" placeholder="A suggestion..."></textarea>
                    </div>

                    <div @click="rateSend" class="btn rate-submit">
                        Submit
                    </div>
                </div>
            </div>
        </transition>



    </div>
</template>


<style scoped>


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

    .el-rate .hd {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        position: relative;
        border-bottom: 1px solid #efefef;
    }

    .el-rate .hd span {
        font-size: 14px;
        font-weight: bold;
    }

    .el-rate .hd .close {
        font-size: 25px;
        position: absolute;
        right: 10px;
        cursor: pointer;
    }

    .el-rate p {
        padding: 10px;
    }

    .el-rate .rates {
        padding: 0 10px;
    }

    .el-rate .rates > li {
        height: 40px;
        border-top: 1px solid #efefef;
        line-height: 40px;
        position: relative;
        cursor: pointer;
    }

    .el-rate .rates > li:first-child {
        border-top: none;
    }

    .el-rate .rates > li::after {
        display: block;
        width: 15px;
        height: 15px;
        border: 1px solid #dcdcdc;
        content: '';
        position: absolute;
        right: 0;
        top: 13px;
        border-radius: 50%;
    }

    .el-rate .rates > li.active::after {
        border: 5px solid #e5004f;
    }

    .rate-text {
        padding: 0 10px;
        margin-top: 10px;
        height: 100px;
    }

    .rate-text textarea {
        resize: none;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
    }

    .rate-submit {
        width: 120px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        font-size: 16px;
        display: block;
        cursor: pointer;
        margin: 20px auto 20px auto;
    }


</style>

<script type="text/ecmascript-6">

    import _ from 'lodash'
    import TicketMsg from '../components/ticket-msg.vue'
    import store from '../store';
    import dateutil from 'dateutil'
    import GeekoSelect from '../components/geeko-select'
    import * as utils from '../utils/geekoutil'
    import PageHeader from "../components/page-header.vue";


    export default {
        name: 'contact',
        data(){
            return {
                questions: [
                    {label: 'Size/Color Preference', value: '0', selected: false},
                    {label: 'Change Shipping Address', value: '2', selected: false},
                    {label: 'Shipping Status or ETA Inquery', value: '3', selected: false},
                    {label: 'Received Damaged or Wrong Item', value: '4', selected: false},
                    {label: 'Upgrade Shipping Method', value: '5', selected: false},
                    {label: 'Return Or Exchange', value: '6', selected: false},
                    {label: 'Request Refund/Cancel Order', value: '8', selected: false},
                    {label: 'Others', value: '7', selected: false},
                ],


                chart: {
                    message: '',
                    operaId: '',
                    subject: ''
                },
                y: 0,
                typeDown: false,
                inited: false,
                rates: [
                    {label: 'Excellent', value: 5},
                    {label: 'Good', value: 4},
                    {label: 'Average', value: 3},
                    {label: 'Poor', value: 2},
                    {label: 'Very Poor', value: 1}
                ],
                rateData: {
                    rate: 5,
                    message: '',
                    id: ''
                },
                showRater: false
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
                    return {
                        icon: 'https://dgzfssf1la12s.cloudfront.net/icon/' + _ticketvo.headSculptureUrl,
                        message: reply.message,
                        imageUrls: reply.imageUrls,
                        position: reply.sender == 'buyers' ? 'right' : 'left',
                        date: reply.date
                    };
                });

                var groups = _.groupBy(mapedData, function (obj) {
                    return utils.enDate(new Date(obj.date));
                });


                return groups;

            },
            canBeRated(){
                return this.ticketVO && this.ticketVO.ticket && this.ticketVO.ticket.canBeRated
            }
        },

        methods: {
            initChart(){
                var _subject = this.ticketVO.ticket ? this.ticketVO.ticket.subject : '0'
                this.questions.find(q => q.value == _subject).selected = true
                this.chart.operaId = this.ticketVO.order ? this.ticketVO.order.id : null
                this.chart.subject = this.questions.find(q => q.selected).value
                this.rateData.rate = this.ticketVO.ticket && this.ticketVO.ticket.ticketRateService ? this.ticketVO.ticket.ticketRateService.rate : 5
                this.rateData.message = this.ticketVO.ticket && this.ticketVO.ticket.ticketRateService ? this.ticketVO.ticket.ticketRateService.message : ''
                this.rateData.id = this.ticketVO.ticket ? this.ticketVO.ticket.id: null
            },
            sendReply(evt){
                evt.preventDefault()
                var _this = this
                if (this.chart.message) {
                    this.$store.dispatch('sendTicket', this.chart).then(() => {
                        _this.chart.message = ''
                        _this.initScroll()
                    })
                }

            },
            sendImage(evt){
                evt.preventDefault();
                console.log("这");

                var files = evt.target.files;
                var formData = new FormData(this.$refs.imageLoader);
                formData.append('operaId', this.chart.operaId);
                formData.append('subject', this.chart.subject);
                formData.append('message', '-');

                var _this = this
                this.$store.dispatch('sendImageTicket', {reply:formData, files}).then(() => {
                    _this.initScroll()
                })

            },
            changeQuestion(evt){
                evt.preventDefault()
                this.chart.subject = evt.target.value
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
                this.rateData.rate = r
            },
            giveRate(){
                this.showRater = true
            },
            rateSend(){
                this.$store.dispatch('rate', this.rateData).then(() => {
                    this.ticketVO.ticketRateService = this.rateData
                    this.showRater = false
                })

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