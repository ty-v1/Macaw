import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {LineNumberRange} from "@/scripts/json/LineNumberRange";

@Serialize({})
export class Base extends Serializable {

    @SerializeProperty()
    public readonly name!: string;

    @SerializeProperty()
    public readonly fileName!: string;

    @SerializeProperty()
    public readonly snippet!: string;

    @SerializeProperty({type: LineNumberRange})
    public readonly lineNumberRange!: LineNumberRange;

}
