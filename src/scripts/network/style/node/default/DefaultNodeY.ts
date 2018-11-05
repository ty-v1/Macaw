import {INodeYStrategy} from "@/scripts/network/style/node/INodeYStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeY implements INodeYStrategy {
    createNodeY(data: Variant): number | undefined {
        return undefined;
    }
}
