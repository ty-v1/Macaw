import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeXStrategy {

    createNodeX(data: NodeSingular): number | undefined;

    createNodeX(data: Variant): number | undefined;
}
