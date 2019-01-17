<template id="review">
    <div class="review-body">
        <ul id="review-product">
            <product-item :item="item"/>
        </ul>

        <div id="review-star-area">
            <h3>{{$t("label.howItem")}}</h3>
            <star-list id="stars" :score="comment.score" @star="starClickHandle"/>
        </div>

        <div id="review-fit-area">
            <h3>{{$t("label.howProduct")}}</h3>

            <ul id="fit-select">
                <li @click="fitClickHandle" v-for="fit in fits" :value="fit.value"
                    :class="{active: fit.value === comment.sizingRecommendation}">{{fit.label}}
                </li>
            </ul>
        </div>

        <div id="review-content">
            <textarea :placeholder="$t('label.textAreaTip')"
                      v-model="comment.content"></textarea>
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

            <div v-if="sending" class="btn sending">{{$t("label.loading")}}</div>
            <div class="btn black" @click="confirmHandle" v-else>{{$t("label.confirm")}}</div>
        </div>
        <div v-if="isconfirm">
            <div class="mask"></div>
            <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
        </div>
    </div>
</template>
<style scoped lang="scss" type="text/scss">


    .review-body {

        h3 {
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 5px;
        }

        #review-product {
            padding: 10px;
        }

        #review-star-area {
            padding: 0 10px 10px 10px;

            #stars {
                margin-top: 5px;
            }

        }

        #review-fit-area {
            padding: 10px;
            border-top: 1px solid #efefef;
        }

        #fit-select {

            & > li {
                font-size: 12px;
                color: #9a9699;
                border-bottom: 1px solid #efefef;
                height: 35px;
                line-height: 35px;
                position: relative;
                cursor: pointer;

                &::after {
                    display: block;
                    width: 15px;
                    height: 15px;
                    border: 1px solid #dcdcdc;
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 10px;
                    border-radius: 50%;
                }

                &.active {

                    &::after {
                        border: 5px solid #e5004f;
                    }

                    color: #222928;
                }
            }
        }

        #review-content {

            margin-top: 5px;
            padding: 10px;

            textarea {
                width: 100%;
                height: 100%;
                resize: none;
                padding: 5px 10px;
                height: 110px;
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
        .mask{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
            background-color: rgba(0,0,0,0.4);
            z-index: 200;
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
                    {label: this.$t('label.tooSmall'), value: '3'},
                    {label: this.$t('label.goodFit'), value: '2'},
                    {label: this.$t('label.tooLarge'), value: '1'}
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
                        formData.append('id', this.comment.id);
                        formData.append('productId', _this.$route.params.productId);
                        formData.append('score', this.comment.score);
                        formData.append('sizingRecommendation', this.comment.sizingRecommendation);

                        _files.forEach((file,index) => {
                            formData.append("imageFiles",  new File([file], files[index].name));
                        });



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