import {Variant} from "@/scripts/data/Variant";

export interface INodeXStrategy {
    constructor(): void;

    createNodeX(variant: Variant): number;
}
