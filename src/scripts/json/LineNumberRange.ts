import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class LineNumberRange extends Serializable {

    @SerializeProperty()
    public readonly start!: number;

    @SerializeProperty()
    public readonly end!: number;
}
