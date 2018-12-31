<template>
    <table cellspacing="0">
        <colgroup>
            <col style="width:80%;">
            <col style="width:20%;">
        </colgroup>
        <thead>
        <tr>
            <th>Test</th>
            <th>Result</th>
        </tr>
        </thead>
        <tbody>
        <TestColumn v-for="testResult in testResults"
                    :test-result="testResult">
        </TestColumn>
        </tbody>
    </table>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {TestResult} from "../../scripts/data/TestResult";
    import TestColumn from "./TestColumn.vue";

    @Component({
                   components: {TestColumn}
               })
    export default class AllTests extends Vue {
        @Prop() testResults!: TestResult[];
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

    .succeeded {

    }

    .failed {

    }

</style>
