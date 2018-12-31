import {TestResult} from "@/scripts/data/TestResult";

export type TestSummaryData = {
    successRate: number,
    executedTestsCount: number,
    testResults: TestResult[]
}
