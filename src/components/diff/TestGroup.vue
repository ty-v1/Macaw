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
    import {TestSummaryData} from "../../scripts/data/TestSummaryData";
    import {Variant} from "../../scripts/data/Variant";

    @Component({
                   components: {TestSummary, TestDetail}
               })
    export default class TestGroup extends Vue {
        @Prop(String) variantId!: string;

        get testSummary(): TestSummaryData {
            const variant: Variant = this.$store.getters['VariantStore/variant'](this.variantId);

            return variant.getTestSummary();
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
