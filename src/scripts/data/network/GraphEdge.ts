import {Color} from "@/scripts/color/Color";

export type GraphEdge = {
    id: string,
    color: Color,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourceId: string,
    targetId: string,
    highlighted: boolean
}
