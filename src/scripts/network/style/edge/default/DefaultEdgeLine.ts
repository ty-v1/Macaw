import {IEdgeLineStrategy} from "@/scripts/network/style/edge/IEdgeLineStrategy";
import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";
import LineStyle = cytoscape.Css.LineStyle;

export class DefaultEdgeLine implements IEdgeLineStrategy {
    createEdgeLine(data: EdgeSingular | Variant): LineStyle {
        return 'solid';
    }
}
