import {INodeShapeStrategy} from "@/scripts/network/node/strategy/shape/INodeShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class FitnessBasedNodeShape implements INodeShapeStrategy {

    exec(variants: Variant[], maxGenerationNumber: number, nodes: GraphNodeSet): void {
        variants.forEach((variant) => {
            const node = nodes.get(variant.getId());
            node.shape = variant.isBuildSuccess() ? 'circle' : 'cross';
        });
    }
}
