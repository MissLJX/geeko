/**
 * Created by shao_ on 2017/6/20.
 */
import 'babel-polyfill'
import Vue from 'vue';

import VueAwesomeSwiper from 'vue-awesome-swiper'

import VueRouter from 'vue-router';
import router from './router/router';
import store from './store';
import i18n from './i18n';
import App from './app.vue';

import tip from './components/message/index.js'

import Lodding from './components/lodding.vue'

Vue.prototype.$message = tip;

// import style (>= Swiper 6.x)  引入swiper样式
import 'swiper/swiper-bundle.css'

// 使用swiper插件
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.devtools = true;

// 全局注册loadding组件
Vue.component('lodding',Lodding);


Vue.use(VueRouter);

new Vue({
    store,
    i18n,
    router,
    el:'#app',
    render: (h) => h(App)
});


