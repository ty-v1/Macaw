import {INodeColorStrategy} from "@/scripts/network/style/node/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeColor implements INodeColorStrategy {
    createNodeColor(variant: Variant): string {
        return '#000000';
    }
}
