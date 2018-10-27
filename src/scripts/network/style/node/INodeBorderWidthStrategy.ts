import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeBorderWidthStrategy {
    createNodeBorderWidth(data: NodeSingular): number;

    createNodeBorderWidth(data: Variant): number;
}
