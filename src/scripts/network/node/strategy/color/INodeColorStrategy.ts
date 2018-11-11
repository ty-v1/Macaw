import {Variant} from "@/scripts/data/Variant";
import {IColorCode} from "@/scripts/color/IColorCode";

export interface INodeColorStrategy {
    createNodeColor(variant: Variant): IColorCode;
}
