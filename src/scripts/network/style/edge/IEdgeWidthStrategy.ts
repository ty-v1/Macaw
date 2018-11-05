import {Variant} from "@/scripts/data/Variant";

export interface IEdgeWidthStrategy {
    createEdgeWidth(data: Variant): number;
}
