import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export interface INodeColorStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodeData: HashMap<string, NodeDatum>): void;
}
