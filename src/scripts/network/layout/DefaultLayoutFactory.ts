import {ILayoutFactory, Layout} from "@/scripts/network/layout/NewILayoutStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NWNodeSet} from "@/scripts/data/network/NWNodeSet";
import {NWEdgeSet} from "@/scripts/data/network/NWEdgeSet";

export class DefaultLayoutFactory implements ILayoutFactory {
    exec(variants: Variant[],
         maxGenerationNumber: number,
         generationNumberToVariantCount: number[]): Layout {
        return {
            nodes: new NWNodeSet(),
            edges: new NWEdgeSet(),
            width: 0,
            height: 0,
        };
    }
}
