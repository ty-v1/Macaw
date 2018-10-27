import {NodeSingular} from "cytoscape";
import {Variant} from "@/scripts/data/Variant";

export interface INodeWidthStrategy {
    createNodeWidth(data: NodeSingular | Variant): number | undefined;
}
