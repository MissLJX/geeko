<template id="review">
    <div id="review-container">
        <div class="review-body">
            <div class="content">
                <div class="">
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

            <div id="review-star-area">
                <!-- <h3>{{$t("label.howItem")}}</h3> -->
                <star-list id="stars" :score="comment.score" @star="starClickHandle"/>
            </div>

            <div id="review-fit-area">
                <!-- <h3>{{$t("label.howProduct")}}</h3> -->

                <ul id="fit-select">
                    <li @click="fitClickHandle" v-for="fit in fits" :value="fit.value"
                        :class="{active: fit.value === comment.sizingRecommendation}">{{fit.label}}
                    </li>
                </ul>
            </div>

            <div id="review-content">
                <textarea placeholder="*What do you want to say ?"
                        v-model="comment.content" maxlength="150"></textarea>
                <div v-if="isempty" class="please-fill">{{$t("label.fillField")}}</div>
                <div class="upload-container" id="imgboxid">
                    <ul v-if="uploadedImages && uploadedImages.length">
                        <li v-for="(image,index) in uploadedImages" class="uploadImage" >
                            <img :src="image"/>
                            <span class="removeImg" @click="removeImg(index)">&times;</span>
                        </li>
                    </ul>
                    <div class="upload-img" id="uploadimg" v-show="uploadedImages.length<5">
                        <form ref="imageLoader">
                            <input type="file" name="imageFiles" multiple="multiple" @change="loadImg" accept="image/jpg,image/jpeg,image/png,image/gif">
                        </form>
                        <div class="addbtn">+</div>
                        <div class="addnum">{{addnum}} / 5</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="review-footer">
            <div id="review-measure-area">
                <p>Your Measurements (Optional) </p>
                <div>
                    <div>
                        <div>
                            <span class="_title">Height:</span>
                            <input type="text" class="_input" v-model="comment.height">
                            <span class="_size">cm/ in</span>
                        </div>
                        <div>
                            <span class="_title">Bust:</span>
                            <input class="_input" type="text" v-model="comment.bust">
                            <span class="_size">cm/ in</span>
                        </div>
                        <div>
                            <span class="_title">Waist:</span>
                            <input class="_input" type="text" v-model="comment.waist">
                            <span class="_size">cm/ in</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span class="_title">Weight:</span>
                            <input class="_input" type="text" v-model="comment.weight">
                            <span class="_size">kg/lbs </span>
                        </div>
                        <div>
                            <span class="_title">Hips:</span>
                            <input class="_input" type="text" v-model="comment.hips">
                            <span class="_size">cm/ in</span>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="mybg">
                <div v-if="sending" class="btn sending">{{$t("label.loading")}}</div>
                <div class="btn black" @click="confirmHandle" v-else>{{$t("label.confirm")}}</div>
            </div>

            <div v-if="isconfirm">
                <div class="mask"></div>
                <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
            </div>
        </div>
    </div>
</template>
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

            // #review-product {
            //     padding: 10px;
            // }

            #review-star-area {
                // padding: 0 10px 10px 10px;
                margin-top: 15px;
                #stars {
                    margin-top: 5px;
                }

            }

            #review-fit-area {
                // padding: 10px;
                padding-top: 15px;
                padding-bottom: 7px;
                // border-top: 1px solid #efefef;
                overflow: hidden;
            }

            #fit-select {

                & > li {
                    font-size: 15px;
                    color: #9a9699;
                    cursor: pointer;
                    border: 1px solid #dddddd;
                    float: left;
                    padding: 5px 10px;
                    margin-right: 10px;
                    border-radius: 4px;

                    // &::after {
                    //     display: block;
                    //     width: 15px;
                    //     height: 15px;
                    //     border: 1px solid #dcdcdc;
                    //     content: '';
                    //     position: absolute;
                    //     right: 0;
                    //     top: 10px;
                    //     border-radius: 50%;
                    // }

                    &.active {

                        // &::after {
                        //     border: 5px solid #e5004f;
                        // }

                        color: #ffffff;
                        background-color: #111111;
                    }
                }
            }

            #review-content {

                margin-top: 15px;
                // padding: 10px;

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
                    /*background-image: url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1129/chicme-23.png");*/
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
                    margin-top: 5px;
                    }

                ._sizecolor{
                    font-size: 14px;
                    color: #222222;
                    margin-top: 5px;
                }
            }
        }

        .review-footer{
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
                    // padding-bottom: 10px;
                    font-family: SlatePro;
                    margin-top: 15px;
                }
            }

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

<script type="text/ecmascript-6">

    import ProductItem from '../components/product-item.vue'
    import store from '../store'
    import StarList from '../components/star-list.vue'
    import CommentAlert from '../components/comment-alert.vue'
    import HtmlImageCompress from 'html-image-compress'

    export default {
        name: 'review',
        beforeRouteEnter(to, from, next){
            store.dispatch('paging', true);
            store.dispatch('loadOrder', {id: to.params.orderId}).then(function () {
                store.dispatch('loadComment', {productId: to.params.productId}).then(() => {
                    next()
                    store.dispatch('paging', false);
                });
            });
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
            }
        },
        computed: {
            order(){
                return this.$store.getters.order
            },
            comment(){
                return this.$store.getters.comment
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

        },
        components: {
            'product-item': ProductItem,
            'star-list': StarList,
            'comment-alert':CommentAlert,
            HtmlImageCompress
        },
        methods: {
            starClickHandle(data){
                this.comment.score = Number(data.star);
            },
            fitClickHandle(evt){
                evt.preventDefault()
                var fitNum = evt.target.getAttribute('value')
                this.comment.sizingRecommendation = fitNum
            },
            confirmHandle(evt){
                var _this = this;
                if(_this.comment.content!=''){
                    _this.isempty=false;
                    var files = this.files;
                    let promises = this.files.map(file => new HtmlImageCompress(file, {quality:.7, imageType:file.type}))


                    Promise.all(promises).then(results => {
                        let _files = results.map(result => result.file);
                        var formData = new FormData();
                        formData.append('content', this.comment.content);

                        if(!!this.comment.id && this.comment.id != null){
                            formData.append('id', this.comment.id);
                        }else{
                            formData.append('variantId', this.$route.params.variantId);
                        }


                        // formData.append('productId', _this.$route.params.productId);
                        formData.append('score', this.comment.score);
                        formData.append('sizingRecommendation', this.comment.sizingRecommendation);

                        if(!!_this.$route.params.orderId){
                            formData.append('orderId',_this.$route.params.orderId);
                        }

                        _files.forEach((file,index) => {
                            formData.append("imageFiles",  new File([file], files[index].name));
                        });

                        if(_this.comment.height && _this.comment.height != null){
                            formData.append('height', this.comment.height);
                        }
                        if(_this.comment.weight && _this.comment.weight != null){
                            formData.append('weight', this.comment.weight);
                        }
                        if(_this.comment.bust && _this.comment.bust != null){
                            formData.append('bust', this.comment.bust);
                        }
                        if(_this.comment.hips && _this.comment.hips != null){
                            formData.append('hips', this.comment.hips);
                        }
                        if(_this.comment.waist && _this.comment.waist != null){
                            formData.append('waist', this.comment.waist);
                        }

                        if(!!!_this.comment.productId)
                            _this.comment.productId = _this.$route.params.productId

                        _this.$store.dispatch('sendComment', {reply:formData}).then(() => {
                            console.log(this.comment.score);
                            if(this.comment.score>3){
                                this.issatisfy=false;
                                this.alertMess=_this.$t("message.shareCoupon")
                            }else{
                                this.issatisfy=true;
                                this.alertMess='Thank you for your comments.'
                            }
                            this.isconfirm=true;
                        });
                    });

                }else{
                    _this.isempty=true;
                }
            },
            backOrderPage(){
                this.$router.go(-1);
            },
            loadImg(event) {
                this.newfiles = [...event.target.files];
                this.files = this.files.concat(this.newfiles);
                var files = this.newfiles;
                _.each(files, (file) => {
                    this.addnum = this.addnum + 1;
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.uploadedImages.push(src)
                })
                if (this.uploadedImages.length > 5) {
                    this.uploadedImages.splice(5, this.uploadedImages.length - 5);
                    this.files.splice(5, this.files.length - 5)
                }
            },
            removeImg(index) {
                this.uploadedImages.splice(index, 1)
                this.files.splice(index, 1);
                this.addnum = this.addnum - 1;
            },
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