import {Operation} from "@/scripts/data/Operation";
import {Diff} from "@/scripts/data/Diff";
import {TestSummaryData} from "@/scripts/data/TestSummaryData";

export type VariantDatum = {
    id: string,
    generationNumber: number,
    fitness: number,
    selectionCount: number,
    isBuildSuccess: boolean,
    testSummary: TestSummaryData,
    patch: Diff[],
    operations: Operation[]
}
