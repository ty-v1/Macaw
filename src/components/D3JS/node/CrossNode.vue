<template>
    <g :transform="transform">
        <path :fill="color"
              d="M0,0.3L0.7,1L0,1.7L0.3,2L1,1.3L1.7,2L2,1.7L1.3,1L2,0.3L1.7,0L1,0.7L0.3,0Z"
        ></path>
    </g>

</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";

    @Component
    export default class CrossNode extends NodeComponentBase {
    }
</script>
