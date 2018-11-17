import {GraphNodeSet} from "./GraphNodeSet";
import {GraphEdgeSet} from "./GraphEdgeSet";

export type Layout = {
    nodes: GraphNodeSet,
    edges: GraphEdgeSet,
    width: number,
    height: number
}
