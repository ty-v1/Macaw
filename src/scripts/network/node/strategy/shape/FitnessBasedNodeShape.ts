import {INodeShapeStrategy} from "@/scripts/network/node/strategy/shape/INodeShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export class FitnessBasedNodeShape implements INodeShapeStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodeData: HashMap<string, NodeDatum>): void {
        variants.forEach((variant) => {
            const node = nodeData.get(variant.getId());
            node.shape = variant.isBuildSuccess() ? 'circle' : 'cross';
        });
    }
}
