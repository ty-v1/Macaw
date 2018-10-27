import {Variant} from "@/scripts/data/Variant";
import LineStyle = cytoscape.Css.LineStyle;

export interface IEdgeLineStrategy {
    createEdgeLine(variant: Variant): LineStyle;
}
