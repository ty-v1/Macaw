import {INodeWidthStrategy} from "@/scripts/network/style/node/INodeWidthStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeWidth implements INodeWidthStrategy {
    createNodeWidth(variant: Variant): number | undefined {
        return undefined;
    }
}
