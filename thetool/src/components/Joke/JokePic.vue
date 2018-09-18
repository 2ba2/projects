<template>
  <cube-scroll :data="jokeList"
                ref="scroll"
                :options="options"
                @pulling-up="onPullingUp"
                class="joke-text">
    <ul>
      <li class="joke-item" v-for="(item, index) in jokeList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="img">
          <img :src="item.img" alt="img">
        </div>
        <div class="time">{{item.ct | formatTime}}</div>
        <div class="joke-common-blank"></div>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      jokeList: [],
      options: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        }
      },
      pageNumber: 1
    }
  },
  created() {
    this._getPicJoke()
  },
  methods: {
    async _getPicJoke(pageNumber = 1, pageSize = 30) {
      const result = await axios.get('/api/joke/picJoke', {
        params: {
          page: pageNumber,
          maxResult: pageSize
        }
      })
      if (result.data.showapi_res_code === 0) {
        this.jokeList = this.jokeList.concat(result.data.showapi_res_body.contentlist)
        // this.jokeList = result.data.showapi_res_body.contentlist
      }
      console.log(result)
    },
    onPullingUp() {
      this._getPicJoke(++this.pageNumber)
    }
  },
  filters: {
    /* eslint-disable */
    formatTime(date) {
      // 获取js 时间戳
      var time= Date.now();
      var newDate = new Date(date).getTime()

      time=parseInt((time - newDate)/1000);

      // 存储转换值
      var s;
      if(time<60*10){// 十分钟内
          return '刚刚';
      }else if((time<60*60)&&(time>=60*10)){
          // 超过十分钟少于1小时
          s = Math.floor(time/60);
          return  s+"分钟前";
      }else if((time<60*60*24)&&(time>=60*60)){
          // 超过1小时少于24小时
          s = Math.floor(time/60/60);
          return  s+"小时前";
      }else if((time<60*60*24*3)&&(time>=60*60*24)){
          // 超过1天少于3天内
          s = Math.floor(time/60/60/24);
          return s+"天前";
      }else{
          // 超过3天
          var date= new Date(date);
          return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.joke-text {
  .joke-item {
    margin-top: 15px;
    .title {
      font-size: 18px;
      line-height: 24px;
      margin-top: 8px;
      margin-bottom: 8px;
      padding-left: 16px;
      padding-right: 16px;
    }
    .img {
      padding-left: 16px;
      padding-right: 16px;
      img {
        width: 100%;
      }
    }
    .time {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      padding-left: 16px;
      padding-right: 16px;
    }
    .joke-common-blank {
      height: 10px;
      background-color: #f1f1f1;
    }
  }
}
</style>
