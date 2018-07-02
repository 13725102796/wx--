import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': 'swiper',
    'usingComponents': {
      'i-toast': '/iview/toast/index',
      'i-button': '/iview/button/index'
    }
  }
}