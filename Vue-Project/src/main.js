// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView)
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.axios = axios;
Vue.prototype.AjaxUrl = 'http://api_admin.tongyoutrip.com';
Vue.prototype.imgUrl = 'http://image.tongyoutrip.com';

// Vue.prototype.imgUrl = 'http://192.168.0.148';
// Vue.prototype.AjaxUrl = 'http://192.168.0.148:8091';
// Vue.prototype.AjaxUrl = 'http://192.168.0.17:8091';

// Vue.prototype.AjaxUrl = 'http://192.168.0.192:8091';  //测试

// Vue.prototype.AjaxUrl = 'http://192.168.0.16:8091';
// Vue.prototype.imgUrl = 'http://192.168.0.16:9000';

// Vue.prototype.AjaxUrl = 'http://192.168.0.17:8091';
// Vue.prototype.imgUrl = 'http://192.168.0.17:8010';
let qs = require('qs');
Vue.prototype.qs = qs;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  // 在发送请求之前做些什么
  if (getCookie('token') == "") {

  } else {
    if (config.data == undefined) {
      config.data = "";
    }
    config.headers.token = getCookie('token');
  }
  if (config.method === 'post') {
    //   config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.errorCode == 303){
    // deleteCookie("token");
    router.replace({
      path: '/',
      query: {redirect: router.currentRoute.fullPath}
  })
    this.$router.push({ path: "/" });
  }
  console.log(response.data.errorCode);
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
