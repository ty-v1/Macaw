import {Patch} from "@/scripts/Cytoscape/Data/Patch";
import {Operation} from "@/scripts/Cytoscape/Data/Operation";

export type VariantDatum = {
    id: string;
    generationNumber: number;
    fitness: number;
    buildSuccess: boolean;
    testResult: number;
    patch: Patch[];
    operations: Operation[];
}
