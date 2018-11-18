import {Operation} from "@/scripts/data/Operation";
import {Diff} from "@/scripts/data/Diff";
import {TestSummary} from "@/scripts/data/TestSummary";

export type VariantDatum = {
    id: string,
    generationNumber: number,
    fitness: number,
    selectionCount: number,
    isBuildSuccess: boolean,
    testSummary: TestSummary,
    patch: Diff[],
    operations: Operation[]
}
