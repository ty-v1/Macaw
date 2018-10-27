import {IEdgeArrowShapeStrategy} from "@/scripts/network/style/edge/IEdgeArrowShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import ArrowShape = cytoscape.Css.ArrowShape;

export class DefaultEdgeArrowShape implements IEdgeArrowShapeStrategy {
    createEdgeArrowShape(variant: Variant): ArrowShape {
        return 'triangle';
    }
}
