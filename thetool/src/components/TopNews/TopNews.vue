<template>
  <div class="top-news">
    <div class="cube-scroll-wrapper">
          <div class="tab">
      <div class="tab-item" v-for="(item, idx) in list2" :key="item" :class="{active: index === idx}" @click="selectedTab(idx)">{{item}}</div>
    </div>
    </div>
    <cube-loading :size="28" v-show="loading" class="loading"></cube-loading>
    <!-- <tab :line-width=2 active-color='#f85959' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab> -->
    <content v-if="!!news">
      <section class="swiper-content" v-for="newsItem in news" :key="newsItem.uniquekey">
        <a :href="newsItem.url" class="list-wrapper">
          <h3 class="title">{{newsItem.title}}</h3>
          <div class="list-image">
            <div class="list-img-holder" v-if="!!newsItem.thumbnail_pic_s">
              <img :src="newsItem.thumbnail_pic_s">
            </div>
            <div class="list-img-holder" v-if="!!newsItem.thumbnail_pic_s02">
              <img :src="newsItem.thumbnail_pic_s02">
            </div>
            <div class="list-img-holder" v-if="!!newsItem.thumbnail_pic_s03">
              <img :src="newsItem.thumbnail_pic_s03">
            </div>
          </div>
          <div class="desc">
            <span>{{newsItem.author_name}}</span> | {{newsItem.date | formatTime}}
          </div>
        </a>
      </section>
    </content>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      index: 0,
      demo2: '头条',
      list2: ['头条', '社会', '国内', '国际', '娱乐', '体育', '军事', '科技', '财经', '时尚'],
      news: [],
      loading: false
    }
  },
  created() {
    this._getTopNews()
  },
  methods: {
    async _getTopNews(type = 'top') {
      this.loading = true
      const res = await axios.get('/api/toutiao', {
        params: {
          type: type
        }
      })
      if (!res.data.error_code) {
        this.news = res.data.result.data
      }
      this.loading = false
    },
    selectedTab(idx) {
      this.index = idx
    }
  },
  watch: {
    index(newIndex, oldIndex) {
      const types = ['top', 'shehui', 'guonei', 'guoji', 'yule', 'tiyu', 'junshi', 'keji', 'caijing', 'shishang']
      this._getTopNews(types[newIndex])
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
          var date= new Date(parseInt(date) * 1000);
          return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
.top-news
  .cube-scroll-wrapper
    height: 46px;
    width: 100%;
    overflow: scroll;
    background: #f4f5f6;
    &::-webkit-scrollbar
      display:none;
    .tab
      height: 36px;
      width: 500px;
      font-size: 17px;
      .tab-item
        height: 26px;
        line-height 26px;
        margin: 10px;
        width: 50px;
        float: left;
        text-align center;
      .active
        color: #f85959;
  .loading
    width: 28px
    margin: 10px auto;
  .swiper-content
    margin: 0 15px;
    padding: 15px 0;
    border-bottom: 1px solid rgba(221, 221, 221, 0.6);
    &:last-child
      border-bottom: none;
    .list-wrapper
      .title
        font-size: 17px;
        line-height: 21px;
        color: #222222;
      .list-image
        margin-top: 6px;
        display: flex;
        div
          width: 33.33%;
          &:nth-child(2)
            margin-left: 2px;
            margin-right: 2px;
          img
            width: 100%;
      .desc
        font-size: 10px;
        color: #999999;
</style>
