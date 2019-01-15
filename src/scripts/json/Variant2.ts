import {Base} from "@/scripts/json/Base";
import {Patch2} from "@/scripts/json/Patch2";
import {Operation2} from "@/scripts/json/Operation2";
import {TestSummary2} from "@/scripts/json/TestSummary2";
import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {sprintf} from "sprintf-js";
import {NodeDatum2} from "@/scripts/json/NodeDatum2";

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
}

export function createNode(v: Variant2): NodeDatum2 {
    return new NodeDatum2(String(v.id), v.generationNumber, false, v);
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

    for (let i = 1; i <= selection_count; i++) {
        const id = sprintf('%d-%d', v.id, i);
        nodeData.push(new NodeDatum2(id, v.generationNumber + i, true, v));
    }

    return nodeData;
}


