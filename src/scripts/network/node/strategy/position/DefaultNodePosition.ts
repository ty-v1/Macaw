import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodePosition implements INodePositionStrategy {
    createNodeX(variant: Variant): number {
        return 0;
    }

    createNodeY(variant: Variant): number {
        return 0;
    }
}
