<template>
    <g :transform="transform">
        <circle r="1"
                cx="1"
                cy="1"
                :fill="color"
                @mouseover="onMouseOver"
                @mouseout="onMouseOut"
        ></circle>
    </g>
</template>

<script lang="ts">
    import {Component, Emit} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";

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
                pageX: event.pageX,
                pageY: event.pageY
            };
        }

        @Emit('node-mouse-out')
        public onMouseOut() {
        }
    }
</script>
