<template>
    <g :transform="transform">
        <path :fill="color"
              d="M0,0.3L0.7,1L0,1.7L0.3,2L1,1.3L1.7,2L2,1.7L1.3,1L2,0.3L1.7,0L1,0.7L0.3,0Z"
              @mouseover="onMouseOver"
              @mouseout="onMouseOut">
        </path>
    </g>

</template>

<script lang="ts">
    import {Component, Emit} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";

    @Component
    export default class CrossNode extends NodeComponentBase {

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
    }
</script>
