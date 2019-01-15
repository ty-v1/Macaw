<template>
    <g>
        <line :x1="edge.sourceX"
              :y1="edge.sourceY"
              :x2="edge.targetX"
              :y2="edge.targetY"
              fill="none"
              :class="classes"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>
    </g>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import EdgeComponentBase from "../../../scripts/network/edge/EdgeComponentBase";
    import {EdgeDatum3} from "../../../scripts/json/Layout";

    @Component
    export default class SimpleLine extends Vue {
        @Prop(String) pattern!: string;
        @Prop() edge!: EdgeDatum3;

        public get classes(): string[] {
            const classes: string[] = [];
            classes.push(this.pattern);
            classes.push(...this.edge.classes);
            return classes;
        }
    }
</script>

<style scoped>
    .highlight {
        stroke: darkgreen;
        stroke-width: 4px;
    }

    .equal-distance-dash {
        stroke-dasharray: 4, 4
    }

    .long-short-dash {
        stroke-dasharray: 24, 3, 2, 3
    }

    .long-middle-dash {
        stroke-dasharray: 24, 20
    }
</style>
