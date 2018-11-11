import {Variant} from "@/scripts/data/Variant";

export interface IEdgeColorStrategy {
    createEdgeColor(variant: Variant): string;
}
