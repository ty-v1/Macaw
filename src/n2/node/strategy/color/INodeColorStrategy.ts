import {Tyukan} from "@/scripts/json/Tyukan";
import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";

export interface INodeColorStrategy {

    exec(variants: Tyukan, nodeData: GraphNodeSet2): void;
}
