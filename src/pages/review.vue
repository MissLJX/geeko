<template id="review">
    <div id="review-container">
        <page-header>
            <span>Review</span>
        </page-header>


        <div v-for="(item,index) in disposeComments" :key="index">
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
                    <!-- <h3>{{$t("label.howItem")}}</h3> -->
                    <star-list class="stars" :score="item.score" @star="starClickHandle" :index="index"/>
                </div>

                <div class="review-fit-area">
                    <!-- <h3>{{$t("label.howProduct")}}</h3> -->

                    <ul class="fit-select">
                        <li @click="fitClickHandle(index,$event)" v-for="fit in item.fits" :value="fit.value"
                            :class="{active: fit.value === item.sizingRecommendation}">{{fit.label}}
                        </li>
                    </ul>
                </div>
                
                <div class="review-content">
                    <textarea placeholder="*What do you want to say ?"
                            v-model="item.content" maxlength="150"></textarea>
                    <!-- <div v-if="isempty" class="please-fill">{{$t("label.fillField")}}</div> -->
                    <div class="upload-container imgboxid">
                        <ul v-if="item.uploadedImages && item.uploadedImages.length">
                            <li v-for="(image,index2) in item.uploadedImages" class="uploadImage" >
                                <img :src="image"/>
                                <span class="removeImg" @click="removeImg(index,index2)">&times;</span>
                            </li>
                        </ul>
                        <div class="upload-img uploadimg" v-show="item.uploadedImages.length<5">
                            <form ref="imageLoader">
                                <input type="file" name="imageFiles" multiple="multiple" @change="loadImg(index,$event)" accept="image/jpg,image/jpeg,image/png,image/gif">
                            </form>
                            <div class="addbtn">+</div>
                            <div class="addnum">{{item.uploadedImages.length}} / 5</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="review-measure-area">
                <p>Your Measurements (Optional) </p>
                <div>
                    <div>
                        <div>
                            <span class="_title">Height:</span>
                            <input type="text" class="_input" v-model="item.height">
                            <span class="_size">cm/ in</span>
                        </div>
                        <div>
                            <span class="_title">Bust:</span>
                            <input class="_input" type="text" v-model="item.bust">
                            <span class="_size">cm/ in</span>
                        </div>
                        <div>
                            <span class="_title">Waist:</span>
                            <input class="_input" type="text" v-model="item.waist">
                            <span class="_size">cm/ in</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span class="_title">Weight:</span>
                            <input class="_input" type="text" v-model="item.weight">
                            <span class="_size">kg/lbs </span>
                        </div>
                        <div>
                            <span class="_title">Hips:</span>
                            <input class="_input" type="text" v-model="item.hips">
                            <span class="_size">cm/ in</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="review-footer">
            <div class="mybg">
                <div v-if="sending" class="btn sending black">{{$t("label.loading")}}</div>
                <div class="btn black" @click="confirmHandle" v-else>{{$t("label.confirm")}}</div>
            </div>

            <div v-if="isconfirm">
                <div class="mask"></div>
                <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
            </div>
        </div>
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

    export default {
        name: 'review',
        beforeRouteEnter(to, from, next){
            store.dispatch('paging', true);
            store.dispatch('loadOrder', {id: to.params.orderId}).then(function () {
                store.dispatch('getComments', {productIds: to.params.productId}).then((comment) => {
                    next()
                    store.dispatch('paging', false);
                });
            });
        },
        mounted:function(){
            this.disposeComments = disposeComments(this.comments,this.order.orderItems,this.$route.params.productId);
        },
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
                disposeComments:[]
            }
        },
        computed: {
            order(){
                return this.$store.getters.order
            },
            comment(){
                return this.$store.getters.comment
            },
            comments(){
                return this.$store.getters.comments;
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
                var _this = this;
                _this.isempty=false;
                let arr = [];
                _this.disposeComments.forEach((item,index) => {
                    console.log("item",item);
                    var files = item.files;
                    let promises = files.map(file => new HtmlImageCompress(file, {quality:.7, imageType:file.type}));
                    console.log("promises",promises);

                    Promise.all(promises).then(results => {
                        let _files = results.map(result => result.file);
                        var formData = new FormData();
                        formData.append('content', item.content);

                        // 区分是添加评论还是修改评论
                        if(!!item.id && item.id != null){
                            formData.append('id', item.id);
                        }else{  
                            formData.append('variantId', item.variantId);
                        }


                        // formData.append('productId', _this.$route.params.productId);
                        formData.append('score', item.score);
                        formData.append('sizingRecommendation',item.sizingRecommendation);

                        if(!!_this.$route.params.orderId){
                            formData.append('orderId',_this.$route.params.orderId);
                        }

                        _files.forEach((file,index) => {
                            formData.append("imageFiles",  new File([file], files[index].name));
                        });

                        if(item.height && item.height != null){
                            formData.append('height', item.height);
                        }
                        if(item.weight && item.weight != null){
                            formData.append('weight', item.weight);
                        }
                        if(item.bust && item.bust != null){
                            formData.append('bust', item.bust);
                        }
                        if(item.hips && item.hips != null){
                            formData.append('hips', item.hips);
                        }
                        if(item.waist && item.waist != null){
                            formData.append('waist', item.waist);
                        }

                        if(!!!item.productId)
                            item.productId = _this.$route.params.productId
                        

                        console.log("formData",formData);
                        arr.push(new Promise((reslove,reject) => {
                            _this.$store.dispatch('sendComment', {reply:formData});
                        }));
                        
                    });
                });

                Promise.all(arr).then((result => {
                    if(this.getStarCount){
                        this.issatisfy=false;
                        this.alertMess=_this.$t("message.shareCoupon")
                    }else{
                        this.issatisfy=true;
                        this.alertMess='Thank you for your comments.'
                    }
                    this.isconfirm=true;
                }));
            },
            backOrderPage(){
                this.$router.go(-1);
            },
            loadImg(index,event) {
                this.disposeComments[index].newfiles = [...event.target.files];
                this.disposeComments[index].files = this.disposeComments[index].files.concat(this.disposeComments[index].newfiles);
                var files = this.disposeComments[index].newfiles;
                _.each(files, (file) => {
                    this.addnum = this.addnum + 1;
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.disposeComments[index].uploadedImages.push(src);
                    this.$forceUpdate();
                })
                if (this.disposeComments[index].uploadedImages.length > 5) {
                    this.disposeComments[index].uploadedImages.splice(5, this.disposeComments[index].uploadedImages.length - 5);
                    this.disposeComments[index].files.splice(5, this.disposeComments[index].files.length - 5)
                }
            },
            removeImg(index,index2) {
                this.disposeComments[index].uploadedImages.splice(index2, 1)
                this.disposeComments[index].files.splice(index2, 1);
                this.$forceUpdate();
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
                // font-weight: bold;
                padding-bottom: 5px;
            }

            .review-star-area {
                margin-top: 15px;
                .stars {
                    margin-top: 5px;
                }

            }

            .review-fit-area {
                // padding: 10px;
                padding-top: 15px;
                padding-bottom: 7px;
                // border-top: 1px solid #efefef;
                overflow: hidden;
            }

            .fit-select {

                & > li {
                    font-size: 15px;
                    color: #9a9699;
                    cursor: pointer;
                    border: 1px solid #dddddd;
                    float: left;
                    padding: 5px 10px;
                    margin-right: 10px;
                    border-radius: 4px;

                    &.active {
                        color: #ffffff;
                        background-color: #111111;
                    }
                }
            }

            .review-content {

                margin-top: 15px;

                textarea {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    padding: 5px 10px;
                    height: 110px;
                    border-color: #e6e6e6;
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
                        height:107.5px;
                        width:88px;
                        opacity: 0;
                        position: relative;
                        z-index: 99;
                    }
                    .addbtn{
                        position: absolute;
                        top: calc(50% - 25px);
                        left: calc(50% - 8px);
                        font-size: 34px;
                        z-index: 0;
                        color: #999;
                    }
                    .addnum{
                        position: absolute;
                        top: 70%;
                        left: calc(50% - 10px);
                        font-size: 12px;
                        z-index: 0;
                        color: #999;
                    }
                }
                .uploadImage{
                    position:relative;
                    height:107.5px;
                    width:88px;
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
                        width: 40px;
                        height: 50px;
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
                        margin: 20px 0px;
                    }
                }
            }

            & > p{
                font-size: 16px;
                line-height: 18px;
                color: #222222;
                font-family: SlatePro;
                margin-top: 15px;
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
    }
</style>