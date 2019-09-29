import Vue from "vue";
import Vuex from "vuex";
import Config from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        buildIndex: null,
        currentDevOpsData: null,
    },
    getters: {
        config: (state) => {
            return Config;
        },
    },
    mutations: {
        DevOpsData: (state, payload) => {
            if (payload !== null) {
                state.currentDevOpsData = payload;
            }
        },
        BuildIndex: (state, payload) => {
            if (payload !== null) {
                state.buildIndex = payload;
            }
        },
    },
    actions: {
        updateDevOpsData: (injectee, payload) => {
            injectee.commit("DevOpsData", payload);
        },
        updateBuildIndex: (injectee, payload) => {
            injectee.commit("BuildIndex", payload);
        },
    },
});
