import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export interface INodePositionStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         xPadding: number,
         yPadding: number,
         nodeData: HashMap<string, NodeDatum>): void;

}
