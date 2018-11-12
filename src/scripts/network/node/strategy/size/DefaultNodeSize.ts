import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeSize implements INodeSizeStrategy {
    createNodeHeight(variant: Variant): number {
        return 0;
    }

    createNodeWidth(variant: Variant): number {
        return 0;
    }
}
