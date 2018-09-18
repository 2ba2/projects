<template>
  <div class="weixin" id="weixin">
    <cube-scroll
      ref="scroll"
      :data="list"
      :options="options"
      @pulling-up="onPullingUp"
      @pulling-down="onPullingDown">
      <div v-for="item in list" :key="item.id">
        <a class="article-container" :href="item.url">
          <div class="img-wrapper">
            <img :src="item.firstImg" alt="" width="100px">
          </div>
          <div class="desc">
            <h3 class="title">{{item.title}}</h3>
            <!-- <p class="content">{{item.title}}</p> -->
            <div class="source">
              <span>{{item.source}}</span>
            </div>
          </div>
        </a>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      pageNumber: 1,
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '加载成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据'
          }
        }
      }
    }
  },
  created() {
    this._getSelectedWeixin()
  },
  methods: {
    async _getSelectedWeixin(pageNumber = 1, pageSize = 20) {
      const res = await axios.get('/api/weixin', {
        params: {
          pno: pageNumber,
          ps: pageSize
        }
      })
      if (!res.data.error_code) {
        this.list = this.list.concat(res.data.result.list)
        // this.list.push([...res.data.result.list])
      }
    },
    onPullingDown() {
      this._getSelectedWeixin(++this.pageNumber)
    },
    onPullingUp() {
      this._getSelectedWeixin(++this.pageNumber)
    }
  }
}
</script>

<style lang="stylus" scoped>
.weixin {
  margin: 10px;
  .article-container {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
    width: 100%;
    display: flex;
    .img-wrapper {
      margin-right: 10px;
    }
    .desc {
      .title {
        font-size: 18px;
        font-weight: 400;
        color: #222222;
      }
      .content {
        font-size: 14px;
      }
      .source {
        line-height: 24px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>
