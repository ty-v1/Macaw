import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeColor implements INodeColorStrategy {
    createNodeColor(variant: Variant): string {
        return "#000000";
    }
}
