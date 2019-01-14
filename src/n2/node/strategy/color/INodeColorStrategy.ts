import {GraphNodeSet2, Tyukan} from "@/scripts/json/Variant2";

export interface INodeColorStrategy {

    exec(variants: Tyukan, nodeData: GraphNodeSet2): void;
}
