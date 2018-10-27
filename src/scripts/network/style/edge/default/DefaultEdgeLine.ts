import {IEdgeLineStrategy} from "@/scripts/network/style/edge/IEdgeLineStrategy";
import {Variant} from "@/scripts/data/Variant";
import LineStyle = cytoscape.Css.LineStyle;

export class DefaultEdgeLine implements IEdgeLineStrategy {
    createEdgeLine(variant: Variant): LineStyle {
        return 'solid';
    }
}
