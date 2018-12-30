<template>
    <div class="wrapper">
        <div class="button">
            <button @click="reset">RESET</button>
        </div>
        <div class="content" ref="content">
            <svg :width="width"
                 :height="height"
                 :viewBox="viewBox"
                 @click="onClick"
                 @wheel="onWheel"
                 @mousedown="startDrag"
                 @mouseup="stopDrag"
                 @mousemove="onDrag">
                <g transform="translate(20, 20)">
                    <SimpleLine v-for="edge in simpleLine"
                                :key="edge.id"
                                :edge="edge">
                    </SimpleLine>

                    <DoubleLine v-for="edge in doubleLine"
                                :key="edge.id"
                                :edge="edge">
                    </DoubleLine>

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
    import {NodeClickEvent} from "../../scripts/event/NodeClickEvent";
    import DoubleLine from "./edge/DoubleLine.vue";
    import {ViewBox} from "../../store/LayoutStore";
    import {sprintf} from "sprintf-js";

    @Component({components: {DoubleLine, Popup, SimpleLine, CrossNode, CircleNode}})
    export default class Basic extends Vue {

        /**
         * data
         * */
        private isDragging: boolean = false;
        private onDragEvent: boolean = false;
        private dragStart: { x: number, y: number } = {x: 0, y: 0}

        private unwatch: () => void = () => {
        };

        /**
         *  computed
         *  */
        get circleNode(): GraphNode[] {
            const filter = (node: GraphNode) => node.getShape() === 'circle';

            return this.$store.getters['LayoutStore/filteredNodes'](filter);
        }

        get crossNode(): GraphNode[] {
            const filter = (node: GraphNode) => node.getShape() === 'cross';

            return this.$store.getters['LayoutStore/filteredNodes'](filter);
        }

        get simpleLine(): GraphEdge[] {
            const filter = (edge: GraphEdge) => edge.getPattern() !== 'double-line';

            return this.$store.getters['LayoutStore/filteredEdges'](filter);
        }

        get doubleLine(): GraphEdge[] {
            const filter = (edge: GraphEdge) => edge.getPattern() === 'double-line';

            return this.$store.getters['LayoutStore/filteredEdges'](filter);
        }

        get width() {
            const content = this.$refs.content;

            if (content instanceof Element) {
                const svgWidth = this.$store.getters['LayoutStore/svgWidth'] + 40;
                const contentWidth = content.getBoundingClientRect().width;

                return Math.max(svgWidth, contentWidth);
            } else {
                return this.$store.getters['LayoutStore/svgWidth'] + 40;
            }
        }

        get height() {
            const content = this.$refs.content;

            if (content instanceof Element) {
                const svgHeight = this.$store.getters['LayoutStore/svgHeight'] + 40;
                const contentHeight = content.getBoundingClientRect().height;

                return Math.max(svgHeight, contentHeight);
            } else {
                return this.$store.getters['LayoutStore/svgWidth'] + 40;
            }
        }

        get viewBox(): string {
            const viewBox: ViewBox = this.$store.getters['LayoutStore/viewBox'];
            return sprintf('%.3f, %.3f, %.3f, %.3f',
                           viewBox.minX, viewBox.minY, viewBox.width, viewBox.height);
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
                                   y: event.pageY - 20,
                                   width: 100,
                                   height: 100,
                               });
        }

        onNodeMouseOut() {
            this.$store.commit('VariantPopupStore/dismiss');
        }

        onNodeClick(event: NodeClickEvent) {
            const variantId: string = this.$store.getters['DiffStore/variantId'];

            // 経路のハイライトを解除する
            this.$store.commit('LayoutStore/clearNodeClass', {});
            this.$store.commit('LayoutStore/clearEdgeClass', {});

            if (variantId !== '' && event.id === variantId) {
                this.$store.commit('DiffStore/reset', {});

            } else {
                this.$store.commit('DiffStore/setVariantId', {
                    variantId: event.id
                });
                // 経路をハイライトする
                this.$store.commit('LayoutStore/highlightAncestryTree', {
                    id: event.id
                });
            }
        }

        onClick(event: MouseEvent) {
            this.$store.commit('DiffStore/reset', {});
            this.$store.commit('LayoutStore/clearNodeClass', {});
            this.$store.commit('LayoutStore/clearEdgeClass', {});
        }

        onWheel(e: WheelEvent) {
            e.preventDefault();
            e.stopPropagation();

            const scale = Math.pow(1.01, (e.deltaY < 0) ? 1 : -1);

            this.$store.commit('LayoutStore/zoom', {
                cursor: {
                    x: e.offsetX,
                    y: e.offsetY,
                },
                scale: scale
            });
        }

        startDrag(e: MouseEvent) {
            this.isDragging = true;
            this.dragStart.x = e.pageX;
            this.dragStart.y = e.pageY;
        }

        stopDrag() {
            this.isDragging = false;
        }

        async onDrag(e: MouseEvent) {
            if (!this.isDragging || this.onDragEvent) {
                return;
            }

            // 感度が高すぎるためイベントを間引く
            this.onDragEvent = true;
            setTimeout(async () => {
                this.$store.commit('LayoutStore/pan', {
                    offset: {
                        x: e.pageX - this.dragStart.x,
                        y: e.pageY - this.dragStart.y
                    }
                });

                this.onDragEvent = false;
            }, 90);
        }

        reset() {
            this.$store.commit('LayoutStore/reset', {
                content: {
                    width: this.contentWidth,
                    height: this.contentHeight
                }
            });
        }

        private get contentWidth(): number {
            const content = this.$refs.content;

            if (content instanceof Element) {
                return content.getBoundingClientRect().width;
            } else {
                return 100;
            }
        }

        private get contentHeight(): number {
            const content = this.$refs.content;

            if (content instanceof Element) {
                return content.getBoundingClientRect().height;
            } else {
                return 100;
            }
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
                    [
                        Color.RED,
                        Color.WHITE,
                        Color.GREEN
                    ], midCalculator)
            });

            this.$store.commit('LayoutStore/setNodePositionStrategy',
                               {nodePositionStrategy: new NoAlignHierarchy()});

            this.$store.commit('LayoutStore/setNodeSizeStrategy',
                               {nodeSizeStrategy: new FixedNodeSize(15, 15)});

            this.$store.commit('LayoutStore/setNodeShapeStrategy',
                               {nodeShapeStrategy: new FitnessBasedNodeShape()});
        }

        mounted() {
            this.apply();
        }

        beforeDestroy() {
            // ウォッチャをリセットする
            this.unwatch();
        }

        apply() {
            const variants: Variant[] = this.$store.getters['VariantStore/variants'];
            const maxGenerationNumber: number
                = this.$store.getters['VariantStore/maxGenerationNumber'];
            const generationNumberToVariantCount: number[] =
                this.$store.getters['VariantStore/generationNumberToVariantCount'];
            this.$store.commit('LayoutStore/apply', {
                variants: variants,
                maxGenerationNumber: maxGenerationNumber,
                generationNumberToVariantCount: generationNumberToVariantCount,
                content: {
                    width: this.contentWidth,
                    height: this.contentHeight
                }
            });
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    svg {
        position: relative;
        z-index: 0;
    }

    .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
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

    text {
        stroke: none;
        fill: #000000;
        font-size: 1px;

    }
</style>
