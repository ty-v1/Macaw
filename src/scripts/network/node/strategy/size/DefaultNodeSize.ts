import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export class DefaultNodeSize implements INodeSizeStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodeData: HashMap<string, NodeDatum>): void {
    }
}
