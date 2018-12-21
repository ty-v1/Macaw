import HashMap from "hashmap";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";
import {DefaultEdge} from "@/scripts/data/network/DefaultEdge";

export class GraphEdgeSet {

    private idToEdge: HashMap<string, GraphEdge>;

    public constructor() {
        this.idToEdge = new HashMap()
    }

    public add(edge: GraphEdge): void {
        this.idToEdge.set(edge.getId(), edge);
    }

    public filter(f: (edge: GraphEdge) => boolean): GraphEdge[] {
        const edges: GraphEdge[] = [];

        this.idToEdge.values()
            .forEach((edge) => {
                if (f(edge)) {
                    edges.push(edge);
                }
            });

        return edges;
    }

    public get(id: string): GraphEdge {
        if (this.idToEdge.has(id)) {
            return this.idToEdge.get(id);
        } else {
            return DefaultEdge.getInstance();
        }
    }

    public size(): number {
        return this.idToEdge.count();
    }

    public values(): GraphEdge[] {
        return this.idToEdge.values();
    }

    public has(id: string): boolean {
        return this.idToEdge.has(id);
    }
}
