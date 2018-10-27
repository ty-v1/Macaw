import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeXStrategy {
    createNodeX(data: NodeSingular | Variant): number | undefined;
}
