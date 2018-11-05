import {INodeBorderWidthStrategy} from "@/scripts/network/style/node/INodeBorderWidthStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeBorderWidth implements INodeBorderWidthStrategy {
    createNodeBorderWidth(data: Variant): number {
        return 4;
    }
}
