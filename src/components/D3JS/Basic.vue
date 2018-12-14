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
                               :node="node"
                               @node-mouse-over="onNodeMouseOver"
                               @node-mouse-out="onNodeMouseOut">
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
    import {LEFT_BUTTON, NodeClickEvent, RIGHT_BUTTON} from "../../scripts/event/NodeClickEvent";

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

        private unwatch: () => void = () => {
        };

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
            switch (event.buttons) {
                case LEFT_BUTTON:
                    this.onLeftButtonClicked(event.id);
                    break;
                case RIGHT_BUTTON:
                    this.onRightButtonClicked();
                    break;
                default:
            }
        }

        private onLeftButtonClicked(id: string) {

            console.log(this.$store.getters['DiffStore/contain'](id));
            if (this.$store.getters['DiffStore/contain'](id)) {
                this.$store.commit('DiffStore/deleteVariantId', {
                    variantId: id
                });
                this.$store.commit('LayoutStore/setElementHighlightState', {
                    id: id,
                    highlightState: false
                });

            } else {
                this.$store.commit('DiffStore/addVariantId', {
                    variantId: id
                });
                this.$store.commit('LayoutStore/setElementHighlightState', {
                    id: id,
                    highlightState: true
                });
            }
        }

        private onRightButtonClicked() {
            this.$store.commit('LayoutStore/resetElementHighlightState');
        }

        /**
         * life cycle
         * */
        created() {
            this.unwatch = this.$store.watch(
                state => state.VariantStore.idToVariant,
                () => this.apply());

            const midCalculator = (variants: Variant[]) => {
                for (let i = 0; i < variants.length; i++) {
                    if (variants[i].getId() === "0") {
                        return variants[i].getFitness();
                    }
                }
                return 0.5;
            };

            this.$store.commit('LayoutStore/setNodeColorStrategy', {
                nodeColorStrategy: new ThreeBasePointsGradation(
                    Basic.BASE_COLOR_CODES, midCalculator)
            });

            this.$store.commit('LayoutStore/setNodePositionStrategy',
                               {nodePositionStrategy: new NoAlignHierarchy()});

            this.$store.commit('LayoutStore/setNodeSizeStrategy',
                               {nodeSizeStrategy: new FixedNodeSize(15, 15)});

            this.$store.commit('LayoutStore/setNodeShapeStrategy',
                               {nodeShapeStrategy: new FitnessBasedNodeShape()});

            this.apply();
        }

        beforeDestroy() {
            // ウォッチャをリセットする
            this.unwatch();
        }

        private

        apply() {
            const variants: Variant[] = this.$store.getters['VariantStore/variants'];
            const maxGenerationNumber: number
                = this.$store.getters['VariantStore/maxGenerationNumber'];
            const generationNumberToVariantCount: number[] =
                this.$store.getters['VariantStore/generationNumberToVariantCount'];
            this.$store.commit('LayoutStore/apply', {
                variants: variants,
                maxGenerationNumber: maxGenerationNumber,
                generationNumberToVariantCount: generationNumberToVariantCount
            });
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
