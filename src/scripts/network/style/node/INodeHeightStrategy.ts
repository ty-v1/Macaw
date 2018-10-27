import {Variant} from "@/scripts/data/Variant";

export interface INodeHeightStrategy {
    createNodeHeight(variant: Variant): number;
}
