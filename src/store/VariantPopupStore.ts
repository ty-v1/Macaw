export interface VariantPopupStoreState {
    x: number,
    y: number,
    width: number,
    height: number,
    isShow: boolean,
    message: Message
}

export type Message = {
    title: string,
    items: Item[]
}

export type Item = {
    name: string,
    value: string
}

const state: VariantPopupStoreState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isShow: false,
    message: {
        title: '',
        items: []
    }
};

const getters = {
    fitness: state => state.fitness,

    generationNumber: state => state.generationNumber,

    x: state => state.x,

    y: state => state.y,

    width: state => state.width,

    height: state => state.height,

    isShow: state => state.isShow,

    message: state => state.message
};

const mutations = {
    dismiss: (state, payload) => {
        state.isShow = false;
    },

    initializeData: (state, payload) => {
        state.message = payload.message;
        state.isShow = true;
        state.x = payload.x;
        state.y = payload.y;
        state.width = payload.width;
        state.height = payload.height;
    },
};

const actions = {};

export const VariantPopupStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
