<template>
  <div class="cook-list">
    <div class="list-wrapper" v-if="!!list">
      <cube-scroll :data="list" :options="options" @pulling-up="onPullingUp"  ref="scroll">
        <ul>
          <li class="list-item" v-for="(item, index) in list" :key="index" @click="goDetail(item.id, item.title)">
            <div class="albums">
              <img :src="item.albums[0]" alt="菜谱">
            </div>
            <div class="desc">
              <h3 class="title">{{item.title}}</h3>
              <span class="ingredients">原料： {{item.ingredients}}</span>
              <span class="tags">{{item.tags}}</span>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CookList',
  data() {
    return {
      list: [],
      pageNumber: 1,
      options: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        }
      }
    }
  },
  created() {
    const id = this.$route.query.id
    this._getCookByIndex(id)
  },
  methods: {
    async _getCookByIndex(cid = 1, pn = 0, rn = 30, format = 1) {
      /*
      cid: 标签ID
      pn：数据返回起始下标，默认0
      rn：数据返回条数，最大30，默认10
      format：steps字段屏蔽，默认显示，format=1时屏蔽
      */
      const result = await axios.get('/api/cook/index', {
        params: {
          cid,
          pn,
          rn,
          format
        }
      })
      if (result && result.data.error_code === 0) {
        const totalNum = parseInt(result.data.result.totalNum, 10)
        if (pn * rn < totalNum) {
          const list = result.data.result.data
          this.list = this.list.concat(list)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }
    },
    onPullingUp() {
      const id = this.$route.query.id
      this._getCookByIndex(id, ++this.pageNumber)
    },
    goDetail(id, name) {
      this.$router.push({path: '/cook-detail', query: { id: id, name: name }})
    }
  }
}
</script>

<style lang="stylus" scoped>
.cook-list
  height: 100%;
  width: 100%;
  .list-wrapper
    width: 100%;
    height: 100%;
    .cube-scroll-wrapper
      height: 100%;
    .list-item
      width: 100%;
      display: flex;
      padding: 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #f3f5f7;
      .albums
        width: 100px;
        flex: 0 0 100px;
        float: left;
        img
          width: 100%;
      .desc
        margin-left: 15px;
        min-width: 0;
        .title
          font-size: 20px;
          line-height: 40px;
        .ingredients, .tags
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 32px;
</style>
