<template>
    <div>
        <div class="coupon">
            <img v-if="coupon" :src="coupon.imageUrl">
        </div>
        <ul v-if="socials" class="tb-share">
            <li v-for="social in socials"  class="tr">
                <a class="social-link" :href="social.href"><div class="img-td"><img :src="social.imageUrl"/></div>
                <p class="text-td">{{social.message}}</p></a>
            </li>
        </ul>
        <p class="detail" v-if="coupon">
            {{coupon.message}}
        </p>
            <div class="upload-container" id="imgboxid">
                <ul v-if="uploadedImages && uploadedImages.length">
                    <li v-for="(image,index) in uploadedImages" class="uploadImage" >
                        <img :src="image"/>
                        <span class="removeImg" @click="removeImg(index)">&times;</span>
                    </li>
                </ul>
                <div class="upload-img" id="uploadimg" v-show="uploadedImages.length<3">
                    <form ref="imageLoader">
                        <input type="file" name="imageFiles" multiple="multiple" @change="loadImg" accept="image/jpg,image/jpeg,image/png,image/gif">
                    </form>
                </div>
            </div>
            <div v-if="hasnoimage" class="no-images">Please add some images</div>
            <button @click.prevent="confirmed()" class="btn-confirm">Confirm</button>
        <div v-if="isconfirm">
            <div class="mask"></div>
            <comment-alert :data="commentAler" @hideAlert="hideAlert()"></comment-alert>
        </div>
        <div v-if="isloading" class="loadingbox">
            <div><img width="100%" src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/0115/5.gif"/></div>
        </div>
    </div>
</template>
<style scoped lang="scss" type="text/scss">
    .coupon{
        padding:6px;
        img{
            width:100%;
        }
    }
    .tb-share{
        display: table;
        padding:10px 0px;
        list-style: none;
        .tr{
            display:table-row;
            a{
                display:inline-block;
            }
            .social-link{
                color:blue;
                .img-td{
                    img{
                        width:40px;
                    }
                    display:table-cell;
                    padding:0px 10px;
                    vertical-align: middle;
                }
                .text-td{
                    display:table-cell;
                    padding:0px 10px;
                    vertical-align: middle;
                }
            }
        }
    }
    .detail{
        font-size: 13px;
        padding:10px;
        color:#666;
        background-color: #eee;
    }
    .upload-container{
        overflow:hidden;
        padding:10px;
        .upload-img{
            float:left;
            margin:5px;
            width: fit-content;
            background-image: url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1129/chicme-23.png");
            background-size:100%;
            input{
                display:inline-block;
                height:107.5px;
                width:88px;
                opacity: 0;
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
    .no-images{
        color:red;
        padding-left:10px;
        margin-bottom: 10px;
    }
    .btn-confirm{
        display:block;
        border:none;
        outline: none;
        margin:3px auto;
        width:60%;
        line-height:40px;
        font-size:18px;
        color:#ffffff;
        background-color: #e3004f;
        text-align: center;
        border-radius: 4px;
        cursor:pointer;
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
    .loadingbox{
        width:100%;
        height:100%;
        div{
            width:30px;
            height:30px;
            position:fixed;
            background-color: #fff;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
        }
    }
</style>
<script type="text/ecmascript-6">
    import CommentAlert from '../components/comment-alert.vue'
    import _ from 'lodash'
    import axios from '../api/apiconfig'
    import store from '../store'

    export default{
        data(){
            return{
                isconfirm:false,
                uploadedImages: [],
                files:[],
                hasnoimage:false,
                isloading:false
            }
        },
        computed:{
            commentAler(){
                return{
                    'isagree':true,
                    'message':'Your screenshots have uploaded,when we verify them,will put coupons in your wallet.',
                    'agreeText':'Yes'
                }
            },

            coupon(){
                return this.$store.getters.socialCoupon
            },
            socials(){
                return this.$store.getters.socials
            }

        },
        methods:{
            loadImg(event){
                var newfiles=[];
                Array.prototype.push.apply(newfiles, event.target.files);
                this.files=this.files.concat(newfiles);
                var files=newfiles;
                _.each(files, (file) => {
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.uploadedImages.push(src)
                })
                if(this.uploadedImages.length>3){
                    this.uploadedImages.splice(3,this.uploadedImages.length-3);
                    this.files.splice(3,this.files.length-3)
                }
            },
            removeImg(index){
                this.uploadedImages.splice(index,1)
                this.files.splice(index, 1);
            },
            confirmed(){
                this.isloading=true;
                var formData = new FormData();
                _.each(this.files, (file) => {
                    formData.append('imageFiles', file);
                });
                this.$store.dispatch('sendImages', formData).then(() => {
                    this.isloading=false;
                    if(this.uploadedImages.length!=0){
                        this.isconfirm=true;
                        this.hasnoimage=false;
                    }else{
                        this.hasnoimage=true;
                    }
                })
            },
            hideAlert(){
                this.isconfirm=false;
            }
        },

        beforeRouteEnter(to, from, next){
            store.dispatch('paging', true);
            store.dispatch('loadOutSite').then(function () {
                store.dispatch('paging', false);
                next();
            });
        },

        components:{
            'comment-alert':CommentAlert
        }
    }
</script>