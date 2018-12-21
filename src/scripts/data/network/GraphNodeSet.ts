import HashMap from "hashmap";
import {GraphNode} from "@/scripts/data/network/GraphNode";
import {DefaultNode} from "@/scripts/data/network/DefaultNode";

export class GraphNodeSet {

    private idToNode: HashMap<string, GraphNode>;

    public constructor() {
        this.idToNode = new HashMap()
    }

    public add(node: GraphNode): void {
        this.idToNode.set(node.getId(), node);
    }

    public get(id: string): GraphNode {
        if (this.idToNode.has(id)) {
            return this.idToNode.get(id);
        } else {
            return DefaultNode.getInstance();
        }
    }

    public size(): number {
        return this.idToNode.count();
    }

    public values(): GraphNode[] {
        return this.idToNode.values();
    }

    public filter(f: (node: GraphNode) => boolean): GraphNode[] {
        const nodes: GraphNode[] = [];

        this.idToNode.values()
            .forEach((node) => {
                if (f(node)) {
                    nodes.push(node);
                }
            });

        return nodes;
    }

    public getMaxX(): number {
        let max = 0;

        this.idToNode.values()
            .forEach((node) => {
                const x = node.getX() + node.getWidth();
                if (max < x) {
                    max = x;
                }
            });
        return max;
    }

    public getMaxY(): number {
        let max = 0;

        this.idToNode.values()
            .forEach((node) => {
                const y = node.getY() + node.getHeight();
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
