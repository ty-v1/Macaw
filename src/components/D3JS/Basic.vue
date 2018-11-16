<template>
    <svg :width="SVGWidth" :height="SVGHeight">
        <SimpleLine v-for="edge in simpleLine"
                    :edge="edge">
        </SimpleLine>

        <CircleNode v-for="node in circleNode"
                    :node="node">
        </CircleNode>

        <CrossNode v-for="node in crossNode"
                   :node="node">
        </CrossNode>
    </svg>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {ThreeBasePointsGradation} from "../../scripts/network/node/strategy/color/ThreeBasePointsGradation";
    import {RGB} from "../../scripts/color/RGB";
    import {NWEdge} from "../../scripts/data/network/NWEdge";
    import Vue from "vue";
    import {NWNode} from "../../scripts/data/network/NWNode";
    import SimpleLine from "./edge/SimpleLine.vue";
    import CrossNode from "./node/CrossNode.vue";
    import CircleNode from "./node/CircleNode.vue";
    import {Variant} from "../../scripts/data/Variant";
    import {NoAlignmentHierarchy} from "../../scripts/network/layout/NoAlignmentHierarchy";


    @Component({components: {SimpleLine, CrossNode, CircleNode}})
    export default class Basic extends Vue {
        /**
         * data
         * */
        private static readonly BASE_COLOR_CODES = [
            RGB.RED,
            RGB.WHITE,
            RGB.GREEN
        ];

        private static readonly NODE_WIDTH: number = 15;
        private static readonly NODE_HEIGHT: number = 15;

        private static readonly X_PADDING: number = 25;
        private static readonly Y_PADDING: number = 200;

        /**
         *  computed
         *  */
        get circleNode(): NWNode[] {
            const variants = this.$store.getters['VariantStore/buildSucceededVariant'];
            const nodes: NWNode[] = [];

            variants.forEach((variant) => {
                const result = this.$store.getters['LayoutStore/node'](variant);
                Array.prototype.push.apply(nodes, result);
            });

            // console.log('circle');
            // console.log(nodes);
            return nodes;
        }

        get crossNode(): NWNode[] {
            const variants = this.$store.getters['VariantStore/buildFailedVariant'];
            const nodes: NWNode[] = [];

            variants.forEach((variant) => {
                const result = this.$store.getters['LayoutStore/node'](variant);
                Array.prototype.push.apply(nodes, result);
            });
            // console.log('cross');
            // console.log(nodes);
            return nodes;
        }

        get simpleLine(): NWEdge[] {
            const variants = this.$store.getters['VariantStore/variants'];
            const edges: NWEdge[] = [];

            return this.$store.getters['LayoutStore/edge'](null);
            // variants.forEach((variant) => {
            //     const result = this.$store.getters['LayoutStore/edge'](variant);
            //
            //
            //     Array.prototype.push.apply(edges, result);
            // });
            //
            // console.log('line');
            // console.log(edges);
            //
            // return edges;
        }

        get SVGWidth() {
            // console.log('w');
            // console.log(this.$store.getters['VariantStore/SVGWidth']);
            return this.$store.getters['LayoutStore/SVGWidth'];
        }

        get SVGHeight() {
            // console.log('h');
            // console.log(this.$store.getters['VariantStore/SVGWidth']);
            return this.$store.getters['LayoutStore/SVGHeight'];
        }

        /**
         * life cycle
         * */
        created() {
            const basePoints = this.getBasePoints();

            const nodeColorStrategy
                = new ThreeBasePointsGradation(basePoints, Basic.BASE_COLOR_CODES);

            const simpleHierarchy = new NoAlignmentHierarchy(Basic.NODE_WIDTH,
                                                             Basic.NODE_HEIGHT,
                                                             nodeColorStrategy,
                                                             Basic.X_PADDING,
                                                             Basic.Y_PADDING);
            this.$store.commit('LayoutStore/createLayout',
                               {
                                   layoutStrategy: simpleHierarchy,
                                   variants: this.$store.getters['VariantStore/variants'],
                                   maxGenerationNumber: this.$store.getters['VariantStore/maxGenerationNumber'],
                                   generationNumberToVariantCount: this.$store.getters['VariantStore/generationNumberToVariantCount']
                               });
        }

        private getBasePoints(): number[] {
            const initialVariant: Variant = this.$store.getters['VariantStore/initialVariant'];
            const middlePoint: number =
                (initialVariant !== null && initialVariant !== undefined) ?
                    initialVariant.getFitness() : 0.5;

            return [0.0, middlePoint, 1.0];
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
