import {Variant} from "@/scripts/data/Variant";
import {IColorCode} from "@/scripts/color/IColorCode";

export interface IEdgeColorStrategy {
    createEdgeColor(variant: Variant): IColorCode;
}
