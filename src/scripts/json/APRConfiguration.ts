import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class APRConfiguration extends Serializable {

    @SerializeProperty()
    public readonly mutationGeneratingCount!: number;

    @SerializeProperty()
    public readonly crossoverGeneratingCount!: number;

    @SerializeProperty()
    public readonly headcount!: number;

    @SerializeProperty()
    public readonly maxGeneration!: number;

    @SerializeProperty()
    public readonly randomSeed!: number;
}
