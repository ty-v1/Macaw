import {Patch} from './Patch';
import {Operation} from './Operation';

export type VariantDatum = {
    id: string;
    generationNumber: number;
    fitness: number;
    buildSuccess: boolean;
    testResult: number;
    patch: Patch[];
    operations: Operation[];
}
