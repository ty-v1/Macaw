import {INodeHeightStrategy} from "@/scripts/network/style/node/INodeHeightStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeHeight implements INodeHeightStrategy {
    createNodeHeight(data: NodeSingular): number | undefined ;
    createNodeHeight(data: Variant): number | undefined;
    createNodeHeight(data: NodeSingular | Variant): number | undefined {
        return undefined;
    }
}
