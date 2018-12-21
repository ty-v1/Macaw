<template>
    <g :transform="transform">
        <circle r="1"
                cx="1"
                cy="1"
                :fill="color"
                :class="node.getCSSClasses()"
                @mouseover="onMouseOver"
                @mouseout="onMouseOut"
                @click="onClick"
                @contextmenu="onContextMenu"
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
                id: this.node.getId(),
                nodeX: this.node.getX(),
                nodeY: this.node.getY(),
                nodeWidth: this.node.getWidth(),
                nodeHeight: this.node.getHeight(),
                pageX: event.offsetX,
                pageY: event.offsetY
            };
        }

        @Emit('node-mouse-out')
        public onMouseOut() {
        }

        @Emit('node-click')
        public onClick(event: MouseEvent): NodeClickEvent {
            event.stopPropagation();
            return {
                id: this.node.getId(),
                buttons: event.buttons
            };
        }

        @Emit('node-click')
        public onContextMenu(event: MouseEvent): NodeClickEvent {
            event.preventDefault();
            return {
                id: this.node.getId(),
                buttons: 2
            };
        }
    }
</script>

<style scoped>
    .highlight {
        stroke: darkgreen;
        stroke-width: 4px;
    }
</style>
