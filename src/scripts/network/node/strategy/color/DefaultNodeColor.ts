import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class DefaultNodeColor implements INodeColorStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodes: GraphNodeSet): void {
    }
}
