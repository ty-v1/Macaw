import {Patch} from './Patch';

export type Operation = {
    id: string
    operationName: string;
    patches: Patch[];
}
