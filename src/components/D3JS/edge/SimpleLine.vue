<template>
    <line :x1="sourceX"
          :y1="sourceY"
          :x2="targetX"
          :y2="targetY"
          fill="none"
          :class="{highlighted : edge.highlighted}">
    </line>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import EdgeComponentBase from "../../../scripts/network/edge/EdgeComponentBase";

    @Component
    export default class SimpleLine extends EdgeComponentBase {
    }
</script>

<style scoped>
    .highlighted {
        stroke: darkgreen;
        stroke-width: 4px;
    }
</style>
