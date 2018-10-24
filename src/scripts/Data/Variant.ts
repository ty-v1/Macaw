import {VariantDatum} from './VariantDatum';
import {Operation} from './Operation';

export class Variant {

    private readonly datum: VariantDatum;

    public constructor(datum: VariantDatum) {
        this.datum = datum;
    }

    public getId(): string {
        return this.datum.id;
    }

    public getParentIds(): string[] {
        const parentIds: string[] = [];

        this.datum.operations.forEach(
            (operation: Operation) => {
                const size: number = parentIds.length;
                parentIds[size] = operation.id;
            });
        return parentIds;
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
