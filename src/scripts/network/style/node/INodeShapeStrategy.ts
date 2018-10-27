import {Variant} from "@/scripts/data/Variant";
import NodeShape = cytoscape.Css.NodeShape;

export interface INodeShapeStrategy {
    createNodeShape(variant: Variant): NodeShape;
}
