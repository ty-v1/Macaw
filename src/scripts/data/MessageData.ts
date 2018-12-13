import {MessageDatum} from "@/scripts/data/network/MessageDatum";

export class MessageData {

    private readonly size: number;
    private readonly data: MessageDatum[];
    private readonly top: string;

    public constructor(itemNames: string[], descriptions: string[], top: string) {
        this.size = itemNames.length;

        this.data = [];
        for (let i = 0; i < this.size; i++) {
            const datum: MessageDatum = new MessageDatum(itemNames[i], descriptions[i]);
            this.data.push(datum);
        }

        this.top = top;
    }

    public getData(): MessageDatum[] {
        return this.data;
    }

    public getTop(): string {
        return this.top;
    }

    public hasTop(): boolean {
        return this.top !== '';
    }
}

export class MessageBuilder {

    private itemNames: string[] = [];
    private descriptions: string[] = [];
    private top: string = '';

    public setTop(top: string): MessageBuilder {
        this.top = top;

        return this;
    }

    public addItem(name: string, description: string): MessageBuilder {
        this.itemNames.push(name);
        this.descriptions.push(description);

        return this;
    }

    public buildMessage(): MessageData {
        return new MessageData(this.itemNames, this.descriptions, this.top);
    }
}
