import {Diff} from "@/scripts/data/Diff";
import {Operation} from "@/scripts/data/Operation";
import {TestSummaryData} from "@/scripts/data/TestSummaryData";
import HashMap from "hashmap";
import {MessageBuilder, MessageData} from "@/scripts/data/MessageData";
import {sprintf} from "sprintf-js";

export class Variant {

    private readonly id: string;
    private readonly generationNumber: number;
    private readonly fitness: number;
    private readonly buildSuccess: boolean;
    private readonly selectionCount: number;
    private readonly patch: Diff[];
    private readonly idToOperations: HashMap<string, Operation>;
    private readonly testSummary: TestSummaryData;
    private readonly children: Set<string>;

    public constructor(id: string, generationNumber: number, fitness: number, buildSuccess: boolean,
                       selectionCount: number, patch: Diff[], operations: Operation[],
                       testSummary: TestSummaryData, children: Set<string>) {
        this.id = id;
        this.generationNumber = generationNumber;
        this.fitness = fitness;
        this.buildSuccess = buildSuccess;
        this.patch = patch;
        this.testSummary = testSummary;
        this.selectionCount = selectionCount;
        this.children = children;

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

    public getPatches(): Diff[] {
        return this.patch;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public getGenerationNumber(): number {
        return this.generationNumber;
    }

    public isBuildSuccess(): boolean {
        return this.buildSuccess;
    }

    public getChildrenCount(): number {
        return this.children.size;
    }

    public getOperations(): Operation[] {
        return this.idToOperations.values();
    }

    public getTestSummary(): TestSummaryData {
        return this.testSummary;
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

    public generateMessage(): MessageData {
        return new MessageBuilder()
            .addItem('Generation Number', this.generationNumber.toString())
            .addItem('Fitness', sprintf("%1.3f", this.fitness))
            .addItem('Children', sprintf("%s", this.children.size))
            .buildMessage();
    }
}
