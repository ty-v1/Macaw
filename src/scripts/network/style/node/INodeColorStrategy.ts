import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeColorStrategy {
    createNodeColor(data: NodeSingular | Variant): string;
}
