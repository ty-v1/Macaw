import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";

export interface IEdgeWidthStrategy {
    createEdgeWidth(data: EdgeSingular | Variant): number;
}
