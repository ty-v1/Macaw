import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export interface INodeBorderColorStrategy {
    createNodeBorderColor(data: NodeSingular): string;

    createNodeBorderColor(data: Variant): string;
}
