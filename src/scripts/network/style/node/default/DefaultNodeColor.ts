import {INodeColorStrategy} from "@/scripts/network/style/node/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeColor implements INodeColorStrategy {
    createNodeColor(data: NodeSingular): string;
    createNodeColor(data: Variant): string;
    createNodeColor(data: NodeSingular | Variant): string {
        return '#000000';
    }
}
