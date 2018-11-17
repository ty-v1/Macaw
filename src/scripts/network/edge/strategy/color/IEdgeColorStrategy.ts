import {Variant} from "@/scripts/data/Variant";
import {Color} from "@/scripts/color/Color";

export interface IEdgeColorStrategy {
    createEdgeColor(variant: Variant): Color;
}
