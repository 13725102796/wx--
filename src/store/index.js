import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$store = new Vuex.Store({
      state: {
        count: 0
      },
      getters,
      actions,
      mutations,
  
      strict: debug
    })
  }
})

// export default createStore