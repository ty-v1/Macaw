import Vue from 'vue';
import Vuex from 'vuex';
import {LayoutStore} from "./store/LayoutStore";
import {VariantStore} from "./store/VariantStore";
import {VariantPopupStore} from "./store/VariantPopupStore";

// ストアの設定

Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            VariantStore,
            LayoutStore,
            VariantPopupStore
        },
    });

export default store;

