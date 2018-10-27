import {IEdgeColorStrategy} from "@/scripts/network/style/edge/IEdgeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";

export class DefaultEdgeColor implements IEdgeColorStrategy {
    createEdgeColor(data: EdgeSingular | Variant): string {
        return '#000000';
    }
}
