<template>
    <div class="return-logistics">
        <page-header>
            <span>Return Logistics</span>
        </page-header>
        <div class="return-notshow" v-if="returnLogisticsShow">
            <div class="_bd">
                <div class="logistics-company">
                    <div class="__title">*Logistics Company</div>
                    <div class="st-table logistics-company-container">
                        <div class="st-cell st-v-m">
                            <span class="__font">{{itemName}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r" @click="isSelectLogisticsShow = true">
                            <span class="iconfont __icon">&#xe694;</span>
                        </div>
                    </div>
                </div>

                <div class="tracking-number" v-show="itemName === 'Other'">
                    <div class="__hd">*Logistics Company Name:</div>
                    <!-- <div class="__bd">LS996855224CH</div> -->
                    <input type="text" v-model="logisticsName">
                </div>

                <div class="tracking-number" style="padding-top:10px;">
                    <div class="__hd">*Tracking Number:</div>
                    <input type="text" v-model="logisticsNumber">
                </div>

                <div class="return-bg">
                    <span>Or</span>
                </div>

                <div class="upload-receipt">
                    <div class="__title">
                        <span>Upload Receipt</span>
                        <span>(Choose photo upload)</span>
                    </div>
                    <ul v-if="uploadedImages && uploadedImages.length">
                        <li v-for="(image,index) in uploadedImages" class="itemImage" :key="image+index">
                            <img :src="getDifferenceImage(image)" alt="image">
                            <span class="removeImage" @click="removeImage(index)">&times;</span>
                            <span class="pdf-name" v-if="image && image.type ==='pdf'">{{image.originalFilename}}</span>
                        </li>
                    </ul>
                    <div class="__container" v-show="uploadedImages.length < 5">
                        <form ref="imageUpload">
                            <input type="file" name="files" 
                            multiple="multiple" 
                            accept="image/jpg,image/jpeg,image/png,image/gif"
                            @change="uploadImages"
                            >
                        </form>

                        <div class="addbtn iconfont">&#xe644;</div>
                        <div class="addnum">{{addNum}} / 5</div>
                    </div>
                </div>
            </div>

            <div class="__footer">
                <div @click="confirmHandle">Submit</div>
            </div>
        </div>

        <div class="return-show" v-if="!returnLogisticsShow">
            <div class="__hd st-table">
                <div class="st-row" v-if="returnLogisticsValue.logisticsCompany">
                    <div class="st-cell">Logistics Company</div>
                    <div class="st-cell">{{returnLogisticsValue.logisticsCompany}}</div>
                </div>
                <div class="st-row" v-if="returnLogisticsValue.trackingNumber">
                    <div class="st-cell">Tracking Number</div>
                    <div class="st-cell">{{returnLogisticsValue.trackingNumber}}</div>
                </div>
            </div>

            <div class="receipt" v-if="returnLogisticsValue.receiptFiles && returnLogisticsValue.receiptFiles.length > 0">
                <p>Receipt</p>
                <ul>
                    <!-- https://image.geeko.ltd/returnLogistics/1a6x2d2c4x2b8k5m4T5m7B0v4W -->
                    <li v-for="(item,index) in returnLogisticsValue.receiptFiles" :key="item+index">
                        <img :src="getDifferenceImage(item)" alt="Image" @click="magnifyImage($event)">
                        <a 
                            class="pdf-click"
                            @click.prevent="previewPdf('https://s3-us-west-2.amazonaws.com/image.chic-fusion.com'+item.url)"
                            v-if="item && item.type ==='pdf'"
                        >
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer">
                <span>The information is wrong? </span><a @click="returnLogisticsShowActive = true;">Fill in again</a>
            </div>
        </div>
        

        <transition name="uper">
            <select-logistics 
                v-if="isSelectLogisticsShow" 
                v-bind:close.sync="isSelectLogisticsShow"
                @getSelectValue="getSelectValue" 
                :logisticsCompanies="logisticsCompanies"
            >
            </select-logistics>
        </transition>

        <lodding v-if="returnLogisticsLoddingShow || (!!!this.returnLogistics)"></lodding>

        <image-magnification 
            :imageSrc="imageMagnificationSrc" 
            v-if="imageMagnificationShow"
            :closeImageMask.sync="imageMagnificationShow"
        >
        </image-magnification>

        <transition name="uper">
            <pdf 
                :url="pdfUrl"
                v-if="pdfActiveShow"
                :pdfActiveShow.sync="pdfActiveShow"
                :returnLogisticsLoddingShow.sync="returnLogisticsLoddingShow"
            >
            </pdf>
        </transition>
    </div>
</template>

<script>
    import PageHeader from '../components/page-header.vue'
    import SelectLogistics from '../components/select-logistics2.vue'
    import ImageMagnification from '../components/image-magnification.vue'
    import store from '../store/index.js'

    import Pdf from '../components/pdf/Pdf.vue'


    import HtmlImageCompress from 'html-image-compress'
    import { mapGetters } from 'vuex';


    export default {
        name:"ReturnLogistics",
        components:{
            PageHeader,SelectLogistics,ImageMagnification,HtmlImageCompress,Pdf
        },
        data(){
            return {
                isSelectLogisticsShow:false,
                itemName:"",
                newFiles:[],
                files:[],
                uploadedImages:[],
                addNum:0,
                logisticsName:'',
                // logisticsNumber:'LS996855224CH',
                logisticsNumber:'',
                returnLogisticsLoddingShow:false,
                returnLogisticsShowActive:false,
                imageMagnificationShow:false,
                imageMagnificationSrc:'',
                pdfActiveShow:false,
                pdfUrl:""
            }
        },
        created(){
            let _this = this;
            this.$store.dispatch('getLogisticsCompanies');
            this.$store.dispatch('getReturnLogistics',this.$route.params.orderId).then((result) => {
                if(result && result.length > 0){
                    var item = result[0];
                    _this.itemName = item.logisticsCompany ? item.logisticsCompany : "";
                    _this.logisticsNumber = item.trackingNumber ? item.trackingNumber : "";
                    _this.uploadedImages = item.receiptFiles && item.receiptFiles.length > 0 ? item.receiptFiles : [];
                    _this.addNum = item.receiptFiles && item.receiptFiles.length > 0 ? item.receiptFiles.length : 0;
                }
            });
        },
        computed:{
            ...mapGetters(['logisticsCompanies','returnLogistics']),
            returnLogisticsShow(){
               return !!this.returnLogistics && this.returnLogistics.length < 0 || this.returnLogisticsShowActive;
            },
            returnLogisticsValue(){
                return !!this.returnLogistics && this.returnLogistics.length > 0 ? this.returnLogistics[0] : {};
            }
        },
        methods:{
            getSelectValue(value){
                if(value){
                    this.itemName = value;                  
                }
            },
            uploadImages(event){
                let _this = this;
                this.newFiles = [...event.target.files];
                this.files = this.files.concat(this.newFiles);
                let files = this.files;
                console.log("files",files);

                let promises = this.files.map(file => new HtmlImageCompress(file,{quality:.7, imageType:file.type}));

                Promise.all(promises).then(result => {
                    let formData = new FormData();
                    formData.append("type","returnLogistics");
                    this.returnLogisticsLoddingShow = true;
                    
                    let _files = result.map(result => result.file);

                    _files.forEach((file,index) => {
                        formData.append("files",new File([file],files[index].name));
                    });

                    // for (var [a, b] of formData.entries()) {
                    //     console.log("formData",a, b);
                    // }

                    this.$store.dispatch('generalUploadImage',{formData}).then((result) => {
                        console.log("Imageresult",result);
                        if(!!result && result.length > 0){
                            result.forEach((item) => {
                                _this.addNum += 1;
                                _this.uploadedImages.push(item);
                            });
                            _this.returnLogisticsLoddingShow = false;
                        }
                    });
                });

                if (this.uploadedImages.length > 5) {
                    this.uploadedImages.splice(5, this.uploadedImages.length - 5);
                    this.files.splice(5, this.files.length - 5)
                }
            },
            removeImage(index){
                this.uploadedImages.splice(index,1);
                this.addNum -= 1;
            },
            confirmHandle(event){
                if(!!!this.itemName && this.uploadedImages.length <= 0){
                    this.$message({
                        content:"Logistics information and logistics voucher can not be empty at the same time!",
                        type:"err",
                        timer:5000
                    }).show();
                    return;
                }
                var uploadFiles = new Object();

                this.returnLogisticsLoddingShow = true;

                if(this.$route.params.orderId && this.$route.params.orderId != null){
                    uploadFiles['orderId'] = this.$route.params.orderId;
                }

                if(!!this.returnLogisticsValue && Object.keys(this.returnLogisticsValue).length > 0){
                    uploadFiles['id'] = this.returnLogisticsValue.id;
                }

                if(!!this.itemName && this.itemName !== "" && this.itemName !== "Other"){
                    // 物流选择后的值   物流名
                    uploadFiles['logisticsCompany'] = this.itemName;
                }else if(this.itemName === "Other" && !!!this.logisticsName && this.logisticsName === ""){
                    this.$message({
                        content:"Logistics Company Name Can not be empty",
                        type:"err",
                        timer:5000
                    }).show();
                    this.returnLogisticsLoddingShow = false;
                    return;
                }else{
                    uploadFiles['logisticsCompany'] = this.logisticsName;
                }
                
                if(this.itemName !== "" || this.logisticsName !== ""){
                    if(!!!this.logisticsNumber && this.logisticsNumber === ""){
                        this.$message({
                            content:"trackingNumber can not be empty",
                            type:"err",
                            timer:5000
                        }).show();
                        this.returnLogisticsLoddingShow = false;
                        return;
                    }else{
                        uploadFiles['trackingNumber'] = this.logisticsNumber;
                    }
                }

                console.log("_this",this);


                if(this.uploadedImages.length > 0){
                    uploadFiles['receiptFiles'] = this.uploadedImages;
                    console.log("uploadFiles",uploadFiles);
                }

                this.$store.dispatch('addReturnLogistics',uploadFiles).then((result) => {
                    this.$message({
                        content:"Submitted successfully！",
                        type:"customization",
                        timer:5000
                    }).show();
                    this.returnLogisticsLoddingShow = false;
                    console.log("result",result);
                });
            },
            magnifyImage(event){
                this.imageMagnificationSrc = event.target.src;
                this.imageMagnificationShow = true;
            },
            closeImageMask(){
                this.imageMagnificationShow = false;
            },
            getDifferenceImage(item){
                if(item && !!item && item != null){
                    return item.type === "pdf" ? "https://image.geeko.ltd/chicme/20210518/pdf.png" : "https://image.geeko.ltd"+item.url;
                }
            },
            previewPdf(url){
                this.pdfActiveShow = true,
                this.pdfUrl = url;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .return-logistics{
        .return-notshow{
            ._bd{
                border-top: 8px solid #f7f7f7;
                .logistics-company{
                    padding: 10px;
                    .logistics-company-container{
                        width: 100%;
                        padding: 10px 0px;
                        border-bottom: 1px solid #e6e6e6;

                        .__font{
                            font-family: SlatePro;
                            font-size: 16px;
                            color: #222200;
                        }

                        .__icon{
                            color: #9b9b9b;
                            font-size: 17px;
                        }
                    }

                    .__title{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #666666;
                    }
                }

                .tracking-number{
                    padding-left: 10px;
                    .__hd{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #666666;
                    }


                    input{
                        width: 100%;
                        border: none;
                        border-bottom: 1px solid #e6e6e6;
                        outline: none;
                        box-shadow: none;
                        font-family: SlatePro;
                        color: #222200;
                        font-size: 16px;
                        padding: 8px 5px 5px 0px;
                    }
                }

                .return-bg{
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
                    background-color: #f7f7f7;
                    font-family: SlatePro;
                    font-size: 16px;
                    color: #666666;
                    margin-top: 20px;
                }

                .upload-receipt{
                    padding: 40px 10px 0px 10px;
                    overflow: hidden;
                    .__title{
                        padding-bottom: 10px;
                        & > span:first-child{
                            font-family: SlatePro-Medium;
                            font-size: 16px;
                            color: #222222;
                        }

                        & > span:last-child{
                            font-family: SlatePro;
                            font-size: 12px;
                            color: #666666;
                        }
                    }

                    .__container{
                        float:left;
                        margin:5px;
                        width: fit-content;
                        background-size:100%;
                        position: relative;
                        border: 1px dashed #999;
                        input{
                            display:inline-block;
                            width: 80px;
                            height: 80px;
                            opacity: 0;
                            position: relative;
                            z-index: 1;
                        }
                        .addbtn{
                            position: absolute;
                            // top: calc(50% - 25px);
                            // left: calc(50% - 8px);
                            top:50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            font-size: 32px;
                            z-index: 0;
                            color: #bbbbbb;
                        }
                        .addnum{
                            position: absolute;
                            top: 70%;
                            left: 50%;
                            transform: translateX(-50%);
                            font-size: 12px;
                            z-index: 0;
                            color: #999;
                        }
                    }

                    .itemImage{
                        width: 80px;
                        height: 80px;
                        float: left;
                        position: relative;
                        overflow: hidden;
                        margin: 5px;
                        background-color: #fafafa;

                        & > img{
                            width: 100%;
                        }

                        .removeImage{
                            width:20px;
                            line-height:20px;
                            font-size: 29px;
                            text-align: center;
                            display: block;
                            border-radius: 50%;
                            background-color: #222222;
                            color:#ffffff;
                            position:absolute;
                            top:0px;
                            right:0px;
                            z-index: 2;
                        }

                        .pdf-name{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            color: yellow;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            font-size: 12px;
                        }
                    }
                }
            }

            .__footer{
                position: fixed;
                left: 0px;
                right: 0px;
                bottom: 30px;
                padding: 0px 13px;
                
                & > div{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    color: #ffffff;
                    font-family: SlatePro-Medium;
                    font-size: 17px;
                    text-align: center;
                    background-color: #222222;
                }
            }
        }

        
        .return-show{
            border-top: 8px solid #f7f7f7;
            width: 100%;
            .__hd{
                padding: 10px;
                .st-row{
                    height: 30px;
                    line-height: 30px;

                    & > div:first-child{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #666666;
                    }

                    & > div:last-child{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #222222;
                        padding-left: 15px;
                    }
                }
            }

            .receipt{
                padding: 0px 10px;
                & > p{
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #222222;
                    line-height: 40px;
                }

                & > ul{
                    & > li{
                        width: 70px;
                        height: 70px;
                        position: relative;
                        float: left;
                        margin: 5px;
                        overflow: hidden;
                        background-color: #fafafa;

                        & img{
                            width: 100%;
                        }

                        & .pdf-click{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 1;
                        }
                    }

                    &:after{
                        display: block;
                        content: '';
                        clear: both;
                    }
                }
            }

            .footer{
                font-family: SlatePro;
	            font-size: 14px;
                color: #666666;
                border-top: 1px solid #eeeeee;
                padding: 10px;
                margin-top: 20px;
                & a{
                    text-decoration: underline;
                    cursor: pointer;
                    display: inline;
                }
            }
        }

        .uper-enter-active, .uper-leave-to{
            top:0;
        }

        .uper-enter-active , .uper-leave-active{
            transition: top .3s;
        }

        .uper-leave-active , .uper-enter{
            top: 100%;
        }
    }
</style>