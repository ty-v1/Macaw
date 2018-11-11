import {Variant} from "@/scripts/data/Variant";

export interface INodeSizeStrategy {
    createNodeWidth(variant: Variant): number;

    createNodeHeight(variant: Variant): number;
}
