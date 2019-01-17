/**
 * Created by shao_ on 2017/6/22.
 */

import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import home from './modules/home';
import detail from './modules/detail';
import contact from './modules/contact'
import review from './modules/review'
import tracking from './modules/tracking'
import state from './states'
import outsideReview from './modules/outsideReview'
import youlike from './modules/youlike'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
        home,
        detail,
        contact,
        review,
        tracking,
        outsideReview,
        youlike
    }
});