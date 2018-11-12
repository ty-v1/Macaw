<template>
    <g :transform="transform">
        <circle r="1" cx="1" cy="1" :fill="color"></circle>
    </g>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";

    @Component
    export default class CircleNode extends NodeComponentBase {
    }
</script>
