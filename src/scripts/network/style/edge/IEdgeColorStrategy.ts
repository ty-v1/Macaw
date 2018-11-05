import {Variant} from "@/scripts/data/Variant";

export interface IEdgeColorStrategy {
    createEdgeColor(data: Variant): string;
}
