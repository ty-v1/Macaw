import {Variant} from "./Variant";
import {TestSummary} from "./TestSummary";
import {MessageBuilder, MessageData} from "@/scripts/data/MessageData";

export class CompressedVariant extends Variant {

    private readonly count: number;

    public constructor(id: string, generationNumber: number, fitness: number, count: number) {
        const testSummary: TestSummary = {
            successRate: 0.0,
            executedTestsCount: 0,
            testResults: []
        };
        super(id, generationNumber, fitness, false, 0, [], [], testSummary, false);

        this.count = count;
    }

    public generateMessage(): MessageData {

        return new MessageBuilder()
            .setTop('Build Failed Variants')
            .addItem('count', this.count.toString())
            .buildMessage();
    }
}
