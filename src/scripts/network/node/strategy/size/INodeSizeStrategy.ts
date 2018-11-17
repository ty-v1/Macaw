import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export interface INodeSizeStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodes: GraphNodeSet): void;
}
