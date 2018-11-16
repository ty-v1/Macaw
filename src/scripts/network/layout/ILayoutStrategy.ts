/**
 * ストラテジーを保持するクラス
 *
 * ストラテジーは全てここにおく
 */
import {Variant} from "@/scripts/data/Variant";
import {NWEdge} from "@/scripts/data/network/NWEdge";
import {NWNode} from "@/scripts/data/network/NWNode";
import HashMap from "hashmap";

export interface ILayoutStrategy {

    // ノード情報のキャッシュを作る
    // createNodeCache(variants: Variant[],
    //                 maxGenerationNumber: number,
    //                 generationNumberToVariantCount: number[]): HashMap<string, NWNode>

    // エッジ情報のキャッシュを作る
    // createEdgeCache(variants: Variant[],
    //                 maxGenerationNumber: number,
    //                 generationNumberToVariantCount: number[]): HashMap<string, NWEdge>

    createNWCache(variants: Variant[],
                  maxGenerationNumber: number,
                  generationNumberToVariantCount: number[]): NWCache,

    // svg領域の幅を計算する
    getSVGWidth(variants: Variant[],
                maxGenerationNumber: number,
                generationNumberToVariantCount: number[]): number,

    // svg領域の高さを計算する
    getSVGHeight(variants: Variant[],
                 maxGenerationNumber: number,
                 generationNumberToVariantCount: number[]): number,

    needsCachingEdge(): boolean;

    needsCachingNode(): boolean;

    // キャッシュの必要がないレイアウトはノードと辺のデータをここから取得する
    locateNodes(variant: Variant): NWNode[]

    locateEdges(variant: Variant, nodeCache: HashMap<string, NWNode>): NWEdge[]
}

export type NWCache = {
    nodeCache: HashMap<string, NWNode>,
    edgeCache: HashMap<string, NWEdge>
}
