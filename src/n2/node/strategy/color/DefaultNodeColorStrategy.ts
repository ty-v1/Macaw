import {INodeColorStrategy} from "@/n2/node/strategy/color/INodeColorStrategy";
import {Tyukan} from "@/scripts/json/Tyukan";
import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";

export class DefaultNodeColorStrategy implements INodeColorStrategy {
    exec(variants: Tyukan, nodeData: GraphNodeSet2): void {
    }

}
