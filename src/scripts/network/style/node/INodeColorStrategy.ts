import {Variant} from "@/scripts/data/Variant";

export interface INodeColorStrategy {
    createNodeColor(data: Variant): string;
}
