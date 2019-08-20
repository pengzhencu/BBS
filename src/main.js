import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/store'
import $ from 'jquery'
Vue.config.productionTip = true;

Vue.use(VueAxios, axios);
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  components: { App },
  template: '<App/>'
})
