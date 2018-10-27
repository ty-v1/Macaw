import {Variant} from "@/scripts/data/Variant";

export interface IEdgeWidthStrategy {
    createEdgeWidth(variant: Variant): number;
}
