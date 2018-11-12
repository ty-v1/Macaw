import {Variant} from "@/scripts/data/Variant";
import {RGB} from "@/scripts/color/RGB";

export interface IEdgeColorStrategy {
    createEdgeColor(variant: Variant): RGB;
}
