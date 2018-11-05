import {Patch} from "@/scripts/data/Patch";
import {Operation} from "@/scripts/data/Operation";
import {TestSummary} from "@/scripts/data/TestSummary";

export class Variant {

    private readonly id: string;
    private readonly generationNumber: number;
    private readonly fitness: number;
    private readonly buildSuccess: boolean;
    private readonly patches: Patch[];
    private readonly operations: Operation[];
    private readonly testSummary: TestSummary;

    private readonly selected: boolean;

    public constructor(id: string, generationNumber: number, fitness: number, buildSuccess: boolean,
                       patches: Patch[], operations: Operation[], testSummary: TestSummary, parentId?: string, selected: boolean = false) {
        this.id = id;
        this.generationNumber = generationNumber;
        this.fitness = fitness;
        this.buildSuccess = buildSuccess;
        this.patches = patches;
        this.testSummary = testSummary;
        this.selected = selected;

        if (this.selected && parentId !== undefined) {
            this.operations = [
                {
                    id: parentId,
                    operationName: "select"
                }
            ];
        } else {
            this.operations = operations;
        }
    }

    // getter
    public getId(): string {
        return this.id;
    }

    public getOperations(): Operation[] {
        return this.operations;
    }

    public getPatches(): Patch[] {
        return this.patches;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public getGenerationNumber(): number {
        return this.generationNumber;
    }

    /**
     * バリアントの比較をする
     * */
    public static compare(variantA: Variant, variantB: Variant) {

        const generationNumberA: number = variantA.generationNumber;
        const fitnessA: number = variantA.fitness;

        const generationNumberB: number = variantB.generationNumber;
        const fitnessB: number = variantB.fitness;

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
