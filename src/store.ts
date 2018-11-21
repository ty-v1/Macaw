import Vue from 'vue';
import Vuex from 'vuex';
import {LayoutStore} from "./store/LayoutStore";
import {VariantStore} from "./store/VariantStore";
import {VariantPopupStore} from "./store/VariantPopupStore";
import {DiffStore} from "./store/DiffStore";

// ストアの設定

Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            VariantStore,
            LayoutStore,
            VariantPopupStore,
            DiffStore
        },
    });

export default store;

