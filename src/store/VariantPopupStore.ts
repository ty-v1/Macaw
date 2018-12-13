import {Variant} from "@/scripts/data/Variant";
import {MessageData} from "@/scripts/data/MessageData";
import {NullMessageData} from "@/scripts/data/network/NullMessageData";

export interface VariantPopupStoreState {
    x: number,
    y: number,
    width: number,
    height: number,
    isShow: boolean,
    isUndefinedData: boolean,
    messageData: MessageData
}

const state: VariantPopupStoreState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isShow: false,
    isUndefinedData: true,
    messageData: new NullMessageData()
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

    messageData: state => state.messageData
};

const mutations = {
    dismiss: (state, payload) => {
        state.isShow = false;
    },

    initializeData: (state, payload) => {
        const variant: Variant = payload.variant;

        state.messageData = variant.generateMessage();
        state.isUndefinedData = (variant !== undefined);
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
