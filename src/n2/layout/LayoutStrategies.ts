import {INodeColorStrategy} from "@/n2/node/strategy/color/INodeColorStrategy";
import {INodePositionStrategy} from "@/n2/node/strategy/position/INodePositionStrategy";
import {EdgeDatum3, GraphEdgeSet2, GraphNodeSet2, Layout2, Tyukan} from "@/scripts/json/Variant2";
import {sprintf} from "sprintf-js";

export class LayoutStrategies {

    private nodeColorStrategy: INodeColorStrategy;
    private nodePositionStrategy: INodePositionStrategy;

    // TODO エッジ関連のストラテジーもあとでたす

    public constructor(nodeColorStrategy: INodeColorStrategy,
                       nodePositionStrategy: INodePositionStrategy) {
        this.nodeColorStrategy = nodeColorStrategy;
        this.nodePositionStrategy = nodePositionStrategy;
    }

    // setter(node)
    public setNodeColorStrategy(nodeColorStrategy: INodeColorStrategy) {
        this.nodeColorStrategy = nodeColorStrategy;
    }

    public setNodePositionStrategy(nodePositionStrategy: INodePositionStrategy) {
        this.nodePositionStrategy = nodePositionStrategy;
    }

    // TODO setter(edge)

    public exec(variants: Tyukan, marginX: number, marginY): Layout2 {
        // エレメントの初期化
        const a: GraphNodeSet2 = this.nodeSyori(variants);
        const b: GraphEdgeSet2 = this.edgeSyori(a, variants);

        // SVG領域の計算
        const width = a.getMaxX() + marginX * 2;
        const height = a.getMaxY() + marginY * 2;

        return {
            nodes: a,
            edges: b,
            width: width,
            height: height
        };
    }

    private nodeSyori(nodeData: Tyukan): GraphNodeSet2 {
        // ノードの初期化
        const a: GraphNodeSet2 = this.intializeNode(nodeData);
        // TODO ストラテジーにする
        // 大きさ
        a.values()
         .forEach((n) => n.width = 15);
        a.values()
         .forEach((n) => n.height = 15);

        // 色付け
        this.nodeColorStrategy.exec(nodeData, a);


        // 座標
        this.nodePositionStrategy.exec(nodeData, 25, 100, a);

        return a;
    }

    private edgeSyori(a: GraphNodeSet2, nodeData: Tyukan): GraphEdgeSet2 {
        // エッジの初期化
        const b: GraphEdgeSet2 = this.intializeEdge(nodeData);
        // 座標極め
        this.setEdgeData(b, a);

        // INとOUTの設定
        this.setNodeToIOEdge(a, b);

        return b;
    }

    private intializeNode(nodeData: Tyukan): GraphNodeSet2 {
        const a: GraphNodeSet2 = new GraphNodeSet2();

        // 描画用データの初期化
        nodeData.hiassyukus()
                .forEach((n) => a.add(n.nodeDatum3));

        nodeData.assyukus()
                .forEach((n) => a.add(n.nodeDatum3));

        return a;
    }

    private intializeEdge(nodeData: Tyukan): GraphEdgeSet2 {
        // 各エッジの初期化
        const es: EdgeDatum3[] = [];
        nodeData.hiassyukus()
                .forEach((n) => es.push(...n.createEdgeDatum3(nodeData)));
        nodeData.assyukus()
                .forEach((n) => es.push(...n.createEdgeDatum3s(nodeData)));

        // IDを設定する
        for (let i = 0; i < es.length; i++) {
            es[i].id = sprintf('e-%d', i);
        }

        const edges = new GraphEdgeSet2();
        edges.add(...es);
        return edges;
    }

    private setEdgeData(a: GraphEdgeSet2, b: GraphNodeSet2) {
        a.values()
         .forEach((e) => {
             const source = b.get(e.sourceId);
             const target = b.get(e.targetId);

             e.sourceX = source.x + source.width;
             e.sourceY = source.y + source.height * 2;

             e.targetX = target.x + target.width;
             e.targetY = target.y;
         });
    }

    private setNodeToIOEdge(nodes: GraphNodeSet2, edges: GraphEdgeSet2): void {
        edges.values()
             .forEach((edge) => {
                 const source = nodes.get(edge.sourceId);
                 const target = nodes.get(edge.targetId);

                 source.outEdgeIds.push(edge.id);
                 target.inEdgeIds.push(edge.id);
             });
    }
}
