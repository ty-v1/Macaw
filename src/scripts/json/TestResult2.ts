import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class TestResult2 extends Serializable {

    @SerializeProperty()
    public readonly fqn!: string;

    @SerializeProperty()
    public readonly isSuccess!: boolean;
}
