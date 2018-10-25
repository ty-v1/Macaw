import {Patch} from './Patch';
import {Operation} from './Operation';

export type VariantDatum = {
    id: string;
    generationNumber: number;
    fitness: number;
    buildSuccess: boolean;
    testResult: number;
    patches: Patch[];
    operations: Operation[];
}
