import {Patch} from "@/scripts/data/Patch";

export type Operation = {
    id: string
    operationName: string;
    patches: Patch[];
}
