<template>
    <g>
        <line :x1="sourceX - 2"
              :y1="sourceY"
              :x2="targetX - 2"
              :y2="targetY"
              fill="none"
              :class="{highlighted : edge.highlighted}"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>

        <line :x1="sourceX + 2"
              :y1="sourceY"
              :x2="targetX + 2"
              :y2="targetY"
              fill="none"
              :class="{highlighted : edge.highlighted}"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>
    </g>
</template>


<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import EdgeComponentBase from "../../../scripts/network/edge/EdgeComponentBase";

    @Component
    export default class DoubleLine extends EdgeComponentBase {
    }
</script>

<style scoped>
    .highlighted {
        stroke: darkgreen;
    }
</style>
