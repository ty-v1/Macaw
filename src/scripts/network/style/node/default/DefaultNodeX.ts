import {INodeXStrategy} from "@/scripts/network/style/node/INodeXStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NodeSingular} from "cytoscape";

export class DefaultNodeX implements INodeXStrategy {
    createNodeX(data: NodeSingular | Variant): number | undefined {
        return undefined;
    }
}
