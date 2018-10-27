import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";

export interface IEdgeColorStrategy {
    createEdgeColor(data: EdgeSingular | Variant): string;
}
