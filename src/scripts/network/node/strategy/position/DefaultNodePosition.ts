import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class DefaultNodePosition implements INodePositionStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         xPadding: number,
         yPadding: number,
         nodes: GraphNodeSet): void {
    }
}
