import {Variant} from "@/scripts/data/Variant";

export interface INodePositionStrategy {
    createNodeX(variant: Variant): number

    createNodeY(variant: Variant): number
}
