import {INodeXStrategy} from "@/scripts/network/style/node/INodeXStrategy";
import {Variant} from "@/scripts/data/Variant";

export class DefaultNodeX implements INodeXStrategy {
    createNodeX(data: Variant): number | undefined {
        return undefined;
    }
}
