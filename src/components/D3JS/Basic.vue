<template>
    <div class="content">
        <div class="svg-wrapper">
            <svg :width="SVGWidth" :height="SVGHeight" class="svg">
                <g transform="translate(20, 20)">
                    <SimpleLine v-for="edge in simpleLine"
                                :key="edge.id"
                                :edge="edge">
                    </SimpleLine>

                    <CircleNode v-for="node in circleNode"
                                :key="node.id"
                                :node="node"
                                @node-mouse-over="onNodeMouseOver"
                                @node-mouse-out="onNodeMouseOut"
                                @node-click="onNodeClick">
                    </CircleNode>

                    <CrossNode v-for="node in crossNode"
                               :key="node.id"
                               :node="node">
                    </CrossNode>
                </g>
            </svg>
            <Popup></Popup>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Color} from "../../scripts/color/Color";
    import {GraphEdge} from "../../scripts/data/network/GraphEdge";
    import {GraphNode} from "../../scripts/data/network/GraphNode";
    import SimpleLine from "./edge/SimpleLine.vue";
    import CrossNode from "./node/CrossNode.vue";
    import CircleNode from "./node/CircleNode.vue";
    import {ThreeBasePointsGradation} from "../../scripts/network/node/strategy/color/ThreeBasePointsGradation";
    import {NoAlignHierarchy} from "../../scripts/network/node/strategy/position/NoAlignHierarchy";
    import {FixedNodeSize} from "../../scripts/network/node/strategy/size/FixedNodeSize";
    import {FitnessBasedNodeShape} from "../../scripts/network/node/strategy/shape/FitnessBasedNodeShape";
    import {Variant} from "../../scripts/data/Variant";
    import Popup from "../Popup.vue";
    import {NodeMouseOverEvent} from "../../scripts/event/NodeMouseOverEvent";
    import {NodeClickEvent} from "../../scripts/event/NodeClickEvent";

    @Component({components: {Popup, SimpleLine, CrossNode, CircleNode}})
    export default class Basic extends Vue {
        /**
         * data
         * */
        private static readonly BASE_COLOR_CODES = [
            Color.RED,
            Color.WHITE,
            Color.GREEN
        ];

        /**
         *  computed
         *  */
        get circleNode(): GraphNode[] {
            const filter = (node: GraphNode) => node.shape === 'circle';

            return this.$store.getters['LayoutStore/filteredNodes'](filter);
        }

        get crossNode(): GraphNode[] {
            const filter = (node: GraphNode) => node.shape === 'cross';

            return this.$store.getters['LayoutStore/filteredNodes'](filter);
        }

        get simpleLine(): GraphEdge[] {
            return this.$store.getters['LayoutStore/allEdges'];
        }

        get SVGWidth() {
            return this.$store.getters['LayoutStore/svgWidth'] + 40;
        }

        get SVGHeight() {
            return this.$store.getters['LayoutStore/svgHeight'] + 40;
        }

        /**
         * custom event handler
         * */
        onNodeMouseOver(event: NodeMouseOverEvent) {

            const variant: Variant = this.$store.getters['VariantStore/variant'](event.id);

            const x: number = event.nodeX + event.nodeWidth * 2 + 30;
            const y: number = event.nodeY;

            this.$store.commit('VariantPopupStore/initializeData',
                               {
                                   variant: variant,
                                   x: x,
                                   y: y,
                                   width: 100,
                                   height: 100,
                               });
        }

        onNodeMouseOut() {
            this.$store.commit('VariantPopupStore/dismiss');
        }

        onNodeClick(event: NodeClickEvent) {
            if (event.isClicked) {
                this.$store.commit('DiffStore/addVariantId',
                                   {
                                       variantId: event.id
                                   });

            } else {
                this.$store.commit('DiffStore/deleteVariantId',
                                   {
                                       variantId: event.id
                                   });
            }
        }

        /**
         * life cycle
         * */
        created() {
            const midCalculator = (variants: Variant[]) => {
                for (let i = 0; i < variants.length; i++) {
                    if (variants[i].getId() === "0") {
                        return variants[i].getFitness();
                    }
                }
                return 0.5;
            };

            this.$store.commit('LayoutStore/setNodeColorStrategy',
                               {
                                   nodeColorStrategy: new ThreeBasePointsGradation(Basic.BASE_COLOR_CODES,
                                                                                   midCalculator)
                               });

            this.$store.commit('LayoutStore/setNodePositionStrategy',
                               {nodePositionStrategy: new NoAlignHierarchy()});

            this.$store.commit('LayoutStore/setNodeSizeStrategy',
                               {nodeSizeStrategy: new FixedNodeSize(15, 15)});

            this.$store.commit('LayoutStore/setNodeShapeStrategy',
                               {nodeShapeStrategy: new FitnessBasedNodeShape()});
        }
    }
</script>

<style scoped>
    svg {
        position: relative;
        z-index: 0
    }

    .content {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .svg-wrapper {
        position: relative;
        overflow: scroll;
        width: 100%;
        height: 100%;
    }
</style>
<style>
    path {
        vector-effect: non-scaling-stroke;
        stroke-width: 1;
        stroke: #000000;
    }

    circle {
        vector-effect: non-scaling-stroke;
        stroke-width: 1;
        stroke: #000000;
    }

    line {
        stroke: #000000;
        stroke-width: 1;
    }
</style>
