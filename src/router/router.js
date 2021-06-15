/**
 * Created by shao_ on 2017/6/20.
 */

import VueRouter from 'vue-router';

import Home from '../pages/home.vue';
import HomeAll from '../pages/home-all.vue';
import HomeProcessing from '../pages/home-processing.vue';
import HomeUnpaid from '../pages/home-unpaid.vue';
import HomePaid from '../pages/home-paid.vue';
import HomeConfirmed from '../pages/home-confirmed.vue';
import HomeShipped from '../pages/home-shipped.vue';
import HomeCanceled from '../pages/home-canceled.vue';
import Contact from '../pages/contact.vue';
import ContactCode from '../pages/contactcode.vue';
import Detail from '../pages/detail.vue';

import Detail2 from '../pages/detail2.vue'

import Detail3 from '../pages/detail3.vue'

import OrderCode from '../pages/code.vue';
import Review from '../pages/review.vue';
import ShippingPolicy from '../pages/shipping-policy.vue';
import Tracking from '../pages/tracking.vue';
import packageTracking from '../pages/package-tracking.vue';
import Ticket from '../pages/ticket.vue';
import OutsideReview from '../pages/outside-review.vue';

import { ROUTER_PATH_ORDER } from '../utils/constant';

import ReturnLogistics from '../pages/return-logistics.vue'


import * as Constant from '../utils/constant';


import Page404 from '../pages/404.vue';
import Page500 from '../pages/500.vue';

const routes = [
  {
    path: '*',
    component: Page404
  },
  {
    path: ROUTER_PATH_ORDER,
    component: Home,
    meta: { keepAlive: true },
    children: [
      {
        path: '',
        component: HomeAll,
        name: 'special-home-all',
        meta: { keepAlive: true }
      },
      {
        path: 'all',
        component: HomeAll,
        name: 'home-all',
        meta: { keepAlive: true }
      },
      {
        path: 'processing',
        component: HomeProcessing,
        name: 'home-processing',
        meta: { keepAlive: true }
      },
      {
        path: 'unpaid',
        component: HomeUnpaid,
        name: 'home-unpaid',
        meta: { keepAlive: true }
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
        meta: { keepAlive: true }
      },

      {
        path: 'confirmed',
        component: HomeConfirmed,
        name: 'home-confirmed',
        meta: { keepAlive: true }
      },

      {
        path: 'canceled',
        component: HomeCanceled,
        name: 'home-canceled',
        meta: { keepAlive: true }
      }
    ]
  },
  {
    path: ROUTER_PATH_ORDER + '/detail/:orderId',
    name: 'detail',
    component: Detail3,
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
    path: ROUTER_PATH_ORDER + '/review/:productId/:orderId',
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
  {
    path:ROUTER_PATH_ORDER + "/return-logistics/:orderId",
    name:"returnLogistics",
    component:ReturnLogistics
  }
];


export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
});
