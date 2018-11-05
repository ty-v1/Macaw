import {Variant} from "@/scripts/data/Variant";

export interface INodeBorderColorStrategy {
    createNodeBorderColor(data: Variant): string;
}
