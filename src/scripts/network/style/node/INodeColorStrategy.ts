import {Variant} from "@/scripts/data/Variant";

export interface INodeColorStrategy {
    createNodeColor(variant: Variant): string;
}
