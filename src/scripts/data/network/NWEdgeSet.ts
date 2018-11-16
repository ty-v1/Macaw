import HashMap from "hashmap";
import {RGB} from "@/scripts/color/RGB";
import {NWEdge} from "@/scripts/data/network/NWEdge";

export class NWEdgeSet {

    private idToEdge: HashMap<string, NWEdge>;

    public constructor() {
        this.idToEdge = new HashMap()
    }

    public addNWEdge(edge: NWEdge): void {
        this.idToEdge.set(edge.id, edge);
    }

    public getNWNode(id: string): NWEdge {
        if (this.idToEdge.has(id)) {
            return this.idToEdge.get(id);
        } else {
            return {
                id: "null",
                targetX: 0,
                targetY: 0,
                sourceX: 0,
                sourceY: 0,
                color: RGB.BLACK
            };
        }
    }

    public size():number{
        return this.idToEdge.count();
    }
}
