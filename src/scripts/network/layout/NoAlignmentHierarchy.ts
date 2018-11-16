import {ILayoutStrategy, NWCache} from "@/scripts/network/layout/ILayoutStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NWEdge} from "@/scripts/data/network/NWEdge";
import {NWNode} from "@/scripts/data/network/NWNode";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {RGB} from "@/scripts/color/RGB";

export class NoAlignmentHierarchy implements ILayoutStrategy {

    private readonly nodeWidth: number;
    private readonly nodeHeight: number;
    private readonly xPadding: number;
    private readonly yPadding: number;

    private readonly nodeColorStrategy: INodeColorStrategy;
    private readonly nodeXCache: HashMap<string, number> = new HashMap<string, number>();
    private readonly nodeYCache: HashMap<string, number> = new HashMap<string, number>();

    public constructor(nodeWidth: number,
                       nodeHeight: number,
                       nodeColorStrategy: INodeColorStrategy,
                       xPadding: number,
                       yPadding: number) {
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
        this.nodeColorStrategy = nodeColorStrategy;
        this.xPadding = xPadding;
        this.yPadding = yPadding;
    }

    createNodeCache(variants: Variant[],
                    maxGenerationNumber: number,
                    generationNumberToVariantCount: number[]): HashMap<string, NWNode> {
        const nodeCache = new HashMap<string, NWNode>();
        this.cacheNodeX(variants, maxGenerationNumber);
        this.cacheNodeY(variants);

        // console.log('aaaaa');

        variants.forEach((variant) => {
            const id = variant.getId();
            const x = this.nodeXCache.get(id);
            const y = this.nodeYCache.get(id);

            const nodeStyle: NWNode = {
                id: "",
                x: x,
                y: y,
                width: this.nodeWidth,
                height: this.nodeHeight,
                color: this.nodeColorStrategy.createNodeColor(variant),
            };
            // console.log(nodeStyle);
            nodeCache.set(id, nodeStyle);
        });
        // console.log(nodeCache);

        return nodeCache;
    }

    private cacheNodeX(variants: Variant[],
                       maxGenerationNumber: number): void {
        this.nodeXCache.clear();

        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(maxGenerationNumber + 1);
        generationNumberToCurrentX.fill(0);

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const beforeX = generationNumberToCurrentX[generationNumber];
            const x = beforeX + this.xPadding;

            this.nodeXCache.set(variant.getId(), x);

            generationNumberToCurrentX[generationNumber] = x + this.nodeWidth;
        });
    }

    private cacheNodeY(variants: Variant[]) {
        this.nodeYCache.clear();


        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const y = (generationNumber + 1) * this.yPadding + generationNumber * this.nodeHeight;

            this.nodeYCache.set(variant.getId(), y);
        });
    }

    createEdgeCache(variants: Variant[],
                    maxGenerationNumber: number,
                    generationNumberToVariantCount: number[],
                    nodeCache: HashMap<string, NWNode>
    ): HashMap<string, NWEdge> {
        const edges: HashMap<string, NWEdge> = new HashMap<string, NWEdge>();

        variants.forEach((variant) => {

            const targetNode = nodeCache.get(variant.getId());

            variant.getParentIds()
                   .forEach((parentId) => {
                       const sourceNode = nodeCache.get(parentId);
                       const edge = {
                           id: "",
                           color: RGB.BLACK,
                           sourceX: sourceNode.x + sourceNode.width,
                           sourceY: sourceNode.y + sourceNode.height * 2,
                           targetX: targetNode.x + targetNode.width,
                           targetY: targetNode.y
                       };
                       edges.set("e" + edges.count(), edge);
                   });
        });
        return edges;
    }

    createNWCache(variants: Variant[],
                  maxGenerationNumber: number,
                  generationNumberToVariantCount: number[]): NWCache {
        const nodeCache
            = this.createNodeCache(variants, maxGenerationNumber, generationNumberToVariantCount);

        return {
            nodeCache: nodeCache,
            edgeCache: this.createEdgeCache(variants, maxGenerationNumber, generationNumberToVariantCount, nodeCache)
        };
    }


    getSVGHeight(variants: Variant[],
                 maxGenerationNumber: number,
                 generationNumberToVariantCount: number[]): number {

        return this.yPadding * 2 +
            this.yPadding * maxGenerationNumber +
            this.nodeHeight * (maxGenerationNumber + 1);
    }

    getSVGWidth(variants: Variant[],
                maxGenerationNumber: number,
                generationNumberToVariantCount: number[]): number {

        let max = 0;
        generationNumberToVariantCount.forEach((variantCount) => {
            if (max < variantCount) {
                max = variantCount;
            }
        });

        return this.xPadding * 2 +
            this.xPadding * (max - 1) +
            this.nodeWidth * max;
    }

    locateEdges(variant: Variant, nodeCache: HashMap<string, NWNode>): NWEdge[] {

        const edges: NWEdge[] = [];
        const targetNode = nodeCache.get(variant.getId());

        variant.getParentIds()
               .forEach((parentId) => {
                   const sourceNode = nodeCache.get(parentId);

                   edges.push(
                       {
                           id: "",
                           color: RGB.BLACK,
                           sourceX: sourceNode.x + sourceNode.width,
                           sourceY: sourceNode.y + sourceNode.height * 2,
                           targetX: targetNode.x + targetNode.width,
                           targetY: targetNode.y
                       });
               });

        return edges;
    }


    locateNodes(variant: Variant): NWNode[] {
        return [];
    }

    needsCachingEdge(): boolean {
        return false;
    }

    needsCachingNode(): boolean {
        return true;
    }
}
