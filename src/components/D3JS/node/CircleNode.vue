<template>
    <g :transform="transform">
        <circle r="1"
                cx="1"
                cy="1"
                :fill="color"
                :class="node.classes"
                @mouseover="onMouseOver"
                @mouseout="onMouseOut"
                @click="onClick"
        ></circle>
    </g>
</template>

<script lang="ts">
    import {Component, Emit} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";
    import {NodeClickEvent} from "../../../scripts/event/NodeClickEvent";
    import {Variant2} from "../../../scripts/json/Variant2";
    import {Item} from "../../../store/VariantPopupStore";
    import {sprintf} from "sprintf-js";

    @Component
    export default class CircleNode extends NodeComponentBase {

        @Emit('node-mouse-over')
        public onMouseOver(event: MouseEvent): NodeMouseOverEvent {

            const variant: Variant2
                = this.$store.getters['VariantStore/variant'](this.node.variantIds[0]);

            const items: Item[] = [];
            items.push({
                           name: 'generation',
                           value: String(variant.generationNumber)
                       });

            items.push({
                           name: 'fitness',
                           value: sprintf('%.3f', variant.fitness)
                       });

            items.push({
                           name: 'children',
                           value: String(this.node.outEdgeIds.length)
                       });

            return {
                id: this.node.id,
                nodeX: this.node.x,
                nodeY: this.node.y,
                nodeWidth: this.node.width,
                nodeHeight: this.node.height,
                pageX: event.pageX,
                pageY: event.pageY,
                message: {
                    title: 'Build Succeeded Variant',
                    items: items
                }
            };
        }

        @Emit('node-mouse-out')
        public onMouseOut() {
        }

        @Emit('node-click')
        public onClick(event: MouseEvent): NodeClickEvent {
            event.stopPropagation();
            return {
                id: this.node.id,
                variantId: this.node.variantIds[0],
                buttons: event.buttons
            };
        }
    }
</script>

<style scoped>
    .selected {
        stroke: cornflowerblue;
        stroke-width: 4px;
    }

    .highlight {
        stroke: darkgreen;
        stroke-width: 4px;
    }
</style>
