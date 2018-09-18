<template>
  <div class="cook-category">
    <div class="search" @click="goSearch">
      <z-icon type="icon-search" size="14" color="#aaa"/>
      <span>搜索你感兴趣的</span>
    </div>
    <div class="category-list" v-if="!!category">
      <cube-scroll class="menu-wrapper" :data="category">
        <ul>
          <li class="menu-item" v-for="(item, index) in category" :key="item.parentId" :class="{selected: selected ===  index}" @click="selectItem(index)">
            <span class="text">{{item.name}}</span>
          </li>
        </ul>
      </cube-scroll>
      <div class="list-wrapper">
        <ul>
          <li class="list-item" v-for="(item, index) in category" :key="item.parentId" v-show="selected ===  index">
            <ul class="food-wrapper">
              <li class="food-item" v-for="food in item.list" :key="food.id"><a @click.prevent="goList(food.id, food.name)">{{food.name}}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ZIcon from '@/base/ZIcon/ZIcon.vue'
export default {
  data() {
    return {
      searchValue: '',
      selected: 0,
      category: []
    }
  },
  created() {
    this._getCategory()
  },
  methods: {
    async _getCategory() {
      // 菜谱分类标签
      const res = await axios.get('/api/cook/category')
      if (res && res.data.error_code === 0) {
        this.category = res.data.result
      }
    },
    selectItem(index) {
      this.selected = index
    },
    goList(id, name) {
      this.$router.push({path: '/cook-list', query: { id: id, name: name }})
    },
    goSearch() {
      this.$router.push({path: '/cook-search'})
    }
  },
  components: {
    ZIcon
  }
}
</script>

<style lang="stylus" scoped>
.cook-category
  height: calc(100% - 44px);
  overflow: hidden;
  .search
    height: 32px;
    border-radius: 2px;
    background: #f5f5f5;
    line-height: 32px;
    margin: 0px 52px;
    color: #aaa;
    font-size: 14px;
    text-align: center;
    display: block;
    position: relative;
    top: 6px;
    box-sizing: border-box;
  .category-list
    display: flex;
    height: calc(100% - 40px);
    margin-top: 10px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    .menu-wrapper
      flex: 0 0 100px;
      width: 100px;
      background: #f3f5f7;
      height: 100%;
      .menu-item
        display: table;
        height: 54px;
        width: 76px;
        padding: 0 12px;
        line-height: 14px;
        &.selected
          background: #ffffff;
        .text
          display: table-cell;
          width: 76px;
          vertical-align: middle;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 14px;
    .list-wrapper
      width: 100%;
      height: 100%;
      overflow: scroll;
      .list-item
        .food-wrapper
          display: flex;
          flex-wrap: wrap;
          .food-item
            width: 33.33%;
            box-sizing: border-box;
            padding: 10px;
            font-size: 14px;
            a
              display: block;
              background: #f3f5f7;
              text-align: center;
              width: 100%;
              height: 40px;
              line-height: 40px;
</style>
