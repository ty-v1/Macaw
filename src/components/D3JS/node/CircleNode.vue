<template>
    <g :transform="transform">
        <circle r="1"
                cx="1"
                cy="1"
                :fill="color"
                :class="(isClicked)? 'highlighted' : ''"
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
        /**
         * data
         * */
        isClicked = false;

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
        public onClick(): NodeClickEvent {
            this.isClicked = !this.isClicked;
            return {
                id: this.node.id,
                isClicked: this.isClicked
            };
        }
    }
</script>

<style>
    .highlighted {
        stroke: #FF0000;
        stroke-width: 2px;
    }
</style>
