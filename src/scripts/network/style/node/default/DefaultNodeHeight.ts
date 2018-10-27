import {INodeHeightStrategy} from "@/scripts/network/style/node/INodeHeightStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeHeight implements INodeHeightStrategy {
    createNodeHeight(variant: Variant): number | undefined {
        return undefined;
    }
}
