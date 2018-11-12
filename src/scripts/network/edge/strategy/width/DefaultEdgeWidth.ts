import {IEdgeWidthStrategy} from "@/scripts/network/edge/strategy/width/IEdgeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultEdgeWidth implements IEdgeWidthStrategy {
    createEdgeWidth(variant: Variant): number {
        return 4;
    }
}
