/**
 * Created by shao_ on 2017/6/22.
 */
import api from '../../api/order';
import * as types from '../mutation-types';
import * as Constant from '../../utils/constant';

const state = {
  all: [],
  processing: [],
  shipped: [],
  confirmed: [],
  canceled: [],
  unpaid: [],
    paid:[],
  allLoading: false,
  processingLoading: false,
  shippedLoading: false,
  confirmedLoading: false,
  canceledLoading: false,
  unpaidLoading: false,
    paidLoading: false,
  tab: 'all',
  allSkip: 0,
  processingSkip: 0,
  confirmedSkip: 0,
  canceledSkip: 0,
  shippedSkip: 0,
  unpaidSkip: 0,
    paidSkip:0,
  allDone: false,
  processingDone: false,
  confirmedDone: false,
  canceledDone: false,
  shippedDone: false,
  unpaidDone: false,
    paidDone:false,
  bbmessage: null
};


const getters = {
  all: state => state.all,
  processing: state => state.processing,
  shipped: state => state.shipped,
  confirmed: state => state.confirmed,
  canceled: state => state.canceled,
  unpaid: state => state.unpaid,
    paid:state => state.paid,
  allLoading: state => state.allLoading,
  processingLoading: state => state.processingLoading,
  confirmedLoading: state => state.confirmedLoading,
  canceledLoading: state => state.canceledLoading,
  shippedLoading: state => state.shippedLoading,
  unpaidLoading: state => state.unpaidLoading,
    paidLoading:state => state.paidLoading,
  tab: state => state.tab,
  allSkip: state => state.allSkip,
  processingSkip: state => state.processingSkip,
  confirmedSkip: state => state.confirmedSkip,
  canceledSkip: state => state.canceledSkip,
  shippedSkip: state => state.shippedSkip,
  unpaidSkip: state => state.unpaidSkip,
    paidSkip: state => state.paidSkip,
  allDone: state => state.allDone,
  processingDone: state => state.processingDone,
  confirmedDone: state => state.confirmedDone,
  canceledDone: state => state.canceledDone,
  shippedDone: state => state.shippedDone,
  unpaidDone: state => state.unpaidDone,
    paidDone:state => state.paidDone,
  bbmessage: state => state.bbmessage
};


const mutations = {
  [types.HOME_ORDERS_ALL](state, orders) {
    state.all.push(...orders);
  },
  [types.HOME_LOADING_ALL](state, loading) {
    state.allLoading = loading;
  },
  [types.HOME_ORDER_ALL_SKIP](state, limit) {
    state.allSkip += limit;
  },
  [types.HOME_ALL_DONE](state) {
    state.allDone = true;
  },
  [types.HOME_ORDERS_PROCESSING](state, orders) {
    state.processing.push(...orders);
  },
  [types.HOME_LOADING_PROCESSING](state, loading) {
    state.processingLoading = loading;
  },
  [types.HOME_ORDER_PROCESSING_SKIP](state, limit) {
    state.processingSkip += limit;
  },
  [types.HOME_PROCESSING_DONE](state) {
    state.processingDone = true;
  },

  [types.HOME_ORDERS_UNPAID](state, orders) {
    state.unpaid.push(...orders);
  },
  [types.HOME_LOADING_UNPAID](state, loading) {
    state.unpaidLoading = loading;
  },
  [types.HOME_ORDER_UNPAID_SKIP](state, limit) {
    state.unpaidSkip += limit;
  },
  [types.HOME_UNPAID_DONE](state) {
    state.unpaidDone = true;
  },

    [types.HOME_ORDERS_PAID](state, orders) {
        state.paid.push(...orders);
    },
    [types.HOME_LOADING_PAID](state, loading) {
        state.paidLoading = loading;
    },
    [types.HOME_ORDER_PAID_SKIP](state, limit) {
        state.paidSkip += limit;
    },
    [types.HOME_PAID_DONE](state) {
        state.paidDone = true;
    },

  [types.HOME_ORDERS_SHIPPED](state, orders) {
    state.shipped.push(...orders);
  },
  [types.HOME_LOADING_SHIPPED](state, loading) {
    state.shippedLoading = loading;
  },
  [types.HOME_ORDER_SHIPPED_SKIP](state, limit) {
    state.shippedSkip += limit;
  },
  [types.HOME_SHIPPED_DONE](state) {
    state.shippedDone = true;
  },
  [types.HOME_ORDERS_CONFIRMED](state, orders) {
    state.confirmed.push(...orders);
  },
  [types.HOME_LOADING_CONFIRMED](state, loading) {
    state.confirmedLoading = loading;
  },
  [types.HOME_ORDER_CONFIRMED_SKIP](state, limit) {
    state.confirmedSkip += limit;
  },
  [types.HOME_CONFIRMED_DONE](state) {
    state.confirmedDone = true;
  },
  [types.HOME_ORDERS_CANCELED](state, orders) {
    state.canceled.push(...orders);
  },
  [types.HOME_LOADING_CANCELED](state, loading) {
    state.canceledLoading = loading;
  },
  [types.HOME_ORDER_CANCELED_SKIP](state, limit) {
    state.canceledSkip += limit;
  },
  [types.HOME_CANCELED_DONE](state) {
    state.canceledDone = true;
  },

  [types.HOME_CHANGE_TAB](state, tab) {
    state.tab = tab;
  },
  [types.HOME_ORDERS_STATUS_UPDATE](state, { id, status }) {
    var order;
    state.all && (order = state.all.find(o => o.id === id)) && (order.order.status = status);
  },
  [types.HOME_GET_M1135](state, result){
    const message = result ? result.message : '';
    state.bbmessage = message;
  }

};

const actions = {
  loadAll({ commit, state }, limit) {

    if (state.allDone) return;

    commit(types.HOME_LOADING_ALL, true);
    api.getOrders({
      skip: state.allSkip,
      api_suffix: 'get-orders'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_ALL, orders);
        commit(types.HOME_ORDER_ALL_SKIP, limit);
      } else {
        commit(types.HOME_ALL_DONE);
      }

      commit(types.HOME_LOADING_ALL, false);

    });
  },
  loadProcessing({ commit, state }, limit) {
    if (state.processingDone) {
      return;
    }
    commit(types.HOME_LOADING_PROCESSING, true);
    api.getOrders({
      skip: state.processingSkip,
      api_suffix: 'get-proccessing-orders'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_PROCESSING, orders);
        commit(types.HOME_ORDER_PROCESSING_SKIP, limit);
      } else {
        commit(types.HOME_PROCESSING_DONE);
      }

      commit(types.HOME_LOADING_PROCESSING, false);

    });
  },


  loadUnpaid({ commit, state }, limit) {
    if (state.unpaidDone) {
      return;
    }
    commit(types.HOME_LOADING_UNPAID, true);
    api.getOrders({
      skip: state.unpaidSkip,
      api_suffix: 'get-unpaid-orders2'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_UNPAID, orders);
        commit(types.HOME_ORDER_UNPAID_SKIP, limit);
      } else {
        commit(types.HOME_UNPAID_DONE);
      }

      commit(types.HOME_LOADING_UNPAID, false);

    });
  },
    loadPaid({ commit, state }, limit) {
        if (state.paidDone) {
            return;
        }
        commit(types.HOME_LOADING_PAID, true);
        api.getOrders({
            skip: state.paidSkip,
            api_suffix: 'get-paid-orders'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_PAID, orders);
                commit(types.HOME_ORDER_PAID_SKIP, limit);
            } else {
                commit(types.HOME_PAID_DONE);
            }

            commit(types.HOME_LOADING_PAID, false);

        });
    },

  loadConfirmed({ commit }, limit) {
    if (state.confirmedDone) {
      return;
    }

    commit(types.HOME_LOADING_CONFIRMED, true);
    api.getOrders({
      skip: state.confirmedSkip,
      api_suffix: 'get-receipt-orders'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_CONFIRMED, orders);
        commit(types.HOME_ORDER_CONFIRMED_SKIP, limit);
      } else {
        commit(types.HOME_CONFIRMED_DONE);
      }

      commit(types.HOME_LOADING_CONFIRMED, false);

    });
  },

  loadShipped({ commit }, limit) {
    if (state.shippedDone) {
      return;
    }
    commit(types.HOME_LOADING_SHIPPED, true);
    api.getOrders({
      skip: state.shippedSkip,
      api_suffix: 'get-shipped-orders'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_SHIPPED, orders);
        commit(types.HOME_ORDER_SHIPPED_SKIP, limit);
      } else {
        commit(types.HOME_SHIPPED_DONE);
      }

      commit(types.HOME_LOADING_SHIPPED, false);

    });
  },

  loadCanceled({ commit }, limit) {
    if (state.canceledDone) {
      return;
    }
    commit(types.HOME_LOADING_CANCELED, true);
    api.getOrders({
      skip: state.canceledSkip,
      api_suffix: 'get-canceled-orders'
    }, (orders) => {
      if (orders && orders.length > 0) {
        commit(types.HOME_ORDERS_CANCELED, orders);
        commit(types.HOME_ORDER_CANCELED_SKIP, limit);
      } else {
        commit(types.HOME_CANCELED_DONE);
      }

      commit(types.HOME_LOADING_CANCELED, false);

    });
  },


  changeTab({ commit }, { tab }) {
    commit(types.HOME_CHANGE_TAB, tab);
    return new Promise(function (resolve) {
      resolve(tab);
    });
  },
  updateStatusInOrders({ commit }, { id, status }) {
    commit(types.HOME_ORDERS_STATUS_UPDATE, {
      id,
      status
    });
  },
  getM1135({commit}){
    api.getM1135().then((reslut) => {
      commit(types.HOME_GET_M1135, reslut)
    })
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
