import {Variant} from "@/scripts/data/Variant";

export interface INodeXStrategy {
    createNodeX(data: Variant): number | undefined;
}
