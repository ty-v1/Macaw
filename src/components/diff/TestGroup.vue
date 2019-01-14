<template>
    <div class="content">
        <h2>Test Summary</h2>
        <TestSummary :test-summary="testSummary"></TestSummary>
        <TestDetail :test-summary="testSummary"></TestDetail>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import TestDetail from "./TestDetail.vue";
    import TestSummary from "./TestSummary.vue";
    import {Variant2} from "../../scripts/json/Variant2";
    import {TestSummary2} from "../../scripts/json/TestSummary2";

    @Component({
                   components: {TestSummary, TestDetail}
               })
    export default class TestGroup extends Vue {
        @Prop(Number) variantId!: number;

        get testSummary(): TestSummary2 {
            const variant: Variant2 = this.$store.getters['VariantStore/variant'](this.variantId);

            return variant.testSummary;
        }
    }
</script>

<style scoped lang="scss">

    .content {
        width: 90%;

        & h2 {
            text-align: left;
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>
