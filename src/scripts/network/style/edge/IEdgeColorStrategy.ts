import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";

export interface IEdgeColorStrategy {

    createEdgeColor(data: EdgeSingular): string;

    createEdgeColor(data: Variant): string;
}
