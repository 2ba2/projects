<template>
  <div class="iqa">
    <div class="msg-wrapper">
      <ul class="msg-ul" ref="msgList">
        <li class="msg-li clearfix" v-for="(item, index) in msgs" :key="index" :class="item.className">
          <div class="msg-div">
            <div class="msg-text">{{item.msg}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="msg-input-wrapper">
      <cube-input v-model="newMsg" placeholder="说点什么......">
        <span slot="append" class="search-btn" @click="sendMgs" >发送</span>
      </cube-input>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Iqa',
  data() {
    return {
      msgs: [
        {
          msg: '你好，我是小i机器人，很高兴认识你。',
          role: '小z',
          className: 'msg-left'
        }
      ],
      newMsg: ''
    }
  },
  created() {
    // this._iqaQuery()
  },
  methods: {
    async _iqaQuery(question = '时间') {
      const msgItem = {
        msg: '您输入的问题我暂时无法解答',
        role: '小z',
        className: 'msg-left'
      }
      const result = await axios.get('/api/iqa/query', {
        params: {
          question
        }
      })
      if (result.data.status === '0') {
        msgItem.msg = result.data.result.content
        msgItem.relquestion = result.data.result.relquestion
      }
      this.msgs.pop()
      this.msgs = this.msgs.concat(msgItem)
    },
    sendMgs() {
      if (this.newMsg) {
        const myMsg = {
          msg: this.newMsg,
          role: '我',
          className: 'msg-right'
        }
        const waitFor = {
          msg: '正在输入...',
          role: '小z',
          className: 'msg-left'
        }
        this.msgs = this.msgs.concat(myMsg, waitFor)
        this._iqaQuery(this.newMsg)
        this.newMsg = ''
      }
    }
  },
  watch: {
    msgs(newVal, oldVal) {
      const msgList = this.$refs.msgList
      const lastLi = msgList.lastElementChild
      lastLi.scrollIntoView()
    }
  }
}
</script>

<style lang="stylus" scoped>
.iqa
  width: 100%;
  background: #f0f2f8;
  .msg-wrapper
    margin-bottom: 50px;
    .msg-ul
      .msg-li
        margin: 14px;
        position: relative;
        .msg-div
          position: relative;
          padding: 4px;
          background-color: #ffffff;
          border-radius: 2px;
          display: inline-block;
          max-width: 80%;
          min-height: 20px;
          line-height: 20px;
          width: auto;
          .msg-text
            width: 100%;
            font-size: 14px;
            line-height: 20px;
            padding: 0;
            margin: 0;
            word-wrap: break-word;
            display: inline-block;
      .msg-left
        .msg-div
          &::before
            left: -12px;
            border-width: 0 12px 12px 0;
            width: 0;
            position: absolute;
            top: 12px;
            border-style: solid;
            border-color: transparent #ffffff;
            content: "";
      .msg-right
        text-align: right;
        .msg-div
          background: #10b5f6;
          float: right;
          color: #f0f0f0;
          position: relative;
          text-align: left;
          &::before
            width: 0;
            position: absolute;
            top: 12px;
            border-style: solid;
            content: "";
            border-color: transparent #10b5f6;
            right: -12px;
            border-width: 0 0 12px 12px;
      .clearfix
        &::after
          display: table;
          line-height: 0;
          content: "";
          clear: both;
  .msg-input-wrapper
    width: 100%;
    position: fixed;
    bottom: 0;
    .cube-input
      .search-btn
        bottom: 0;
        z-index: 101;
        // margin: 0;
        // padding-left: 10px;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
        border: none;
        width: 42px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
        background: #f0f2f8;
</style>
