import {INodeBorderColorStrategy} from "@/scripts/network/style/node/INodeBorderColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeBorderColor implements INodeBorderColorStrategy {
    createNodeBorderColor(data: Variant): string {
        return "#000000";
    }
}
