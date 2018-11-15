<template>
    <svg :width="width" :height="height">
        <SimpleLine v-for="edgeStyle in edgeStyles"
                    :edge-style="edgeStyle">
        </SimpleLine>

        <CircleNode v-for="nodeStyle in buildSuccessfulNodeStyle"
                    :node-style="nodeStyle">
        </CircleNode>

        <CrossNode v-for="nodeStyle in buildUnSuccessfulNodeStyle"
                   :node-style="nodeStyle">
        </CrossNode>
    </svg>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import NetworkComponentBase from "../../scripts/network/NetworkComponentBase";
    import {ThreeBasePointsGradation} from "../../scripts/network/node/strategy/color/ThreeBasePointsGradation";
    import {RGB} from "../../scripts/color/RGB";
    import {SimpleHierarchy} from "../../scripts/network/layout/SimpleHierarchy";
    import HashMap from "hashmap";
    import {NodeStyle} from "../../scripts/data/style/NodeStyle";
    import {EdgeStyle} from "../../scripts/data/style/EdgeStyle";
    // vue component
    import SimpleLine from "./edge/SimpleLine.vue";
    import CrossNode from "./node/CrossNode.vue";
    import CircleNode from "./node/CircleNode.vue";
    import {Variant} from "../../scripts/data/Variant";

    @Component({components: {SimpleLine, CrossNode, CircleNode}})
    export default class Basic extends NetworkComponentBase {

        /**
         *  computed
         *  */
        get buildSuccessfulNodeStyle(): NodeStyle[] {
            const variants: Variant[] = this.$store.getters.getAllVariants(this.$store.state);

            const buildSuccessfulNodeStyle: NodeStyle[] = [];
            variants.forEach((variant) => {
                if (variant.isBuildSuccess()) {
                    const nodeStyle = this.idToNodeStyle.get(variant.getId());
                    buildSuccessfulNodeStyle.push(nodeStyle);
                }
            });
            return buildSuccessfulNodeStyle;
        }

        get buildUnSuccessfulNodeStyle(): NodeStyle[] {

            const variants: Variant[] = this.$store.getters.getAllVariants(this.$store.state);
            const buildUnsuccessfulNodeStyles: NodeStyle[] = [];

            variants.forEach((variant) => {
                if (!variant.isBuildSuccess()) {
                    const nodeStyle = this.idToNodeStyle.get(variant.getId());
                    buildUnsuccessfulNodeStyles.push(nodeStyle);
                }
            });
            return buildUnsuccessfulNodeStyles;
        }

        get edgeStyles(): EdgeStyle[] {

            const variants: Variant[] = this.$store.getters.getAllVariants(this.$store.state);
            const edgeStyles: EdgeStyle[] = [];

            variants.forEach((variant) => {
                const targetNodeStyle = this.idToNodeStyle.get(variant.getId());

                variant.getParentIds()
                       .forEach((parentId) => {
                           const sourceNodeStyle = this.idToNodeStyle.get(parentId);
                           const edgeStyle: EdgeStyle = {
                               color: RGB.BLACK,
                               source: sourceNodeStyle,
                               target: targetNodeStyle
                           };
                           edgeStyles.push(edgeStyle);
                       });
            });
            return edgeStyles;
        }

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

        private idToNodeStyle: HashMap<string, NodeStyle> = new HashMap();

        protected applyLayout() {
            const variants: Variant[] = this.$store.getters.getAllVariants(this.$store.state);

            const nodeColorStrategy = new ThreeBasePointsGradation(
                this.getBasePoints(variants), Basic.BASE_COLOR_CODES);

            const simpleHierarchy = new SimpleHierarchy(Basic.NODE_WIDTH,
                                                        Basic.NODE_HEIGHT,
                                                        nodeColorStrategy,
                                                        Basic.X_PADDING,
                                                        Basic.Y_PADDING);

            const maxGenerationNumber: number = this.$store.getters.getMaxGenerationNumber(this.$store.state);

            this.idToNodeStyle = simpleHierarchy.exec(variants, maxGenerationNumber);
            this.width = simpleHierarchy.getWidth();
            this.height = simpleHierarchy.getHeight();
        }

        private getBasePoints(variants: Variant[]): number[] {

            let middlePoint: number = 0.5;

            variants.forEach((variant) => {
                if (variant.getId() === "0") {
                    middlePoint = variant.getFitness();
                }
            });
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
        stroke-width: 2;
    }
</style>
