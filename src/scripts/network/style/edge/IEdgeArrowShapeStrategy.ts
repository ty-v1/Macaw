import {Variant} from "@/scripts/data/Variant";
import ArrowShape = cytoscape.Css.ArrowShape;

export interface IEdgeArrowShapeStrategy {
    createEdgeArrowShape(variant: Variant): ArrowShape;
}
