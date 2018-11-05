import {IEdgeColorStrategy} from "@/scripts/network/style/edge/IEdgeColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultEdgeColor implements IEdgeColorStrategy {
    createEdgeColor(data: Variant): string {
        return '#000000';
    }
}
