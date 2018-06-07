import Vue from 'vue';
import Vuex from 'vuex';
import global from './global';
import order from './order';
import shared from './shared';
import news from './news';

Vue.use(Vuex);
const STORE = new Vuex.Store({
    modules: {
        global: global,
        order: order,
        shared: shared,
        news: news
    }
})

export default STORE;