import HashMap from "hashmap";
import {NWNode} from "@/scripts/data/network/NWNode";
import {RGB} from "@/scripts/color/RGB";

export class NWNodeSet {

    private idToNode: HashMap<string, NWNode>;

    public constructor() {
        this.idToNode = new HashMap()
    }

    public addNWNode(node: NWNode): void {
        this.idToNode.set(node.id, node);
    }

    public getNWNode(id: string): NWNode {
        if (this.idToNode.has(id)) {
            return this.idToNode.get(id);
        } else {
            return {
                id: "null",
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                color: RGB.BLACK
            };
        }
    }

    public size(): number {
        return this.idToNode.count();
    }
}
