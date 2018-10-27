import {IEdgeColorStrategy} from "@/scripts/network/style/edge/IEdgeColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultEdgeColor implements IEdgeColorStrategy {
    createEdgeColor(variant: Variant): string {
        return '#000000';
    }
}
