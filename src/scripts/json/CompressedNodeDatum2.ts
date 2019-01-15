import {Color} from "@/scripts/color/Color";
import {NodeDatum2} from "@/scripts/json/NodeDatum2";
import {EdgeDatum3, NodeDatum3} from "@/scripts/json/Layout";
import {Tyukan} from "@/scripts/json/Tyukan";

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
