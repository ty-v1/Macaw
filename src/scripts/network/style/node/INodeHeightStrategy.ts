import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeHeightStrategy {
    createNodeHeight(data: NodeSingular | Variant): number | undefined;
}
