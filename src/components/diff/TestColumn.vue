<template>
    <tr>
        <td class="fqn">{{testResult.fqn}}</td>
        <td class="result">{{result}}</td>
        <td class="result">{{originalResult}}</td>
    </tr>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {TestResult2} from "../../scripts/json/TestResult2";

    @Component
    export default class TestColumn extends Vue {
        @Prop() testResult!: TestResult2;
        @Prop() originalTestResult!: TestResult2;

        get result(): string {
            return this.testResult.isSuccess ? "pass" : "fail";
        }

        get originalResult() {
            return this.originalTestResult.isSuccess ? "pass" : "fail";
        }
    }
</script>

<style scoped>
    td {
        text-align: left;
        word-wrap: break-word;
    }

    .result {
        text-align: center;
    }
</style>
