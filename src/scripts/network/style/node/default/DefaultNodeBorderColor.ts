import {INodeBorderColorStrategy} from "@/scripts/network/style/node/INodeBorderColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeBorderColor implements INodeBorderColorStrategy {
    createNodeBorderColor(data: NodeSingular): string;
    createNodeBorderColor(data: Variant): string;
    createNodeBorderColor(data: Variant | NodeSingular): string {
        return "#000000";
    }
}
