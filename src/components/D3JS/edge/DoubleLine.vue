<template>
    <g>
        <line :x1="edge.sourceX - 2"
              :y1="edge.sourceY"
              :x2="edge.targetX - 2"
              :y2="edge.targetY"
              fill="none"
              :class="edge.classes"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>

        <line :x1="edge.sourceX + 2"
              :y1="edge.sourceY"
              :x2="edge.targetX + 2"
              :y2="edge.targetY"
              fill="none"
              :class="edge.classes"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>
    </g>
</template>


<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {EdgeDatum3} from "../../../scripts/json/Layout";

    @Component
    export default class DoubleLine extends Vue {
        @Prop() edge!: EdgeDatum3;
    }
</script>

<style scoped>
    .highlight {
        stroke: darkgreen;
    }
</style>
