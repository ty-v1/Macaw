import {GraphNodeSet2, Tyukan} from "@/scripts/json/Variant2";

export interface INodePositionStrategy {

    exec(variants: Tyukan,
         xPadding: number,
         yPadding: number,
         nodeData: GraphNodeSet2): void;

}
