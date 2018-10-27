import {INodeBorderColorStrategy} from "@/scripts/network/style/node/INodeBorderColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeBorderColor implements INodeBorderColorStrategy {
    createNodeBorderColor(variant: Variant): string {
        return "#000000";
    }
}
