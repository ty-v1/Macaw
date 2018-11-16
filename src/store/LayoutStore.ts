import {NWEdge} from "@/scripts/data/network/NWEdge";
import {ILayoutStrategy} from "@/scripts/network/layout/ILayoutStrategy";
import {NWNode} from "@/scripts/data/network/NWNode";
import HashMap from "hashmap";
import {DefaultLayout} from "@/scripts/network/layout/DefaultLayout";

export interface LayoutStoreState {
    layoutStrategy: ILayoutStrategy,
    nodeCache: HashMap<string, NWNode>,
    edgeCache: HashMap<string, NWEdge>,
    SVGWidth: number,
    SVGHeight: number
}

const state: LayoutStoreState = {
    layoutStrategy: new DefaultLayout(),
    nodeCache: new HashMap<string, NWNode>(),
    edgeCache: new HashMap<string, NWEdge>(),
    SVGWidth: 0,
    SVGHeight: 0
};


const getters = {

    node: state => variant => {

        console.log('node');
        return [state.nodeCache.get(variant.getId())];
        // // } else {
        //     return state.layoutStrategy.locateNodes(variant);
        // }
    },

    edge: state => variant => {

        console.log('edge');
        return state.edgeCache.values();
        // if (state.layoutStrategy.needsCachingEdge()) {
        // return [state.edgeCache.get(variant.getId())];
        // } else {
        //     return state.layoutStrategy.locateEdges(variant, state.nodeCache);
        // }
    },
    SVGHeight: state => state.SVGHeight,

    SVGWidth: state => state.SVGWidth
};

const mutations = {
    setStrategy: (state, payload) => {
        _setStrategy(state, payload);
    },

    createEdgeCache: (state, payload) => {
        // _createEdgeCache(state, payload);
    },

    createNodeCache: (state, payload) => {
        // _createNodeCache(state, payload);
    },

    calculateSVGWidth: (state, payload) => {
        _calculateSVGWidth(state, payload);
    },

    calculateSVGHeight: (state, payload) => {
        _calculateSVGHeight(state, payload);
    },

    createLayout: (state, payload) => {
        _createLayout(state, payload);
    },

    // レイアウトを再適用する
    applyLayout: (state, payload) => {
        _applyLayout(state, payload);
    },

};

// mutationで使うサブルーチン
function _setStrategy(state: LayoutStoreState, payload) {
    state.layoutStrategy = payload.layoutStrategy;
}

function _createNWCache(state: LayoutStoreState, payload) {
    const result = state.layoutStrategy.createNWCache(
        payload.variants,
        payload.maxGenerationNumber,
        payload.generationNumberToVariantCount
    );

    state.edgeCache = result.edgeCache;

    console.log('edgeC');
    console.log(result.edgeCache);

    state.nodeCache = result.nodeCache;
}

function _createEdgeCache(state: LayoutStoreState, payload) {
    // if (state.layoutStrategy.needsCachingEdge()) {
    //     state.edgeCache =
    //         state.layoutStrategy.createEdgeCache(
    //             payload.variants,
    //             payload.maxGenerationNumber,
    //             payload.generationNumberToVariantCount
    //         );
    // } else {
    //     state.edgeCache.clear();
    // }
}

function _createNodeCache(state: LayoutStoreState, payload) {
    // if (state.layoutStrategy.needsCachingNode()) {
    //     state.nodeCache =
    //         state.layoutStrategy.createNodeCache(
    //             payload.variants,
    //             payload.maxGenerationNumber,
    //             payload.generationNumberToVariantCount
    //         );
    //     console.log('t');
    //
    //     console.log(state.nodeCache.count());
    // } else {
    //     console.log('f');
    //     state.nodeCache.clear();
    // }
}

function _calculateSVGWidth(state: LayoutStoreState, payload) {
    state.SVGWidth = state.layoutStrategy.getSVGWidth(
        payload.variants,
        payload.maxGenerationNumber,
        payload.generationNumberToVariantCount
    );
}

function _calculateSVGHeight(state: LayoutStoreState, payload) {
    state.SVGHeight = state.layoutStrategy.getSVGHeight(
        payload.variants,
        payload.maxGenerationNumber,
        payload.generationNumberToVariantCount
    );
}

function _createLayout(state, payload) {
    // ストラテジーをセットする
    _setStrategy(state, payload);

    // レイアウトの適用
    _applyLayout(state, payload);
}

function _applyLayout(state, payload) {
    // ノード・エッジの位置を計算する
    // _createNodeCache(state, payload);
    //
    // _createEdgeCache(state, payload);

    _createNWCache(state, payload);

    // SVG領域の大きさを計算する
    _calculateSVGHeight(state, payload);

    _calculateSVGWidth(state, payload);
}

const actions = {
    //
    // createLayout: ({dispatch, commit}, payload) => {
    //     // ストラテジーをセットする
    //     commit({
    //                type: 'setStrategy',
    //                layoutStrategy: payload.layoutStrategy
    //            });
    //
    //     // レイアウトの適用
    //     dispatch('applyLayout', {
    //         variants: payload.variants,
    //         maxGenerationNumber: payload.maxGenerationNumber,
    //         generationNumberToVariantCount: payload.generationNumberToVariantCount
    //     })
    //         .then();
    // },
    //
    // // レイアウトを再適用する
    // applyLayout: ({dispatch, commit}, payload) => {
    //     // ノード・エッジの位置を計算する
    //     commit({
    //                type: 'createNodeCache',
    //                variants: payload.variants,
    //                maxGenerationNumber: payload.maxGenerationNumber,
    //                generationNumberToVariantCount: payload.generationNumberToVariantCount
    //            });
    //
    //     commit({
    //                type: 'createEdgeCache',
    //                variants: payload.variants,
    //                maxGenerationNumber: payload.maxGenerationNumber,
    //                generationNumberToVariantCount: payload.generationNumberToVariantCount
    //            });
    //
    //     // SVG領域の大きさを計算する
    //     commit({
    //                type: 'calculateSVGWidth',
    //                variants: payload.variants,
    //                maxGenerationNumber: payload.maxGenerationNumber,
    //                generationNumberToVariantCount: payload.generationNumberToVariantCount
    //            });
    //
    //     commit({
    //                type: 'calculateSVGHeight',
    //                variants: payload.variants,
    //                maxGenerationNumber: payload.maxGenerationNumber,
    //                generationNumberToVariantCount: payload.generationNumberToVariantCount
    //            });
    // },


};

// export =

export const LayoutStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
