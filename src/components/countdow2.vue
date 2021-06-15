<template>
    <div class="countdown" v-if="lefting > 0">
        <slot name="icon"></slot>
        <slot name="font"></slot>
        <span class="time">{{countdowning}}</span>
    </div>
</template>

<script>
  const __dayoffset = 1000*60*60*24, __houroffset = 1000*60*60, __minuteoffset = 1000*60;


  export default {
    name: 'countdow',
    props: ['timeLeft'],
    data(){
      return {
        lefting: 0,
        timerId: null
      }
    },
    computed: {
      countdowning(){
        const lefting = this.lefting;
        const day = Math.floor(lefting / __dayoffset);
        const _leftday = lefting % __dayoffset;
        const hour = Math.floor(_leftday / __houroffset);
        const _lefthour = lefting % __houroffset;
        const minute = Math.floor(_lefthour / __minuteoffset);
        const second = Math.floor((lefting % __minuteoffset)/1000);
        return `${this.getFullNumber(day)} : ${this.getFullNumber(hour)} : ${this.getFullNumber(minute)} : ${this.getFullNumber(second)}`;
      }
    },
    methods: {
      getFullNumber(number){
        return number >= 10 ? number : ('0'+number);
      }
    },
    created(){
      let offset = 0;
      this.timerId = setInterval(() => {
        this.lefting = this.timeLeft - offset;
        offset+=1000;

        if(this.lefting <= 0){
          clearInterval(this.timerId)
        }

      }, 1000);
    },
    destroyed(){
        clearInterval(this.timerId)
    }

  };
</script>

<style scoped lang="scss">
  .countdown{
      display: inline-block;

      .label{
        font-family: SlatePro;
	      font-size: 14px;
      }

      .time{
        font-family: SlatePro-Medium;
	      font-size: 13px;
        margin-left: 5px;
      }

      .icon{
        font-size: 14px;
      }
  }

  @font-face {
    font-family: 'iconfont';  /* Project id 384296 */
    src: url('//at.alicdn.com/t/font_384296_7u3bsep3wtr.woff2?t=1620713955390') format('woff2'),
        url('//at.alicdn.com/t/font_384296_7u3bsep3wtr.woff?t=1620713955390') format('woff'),
        url('//at.alicdn.com/t/font_384296_7u3bsep3wtr.ttf?t=1620713955390') format('truetype');
  }

  .iconfont{
      font-family:"iconfont" !important;
      font-size:16px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
  }

</style>
