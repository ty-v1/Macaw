/**
 * ストラテジーを保持するクラス
 *
 * ストラテジーは全てここにおく
 */
import {Variant} from "@/scripts/data/Variant";
import {NWNodeSet} from "@/scripts/data/network/NWNodeSet";
import {NWEdgeSet} from "@/scripts/data/network/NWEdgeSet";

export interface ILayoutFactory {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         generationNumberToVariantCount: number[]): Layout;

    // TODO 下の連中は方針が固まり次第実装する
    // changeNodeColor(layout: Layout): void;

    // changeNodeShape(layout: Layout): void;

    // changeEdgeColor(layout: Layout): void;

    // changeEdgeWidth(layout: Layout): void;
}

export type Layout = {
    nodes: NWNodeSet,
    edges: NWEdgeSet,
    width: number,
    height: number
}
