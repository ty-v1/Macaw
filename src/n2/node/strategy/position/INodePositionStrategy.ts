import {Tyukan} from "@/scripts/json/Tyukan";
import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";

export interface INodePositionStrategy {

    exec(variants: Tyukan,
         xPadding: number,
         yPadding: number,
         nodeData: GraphNodeSet2): void;

}
