import {Base} from "@/scripts/json/Base";
import {Patch2} from "@/scripts/json/Patch2";
import {Operation2} from "@/scripts/json/Operation2";
import {TestSummary2} from "@/scripts/json/TestSummary2";
import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {sprintf} from "sprintf-js";
import {Color} from "@/scripts/color/Color";
import HashMap from "hashmap";

@Serialize({})
export class Variant2 extends Serializable {

    @SerializeProperty()
    public readonly id!: number;

    @SerializeProperty()
    public readonly generationNumber!: number;

    @SerializeProperty()
    public readonly selectionCount!: number;

    @SerializeProperty()
    public readonly fitness!: number;

    @SerializeProperty()
    public readonly isBuildSuccess!: boolean;

    @SerializeProperty()
    public readonly isSyntaxValid!: boolean;

    @SerializeProperty({list: true})
    public readonly bases!: Base[];

    @SerializeProperty({list: true})
    public readonly patch!: Patch2[];

    @SerializeProperty({type: Operation2})
    public readonly operation!: Operation2;

    @SerializeProperty({type: TestSummary2})
    public readonly testSummary!: TestSummary2;

    /**
     * バリアントの比較をする
     * */
    public static compare(variantA: Variant2, variantB: Variant2): number {

        const generationNumberA: number = variantA.generationNumber;
        const fitnessA: number = variantA.fitness;

        const generationNumberB: number = variantB.generationNumber;
        const fitnessB: number = variantB.fitness;

        // 世代での比較
        if (generationNumberA > generationNumberB) {
            return 1;
        } else if (generationNumberA < generationNumberB) {
            return -1;
        }

        // 適応度での比較
        if (fitnessA < fitnessB) {
            return 1;
        } else if (fitnessA > fitnessB) {
            return -1;
        }

        return 0;
    }

}


export function variant2Id(v: Variant2): string {
    return sprintf('%d', v.id);
}

export function createNode(v: Variant2): NodeDatum2 {
    return new NodeDatum2(variant2Id(v), v.generationNumber, false, v);
}

/**
 * 描画用のデータを作成する
 * 選択された個体のデータも同時に生成
 * */
export function createNodes(v: Variant2): NodeDatum2[] {

    if (!v.isBuildSuccess) {
        return [];
    }

    // 先にコピー前のデータを変換する
    const nodeData: NodeDatum2[] = [];
    nodeData.push(createNode(v));

    const selection_count =
        (v.id !== 0) ? v.selectionCount : v.selectionCount + 1;
    if (v.id === 0) console.log(selection_count);

    for (let i = 1; i <= selection_count; i++) {
        const id = sprintf('%d-%d', v.id, i);
        console.log(id);

        nodeData.push(new NodeDatum2(id, v.generationNumber + i, true, v));
    }

    return nodeData;
}


export type NodeDatum3 = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color,
    shape: string,
    classes: string[],
    inEdgeIds: string[],
    outEdgeIds: string[],
    variantIds: number[]
}

export type EdgeDatum3 = {
    id: string,
    sourceId: string,
    targetId: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    operation: string,
    isDisplay: boolean,
    classes: string[]
}

export class GraphNodeSet2 {

    private idToNode: HashMap<string, NodeDatum3>;

    private static readonly NULL_DATUM: NodeDatum3 = {
        id: '',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: Color.BLACK,
        shape: '',
        classes: [],
        inEdgeIds: [],
        outEdgeIds: [],
        variantIds: []
    };

    public constructor() {
        this.idToNode = new HashMap()
    }

    public add(node: NodeDatum3): void {
        this.idToNode.set(node.id, node);
    }

    public get(id: string): NodeDatum3 {
        if (this.idToNode.has(id)) {
            return this.idToNode.get(id);
        } else {
            return GraphNodeSet2.NULL_DATUM;
        }
    }

    public size(): number {
        return this.idToNode.count();
    }

    public values(): NodeDatum3[] {
        return this.idToNode.values();
    }

    //
    // public filter(f: (node: GraphNode) => boolean): GraphNode[] {
    //     const nodes: GraphNode[] = [];
    //
    //     this.idToNode.values()
    //         .forEach((node) => {
    //             if (f(node)) {
    //                 nodes.push(node);
    //             }
    //         });
    //
    //     return nodes;
    // }

    public getMaxX(): number {
        let max = 0;

        this.idToNode.values()
            .forEach((n) => {
                const x = n.x + n.width;
                if (max < x) {
                    max = x;
                }
            });
        return max;
    }

    public getMaxY(): number {
        let max = 0;

        this.idToNode.values()
            .forEach((n) => {
                const y = n.y + n.height;
                if (max < y) {
                    max = y;
                }
            });
        return max;
    }

    public has(id: string): boolean {
        return this.idToNode.has(id);
    }
}

export class GraphEdgeSet2 {

    private idToEdge: HashMap<string, EdgeDatum3>;

    private static readonly NULL_DATUM: EdgeDatum3 = {
        id: '',
        sourceId: '',
        targetId: '',
        sourceX: 0,
        sourceY: 0,
        targetX: 0,
        targetY: 0,
        operation: '',
        isDisplay: false,
        classes: []
    };

    public constructor() {
        this.idToEdge = new HashMap()
    }

    public add(...edge: EdgeDatum3[]): void {
        edge.forEach((e) => this.idToEdge.set(e.id, e));
    }

    // public filter(f: (edge: GraphEdge) => boolean): GraphEdge[] {
    //     const edges: GraphEdge[] = [];
    //
    //     this.idToEdge.values()
    //         .forEach((edge) => {
    //             if (f(edge)) {
    //                 edges.push(edge);
    //             }
    //         });
    //
    //     return edges;
    // }

    public get(id: string): EdgeDatum3 {
        if (this.idToEdge.has(id)) {
            return this.idToEdge.get(id);
        } else {
            return GraphEdgeSet2.NULL_DATUM;
        }
    }

    public size(): number {
        return this.idToEdge.count();
    }

    public values(): EdgeDatum3[] {
        return this.idToEdge.values();
    }

    public has(id: string): boolean {
        return this.idToEdge.has(id);
    }
}


/**
 * 中間データを保持するクラス
 * */
export class Tyukan {

    private readonly nodeData: HashMap<string, NodeDatum2>
        = new HashMap<string, NodeDatum2>();
    private readonly GtoAssyuku: HashMap<string, CompressedNodeDatum2>
        = new HashMap<string, CompressedNodeDatum2>();

    /**
     * コンストラクタで中間データに変換する
     * */
    public constructor(variants: Variant2[]) {
        const GToAssyuku: HashMap<number, NodeDatum2[]> = new HashMap<number, NodeDatum2[]>();

        // 中間データに変換
        variants.forEach((variant: Variant2) => {
            if (!variant.isBuildSuccess) {
                if (GToAssyuku.has(variant.generationNumber)) {
                    GToAssyuku.get(variant.generationNumber)
                              .push(createNode(variant));
                } else {
                    GToAssyuku.set(variant.generationNumber, [createNode(variant)]);
                }
            } else {
                createNodes(variant)
                    .forEach((n) => this.nodeData.set(n.id, n));
            }
        });

        // 集約したデータを中間データに変換
        GToAssyuku.keys()
                  .forEach((key) => {
                      const id: string = sprintf('c-%d', key);
                      this.GtoAssyuku.set(id, new CompressedNodeDatum2(id, GToAssyuku.get(key), key))
                  });

    }

    public getNode(id: string): NodeDatum2 {
        return this.nodeData.get(id);
    }

    public hiassyukus(): NodeDatum2[] {
        return this.nodeData.values();
    }

    public assyukus(): CompressedNodeDatum2[] {
        return this.GtoAssyuku.values();
    }

    public getAssyuku(id: string): CompressedNodeDatum2 {
        return this.GtoAssyuku.get(id);
    }

    public get maxGeneration(): number {
        let max = 0;

        this.nodeData.values()
            .forEach((n) => {
                if (n.generation > max) {
                    max = n.generation;
                }
            });

        this.GtoAssyuku.values()
            .forEach((n) => {
                if (n.generation > max) {
                    max = n.generation;
                }
            });

        return max;
    }

}

//
// // TODO あとで移す
export class NodeDatum2 {
    public readonly id: string;
    public readonly generation: number;
    public readonly variant: Variant2;
    public readonly isSelect: boolean;

    public constructor(id: string, generation: number, isSelect: boolean, variant: Variant2) {
        this.id = id;
        this.variant = variant;
        this.generation = generation;
        this.isSelect = isSelect;
    }

    public get nodeDatum3(): NodeDatum3 {
        return {
            id: this.id,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: Color.BLACK,
            shape: 'circle',
            classes: [],
            inEdgeIds: [],
            outEdgeIds: [],
            variantIds: [this.variant.id]
        };
    }

    public createEdgeDatum3(a: Tyukan): EdgeDatum3[] {
        if (this.isSelect) {
            return [this.createSelectEdge()];
        } else {
            return this.createOperationEdge(a);
        }
    }

    private createSelectEdge(): EdgeDatum3 {
        const sourceId: string =
            (this.generation - this.variant.generationNumber) === 1 ?
                String(this.variant.id) :
                sprintf('%d-%d', this.variant.id,
                        this.generation - this.variant.generationNumber - 1);
        return {
            id: '',
            sourceId: sourceId,
            targetId: this.id,
            sourceX: 0,
            sourceY: 0,
            targetX: 0,
            targetY: 0,
            operation: this.isSelect ? 'select' : this.variant.operation.name,
            isDisplay: true,
            classes: []
        };
    }

    private createOperationEdge(nodes: Tyukan): EdgeDatum3[] {
        const edgeData: EdgeDatum3[] = [];
        this.variant.operation.parentIds.forEach((parentId) => {

            const source = nodes.getNode(sprintf('%d', parentId));
            const sourceId: string =
                (this.generation - source.variant.generationNumber) === 1 ?
                    String(source.variant.id) :
                    sprintf('%d-%d', source.variant.id,
                            this.generation - source.variant.generationNumber - 1);

            edgeData.push(
                {
                    id: '',
                    sourceId: sourceId,
                    targetId: this.id,
                    sourceX: 0,
                    sourceY: 0,
                    targetX: 0,
                    targetY: 0,
                    isDisplay: true,
                    operation: this.variant.operation.name,
                    classes: []
                }
            );
        });

        return edgeData;
    }
}

export class CompressedNodeDatum2 {

    public readonly id: string;
    public readonly nodeData: NodeDatum2[];
    public readonly generation: number;

    public constructor(id: string, nodeData: NodeDatum2[], generation: number) {
        this.id = id;
        this.nodeData = nodeData;
        this.generation = generation;
    }

    public get nodeDatum3(): NodeDatum3 {

        const variantIds: number[] = [];

        this.nodeData.forEach((n) => variantIds.push(n.variant.id));

        return {
            id: this.id,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: Color.BLACK,
            shape: 'cross',
            classes: [],
            inEdgeIds: [],
            outEdgeIds: [],
            variantIds: variantIds
        };
    }

    public createEdgeDatum3s(b: Tyukan): EdgeDatum3[] {

        const a: EdgeDatum3[] = [];

        this.nodeData.forEach((n) => a.push(...n.createEdgeDatum3(b)));
        a.forEach((e) => e.targetId = this.id);

        return a;
    }
}

export type Layout2 = {
    nodes: GraphNodeSet2,
    edges: GraphEdgeSet2,
    width: number,
    height: number
}

