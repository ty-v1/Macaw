import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {APRConfiguration} from "@/scripts/json/APRConfiguration";
import {Variant2} from "@/scripts/json/Variant2";

@Serialize({})
export class APRResult extends Serializable {

    @SerializeProperty()
    public readonly projectName!: string;

    @SerializeProperty({map: "configuration", type: APRConfiguration})
    public readonly configuration!: APRConfiguration;

    @SerializeProperty({list: true})
    public variants!: Variant2[];
}

