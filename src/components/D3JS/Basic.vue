<template>
    <div class="wrapper">
        <div class="button">
            <button @click="reset">RESET</button>
            <label>
                <input type="checkbox"
                       v-model="showAllEdges">
                Show all edges
            </label>
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
                    <GNode v-for="node in nodes"
                           :key="node.id"
                           :node="node">
                    </GNode>

                    <GEdge v-for="edge in edges"
                           :key="edge.id"
                           :edge="edge">
                    </GEdge>
                </g>
            </svg>
            <Popup></Popup>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Color} from "../../scripts/color/Color";
    import SimpleLine from "./edge/SimpleLine.vue";
    import CrossNode from "./node/CrossNode.vue";
    import CircleNode from "./node/CircleNode.vue";
    import {ThreeBasePointsGradation} from "../../n2/node/strategy/color/ThreeBasePointsGradation";
    import {NoAlignHierarchy} from "../../n2/node/strategy/position/NoAlignHierarchy";
    import Popup from "../Popup.vue";
    import DoubleLine from "./edge/DoubleLine.vue";
    import {ViewBox} from "../../store/LayoutStore";
    import {sprintf} from "sprintf-js";
    import {EdgeDatum3, NodeDatum2, NodeDatum3, Tyukan} from "../../scripts/json/Variant2";
    import GNode from "./node/GNode.vue";
    import GEdge from "./edge/GEdge.vue";

    @Component({components: {GEdge, GNode, DoubleLine, Popup, SimpleLine, CrossNode, CircleNode}})
    export default class Basic extends Vue {

        /**
         * data
         * */
        private isDragging: boolean = false;
        private onDragEvent: boolean = false;
        private dragStart: { x: number, y: number } = {x: 0, y: 0};
        private showAllEdges: boolean = true;

        private unwatch: () => void = () => {
        };

        /**
         *  computed
         *  */
        get nodes(): NodeDatum3[] {
            return this.$store.getters['LayoutStore/allNodes'];
        }

        get edges(): EdgeDatum3[] {
            console.log(this.$store.getters['LayoutStore/allEdges']);
            return this.$store.getters['LayoutStore/allEdges'];
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

            const midCalculator = (variants: Tyukan) => {
                const a: NodeDatum2[] = variants.hiassyukus();

                for (let i = 0; i < a.length; i++) {
                    if (a[i].variant.id === 0) {
                        return a[i].variant.fitness;
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
        }

        mounted() {
            this.apply();
        }

        beforeDestroy() {
            // ウォッチャをリセットする
            this.unwatch();
        }

        /**
         * watcher
         * */
        @Watch('showAllEdges')
        onValueChange(newValue: boolean): void {
            console.log(`watch: ${newValue}`);
            if(newValue){
                this.$store.commit('LayoutStore/showAllEdges');
            }else{
                this.$store.commit('LayoutStore/dismissCrossEdges');
            }
        }

        apply() {
            const variants: Tyukan = this.$store.getters['VariantStore/tyukan'];
            this.$store.commit('LayoutStore/apply', {
                variants: variants,
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
