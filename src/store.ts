import Vue from 'vue';
import Vuex, {createNamespacedHelpers} from 'vuex';
import {LayoutStore} from "./store/LayoutStore";
import {VariantStore} from "./store/VariantStore";

// ストアの設定

Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            VariantStore,
            LayoutStore
        },
    });

export default store;

