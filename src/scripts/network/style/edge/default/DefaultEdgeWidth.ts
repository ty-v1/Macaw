import {IEdgeWidthStrategy} from "@/scripts/network/style/edge/IEdgeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultEdgeWidth implements IEdgeWidthStrategy {
    createEdgeWidth(data: Variant): number {
        return 6;
    }
}
