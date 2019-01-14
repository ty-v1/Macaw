import {Variant2} from "@/scripts/json/Variant2";

export class CompressedVarinat2 {

    private readonly variants: Variant2[] = [];

    private readonly generationNumber: number;

    public constructor(generationNumber: number) {
        this.generationNumber = generationNumber;
    }
}
