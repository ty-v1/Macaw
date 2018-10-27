import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeYStrategy {
    createNodeY(data: NodeSingular | Variant): number | undefined;
}
