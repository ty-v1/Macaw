import {Variant} from "@/scripts/data/Variant";
import {Layout} from "@/scripts/data/network/Layout";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";
import {GraphEdgeSet} from "@/scripts/data/network/GraphEdgeSet";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";
import {INodeShapeStrategy} from "@/scripts/network/node/strategy/shape/INodeShapeStrategy";
import {GraphEdgeBuilder} from "@/scripts/data/network/GraphEdgeBuilder";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";
import {Color} from "@/scripts/color/Color";
import {GraphNodeBuilder} from "@/scripts/data/network/GraphNodeBuilder";

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

        this.setNodeToIOEdge(nodes, edges);

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
        const nodeData: HashMap<string, NodeDatum> = new HashMap<string, NodeDatum>();

        // 各ノードの初期化
        variants.forEach((variant) => {
            const node: NodeDatum = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                color: Color.BLACK,
                shape: ''
            };
            nodeData.set(variant.getId(), node);
        });
        this.nodeShapeStrategy.exec(variants, maxGenerationNumber, nodeData);
        this.nodeColorStrategy.exec(variants, maxGenerationNumber, nodeData);
        this.nodeSizeStrategy.exec(variants, maxGenerationNumber, nodeData);
        this.nodePositionStrategy.exec(variants, maxGenerationNumber, 25, 150, nodeData);

        const nodes = new GraphNodeSet();

        nodeData.keys()
                .forEach((key) => {
                    const nodeDatum: NodeDatum = nodeData.get(key);
                    const node = new GraphNodeBuilder().setId(key)
                                                       .setX(nodeDatum.x)
                                                       .setY(nodeDatum.y)
                                                       .setWidth(nodeDatum.width)
                                                       .setHeight(nodeDatum.height)
                                                       .setColor(nodeDatum.color)
                                                       .setShape(nodeDatum.shape)
                                                       .build();
                    nodes.add(node);
                });

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
                       const edge: GraphEdge
                           = new GraphEdgeBuilder().setId('e' + edges.size())
                                                   .setSourceX(sourceNode.getX() + sourceNode.getWidth())
                                                   .setSourceY(sourceNode.getY() + sourceNode.getHeight() * 2)
                                                   .setTargetX(targetNode.getX() + targetNode.getWidth())
                                                   .setTargetY(targetNode.getY())
                                                   .setSourceId(sourceNode.getId())
                                                   .setTargetId(targetNode.getId())
                                                   .setPattern(this.getEdgePattern(variant, parentId))
                                                   .build();
                       edges.add(edge);
                   });
        });
        return edges;
    }

    private getEdgePattern(variant: Variant, parentId: string): string {

        switch (variant.getOperation(parentId).operationName) {
            case "select":
                return "";
            case "insert":
                return "equal-distance-dash";
            case "delete":
                return "long-short-dash";
            case "replace":
                return "long-middle-dash";
            case "crossover":
                return "double-line";
            default:
                return "";
        }
    }

    private setNodeToIOEdge(nodes: GraphNodeSet, edges: GraphEdgeSet): void {
        edges.values()
             .forEach((edge) => {
                 const sourceNode = nodes.get(edge.getSourceId());
                 const targetNode = nodes.get(edge.getTargetId());

                 sourceNode.addOutEdgeId(edge.getId());
                 targetNode.addInEdgeId(edge.getId());
             });
    }
}
