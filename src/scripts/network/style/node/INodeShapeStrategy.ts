import {Variant} from "@/scripts/data/Variant";

export interface INodeShapeStrategy {
    createNodeShape(variant: Variant): string;
}
