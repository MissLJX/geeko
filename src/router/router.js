/**
 * Created by shao_ on 2017/6/20.
 */

import VueRouter from 'vue-router';
import { ROUTER_PATH_ORDER } from '../utils/constant';
import * as Constant from '../utils/constant';


import Home from '../pages/home.vue';
import HomeAll from '../pages/home-all.vue';
import HomeUnpaid from '../pages/home-unpaid.vue';

const HomeProcessing = () => import(/* webpackChunkName: "home-processing" */ '../pages/home-processing.vue');


// import HomePaid from '../pages/home-paid.vue';

const HomeConfirmed = () => import(/* webpackChunkName: "home-confirmed" */ '../pages/home-confirmed.vue')
const HomeShipped = () => import(/* webpackChunkName: "home-shipped" */ '../pages/home-shipped.vue');
const HomeCanceled = () => import(/* webpackChunkName: "home-canceled" */ '../pages/home-canceled.vue');
const Contact = () => import(/* webpackChunkName: "contact" */ '../pages/contact.vue');
const ContactCode = () => import(/* webpackChunkName: "contactcode" */ '../pages/contactcode.vue');

const OrderCode = () => import(/* webpackChunkName: "code" */ '../pages/code.vue');
const Review = () => import(/* webpackChunkName: "review" */ '../pages/review.vue');
const ShippingPolicy = () => import(/* webpackChunkName: "shipping-policy" */ '../pages/shipping-policy.vue');
const Tracking = () => import(/* webpackChunkName: "tracking" */ '../pages/tracking.vue');
const packageTracking = () => import(/* webpackChunkName: "package-tracking" */ '../pages/package-tracking.vue');
const Ticket = () => import(/* webpackChunkName: "ticket" */ '../pages/ticket.vue');
const OutsideReview = () => import(/* webpackChunkName: "outside-review" */ '../pages/outside-review.vue');

// const ReturnLogistics = () => import(/* webpackChunkName: "return-logistics" */ '../pages/return-logistics.vue');



const Page404 = () => import(/* webpackChunkName: "404" */ '../pages/404.vue');
const Page500 = () => import(/* webpackChunkName: "500" */ '../pages/500.vue');

const routes = [
  {
    path: '*',
    component: Page404
  },
  {
    path: ROUTER_PATH_ORDER,
    component: Home,
    meta: { keepAlive: true , headerShow :true },
    children: [
      {
        path: '',
        component: HomeAll,
        name: 'special-home-all',
        meta: { keepAlive: true , headerShow :true }
      },
      {
        path: 'all',
        component: HomeAll,
        name: 'home-all',
        meta: { keepAlive: true , headerShow :true }
      },
      {
        path: 'processing',
        component: HomeProcessing,
        name: 'home-processing',
        meta: { keepAlive: true , headerShow :true }
      },
      {
        path: 'unpaid',
        component: HomeUnpaid,
        name: 'home-unpaid',
        meta: { keepAlive: true , headerShow :true }
      },
      // {
      //     path: 'paid',
      //     component: HomePaid,
      //     name: 'home-paid',
      //     meta: { keepAlive: true }
      // },
      {
        path: 'shipped',
        component: HomeShipped,
        name: 'home-shipped',
        meta: { keepAlive: true , headerShow :true }
      },

      {
        path: 'confirmed',
        component: HomeConfirmed,
        name: 'home-confirmed',
        meta: { keepAlive: true , headerShow :true }
      },

      {
        path: 'canceled',
        component: HomeCanceled,
        name: 'home-canceled',
        meta: { keepAlive: true , headerShow :true }
      }
    ]
  },
  {
    path: ROUTER_PATH_ORDER + '/detail/:orderId',
    name: 'detail',
    component: () => import('../pages/detail3.vue'),
    meta: { keepAlive: false }
  },
  // 未知  order-detail的替代品
  {
    path: ROUTER_PATH_ORDER + '/code/:code',
    name: 'code',
    component: OrderCode,
    meta: { keepAlive: false }
  },
  {
    path: ROUTER_PATH_ORDER + '/tracking/:orderId',
    name: 'tracking',
    component: Tracking,
    meta: { keepAlive: false }
  },
  {
      path: ROUTER_PATH_ORDER + '/logistics-detail',
      name: 'logisticsDetail',
      component: Tracking,
      meta: { keepAlive: false }
  },
  {
      path: ROUTER_PATH_ORDER + '/packageTracking',
      name: 'packageTracking',
      component: packageTracking,
      meta: { keepAlive: false }
  },
  {
    path: ROUTER_PATH_ORDER + '/review/:orderId',
    name: 'review',
    component: Review
  },
  // 客服沟通订单聊天页面  contactCode   ticket 三个一样的页面
  {
    path: ROUTER_PATH_ORDER + '/contact/:orderId',
    name: 'contact',
    component: Contact
  },
  {
    path: ROUTER_PATH_ORDER + '/contact/code/:code',
    name: 'contactCode',
    component: ContactCode
  },
  {
    path: ROUTER_PATH_ORDER + '/shipping-policy',
    name: 'shippingPolicy',
    component: ShippingPolicy
  },
  {
    path: ROUTER_PATH_ORDER + '/ticket/:id',
    name: 'ticket',
    component: Ticket
  },
  {
    path: ROUTER_PATH_ORDER + '/outsideReview:id',
    name: 'outsideReview',
    component: OutsideReview
  },
  // {
  //   path:ROUTER_PATH_ORDER + "/return-logistics/:orderId",
  //   name:"returnLogistics",
  //   component:ReturnLogistics
  // }
];


export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
