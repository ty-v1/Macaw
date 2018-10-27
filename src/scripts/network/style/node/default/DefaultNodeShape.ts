import {INodeShapeStrategy} from "@/scripts/network/style/node/INodeShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";
import NodeShape = cytoscape.Css.NodeShape;

export class DefaultNodeShape implements INodeShapeStrategy {
    createNodeShape(data: NodeSingular | Variant): NodeShape {
        return 'ellipse';
    }
}
