import {Variant} from "@/scripts/data/Variant";
import {EdgeSingular} from "cytoscape";
import LineStyle = cytoscape.Css.LineStyle;

export interface IEdgeLineStrategy {

    createEdgeLine(data: EdgeSingular): LineStyle;

    createEdgeLine(data: Variant): LineStyle;
}
