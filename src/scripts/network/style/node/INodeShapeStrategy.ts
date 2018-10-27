import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";
import NodeShape = cytoscape.Css.NodeShape;

export interface INodeShapeStrategy {
    createNodeShape(data: NodeSingular | Variant): NodeShape;
}
