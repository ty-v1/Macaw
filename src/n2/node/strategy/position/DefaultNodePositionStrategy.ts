import {INodePositionStrategy} from "@/n2/node/strategy/position/INodePositionStrategy";
import {Tyukan} from "@/scripts/json/Tyukan";
import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";

export class DefaultNodePositionStrategy implements INodePositionStrategy {
    exec(variants: Tyukan, xPadding: number, yPadding: number, nodeData: GraphNodeSet2): void {
    }

}
