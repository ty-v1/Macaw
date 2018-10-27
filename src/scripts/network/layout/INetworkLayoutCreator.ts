import {LayoutOptions} from "cytoscape";
import {Variant} from "@/scripts/data/Variant";

/**
 * 他のグラフライブラリを使うようになったら, createXXXLayoutOptions属性をたす
 */
export interface INetworkLayoutCreator {

    createCytoscapeLayoutOptions(variants: Variant[]): LayoutOptions;
}

