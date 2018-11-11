import {IEdgeColorStrategy} from "@/scripts/network/edge/strategy/color/IEdgeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {RGB} from "@/scripts/color/RGB";

export class DefaultEdgeColor implements IEdgeColorStrategy {
    createEdgeColor(variant: Variant): RGB {
        return RGB.BLACK;
    }
}
