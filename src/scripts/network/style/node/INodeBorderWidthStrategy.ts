import {Variant} from "@/scripts/data/Variant";

export interface INodeBorderWidthStrategy {
    createNodeBorderWidth(variant: Variant): number;
}
