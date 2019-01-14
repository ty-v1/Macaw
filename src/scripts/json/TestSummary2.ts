import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {TestResult2} from "@/scripts/json/TestResult2";

@Serialize({})
export class TestSummary2 extends Serializable {

    @SerializeProperty()
    public readonly successRate!: number;

    @SerializeProperty()
    public readonly executedTestsCount!: number;

    @SerializeProperty({list: true})
    public readonly testResults!: TestResult2[];
}
