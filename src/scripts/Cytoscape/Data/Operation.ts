import {Patch} from "@/scripts/Cytoscape/Data/Patch";

export type Operation = {
    id: string
    operationName: string;
    patches: Patch[];
}
