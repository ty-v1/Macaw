import {INodeShapeStrategy} from "@/scripts/network/style/node/INodeShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import NodeShape = cytoscape.Css.NodeShape;

export class DefaultNodeShape implements INodeShapeStrategy {
    createNodeShape(variant: Variant): NodeShape {
        return 'ellipse';
    }
}
