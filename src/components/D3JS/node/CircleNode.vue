<template>
    <g :transform="transform">
        <circle r="1"
                cx="1"
                cy="1"
                :fill="color"
                :class="{highlighted : node.highlighted}"
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

    @Component
    export default class CircleNode extends NodeComponentBase {

        @Emit('node-mouse-over')
        public onMouseOver(event: MouseEvent): NodeMouseOverEvent {
            return {
                id: this.node.id,
                nodeX: this.node.x,
                nodeY: this.node.y,
                nodeWidth: this.node.width,
                nodeHeight: this.node.height,
                pageX: event.offsetX,
                pageY: event.offsetY
            };
        }

        @Emit('node-mouse-out')
        public onMouseOut() {
        }

        @Emit('node-click')
        public onClick(event: MouseEvent): NodeClickEvent {
            return {
                id: this.node.id,
                buttons: event.buttons
            };
        }
    }
</script>

<style scoped>
    .highlighted {
        stroke: darkgreen;
        stroke-width: 4px;
    }
</style>
