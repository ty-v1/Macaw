import {INodeWidthStrategy} from "@/scripts/network/style/node/INodeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeWidth implements INodeWidthStrategy {
    createNodeWidth(data: NodeSingular): number | undefined ;
    createNodeWidth(data: Variant): number | undefined ;
    createNodeWidth(data: NodeSingular | Variant): number | undefined {
        return undefined;
    }
}
