import HashMap from "hashmap";
import {NodeDatum2} from "@/scripts/json/NodeDatum2";
import {CompressedNodeDatum2} from "@/scripts/json/CompressedNodeDatum2";
import {sprintf} from "sprintf-js";
import {createNode, createNodes, Variant2} from "@/scripts/json/Variant2";

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

    public hiassyukus(sort: boolean = false): NodeDatum2[] {
        if (sort) {
            return this.nodeData.values()
                       .sort(NodeDatum2.compare);
        }
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
