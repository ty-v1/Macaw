import {Variant} from "@/scripts/data/Variant";

export interface INodeYStrategy {
    createNodeY(variant: Variant): number | undefined;
}
