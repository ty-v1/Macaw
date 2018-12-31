<template>
    <tr>
        <td class="fqn">{{testResult.fqn}}</td>
        <td class="result">{{result}}</td>
    </tr>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {TestResult} from "../../scripts/data/TestResult";

    @Component
    export default class TestColumn extends Vue {
        @Prop() testResult!: TestResult;

        get result(): string {
            return this.testResult.isSuccess ? "pass" : "fail";
        }
    }
</script>

<style scoped>
    td {
        text-align: left;
        word-wrap: break-word;
    }
</style>
