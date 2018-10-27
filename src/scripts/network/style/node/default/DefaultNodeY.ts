import {INodeYStrategy} from "@/scripts/network/style/node/INodeYStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeY implements INodeYStrategy {
    createNodeY(data: NodeSingular | Variant): number | undefined {
        return undefined;
    }
}
