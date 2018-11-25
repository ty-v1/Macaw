export interface DiffStoreState {
    variantIds: string[],
    variantIdSet: Set<string>
}

const state: DiffStoreState = {
    variantIds: [],
    variantIdSet: new Set<string>()
};

const getters = {
    variantIds: state => state.variantIds,
    contain: state => (variantId: string) => state.variantIdSet.has(variantId)
};

const mutations = {
    addVariantId: (state, payload) => {
        console.log(state.variantIdSet);
        const variantId: string = payload.variantId;
        if (!state.variantIdSet.has(variantId)) {
            state.variantIdSet.add(variantId);
            state.variantIds = Array.from(state.variantIdSet);
        }
    },
    deleteVariantId: (state, payload) => {
        const variantId: string = payload.variantId;

        if (state.variantIdSet.has(variantId)) {
            state.variantIdSet.delete(variantId);
            state.variantIds = Array.from(state.variantIdSet);
        }
    },
    clear: state => {
        state.variantIdSet.clear();
        state.variantIds = [];
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
