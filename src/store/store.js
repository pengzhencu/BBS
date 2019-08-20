import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 首先声明一个状态 state

const state = {
  username:'test',
  user_id:'1'
};
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
  saveName({commit}, msg) {
    commit('saveUserName', msg);    // 提交到mutations中处理
  },
};
// 更新状态
const mutations = {
  saveUserName(state, msg) {
    state.user_id = msg;
  },
};
// 获取状态信息
const getters = {
  showState(state) {
    console.log(state.username);
  },
};


// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
