import {IEdgeWidthStrategy} from "@/scripts/network/style/edge/IEdgeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";

export class DefaultEdgeWidth implements IEdgeWidthStrategy {
    createEdgeWidth(data: EdgeSingular): number ;
    createEdgeWidth(data: Variant): number ;
    createEdgeWidth(data: EdgeSingular | Variant): number {
        return 6;
    }
}
