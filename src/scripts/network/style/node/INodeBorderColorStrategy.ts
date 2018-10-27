import {Variant} from "@/scripts/data/Variant";

export interface INodeBorderColorStrategy {
    createNodeBorderColor(variant: Variant): string;
}
