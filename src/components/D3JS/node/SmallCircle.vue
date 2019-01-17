<template>
    <g :transform="transform">
        <line x1="1" y1="0"
              x2="1" y2="0.4"
              :class="isHighlighted? 'highlight' : ''"
              fill="none"></line>
        <circle r="0.6"
                cx="1"
                cy="1"
                :fill="color"
                :class="node.classes"
                @mouseover="onMouseOver"
                @mouseout="onMouseOut"
                @click="onClick"
        ></circle>
        <line v-if="hasEdge"
              x1="1" y1="1.6"
              x2="1" y2="2"
              :class="isHighlighted? 'highlight' : ''"
              fill="none"></line>
    </g>
</template>

<script lang="ts">
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";
    import {Component, Emit} from "vue-property-decorator";
    import {NodeClickEvent} from "../../../scripts/event/NodeClickEvent";
    import {sprintf} from "sprintf-js";
    import {Variant2} from "../../../scripts/json/Variant2";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";
    import {Item} from "../../../store/VariantPopupStore";

    @Component
    export default class SmallCircle extends NodeComponentBase {

        public get hasEdge(): boolean {
            return this.node.outEdgeIds.length > 0
        }

        public get isHighlighted(): boolean {
            const classes: string[] = this.node.classes;

            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === 'highlight' || classes[i] === 'selected')
                    return true;
            }

            return false;
        }

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
    circle{
        background-color: gray;
    }

    .selected {
        stroke: cornflowerblue;
        stroke-width: 4px;
    }

    .highlight {
        stroke: darkgreen;
        stroke-width: 4px;
    }
</style>
