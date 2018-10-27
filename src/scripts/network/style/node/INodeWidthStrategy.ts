import {Variant} from "@/scripts/data/Variant";

export interface INodeWidthStrategy {
    createNodeWidth(variant: Variant): number | undefined;
}
