import {Operation} from "@/scripts/data/Operation";
import {Patch} from "@/scripts/data/Patch";

export type VariantDatum = {
    id: string;
    generationNumber: number;
    fitness: number;
    buildSuccess: boolean;
    testResult: number;
    patches: Patch[];
    operations: Operation[];
}
