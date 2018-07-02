<template>
  <div class="page">
    <i-button type="ghost" @click="handleText">只显示文本</i-button>
    <i-button type="ghost" @click="handleSuccess">成功</i-button>
    <i-button type="ghost" @click="handleWarning">警告</i-button>
    <i-button type="ghost" @click="handleError">错误</i-button>
    <i-button type="ghost" @click="handleLoading">Loading</i-button>
    <i-button type="ghost" @click="handleIcon">使用图标</i-button>
    <i-button type="ghost" @click="handleImage">使用自定义图片</i-button>
    <i-button type="ghost" @click="handleMask">无遮罩层</i-button>

    <i-toast id="toast" />
    <div class="swiper">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in movies" :index="index" :key="index">
          <swiper-item>
            <image style="width:100%;hieght: 100%" :src="item" class="slide-image" mode="aspectFill"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
  
</template>

<script>
// import { formatTime } from '@/utils/index'
// import card from '@/components/card'
const { $Toast } = require('@/utils/index')
export default {
  components: {
    // card
  },
  data () {
    return {
      movies:[
        '../../static/img/swiper-test.jpg',
        '../../static/img/swiper-test.jpg',
        '../../static/img/swiper-test.jpg'
      ]
    }
  },
  created () {

  },
  methods: {
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    handleText () {
      $Toast({
        content: '这是文本提示'
      })
    },
    handleSuccess () {
      $Toast({
        content: '成功的提示',
        type: 'success'
      })
    },
    handleWarning () {
      $Toast({
        content: '警告的提示',
        type: 'warning'
      })
    },
    handleError () {
      $Toast({
        content: '错误的提示',
        type: 'error'
      })
    },
    handleLoading () {
      $Toast({
        content: '加载中',
        type: 'loading'
      })
    },
    handleIcon () {
      $Toast({
        content: '使用内置的图标',
        icon: 'praise'
      })
    },
    handleImage () {
      $Toast({
        content: '使用自定义图片',
        image: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
      })
    },
    handleMask () {
      $Toast({
        content: '5秒后自动关闭',
        icon: 'prompt',
        duration: 0,
        mask: false
      })
      setTimeout(() => {
        $Toast.hide()
      }, 5000)
    }
  }
}
</script>

<style scoped lang="sass">
.log-list 
  display: flex
  flex-direction: column
  padding: 40rpx
</style>