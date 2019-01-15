<template>
    <table cellspacing="0">
        <colgroup>
            <col style="width:70%;">
            <col style="width:15%;">
            <col style="width:15%;">
        </colgroup>
        <thead>
        <tr>
            <th>Test</th>
            <th>Result</th>
            <th>Initial</th>
        </tr>
        </thead>
        <tbody>
        <TestColumn v-for="index in length"
                    :test-result="testResults[index-1]"
                    :original-test-result="originalTestResults[index-1]">
        </TestColumn>
        </tbody>
    </table>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import TestColumn from "./TestColumn.vue";
    import {TestResult2} from "../../scripts/json/TestResult2";
    import {Variant2} from "../../scripts/json/Variant2";

    @Component({
                   components: {TestColumn}
               })
    export default class AllTests extends Vue {
        @Prop() testResults!: TestResult2[];

        get length(): number {
            return this.testResults.length + 1;
        }

        get originalTestResults(): TestResult2[] {
            const variant: Variant2 = this.$store.getters['VariantStore/variant'](0);

            return variant.testSummary.testResults;
        }
    }
</script>

<style scoped lang="scss">
    table {
        table-layout: fixed;
        width: 90%;

        & thead {
            & th {
                border-bottom: solid 1px black;
            }
        }
    }
</style>
