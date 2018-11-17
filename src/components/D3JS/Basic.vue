<template>
    <svg :width="SVGWidth" :height="SVGHeight">
        <g transform="translate(20, 20)">
            <SimpleLine v-for="edge in simpleLine"
                        :edge="edge">
            </SimpleLine>

            <CircleNode v-for="node in circleNode"
                        :node="node">
            </CircleNode>

            <CrossNode v-for="node in crossNode"
                       :node="node">
            </CrossNode>
        </g>
    </svg>
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

    @Component({components: {SimpleLine, CrossNode, CircleNode}})
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
