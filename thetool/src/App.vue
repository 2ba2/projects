<template>
  <div id="app">
    <header class="cube-bar">
      <z-icon type="icon-back" size="24" class="icon" color="#fc9153" @click.native="back"/>
      <h3 class="title">{{title}}</h3>
    </header>
    <keep-alive :include="['CookSearch', 'Iqa']">
      <router-view class="router-view"/>
    </keep-alive>
  </div>
</template>

<script>
import ZIcon from '@/base/ZIcon/ZIcon.vue'
import { mapState } from 'vuex'
export default {
  name: 'app',
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState({
      path: state => state.route.path,
      query: state => state.route.query
    }),
    title() {
      if (this.path === '/top-news') {
        return '新闻头条'
      }
      if (this.path === '/weixin') {
        return '微信精选'
      }
      if (this.path === '/cook-category') {
        return '菜谱大全'
      }
      if (this.path === '/cook-list') {
        return this.query.name
      }
      if (this.path === '/cook-detail') {
        return this.query.name
      }
      if (this.path === '/iqa') {
        return '智能问答'
      }
      return ''
    }
  },
  components: {
    ZIcon
  }
}
</script>

<style lang="stylus">
html, body
  height: 100%;
#app
  height: 100%;
  .cube-bar
    z-index: 10;
    position: absolute;
    right: 0;
    left: 0;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #edf0f4;
    box-shadow: 0 2px 1px #e9eaea;
    backface-visibility: hidden;
    .icon
      position: absolute;
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
    .title
      font-size: 18px;
  .router-view
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
</style>
