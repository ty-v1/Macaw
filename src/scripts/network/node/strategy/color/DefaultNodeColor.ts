import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export class DefaultNodeColor implements INodeColorStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodeData: HashMap<string, NodeDatum>): void {
    }
}
