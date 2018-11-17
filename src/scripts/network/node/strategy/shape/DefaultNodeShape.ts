import {INodeShapeStrategy} from "@/scripts/network/node/strategy/shape/INodeShapeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class DefaultNodeShape implements INodeShapeStrategy {
    exec(variants: Variant[], maxGenerationNumber: number, nodes: GraphNodeSet): void {
    }
}
