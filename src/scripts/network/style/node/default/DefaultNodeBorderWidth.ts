import {INodeBorderWidthStrategy} from "@/scripts/network/style/node/INodeBorderWidthStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeBorderWidth implements INodeBorderWidthStrategy {
    createNodeBorderWidth(data: Variant | NodeSingular): number {
        return 4;
    }
}
