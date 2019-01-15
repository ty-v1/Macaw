import HashMap from "hashmap";
import {EdgeDatum3} from "@/scripts/json/Layout";

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
