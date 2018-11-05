import {Operation} from "@/scripts/data/Operation";
import {Patch} from "@/scripts/data/Patch";
import {TestSummary} from "@/scripts/data/TestSummary";

export type VariantDatum = {
    id: string,
    generationNumber: number,
    fitness: number,
    selectionCount: number,
    isBuildSuccess: boolean,
    testSummary: TestSummary,
    patches: Patch[],
    operations: Operation[]
}
