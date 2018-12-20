import {Color} from "@/scripts/color/Color";

export type GraphNode = {
    id: string,
    x: number,
    y: number,
    color: Color,
    width: number,
    height: number,
    shape: string,
    highlighted: boolean,
    inEdgeIds: string[],
    outEdgeIds: string[],
    class: string
}
