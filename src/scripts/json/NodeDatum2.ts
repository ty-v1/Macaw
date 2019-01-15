import {Color} from "@/scripts/color/Color";
import {sprintf} from "sprintf-js";
import {Variant2} from "@/scripts/json/Variant2";
import {EdgeDatum3, NodeDatum3} from "@/scripts/json/Layout";
import {Tyukan} from "@/scripts/json/Tyukan";

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

    public static compare(n1: NodeDatum2, n2: NodeDatum2) {
        // 世代の比較
        if (n1.generation < n2.generation) {
            return -1;
        } else if (n1.generation > n2.generation) {
            return 1;
        }

        // 適応度の比較
        if (n1.variant.fitness < n2.variant.fitness) {
            return 1;
        } else if (n1.variant.fitness > n2.variant.fitness) {
            return -1;
        }

        return 0;

    }
}
