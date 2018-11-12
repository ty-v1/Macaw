import {RGB} from "@/scripts/color/RGB";
import {NodeStyle} from "@/scripts/data/style/NodeStyle";

export type EdgeStyle = {
    color: RGB,
    source: NodeStyle,
    target: NodeStyle
}
