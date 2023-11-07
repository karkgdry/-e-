import Vue from "vue";
import Vuex from "vuex"


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        routes: []
    },
    //改变state里面对应值的一个方法
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    },


})

export default store