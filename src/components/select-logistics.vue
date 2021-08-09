<template>
    <div class="select-logistics">
        <div class="__header">
            <nav-bar>
                <i class="iconfont el-back-font" slot="left" @click="closeHandle">&#xe693;</i>
                <span slot="center">Logistics Company</span>
            </nav-bar>

            <div class="_hd" v-if="scrollShow">
                <div class="__title">Search</div>
                <div class="st-table select-logistics-container">
                    <div class="st-cell st-v-m">
                        <input type="text" value="111">
                    </div>
                    <div class="st-cell st-v-m st-t-r" @click="isSelectLogisticsShow = true">
                        <span class="iconfont __icon">&#xe772;</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mycontent" v-if="scrollShow">
            <Scroll class="content" ref="content" :probeType="2" @scroll="scrollHandle">
                <div class="__list" v-for="list in cityData">
                    <div class="__title">{{list.name}}</div>
                    <ul>
                        <li class="__item" v-for="item in list.cities" :data-name="item.name" :data-id="item.code">
                            <span
                            :data-item="JSON.stringify(item)"
                            @touchstart="chooseCity" 
                            @touchend="touchUp" 
                            :class="{'active' : item.name === itemName}"
                            >{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </Scroll>

            <div class="scroll-fixed">
                {{currIndex}}
            </div>
        </div>

        <div class="right-select-container" ref="rightSelectContainer"  @touchstart="touchIndex" v-if="scrollShow">
            <ul>
                <li v-for="(i,index) in cityData" class="__item" :data-anchor="i.name" :class="{'active' : i.name.substr(0, 1) == currIndex}">{{i.name.substr(0, 1)}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import Scroll from './scroll/Scroll.vue'
    import { cityData } from '../data/city.js'

    export default {
        name:"select-logistics",
        components:{
            NavBar,Scroll
        },
        data(){
            return {
                cityData:cityData,
                anchorMap: {},
                initY:0,
                itemName:"",
                scrollContainer:[],
                scrollY:0,
                scrollShow:false
            }
        },
        computed:{
            currIndex(){
                for(let i =0;i<this.scrollContainer.length;i++){
                    // console.log("this.scrollContainer[i+1]",typeof this.scrollContainer[i+1]);
                    if(typeof this.scrollContainer[i+1] === "object" && !!typeof this.scrollContainer[i+1]){
                        let height1 = -(this.scrollContainer[i].value);
                        let height2 = -(this.scrollContainer[i+1].value);
                        // console.log("height1",height1);
                        // console.log("height2",height2);
                        // console.log("this.scrlll",this.scrollY);
                        // console.log("(this.scrollY >= height1 && this.scrollY < height2)",(this.scrollY >= height1 && this.scrollY < height2));
                        // console.log("!height2",!height2);

                        if(this.scrollY >= height1 && this.scrollY < height2){
                            // console.log("this.scrollContainer[i].name",this.scrollContainer[i].name);
                            return this.scrollContainer[i].name;
                        }
                    }else{
                        return this.scrollContainer[this.scrollContainer.length-1].name;
                    }
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('close');
            },
            initCities(){
                let _this = this;
                let y = 0;
                var titleHeight = 22;
                var itemHeight = 44;

                _this.$refs.rightSelectContainer.style.top = ((_this.$refs.content.$el.clientHeight - _this.$refs.rightSelectContainer.clientHeight) / 2 + 100)  + "px";
                _this.cityData.forEach(function (e) {
                    let obj = {};
                    let name = e.name.substr(0, 1);
                    let len = e.cities.length;
                    _this.anchorMap[name] = y;
                    obj['name'] = name;
                    obj['value'] = y;
                    y -= titleHeight + len * itemHeight
                    _this.scrollContainer.push(obj);
                })
                _this.$refs.content.scrollTo(0, 0);

                // console.log("this.anchorMap",this.anchorMap);
                // console.log("this.scrollContainer",this.scrollContainer);
            },
            touchIndex: function (e) {
                // console.log(e, 'e')
                let _this = this
                let anchor = e.target.getAttribute('data-anchor')
                _this.scrollTo(anchor);
            },
            scrollTo: function (anchor) {
                let _this = this
                let cityScroller = _this.$refs.content.$refs.contentContainer;
                var maxScrollY = _this.$refs.content.$el.clientHeight - cityScroller.clientHeight
                var y = Math.min(0, Math.max(maxScrollY, _this.anchorMap[anchor]));
                if (!!y && typeof y !== 'undefined') {
                    _this.scrollY = -(y);
                    _this.$refs.content.scrollTo(0,y);
                }else{
                    _this.scrollY = 0;
                    _this.$refs.content.scrollTo(0,0);
                }
            },
            chooseCity(e){
                this.initY = e.changedTouches[0].screenY;
            },
            touchUp(e){
                let currentY = e.changedTouches[0].screenY,
                    cha = currentY - this.initY,
                    item = JSON.parse(e.target.dataset.item)
                if (-10 < cha && cha < 10) {
                    this.itemName = item.name;
                    this.$emit('getSelectValue',item.name);
                    this.$emit('close');
                }
            },
            scrollHandle(position){
                // console.log("position",position);
                this.scrollY = -(position.y);
                // console.log("this.container",this.scrollContainer);
                // console.log("currIndex",this.currIndex);
            }
        }, 
        mounted:function(){
            // this.initCities();
        }
    }
</script>

<style lang="scss" scoped>
    .select-logistics{
        position: fixed;
        top:0px;
        left: 0px;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        z-index: 2;
        .__header{
            padding-bottom: 10px;
            ._hd{
                padding: 0px 10px;
                .select-logistics-container{
                    width: 100%;
                    padding: 10px 0px 0px 0px;
                    border-bottom: 1px solid #e6e6e6;

                    input{
                        font-family: SlatePro;
                        font-size: 16px;
                        color: #222200;
                        padding: 5px 0px;
                        width: 100%;
                        border: none;
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
        }
        
        
        .mycontent{
            height: calc(100% - 100px);
            position: relative;
            overflow: hidden;
            .content{
                position: absolute;
                top: 0px;
                bottom: 51px;
                width: 100%;
                z-index: 100;
                background-color: #FFF;
                padding-left: 10px;

                .__list{
                    .__title{
                        height: 22px;
                        line-height: 22px;
                        font-family: SlatePro-Medium;
                        font-size: 16px;
                        color: #121314;
                        background-color: #f7f7f7;
                    }

                    .__item{
                        height: 44px;
                        line-height: 44px;
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #121314;

                        & > span{
                            display: block;
                            position: relative;
                        }

                        & > .active::after{
                            font-family: iconfont;
                            content: '\e638';
                            margin-left: 30px;
                            font-size: 15px;
                            color: #222222;
                        }
                    }
                }
            }

            .scroll-fixed{
                height: 22px;
                line-height: 22px;
                font-family: SlatePro-Medium;
                font-size: 16px;
                color: #121314;
                background-color: #f7f7f7;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 101;
                padding-left: 10px;
            }
        }
        

        .right-select-container{
            position: absolute;
            top: 140px;
            right:10px;
            z-index: 101;

            & > ul{
                text-align: center;
                width: 20px;
                padding: 20px 0px;
                .__item{
                    color: #999999;
                    height: 20px;
                    line-height: 20px;
                }

                .active{
                    color: red;
                }
            }
        }
    }
</style>