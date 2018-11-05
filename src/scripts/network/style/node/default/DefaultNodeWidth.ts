import {INodeWidthStrategy} from "@/scripts/network/style/node/INodeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeWidth implements INodeWidthStrategy {
    createNodeWidth(data: Variant): number | undefined {
        return undefined;
    }
}
