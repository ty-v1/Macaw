import {Variant} from "@/scripts/data/Variant";

export interface INodeBorderWidthStrategy {
    createNodeBorderWidth(data: Variant): number;
}
