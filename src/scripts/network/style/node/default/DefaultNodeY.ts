import {INodeYStrategy} from "@/scripts/network/style/node/INodeYStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeY implements INodeYStrategy {
    createNodeY(variant: Variant): number | undefined {
        return undefined;
    }
}
