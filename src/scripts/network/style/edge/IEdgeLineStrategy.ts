import {Variant} from "@/scripts/data/Variant";

export interface IEdgeLineStrategy {
    createEdgeLine(variant: Variant): string;
}
