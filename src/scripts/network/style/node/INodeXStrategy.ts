import {Variant} from "@/scripts/data/Variant";

export interface INodeXStrategy {
    createNodeX(variant: Variant): number | undefined;
}
