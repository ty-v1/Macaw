import {Variant} from "@/scripts/data/Variant";

export interface INodeWidthStrategy {
    createNodeWidth(data: Variant): number | undefined;
}
