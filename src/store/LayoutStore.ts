import {GraphNode} from "@/scripts/data/network/GraphNode";
import {Layout} from "@/scripts/data/network/Layout";
import {LayoutFactory} from "@/scripts/network/layout/LayoutFactory";
import {DefaultNodeColor} from "@/scripts/network/node/strategy/color/DefaultNodeColor";
import {DefaultNodePosition} from "@/scripts/network/node/strategy/position/DefaultNodePosition";
import {DefaultNodeSize} from "@/scripts/network/node/strategy/size/DefaultNodeSize";
import {DefaultNodeShape} from "@/scripts/network/node/strategy/shape/DefaultNodeShape";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";
import {GraphEdgeSet} from "@/scripts/data/network/GraphEdgeSet";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";

export type ViewBox = {
    minX: number,
    minY: number,
    width: number,
    height: number
}

type Size = {
    width: number,
    height: number
}

export interface LayoutStoreState {
    layoutStrategy: LayoutFactory,
    layout: Layout | null,
    viewBox: ViewBox,
    size: Size
}

const state: LayoutStoreState = {
    layoutStrategy: new LayoutFactory(
        new DefaultNodeColor(),
        new DefaultNodePosition(),
        new DefaultNodeSize(),
        new DefaultNodeShape()
    ),
    layout: null,
    viewBox: {
        minX: 0,
        minY: 0,
        width: 100,
        height: 100
    },
    size: {
        width: 100,
        height: 100
    }
};

const getters = {
    allNodes: state => (state.layout !== null) ? state.layout.nodes.values() : [],

    allEdges: state => (state.layout !== null) ? state.layout.edges.values() : [],

    filteredNodes: state =>
        (filter: (node: GraphNode) => boolean) =>
            (state.layout !== null) ? state.layout.nodes.filter(filter) : [],

    filteredEdges: state =>
        (filter: (edge: GraphEdge) => boolean) =>
            (state.layout !== null) ? state.layout.edges.filter(filter) : [],

    svgHeight: state => (state.layout !== null) ? state.layout.height : 0,

    svgWidth: state => (state.layout !== null) ? state.layout.width : 0,

    viewBox: state => state.viewBox
};

const mutations = {
    setNodeColorStrategy: (state, payload) =>
        state.layoutStrategy.setNodeColorStrategy(payload.nodeColorStrategy),

    setNodePositionStrategy: (state, payload) =>
        state.layoutStrategy.setNodePositionStrategy(payload.nodePositionStrategy),

    setNodeSizeStrategy: (state, payload) =>
        state.layoutStrategy.setNodeSizeStrategy(payload.nodeSizeStrategy),

    setNodeShapeStrategy: (state, payload) =>
        state.layoutStrategy.setNodeShapeStrategy(payload.nodeShapeStrategy),

    apply: (state, payload) => {
        state.layout = state.layoutStrategy
                            .exec(payload.variants,
                                  payload.maxGenerationNumber,
                                  payload.generationNumberToVariantCount,
                                  30,
                                  20);

        // 初期状態は全体が収まるように設定
        const svgWidth: number = state.layout.width + 40;
        const svgHeight: number = state.layout.height + 40;

        const contentWidth = payload.content.width;
        const contentHeight = payload.content.height;

        // 縦横のいずれかが小さいときはcontentに収まるようにviewBoxの値を変える
        let ratio: number = 1;
        if (contentWidth < svgWidth || contentHeight < svgHeight) {
            const widthRatio = svgWidth / contentWidth;
            const heightRation = svgHeight / contentHeight;
            ratio = Math.max(widthRatio, heightRation);
        }

        state.viewBox = {
            minX: 0,
            minY: 0,
            width: svgWidth * ratio,
            height: svgHeight * ratio
        };
    },

    reset: (state,
            payload: {
                content: {
                    width: number,
                    height: number
                }
            }) => {
        // 初期状態は全体が収まるように設定
        const svgWidth: number = state.layout.width + 40;
        const svgHeight: number = state.layout.height + 40;

        const contentWidth = payload.content.width;
        const contentHeight = payload.content.height;

        // 縦横のいずれかが小さいときはcontentに収まるようにviewBoxの値を変える
        let ratio: number = 1;
        if (contentWidth < svgWidth || contentHeight < svgHeight) {
            const widthRatio = svgWidth / contentWidth;
            const heightRation = svgHeight / contentHeight;
            ratio = Math.max(widthRatio, heightRation);
        }

        state.viewBox = {
            minX: 0,
            minY: 0,
            width: svgWidth * ratio,
            height: svgHeight * ratio
        };
    },

    zoom: (state,
           payload: {
               cursor: { x: number, y: number },
               scale: number,
           }) => {
        // 正規化する
        const svgWidth: number = state.layout.width + 40;
        const svgHeight: number = state.layout.height + 40;
        const xRatio: number = payload.cursor.x / svgWidth;
        const yRatio: number = payload.cursor.y / svgHeight;

        // 正規化した座標を元にviewBox上におけるカーソルの位置を求める
        const scale = payload.scale;
        const x = state.viewBox.minX + state.viewBox.width * xRatio;
        const y = state.viewBox.minY + state.viewBox.height * yRatio;

        state.viewBox = {
            minX: x + scale * (state.viewBox.minX - x),
            minY: y + scale * (state.viewBox.minY - y),
            width: state.viewBox.width * scale,
            height: state.viewBox.height * scale
        };
    },

    pan: (state,
          payload: {
              offset: { x: number, y: number }
          }) => {
        state.viewBox = {
            minX: state.viewBox.minX - payload.offset.x,
            minY: state.viewBox.minY - payload.offset.y,
            width: state.viewBox.width,
            height: state.viewBox.height
        }
    },

    highlightAncestryTree: (state, payload) => {
        const id: string = payload.id;

        const nodes: GraphNodeSet = state.layout.nodes;
        const edges: GraphEdgeSet = state.layout.edges;

        if (!nodes.has(id)) {
            return;
        }

        const node: GraphNode = nodes.get(id);
        // 選択したノードをハイライトする
        node.addCSSClass('selected');

        // 再帰的に経路をハイライトする
        // 祖先
        node.getInEdgeIds()
            .forEach((edgeId) => {
                highlightAncestor(edgeId, nodes, edges);
            });
        // highlightAncestor(, nodes, edges);
        // 子孫
        node.getOutEdgeIds()
            .forEach((edgeId) => {
                highlightDescendant(edgeId, nodes, edges);
            });

        // highlightDescendant(id, nodes, edges);
    },

    clearNodeClass: (state, payload) => {

        state.layout.nodes.values()
             .forEach((node) => {
                 node.clearCSSClasses();
             });
    },

    clearEdgeClass: (state, payload) => {
        state.layout.edges.values()
             .forEach((edge) => {
                 edge.clearCSSClasses();
             });
    }
};

function highlightAncestor(id: string, nodes: GraphNodeSet, edges: GraphEdgeSet) {
    if (nodes.has(id)) {
        const node = nodes.get(id);
        node.addCSSClass('highlight');

        // 祖先に繋がる辺をハイライトする
        node.getInEdgeIds()
            .forEach((inEdgeId) => {
                highlightAncestor(inEdgeId, nodes, edges);
            });
    } else if (edges.has(id)) {
        const edge = edges.get(id);
        edge.addCSSClass('highlight');

        highlightAncestor(edge.getSourceId(), nodes, edges);
    }
}

function highlightDescendant(id: string, nodes: GraphNodeSet, edges: GraphEdgeSet) {
    if (nodes.has(id)) {
        const node = nodes.get(id);
        node.addCSSClass('highlight');

        // 子孫に繋がる辺をハイライトする
        node.getOutEdgeIds()
            .forEach((outEdgeId) => {
                highlightDescendant(outEdgeId, nodes, edges);
            });
    } else if (edges.has(id)) {
        const edge = edges.get(id);
        edge.addCSSClass('highlight');

        highlightDescendant(edge.getTargetId(), nodes, edges);
    }
}

const actions = {};

export const LayoutStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
