import {Variant} from "@/scripts/data/Variant";
import {RGB} from "@/scripts/color/RGB";

export interface INodeColorStrategy {
    createNodeColor(variant: Variant): RGB;
}
