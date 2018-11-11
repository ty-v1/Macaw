import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {IColorCode} from "@/scripts/color/IColorCode";
import {RGB} from "@/scripts/color/RGB";

export class DefaultNodeColor implements INodeColorStrategy {
    createNodeColor(variant: Variant): IColorCode {
        return RGB.BLACK;
    }
}
