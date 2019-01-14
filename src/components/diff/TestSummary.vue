<template>
    <div>
        <div class="summary">
            <div id="tests" class="info-box">
                <div class="counter">{{tests}}</div>
                <p>tests</p>
            </div>
            <div id="successes" class="info-box">
                <div>{{successes}}</div>
                <p>successes</p>
            </div>
            <div id="failures" class="info-box">
                <div class="counter">{{failures}}</div>
                <p>failures</p>
            </div>
        </div>

        <div class="percent">
            <div>
                {{percent}}%
            </div>
            <p>successful</p>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {TestSummaryData} from "../../scripts/data/TestSummaryData";
    import {TestSummary2} from "../../scripts/json/TestSummary2";
    import {sprintf} from "sprintf-js";

    @Component
    export default class TestSummary extends Vue {
        @Prop() testSummary!: TestSummary2;

        /**
         * getters
         * */
        get tests(): number {
            return this.testSummary.executedTestsCount;
        }

        get successes(): number {
            let count: number = 0;

            this.testSummary.testResults.forEach((testResult) => {
                if (testResult.isSuccess) {
                    count++;
                }
            });

            return count;
        }

        get failures(): number {
            let count: number = 0;

            this.testSummary.testResults.forEach((testResult) => {
                if (!testResult.isSuccess) {
                    count++;
                }
            });

            return count;
        }

        get percent(): string {
            return sprintf('%.1f', this.testSummary.successRate * 100);
        }
    }
</script>

<style scoped lang="scss">

    .summary {
        border: solid gray;
        border-radius: 10px;
        display: flex;
    }

    .info-box {
        width: 30%;
        text-align: center;

        & div {
            font-size: x-large;
            font-weight: bolder;
            width: 100%;
        }

        & p {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    .percent {
        margin-top: 10px;
        border: solid gray;
        border-radius: 10px;
        text-align: center;

        & div {
            border: none;
            font-size: x-large;
            font-weight: bolder;
        }

        & p {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
</style>
