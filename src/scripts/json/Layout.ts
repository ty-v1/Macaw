import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";
import {GraphEdgeSet2} from "@/scripts/json/GraphEdgeSet2";
import {Color} from "@/scripts/color/Color";


export type Layout2 = {
    nodes: GraphNodeSet2,
    edges: GraphEdgeSet2,
    width: number,
    height: number
}


export type NodeDatum3 = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color,
    shape: string,
    classes: string[],
    inEdgeIds: string[],
    outEdgeIds: string[],
    variantIds: number[]
}

export type EdgeDatum3 = {
    id: string,
    sourceId: string,
    targetId: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    operation: string,
    isDisplay: boolean,
    classes: string[]
}
