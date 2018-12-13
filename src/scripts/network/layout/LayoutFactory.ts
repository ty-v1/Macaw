import {Variant} from "@/scripts/data/Variant";
import {Layout} from "@/scripts/data/network/Layout";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";
import {GraphNode} from "@/scripts/data/network/GraphNode";
import {Color} from "@/scripts/color/Color";
import {GraphEdgeSet} from "@/scripts/data/network/GraphEdgeSet";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";
import {INodeShapeStrategy} from "@/scripts/network/node/strategy/shape/INodeShapeStrategy";

export class LayoutFactory {

    private nodeColorStrategy: INodeColorStrategy;
    private nodePositionStrategy: INodePositionStrategy;
    private nodeSizeStrategy: INodeSizeStrategy;
    private nodeShapeStrategy: INodeShapeStrategy;

    // TODO エッジ関連のストラテジーもあとでたす

    public constructor(nodeColorStrategy: INodeColorStrategy,
                       nodePositionStrategy: INodePositionStrategy,
                       nodeSizeStrategy: INodeSizeStrategy,
                       nodeShapeStrategy: INodeShapeStrategy) {
        this.nodeColorStrategy = nodeColorStrategy;
        this.nodePositionStrategy = nodePositionStrategy;
        this.nodeSizeStrategy = nodeSizeStrategy;
        this.nodeShapeStrategy = nodeShapeStrategy;
    }

    // setter(node)
    public setNodeColorStrategy(nodeColorStrategy: INodeColorStrategy) {
        this.nodeColorStrategy = nodeColorStrategy;
    }

    public setNodePositionStrategy(nodePositionStrategy: INodePositionStrategy) {
        this.nodePositionStrategy = nodePositionStrategy;
    }

    public setNodeSizeStrategy(nodeSizeStrategy: INodeSizeStrategy) {
        this.nodeSizeStrategy = nodeSizeStrategy;
    }

    public setNodeShapeStrategy(nodeShapeStrategy: INodeShapeStrategy) {
        this.nodeShapeStrategy = nodeShapeStrategy;
    }

    // TODO setter(edge)


    public exec(variants: Variant[],
                maxGenerationNumber: number,
                generationNumberToVariantCount: number[],
                marginX: number,
                marginY): Layout {
        // ノードの計算
        const nodes =
            this.calculateNode(variants, maxGenerationNumber);

        // エッジの計算
        const edges =
            this.calculateEdge(variants, maxGenerationNumber, nodes);

        // SVG領域の計算
        const width = nodes.getMaxX() + marginX * 2;
        const height = nodes.getMaxY() + marginY * 2;

        return {
            nodes: nodes,
            edges: edges,
            width: width,
            height: height
        };
    }

    private calculateNode(variants: Variant[],
                          maxGenerationNumber: number): GraphNodeSet {
        const nodes = new GraphNodeSet();
        // 各ノードの初期化
        variants.forEach((variant) => {
            const node: GraphNode = {
                id: variant.getId(),
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                shape: 'none',
                color: Color.BLACK
            };
            nodes.add(node);
        });
        this.nodeShapeStrategy.exec(variants, maxGenerationNumber, nodes);
        this.nodeColorStrategy.exec(variants, maxGenerationNumber, nodes);
        this.nodeSizeStrategy.exec(variants, maxGenerationNumber, nodes);
        this.nodePositionStrategy.exec(variants, maxGenerationNumber, 25, 150, nodes);

        return nodes;
    }

    private calculateEdge(variants: Variant[],
                          maxGenerationNumber: number,
                          nodes: GraphNodeSet): GraphEdgeSet {
        const edges = new GraphEdgeSet();
        // 各エッジの初期化
        variants.forEach((variant) => {
            const targetNode = nodes.get(variant.getId());
            variant.getParentIds()
                   .forEach((parentId) => {
                       const sourceNode = nodes.get(parentId);
                       // TODO ここにsourceとtargetのidを入れておく
                       const edge: GraphEdge = {
                           id: "e" + edges.size(),
                           sourceX: sourceNode.x + sourceNode.width,
                           sourceY: sourceNode.y + sourceNode.height * 2,
                           targetX: targetNode.x + targetNode.width,
                           targetY: targetNode.y,
                           color: Color.BLACK,
                           sourceId: sourceNode.id,
                           targetId: targetNode.id
                       };
                       edges.add(edge);
                   });
        });
        return edges;
    }
}
