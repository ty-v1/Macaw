import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";
import ArrowShape = cytoscape.Css.ArrowShape;

export interface IEdgeArrowShapeStrategy {
    createEdgeArrowShape(data: EdgeSingular): ArrowShape;

    createEdgeArrowShape(data: Variant): ArrowShape;
}
