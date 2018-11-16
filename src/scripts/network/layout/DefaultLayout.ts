import {ILayoutStrategy, NWCache} from "@/scripts/network/layout/ILayoutStrategy";
import {Variant} from "@/scripts/data/Variant";
import {NWEdge} from "@/scripts/data/network/NWEdge";
import {NWNode} from "@/scripts/data/network/NWNode";
import HashMap from "hashmap";

export class DefaultLayout implements ILayoutStrategy {


    createNodeCache(variants: Variant[],
                    maxGenerationNumber: number,
                    generationNumberToVariantCount: number[]): HashMap<string, NWNode> {
        return new HashMap<string, NWNode>();
    }

    createEdgeCache(variants: Variant[],
                    maxGenerationNumber: number,
                    generationNumberToVariantCount: number[]): HashMap<string, NWEdge> {
        return new HashMap<string, NWEdge>();
    }

    createNWCache(variants: Variant[],
                  maxGenerationNumber: number,
                  generationNumberToVariantCount: number[]): NWCache {
        return {
            nodeCache: new HashMap<string, NWNode>(),
            edgeCache: new HashMap<string, NWEdge>()
        };
    }

    getSVGHeight(variants: Variant[],
                 maxGenerationNumber: number,
                 generationNumberToVariantCount: number[]): number {
        return 0;
    }

    getSVGWidth(variants: Variant[],
                maxGenerationNumber: number,
                generationNumberToVariantCount: number[]): number {
        return 0;
    }

    locateEdges(variant: Variant, nodeCache: HashMap<string, NWNode>): NWEdge[] {
        return [];
    }

    locateNodes(variant: Variant): NWNode[] {
        return [];
    }

    needsCachingEdge(): boolean {
        return false;
    }

    needsCachingNode(): boolean {
        return false;
    }
}
