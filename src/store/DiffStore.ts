export interface DiffStoreState {
    variantId: number,
}

const state: DiffStoreState = {
    variantId: -1
};

const getters = {
    variantId: state => state.variantId
};

const mutations = {
    setVariantId: (state, payload) => state.variantId = payload.variantId,
    reset: state => {
        state.variantId = -1;
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
