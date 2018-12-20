export interface DiffStoreState {
    variantId: string,
}

const state: DiffStoreState = {
    variantId: ''
};

const getters = {
    variantId: state => state.variantId
};

const mutations = {
    setVariantId: (state, payload) => state.variantId = payload.variantId,
    reset: state => {
        state.variantId = '';
    }
};

const actions = {};

export const DiffStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
