/**
 * Created by shao_ on 2017/6/20.
 */
import 'babel-polyfill'
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/router';
import store from './store';
import i18n from './i18n';
import App from './app.vue';



Vue.use(VueRouter);

new Vue({
    store,
    i18n,
    router,
    el:'#app',
    render: (h) => h(App)
});


