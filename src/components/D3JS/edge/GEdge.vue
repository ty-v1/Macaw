<template>
    <SimpleLine v-if="isMutation"
                :edge="edge"
                :pattern="pattern"
    ></SimpleLine>

    <DoubleLine v-else
                :edge="edge"
    ></DoubleLine>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import DoubleLine from "./DoubleLine.vue";
    import SimpleLine from "./SimpleLine.vue";
    import {EdgeDatum3} from "../../../scripts/json/Variant2";

    @Component({
                   components: {SimpleLine, DoubleLine}
               })
    export default class GEdge extends Vue {
        @Prop() edge!: EdgeDatum3;

        public get isMutation(): boolean {
            switch (this.edge.operation) {
                case 'select':
                case 'insert':
                case 'delete':
                case 'replace':
                    return true;
                default:
                    return false;
            }
        }

        public get pattern(): string {
            switch (this.edge.operation) {
                case "insert":
                    return "equal-distance-dash";
                case "delete":
                    return "long-short-dash";
                case "replace":
                    return "long-middle-dash";
                default:
                    return '';
            }
        }
    }
</script>

<style scoped>

</style>
