import {Patch} from "@/scripts/data/Patch";
import {VariantDatum} from "@/scripts/data/VariantDatum";
import {Operation} from "@/scripts/data/Operation";

export class Variant {

    private readonly datum: VariantDatum;

    public constructor(datum: VariantDatum) {
        this.datum = datum;
    }

    public getId(): string {
        return this.datum.id;
    }

    public getOperations(): Operation[] {
        return this.datum.operations;
    }

    public getPatches(): Patch[] {
        return this.datum.patches;
    }

    public getFitness(): number {
        return this.datum.fitness;
    }

    public getGenerationNumber(): number {
        return this.datum.generationNumber;
    }

    public getSelectionCount(): number {
        return this.datum.selectionCount;
    }

    /**
     * バリアントの比較をする
     * */
    public static compare(variantA: Variant, variantB: Variant) {

        const generationNumberA: number = variantA.datum.generationNumber;
        const fitnessA: number = variantA.datum.fitness;

        const generationNumberB: number = variantB.datum.generationNumber;
        const fitnessB: number = variantB.datum.fitness;

        // 世代での比較
        if (generationNumberA > generationNumberB) {
            return 1;
        } else if (generationNumberA < generationNumberB) {
            return -1;
        }

        // 適応度での比較
        if (fitnessA < fitnessB) {
            return 1;
        } else if (fitnessA > fitnessB) {
            return -1;
        }

        return 0;
    }
}
