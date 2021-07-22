<template id="review">
    <div id="review-container" v-if="isInit">
        <div class="fixed-header">
            <page-header>
                <span>Review</span>
            </page-header>

            <div class="profress-container">
                <div class="__hd">
                    <span>Points</span>
                    <span class="special-color">{{getPointsSum}}</span>
                    <span>/{{pointsSum}}</span>
                </div>
                <div class="__content">
                    <span :style="{width:getProcessCount+'%'}"></span>
                </div>
                <div class="__fd">
                    Please check the rules page for text and picture points rules
                </div>
            </div>
        </div>

        <div style="height:124px;"></div>

        <div v-for="(item,index) in disposeComments" :key="index+item.productId">
            <div class="review-body">
                <div class="content">
                    <div class="_flex">
                        <!-- <link-image href="#" :src="item.productImageUrl" :title="item.productName"/> -->
                        <a href="#" :title="item.productName">
                            <img :alt="item.productName" :src="item.productImageUrl">
                        </a>
                    </div>

                    <div>
                        <div class="_name">{{item.productName}}</div>
                        <div class="_sizecolor">{{item.color}}/{{item.size}}</div>
                    </div>
                </div>

                <div class="review-star-area">
                    <star-list class="stars" :score="item.score" @star="starClickHandle" :index="index"/>
                </div>
                
                <div class="review-content">
                    <textarea :placeholder="'Earn ' + commentPoint.commentScore + ' points for comments over '+ commentPoint.limitWords +' characters… *' "
                            v-model="item.content" maxlength="150"></textarea>
                    <!-- <div v-if="isempty" class="please-fill">{{$t("label.fillField")}}</div> -->
                    <div class="upload-container imgboxid">
                        <ul v-if="item.images && item.images.length">
                            <li v-for="(image,index2) in item.images" class="uploadImage" :key="index+index2+image">
                                <img :src="'https://image.geeko.ltd'+image"/>
                                <span class="removeImg" @click="removeImg(index,index2)">&times;</span>
                            </li>
                        </ul>
                        <div class="upload-img uploadimg" v-show="item.images.length<5">
                            <form ref="imageLoader">
                                <input type="file" name="imageFiles" multiple="multiple" @change="loadImg(index,$event)" accept="image/jpg,image/jpeg,image/png,image/gif">
                            </form>
                            <div class="addbtn iconfont">&#xe68c;</div>
                            <div class="addnum">{{item.images.length}} / 5</div>
                        </div>
                    </div>
                </div>

                <div style="font-size: 12px;color: #999999;line-height:18px;margin-top:4px;">Earn more {{commentPoint.uploadImageScore}} points for comments with pictures…* </div>

                <div class="review-fit-area">
                    <div class="__title">Overall Fit</div>

                    <ul class="fit-select">
                        <li 
                            v-for="fit in item.fits"
                            :key="index+fit.value"
                        >
                            <span 
                                :class="{active: fit.value === item.sizingRecommendation}" 
                                @click="fitClickHandle(index,$event)" 
                                :value="fit.value"
                            ></span>
                            <span>{{fit.label}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="review-measure-area">
            <p class="__font1">My Size Information (Optional) </p>
            <p class="__font2">Earn more 5 points for fill your all sizes</p>
            <div>
                <div>
                    <div>
                        <span class="_title">Height:</span>
                        <input type="text" class="_input" v-model="mySizeInformation.height">
                        <span class="_size">cm/ in</span>
                    </div>
                    <div>
                        <span class="_title">Bust:</span>
                        <input class="_input" type="text" v-model="mySizeInformation.bust">
                        <span class="_size">cm/ in</span>
                    </div>
                    <div>
                        <span class="_title">Waist:</span>
                        <input class="_input" type="text" v-model="mySizeInformation.waist">
                        <span class="_size">cm/ in</span>
                    </div>
                </div>

                <div>
                    <div>
                        <span class="_title">Weight:</span>
                        <input class="_input" type="text" v-model="mySizeInformation.weight">
                        <span class="_size">kg/lbs </span>
                    </div>
                    <div>
                        <span class="_title">Hips:</span>
                        <input class="_input" type="text" v-model="mySizeInformation.hips">
                        <span class="_size">cm/ in</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="review-footer">
            <div class="mybg">
                <div v-if="sending" class="btn sending black">{{$t("label.loading")}}</div>
                <div class="btn black" @click="confirmHandle" v-else>SUBMIT</div>
            </div>

            <div v-if="isconfirm">
                <div class="mask"></div>
                <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
            </div>
        </div>

        <lodding v-if="uploadImageLoddingShow || submitImageLoddingShow"></lodding>
    </div>
</template>


<script type="text/ecmascript-6">

    import ProductItem from '../components/product-item.vue'
    import store from '../store'
    import StarList from '../components/star-list.vue'
    import CommentAlert from '../components/comment-alert.vue'
    import HtmlImageCompress from 'html-image-compress'
    import { disposeComments } from '../utils/constant.js'
    import PageHeader from '../components/page-header.vue'
    import { mapGetters } from 'vuex';

    export default {
        name: 'review',
        created:function(){
            store.dispatch('paging', true);
            let _this = this;
            store.dispatch('loadOrder', {id: this.$route.params.orderId}).then(function (data) {
                store.dispatch('getCommentByOrderId', {orderId:_this.$route.params.orderId}).then((comment) => {
                    store.dispatch('getCommentRulesPoints').then((point) => {
                        
                        // _this.$nextTick(() => {
                            _this.disposeComments = disposeComments(_this.comments,_this.order.orderItems,_this.getProductIdsComment());
                        // });
                        _this.pointsSum = _this.order.orderItems && _this.order.orderItems.length > 0 ? ((_this.order.orderItems.length) * (_this.getRulesPointsSum)) : 0;
                        store.dispatch('paging', false);
                        _this.isInit = true;
                    });
                });
            });
        },
        // beforeRouteEnter(to, from, next){
        //     store.dispatch('paging', true);
        //     store.dispatch('loadOrder', {id: to.params.orderId}).then(function () {
        //         store.dispatch('getCommentByOrderId', {orderId: to.params.orderId}).then(() => {
        //             _this.disposeComments = disposeComments(_this.comments,_this.order.orderItems,_this.getProductIdsComment());
        //             _this.pointsSum = _this.order.orderItems && _this.order.orderItems.length > 0 ? ((_this.order.orderItems.length) * 35) : 0;
        //             next()
        //             store.dispatch('paging', false);
        //         });
        //     });
        // },
        data(){
            return {
                fits: [
                    {label: "Small", value: '3'},
                    {label: "True to size", value: '2'},
                    {label: "Large", value: '1'}
                ],
                isconfirm:false,
                isissatisfy:true,
                alertMess:'',
                isempty:false,
                uploadedImages: [],
                files:[],
                addnum:0,
                newfiles:[],
                disposeComments:[],
                pointsNum:0,
                pointsSum:0,
                isInit:false,
                uploadImageLoddingShow:false,
                submitImageLoddingShow:false
            }
        },
        computed: {
            ...mapGetters([
                'commentPoint','comments'
            ]),
            order(){
                return this.$store.getters.order
            },
            comments(){
                return this.$store.getters.comments.comments;
            },
            mySizeInformation(){
                let mySizeInformation = this.$store.getters.comments.mySizeInformation ;
                if(!!!mySizeInformation){
                    let obj = {};
                    obj['bust'] = "";
                    obj['height'] = "";
                    obj['hips'] = "";
                    obj['waist'] = "";
                    obj['weight'] = "";
                    mySizeInformation = obj;
                }
                return mySizeInformation;
            },
            item(){
                let order = this.order, item, productId = this.$route.params.productId;
                if (order && order.orderItems) {
                    item = order.orderItems.find(i => i.productId === productId);
                }
                return item;
            },
            sending(){
                return this.$store.getters.reviewSending
            },
            commentAler(){
                return{
                    'isagree':this.issatisfy,
                    'message':this.alertMess,
                    'agreeText':'Yes'
                }
            },
            getStarCount(){
                var total = this.disposeComments.reduce((preValue,item) => {
                    return preValue + item.score;
                },0);

                return total > this.disposeComments.length * 3 ? true : false;
            },
            getPointsSum(){
                return this.disposeComments.reduce((initValue,item) => {
                    if(item.content && item.content.length >= 20){
                        initValue += 10;
                    }

                    if(item.images && item.images.length > 0){
                        initValue += 20;
                    }
                    
                    if(item.height && item.height != null &&
                        item.weight && item.weight != null &&
                        item.bust && item.bust != null &&
                        item.hips && item.hips != null &&
                        item.waist && item.waist != null){
                            initValue += 5;
                    }
                    return initValue;
                },0);
            },
            getProcessCount(){
                let num = Math.floor((this.getPointsSum / this.pointsSum) * 100);
                return num;
            },
            getRulesPointsSum(){
                if(this.commentPoint){
                    return parseInt(this.commentPoint.commentScore) + parseInt(this.commentPoint.sizeInfoScore) + parseInt(this.commentPoint.uploadImageScore);
                }
                return 0;
            }
        },
        components: {
            'product-item': ProductItem,
            'star-list': StarList,
            'comment-alert':CommentAlert,
            'page-header':PageHeader
        },
        methods: {
            starClickHandle(data,index){
                this.disposeComments[index].score = Number(data.star);
            },
            fitClickHandle(index,evt){
                evt.preventDefault();
                var fitNum = evt.target.getAttribute('value');
                this.disposeComments[index].sizingRecommendation = fitNum;
            },
            confirmHandle(evt){
                let _this = this;
                _this.isempty=false; 
                _this.submitImageLoddingShow = true;
                let comments = [];
                _this.disposeComments.forEach((item,index) => {
                    let obj = {};

                    if(!!item.id && item.id != null){
                        obj['id'] = item.id;
                    }

                    if(!!item.productId && item.productId != null){
                        obj['productId'] = item.productId;
                    }

                    if(!!_this.$route.params.orderId){
                        obj['orderId'] = _this.$route.params.orderId;
                    }

                    if(!!item.variantId && item.variantId != null){
                        obj['varaintId'] = item.variantId;
                    }

                    if(!!item.content && item.content != null){
                        obj['content'] = item.content;
                    }

                    if(!!item.score && item.score != null){
                        obj['score'] = item.score;
                    }

                    if(!!item.sizingRecommendation && item.sizingRecommendation != null){
                        obj['sizingRecommendation'] = item.sizingRecommendation;
                    }

                    if(item.images && item.images.length > 0){
                        obj['images'] = item.images;
                    }

                    comments.push(obj);
                })

                let finishComment = {};
                finishComment['comments'] = comments;
                finishComment['mySizeInformation'] = _this.mySizeInformation;

                _this.$store.dispatch('setndProductCommentSave',finishComment).then(result => {
                    console.log("result",result);
                    _this.submitImageLoddingShow = false;
                });
            },
            backOrderPage(){
                this.$router.go(-1);
            },
            loadImg(index,event) {
                let _this = this;
                _this.uploadImageLoddingShow = true;
                let comment = this.disposeComments[index];
                let newFiles = [...event.target.files];
                let files = comment.files.concat(newFiles);

                let promises = files.map(file => new HtmlImageCompress(file,{quality:.7, imageType:file.type}));

                Promise.all(promises).then(result => {
                    let formData = new FormData();
                    formData.append("type","comment");

                    let _files = result.map(result => result.file);

                    _files.forEach((file,index) => {
                        formData.append("files",new File([file],files[index].name));
                    });

                    _this.$store.dispatch('generalUploadImage',{formData}).then(result => {
                        console.log("comment",result);
                        if(!!result && result.length > 0){
                            result.forEach((item) => {
                                comment.images.push(item.url);
                            });
                            _this.uploadImageLoddingShow = false;
                        }
                    });
                });

                if (comment.images.length > 5) {
                    comment.images.splice(5, this.disposeComments[index].images.length - 5);
                    this.disposeComments[index].files.splice(5, this.disposeComments[index].files.length - 5)
                }
            },
            removeImg(index,index2) {
                let comment = this.disposeComments[index];
                comment.images.splice(index2, 1)
                comment.files.splice(index2, 1);
            },
            getProductIdsComment(){
                return this.order.orderItems && this.order.orderItems.reduce((preValue,item) => {
                    if(this.order.orderItems.length < 2){
                        return preValue  + item.productId;
                    }
                    
                    if(this.order.orderItems[this.order.orderItems.length - 1].productId === item.productId){
                        return preValue  + item.productId;
                    }
                    return preValue  + item.productId + ",";
                },"")
            }
        },
        watcher: {
            $route(){
                store.dispatch('loadOrder', {id: to.params.orderId}).then(function (order) {
                    store.dispatch('loadComment', {productId: to.params.productId});
                });
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    #review-container{
        margin-bottom: 82px;
        .review-body {
            padding: 10px 20px 0px 20px;
            h3 {
                font-size: 14px;
                padding-bottom: 5px;
            }

            .review-star-area {
                margin-top: 15px;
                .stars {
                    margin-top: 5px;
                }

            }

            .review-fit-area {
                padding-top: 15px;
                padding-bottom: 7px;
                overflow: hidden;

                .__title{
                    font-family: 'AcuminPro-Bold';
                    font-size: 14px;
                    color: #222222;
                    margin-bottom: 5px;
                }
            }

            .fit-select {

                & > li {
                    font-size: 15px;
                    color: #9a9699;
                    float: left;
                    margin-left: 10px;

                    & > span{
                        vertical-align: middle;
                        &:first-child{
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            border: 1px solid #cacaca;
                            border-radius: 50%;
                            position: relative;

                            &.active::after{
                                content: '\e65b';
                                position: absolute;
                                top: 0;
                                left: 0;
                                display: inline-block;
                                color: #222222;
                                font-family: "iconfont";
                                font-size: 16px;
                            }
                        }

                        &:last-child{
                            font-size: 14px;
	                        color: #222222;
                            margin-left: 5px;
                        }
                    }

                    // &.active {
                    //     color: #ffffff;
                    //     background-color: #111111;
                    // }

                    &:first-child{
                        margin-left: 0px;
                    }
                }



                &::after{
                    content:"";
                    display: block;
                    clear: both;
                }
            }

            .review-content {

                margin-top: 15px;

                textarea {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    padding: 5px 10px;
                    padding-top: 10px;
                    height: 100px;
	                background-color: #f8f8f8;
                    border: none;
                }

                .please-fill{
                    color:red;
                }

                .btn {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    display: block;
                    margin: 15px auto;
                    font-weight: bold;
                    &.sending {
                        cursor: default;
                        opacity: 0.9;
                    }
                }

            }
            
            .upload-container{
                overflow:hidden;
                .upload-img{
                    float:left;
                    margin:5px;
                    width: fit-content;
                    background-size:100%;
                    position: relative;
                    border: 1px dashed #999;
                    input{
                        display:inline-block;
                        height:70px;
                        width:70px;
                        opacity: 0;
                        position: relative;
                        z-index: 99;
                    }
                    .addbtn{
                        position: absolute;
                        font-size: 23px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 0;
                        color: #cccccc;
                    }
                    .addnum{
                        position: absolute;
                        top: 70%;
                        left: calc(50% - 13px);
                        font-size: 12px;
                        z-index: 0;
                        color: #999;
                    }
                }
                .uploadImage{
                    position:relative;
                    height:70px;
                    width:70px;
                    float:left;
                    margin:5px;
                    overflow: hidden;
                    img{
                        width:100%;
                    }
                    .removeImg{
                        width:20px;
                        line-height:20px;
                        font-size: 21px;
                        text-align: center;
                        display: block;
                        border-radius: 50%;
                        background-color: #cccccc;
                        color:#ffffff;
                        position:absolute;
                        top:6px;
                        right:4px;
                    }
                }
            }

            .content{
                display: flex;

                & > div{
                    img{
                        width: 40px;
                        height: 50px;
                        margin-right: 12px;
                    } 
                }

                ._name{
                    font-size: 14px;
                    color: #999999;
                    visibility: visible;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                }

                ._sizecolor{
                    font-size: 14px;
                    color: #222222;
                }

                ._flex{
                    & > a{
                        width: 56px;
	                    height: 70px;
                        display: inline-block;
                        margin-right: 12px;

                        & > img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }

        #review-measure-area{
            margin-top: 18px;
            padding: 0px 20px;
            border-top: 8px solid #f7f7f7;
            & > div{
                display: flex;
                ._title{
                    font-size: 14px;
                    color: #999999;
                }

                ._input{
                    border:none;
                    border-bottom:1px solid #dddddd;
                    width:calc(50% - 25px);
                    text-align: center;
                }

                ._size{
                    font-size: 14px;
                    color: #222222;
                    font-family: SlatePro;
                }

                & > div{
                    & > div{
                        // margin: 20px 0px;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }

            & > .__font1{
                font-size: 14px;
                line-height: 18px;
                color: #222222;
                font-family: 'AcuminPro-Bold';
                margin-top: 15px;
            }

            & > .__font2{
                font-size: 12px;
                line-height: 18px;
                color: #999999;
                margin-top: 6px;
            }
        }

        .review-footer{
            .mybg{
                position: fixed;
                width: 100%;
                left: 0px;
                bottom: 0px;
                height: 72px;
                background-color: #ffffff;
                box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 0.5);
                padding: 12px 20px;

                .btn{
                    height: 48px;
                    background-color: #121314;
                    border-radius: 2px;
                    line-height: 48px;
                    width: 100%;
                }
            }

            .mask{
                width: 100%;
                height: 100%;
                position: fixed;
                left: 0;
                top:0;
                background-color: rgba(0,0,0,0.4);
                z-index: 200;
            }
        }

        .profress-container{
            padding: 0px 28px;
            .__hd{
                font-size: 12px;
                color: #222222;
                text-align: center;

                & .special-color{
                    color: #e64545;
                }
            }

            .__content{
                height: 6px;
                background-color: #f4f4f4;
                border-radius: 4px;
                margin: 10px 0px;
                position: relative;

                & > span{
                    display: inline-block;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 0%;
                    background-color: #e64545;
	                border-radius: 4px;
                    transition:width 1.2s ease;
                }
            }

            .__fd{
                font-size: 12px;
                color: #666666;
                text-align: center;
            }
        }

        .fixed-header{
            position: fixed;
            background-color: #ffffff;
            top: 0;
            left: 0;
            right: 0;
            border-bottom: solid 1px #e6e6e6;
            padding-bottom: 16px;
            z-index:100;
        }
    }
</style>