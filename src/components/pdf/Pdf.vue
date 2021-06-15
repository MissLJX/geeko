<template>
  <div class="__pdf">
      <nav-bar>
          <i class="iconfont el-back-font" slot="left" @click="$emit('update:pdfActiveShow',false)">&#xe693;</i>
      </nav-bar>
      <div>
          <pdf ref="pdf" v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
      </div>
  </div>
</template>
<script>
    import pdf from 'vue-pdf'
    import NavBar from '../nav-bar.vue'

    export default {
        name:"Pdf",
        components:{
            pdf,NavBar
        },
        props:{
            url:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                numPages: null, // pdf 总页数
            }
        },
        mounted() {
            this.getNumPages();
            this.$emit("update:returnLogisticsLoddingShow",true);
        },
        methods: {
            // # 计算pdf页码总数
            getNumPages() {
                let loadingTask = pdf.createLoadingTask(this.url)
                loadingTask.promise.then(pdf => {
                    this.numPages = pdf.numPages;
                    this.$emit("update:returnLogisticsLoddingShow",false);
                }).catch(err => {
                    console.error('pdf 加载失败', err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .__pdf{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        z-index: 50;
        background-color: #ffffff;

        .close{
            text-align: right;
            padding: 10px;
            font-size: 20px;
        }
    }
</style>