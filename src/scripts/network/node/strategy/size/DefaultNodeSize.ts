import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class DefaultNodeSize implements INodeSizeStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodes: GraphNodeSet): void {
    }
}
