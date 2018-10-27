import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeWidthStrategy {
    createNodeWidth(data: NodeSingular): number | undefined;

    createNodeWidth(data: Variant): number | undefined;
}
