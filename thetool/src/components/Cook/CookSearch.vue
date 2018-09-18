<template>
  <div class="cook-search">
      <div class="search-input-wrapper">
        <cube-input v-model="search" placeholder="菜谱名、食材名" @keypress.enter="searchCook">
          <span slot="append" class="search-btn" @click="searchCook">搜索</span>
        </cube-input>
      </div>
      <div class="search-result-wrapper">
        <div class="empty-result" v-if="search.length === 0">
          请输入要搜索的关键字
        </div>
        <div class="list-wrapper" v-if="list.length > 0">
          <ul>
            <li class="list-item" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
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
        </div>
        <div class="empty-result" v-if="search.length !== 0 && list.length === 0">
          搜索无数据，请尝试其他关键字。
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CookSearch',
  data() {
    return {
      search: '',
      list: []
    }
  },
  methods: {
    async _getSearchResult(menu = '鱼香肉丝', pn = 0, rn = 30) {
      const result = await axios.get('/api/cook/query', {
        params: {
          menu,
          pn,
          rn
        }
      })
      if (result && result.data.error_code === 0) {
        this.list = result.data.result.data
      } else {
        this.list = []
      }
    },
    searchCook() {
      if (this.search) {
        this._getSearchResult(this.search)
      }
    },
    goDetail(id) {
      this.$router.push({path: '/cook-detail', query: { id: id }})
    }
  }
}
</script>

<style lang="stylus" scoped>
.cook-search
  .search-input-wrapper
    padding: 6px 20px;
    .cube-input
      background: #edf0f4;
      .search-btn
        height: 32px;
        background: #ff4c39;
        border-radius: 2px;
        color: #fff;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        display: block;
        line-height: 32px;
        text-align: center;
        width: 55px;
  .search-result-wrapper
    .empty-result
      height: 64px;
      font-size: 16px;
      color: #666;
      line-height: 64px;
      text-align: center;
    .list-wrapper
      width: 100%;
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
