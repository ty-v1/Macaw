import {INodePositionStrategy} from "@/n2/node/strategy/position/INodePositionStrategy";
import {GraphNodeSet2, Tyukan} from "@/scripts/json/Variant2";

export class DefaultNodePositionStrategy implements INodePositionStrategy {
    exec(variants: Tyukan, xPadding: number, yPadding: number, nodeData: GraphNodeSet2): void {
    }

}
