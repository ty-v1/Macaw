import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export interface INodePositionStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         xPadding: number,
         yPadding: number,
         nodes: GraphNodeSet): void;

}
