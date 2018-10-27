import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeHeightStrategy {

    createNodeHeight(data: NodeSingular): number | undefined;

    createNodeHeight(data: Variant): number | undefined;
}
