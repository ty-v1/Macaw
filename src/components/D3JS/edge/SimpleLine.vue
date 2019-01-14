<template>
    <g>
        <line :x1="sourceX"
              :y1="sourceY"
              :x2="targetX"
              :y2="targetY"
              fill="none"
              :class="classes"
              :style="!edge.isDisplay? 'display:none' : ''">
        </line>
    </g>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import EdgeComponentBase from "../../../scripts/network/edge/EdgeComponentBase";

    @Component
    export default class SimpleLine extends EdgeComponentBase {
        @Prop(String) pattern!: string;

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
