import {TestResult} from "@/scripts/data/TestResult";

export type TestSummary = {
    successRate: number,
    executedTestsCount: number,
    testResults: TestResult[]
}
