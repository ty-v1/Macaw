import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export interface INodeShapeStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodes: GraphNodeSet): void;
}
