import {Variant} from "@/scripts/data/Variant";

export interface IEdgeArrowShapeStrategy {
    createEdgeArrowShape(variant: Variant): string;
}
