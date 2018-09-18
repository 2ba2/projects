<template>
  <div class="cook-detail">
    <div class="albums">
      <img :src="cook.albums" alt="albums">
    </div>
    <div class="title">
      <h3 class="name">{{cook.title}}</h3>
    </div>
    <div class="intro item">
      <h3 class="name">简介</h3>
      <p class="desc">{{cook.imtro}}</p>
    </div>
    <div class="tags item">
      <h3 class="name">标签</h3>
      <p class="desc">{{cook.tags}}</p>
    </div>
    <div class="ingredients item">
      <h3 class="name">主料</h3>
      <p class="desc" style="color: #ff4c39;">{{cook.ingredients}}</p>
    </div>
    <div class="burden item">
      <h3 class="name">辅料</h3>
      <p class="desc">{{cook.burden}}</p>
    </div>
    <div class="steps">
      <h3 class="name">步骤</h3>
      <div class="step-wrapper" v-for="(step, index) in cook.steps" :key="index">
        <h3 class="step-index">步骤{{index + 1}}</h3>
        <img :src="step.img" alt="step" class="step-img">
        <p class="step-desc">{{step.step}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      cook: {}
    }
  },
  created() {
    const id = this.$route.query.id
    this._getCookDetail(id)
  },
  methods: {
    async _getCookDetail(id = 1) {
      const result = await axios.get('/api/cook/queryid', {
        params: {
          id
        }
      })
      if (result && result.data.error_code === 0) {
        this.cook = result.data.result.data[0]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cook-detail
  width: 100%;
  .albums
    width: 100%;
    img
      width: 100%;
      height: 100%;
  .title
    width: 100%;
    height: 60px;
    margin-top: -4px;
    background: #ffffff;
    .name
      font-size: 24px;
      color: #000000;
      font-weight: bold;
      line-height: 24px;
      padding: 20px;
      text-align: center;
  .item
    padding: 0 20px 20px;
    .name
      color: #333333;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
      font-weight: 800;
    .desc
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      padding-bottom: 10px;
      color: #333333;
  .steps
    .name
      color: #333333;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
      font-weight: 800;
      padding-left: 20px;
    .step-wrapper
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      padding-bottom: 20px;
      color: #333333;
      .step-index
        text-align: center;
      .step-img
        width: 100%;
      .step-desc
        padding-left: 20px;
        padding-right: 20px;
</style>
