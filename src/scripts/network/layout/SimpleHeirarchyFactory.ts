import {Variant} from "@/scripts/data/Variant";
import {NWEdge} from "@/scripts/data/network/NWEdge";
import {NWNode} from "@/scripts/data/network/NWNode";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {RGB} from "@/scripts/color/RGB";
import {ILayoutFactory, Layout} from "@/scripts/network/layout/NewILayoutStrategy";
import {NWNodeSet} from "@/scripts/data/network/NWNodeSet";
import {NWEdgeSet} from "@/scripts/data/network/NWEdgeSet";

export class SimpleHeirarchyFactory implements ILayoutFactory {

    private readonly nodeWidth: number;
    private readonly nodeHeight: number;
    private readonly xPadding: number;
    private readonly yPadding: number;

    private readonly nodeColorStrategy: INodeColorStrategy;

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

    exec(variants: Variant[],
         maxGenerationNumber: number,
         generationNumberToVariantCount: number[]): Layout {
        const nodes
            = this.cacheNodeX(variants, maxGenerationNumber);

        const edges
            = this.createEdgeCache(variants, nodes);

        return {
            nodes: nodes,
            edges: edges,
            width: this.getSVGWidth(generationNumberToVariantCount),
            height: this.getSVGHeight(maxGenerationNumber)
        };
    }

    private cacheNodeX(variants: Variant[],
                       maxGenerationNumber: number): NWNodeSet {
        const nodes = new NWNodeSet();

        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(maxGenerationNumber + 1);
        generationNumberToCurrentX.fill(0);

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const beforeX = generationNumberToCurrentX[generationNumber];
            const x = beforeX + this.xPadding;

            const node: NWNode = {
                id: variant.getId(),
                x: x,
                y: (generationNumber + 1) * this.yPadding + generationNumber * this.nodeHeight,
                width: this.nodeWidth,
                height: this.nodeHeight,
                color: this.nodeColorStrategy.createNodeColor(variant),
            };

            generationNumberToCurrentX[generationNumber] = x + this.nodeWidth;

            nodes.addNWNode(node);
        });

        return nodes;
    }

    private createEdgeCache(variants: Variant[],
                            nodes: NWNodeSet): NWEdgeSet {

        const edges = new NWEdgeSet();

        variants.forEach((variant) => {

            const targetNode = nodes.getNWNode(variant.getId());

            variant.getParentIds()
                   .forEach((parentId) => {
                       const sourceNode = nodes.getNWNode(parentId);
                       const edge: NWEdge = {
                           id: "e" + edges.size(),
                           color: RGB.BLACK,
                           sourceX: sourceNode.x + sourceNode.width,
                           sourceY: sourceNode.y + sourceNode.height * 2,
                           targetX: targetNode.x + targetNode.width,
                           targetY: targetNode.y
                       };
                       edges.addNWEdge(edge);
                   });
        });
        return edges;
    }

    private getSVGHeight(
        maxGenerationNumber: number): number {

        return this.yPadding * 2 +
            this.yPadding * maxGenerationNumber +
            this.nodeHeight * (maxGenerationNumber + 1);
    }

    private getSVGWidth(
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
}
