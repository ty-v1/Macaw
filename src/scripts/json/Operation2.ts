import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {Base} from "@/scripts/json/Base";

@Serialize({})
export class Operation2 extends Serializable {

    @SerializeProperty()
    public readonly name!: string;

    @SerializeProperty({list: true})
    public readonly parentIds!: number[];

    @SerializeProperty({type: Base})
    public readonly appendBase!: Base;

    @SerializeProperty()
    public readonly crossoverPoint!: number;

    public get isMutaion(): boolean {
        return this.appendBase !== undefined;
    }
}
