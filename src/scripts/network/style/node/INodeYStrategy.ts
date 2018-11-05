import {Variant} from "@/scripts/data/Variant";

export interface INodeYStrategy {
    createNodeY(data: Variant): number | undefined;
}
