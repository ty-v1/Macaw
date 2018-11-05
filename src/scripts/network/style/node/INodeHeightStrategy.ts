import {Variant} from "@/scripts/data/Variant";

export interface INodeHeightStrategy {
    createNodeHeight(data: Variant): number | undefined;
}
