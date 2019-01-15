import HashMap from "hashmap";
import {Color} from "@/scripts/color/Color";
import {NodeDatum3} from "@/scripts/json/Layout";

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
