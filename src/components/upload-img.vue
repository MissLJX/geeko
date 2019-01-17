<template>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                isconfirm:false,
                uploadedImages: [],
                files:[],
                hasnoimage:false,
                isloading:false
            }
        },
        methods: {
            loadImg(event) {
                var newfiles = [];
                Array.prototype.push.apply(newfiles, event.target.files);
                this.files = this.files.concat(newfiles);
                var files = newfiles;
                _.each(files, (file) => {
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.uploadedImages.push(src)
                })
                if (this.uploadedImages.length > 5) {
                    this.uploadedImages.splice(3, this.uploadedImages.length - 5);
                    this.files.splice(5, this.files.length - 5)
                }
            },
            removeImg(index) {
                this.uploadedImages.splice(index, 1)
                this.files.splice(index, 1);
            },
            confirmed() {
                this.isloading = true;
                var formData = new FormData();
                _.each(this.files, (file) => {
                    formData.append('imageFiles', file);
                });
                this.$store.dispatch('sendImages', formData).then(() => {
                    this.isloading = false;
                    if (this.uploadedImages.length != 0) {
                        this.isconfirm = true;
                        this.hasnoimage = false;
                    } else {
                        this.hasnoimage = true;
                    }
                })
            },
            hideAlert() {
                this.isconfirm = false;
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

    .upload-container{
        overflow:hidden;
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

</style>