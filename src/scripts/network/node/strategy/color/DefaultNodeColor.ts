import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {RGB} from "@/scripts/color/RGB";

export class DefaultNodeColor implements INodeColorStrategy {
    createNodeColor(variant: Variant): RGB {
        return RGB.BLACK;
    }
}
