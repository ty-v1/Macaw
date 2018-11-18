import {Diff} from "@/scripts/data/Diff";
import {Operation} from "@/scripts/data/Operation";
import {TestSummary} from "@/scripts/data/TestSummary";
import HashMap from "hashmap";

export class Variant {

    private readonly id: string;
    private readonly generationNumber: number;
    private readonly fitness: number;
    private readonly buildSuccess: boolean;
    private readonly selectionCount: number;
    private readonly patch: Diff[];
    private readonly idToOperations: HashMap<string, Operation>;
    private readonly testSummary: TestSummary;

    private readonly selected: boolean;

    public constructor(id: string, generationNumber: number, fitness: number, buildSuccess: boolean,
                       selectionCount: number, patch: Diff[], operations: Operation[],
                       testSummary: TestSummary, selected: boolean = false) {
        this.id = id;
        this.generationNumber = generationNumber;
        this.fitness = fitness;
        this.buildSuccess = buildSuccess;
        this.patch = patch;
        this.testSummary = testSummary;
        this.selected = selected;
        this.selectionCount = selectionCount;

        this.idToOperations = new HashMap<string, Operation>();
        operations.forEach((operation) => {
            this.idToOperations.set(operation.id, operation);
        });
    }

    // getter
    public getId(): string {
        return this.id;
    }

    public getParentIds(): string[] {
        return this.idToOperations.keys();
    }

    public getOperation(id: string): Operation {
        return this.idToOperations.get(id);
    }

    public changeParentId(oldId: string, newId: string): void {
        const operation: Operation = this.getOperation(oldId);
        this.idToOperations.remove(oldId);
        operation.id = newId;
        this.idToOperations.set(newId, operation);
    }

    public getPatches(): Diff[] {
        return this.patch;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public getGenerationNumber(): number {
        return this.generationNumber;
    }

    public isSelected(): boolean {
        return this.selected;
    }

    public isBuildSuccess(): boolean {
        return this.buildSuccess;
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
