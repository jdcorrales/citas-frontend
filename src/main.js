// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

// Componentes
import App from './App'

// Routes
import router from './router'

// Stores
import store from './store/index'

// Helpers
import {
  initialize
} from './store/helper/general'

// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.config.productionTip = false

window.Vue = Vue

initialize(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
