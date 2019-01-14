import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class Patch2 extends Serializable {
    @SerializeProperty()
    public readonly fileName!: string;

    @SerializeProperty()
    public readonly diff!: string;
}
