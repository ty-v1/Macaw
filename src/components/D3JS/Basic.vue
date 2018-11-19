<template>
    <div class="o">
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
                            @node-mouse-out="onNodeMouseOut">
                </CircleNode>

                <CrossNode v-for="node in crossNode"
                           :key="node.id"
                           :node="node">
                </CrossNode>
            </g>
        </svg>

        <Popup></Popup>

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
            return this.$store.getters['LayoutStore/svgWidth'];
        }

        get SVGHeight() {
            return this.$store.getters['LayoutStore/svgHeight'];
        }

        /**
         * custom event handler
         * */
        onNodeMouseOver(event: NodeMouseOverEvent) {

            const variant: Variant = this.$store.getters['VariantStore/variant'](event.id);

            this.$store.commit('VariantPopupStore/initializeData',
                               {
                                   variant: variant,
                                   x: event.pageX,
                                   y: event.pageY,
                                   width: 100,
                                   height: 100,
                               });
        }

        onNodeMouseOut() {
            this.$store.commit('VariantPopupStore/dismiss');
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

<style>
    .svg {
        position: absolute;
        z-index: 0
    }

    .o {
        position: absolute;
        width: 100%;
        height: 100%;
    }

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
