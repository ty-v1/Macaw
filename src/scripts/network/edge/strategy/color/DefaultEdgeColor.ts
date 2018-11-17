import {IEdgeColorStrategy} from "@/scripts/network/edge/strategy/color/IEdgeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {Color} from "@/scripts/color/Color";

export class DefaultEdgeColor implements IEdgeColorStrategy {
    createEdgeColor(variant: Variant): Color {
        return Color.BLACK;
    }
}
