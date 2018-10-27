import {IEdgeArrowShapeStrategy} from "@/scripts/network/style/edge/IEdgeArrowShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";
import ArrowShape = cytoscape.Css.ArrowShape;

export class DefaultEdgeArrowShape implements IEdgeArrowShapeStrategy {
    createEdgeArrowShape(data: EdgeSingular): ArrowShape ;
    createEdgeArrowShape(data: Variant): ArrowShape ;
    createEdgeArrowShape(data: EdgeSingular | Variant): ArrowShape {
        return 'triangle';
    }
}
