import {Variant} from "@/scripts/data/Variant";

export interface VariantPopupStoreState {
    fitness: number,
    generationNumber: number
    x: number,
    y: number,
    width: number,
    height: number,
    isShow: boolean,
    isUndefinedData: boolean
}

const state: VariantPopupStoreState = {
    fitness: 0,
    generationNumber: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isShow: false,
    isUndefinedData: true
};

const getters = {
    fitness: state => state.fitness,

    generationNumber: state => state.generationNumber,

    x: state => state.x,

    y: state => state.y,

    width: state => state.width,

    height: state => state.height,

    isShow: state => state.isShow,

    isUndefinedData: state => state.isUndefinedData,
};

const mutations = {
    dismiss: (state, payload) => {
        state.isShow = false;
    },

    initializeData: (state, payload) => {
        const variant: Variant = payload.variant;

        state.isUndefinedData = (variant !== undefined);
        state.fitness = variant.getFitness();
        state.generationNumber = variant.getGenerationNumber();
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
