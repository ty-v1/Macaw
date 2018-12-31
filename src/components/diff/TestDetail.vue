<template>
    <div>
        <div class="tabs">
            <div :class="[buttonState === 1 ? 'selected' : 'deselected']"
                 @click="onAllTestsClicked">
                All Tests
            </div>
            <div :class="[buttonState === 2 ? 'selected' : 'deselected']"
                 @click="onSucceededTestsClicked">
                Succeeded Tests
            </div>
            <div :class="[buttonState === 3 ? 'selected' : 'deselected']"
                 @click="onFailedTestsClicked">
                Failed Tests
            </div>
        </div>
        <!-- ここにテストの詳細をおく-->
        <AllTests v-if="buttonState === 1"
                  :test-results="testSummary.testResults"></AllTests>
        <SomeTests v-else-if="buttonState === 2"
                   :fqns="succeededFqns"></SomeTests>
        <SomeTests v-else-if="buttonState === 3"
                   :fqns="failedFqns"></SomeTests>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import SomeTests from "./SomeTests.vue";
    import AllTests from "./AllTests.vue";
    import {TestSummaryData} from "../../scripts/data/TestSummaryData";

    @Component({
                   components: {AllTests, SomeTests}
               })
    export default class TestDetail extends Vue {
        @Prop() testSummary!: TestSummaryData;

        /**
         * data
         * */
        /**
         * 押したボタンの種類
         * 1 : all
         * 2 : success
         * 3 : fail
         * */
        buttonState: number = 0;

        /**
         * event handler
         * */
        onAllTestsClicked() {
            if (this.buttonState !== 1) {
                this.buttonState = 1;
            }
        }

        onSucceededTestsClicked() {
            if (this.buttonState !== 2) {
                this.buttonState = 2;
            }
        }

        onFailedTestsClicked() {
            if (this.buttonState !== 3) {
                this.buttonState = 3;
            }
        }

        /**
         * getters
         * */
        get succeededFqns(): string[] {
            const fqns: string[] = [];

            this.testSummary.testResults.forEach((testResult) => {
                if (testResult.isSuccess) {
                    fqns.push(testResult.fqn);
                }
            });

            return fqns;
        }

        get failedFqns(): string[] {
            const fqns: string[] = [];

            this.testSummary.testResults.forEach((testResult) => {
                if (!testResult.isSuccess) {
                    fqns.push(testResult.fqn);
                }
            });

            return fqns;
        }
    }
</script>

<style scoped lang="scss">
    .tabs {
        text-align: center;

        & div {
            display: inline-block;
            border: solid 1px #f0f0f0;
            border-radius: 10px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: large;
            font-weight: bold;
            padding: 5px;
        }
    }

    .selected {
        background-color: #42b983;
    }

    .deselected {
        background-color: #e0e0e0;
    }
</style>
