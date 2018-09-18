<template>
  <div class="joke">
    <div class="joke-type-wrapper">
      <ul class="joke-type">
        <li class="joke-type-item" @click="goJokeText" :class="{active : this.selectJokeType === 'text'}">
          <span>段子</span>
        </li>
        <li class="joke-type-item" @click="goJokePic" :class="{active : this.selectJokeType === 'pic'}">
          <span>图文</span>
        </li>
        <li class="joke-type-item" @click="goJokeGif" :class="{active : this.selectJokeType === 'gif'}">
          <span>趣图</span>
        </li>
      </ul>
    </div>
    <router-view class="joke-content-wrapper" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectJokeType: 'text'
    }
  },
  methods: {
    goJokeText() {
      this.selectJokeType = 'text'
      this.$router.push({ path: '/joke/text' })
    },
    goJokePic() {
      this.selectJokeType = 'pic'
      this.$router.push({ path: '/joke/pic' })
    },
    goJokeGif() {
      this.selectJokeType = 'gif'
      this.$router.push({ path: '/joke/gif' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.joke {
  width: 100%;
  height: 100%;
  color: #555555;
  .joke-type-wrapper {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eee;
    .joke-type {
      width: 100%;
      height: 39px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .joke-type-item {
        width: 33.33%;
        text-align: center;
        font-size: 16px;
      }
    }
    .active {
      border-bottom: 2px solid #ed4952;
      color: #ed4952;
    }
  }
  .joke-content-wrapper {
    height: 100%;
  }
}
</style>
