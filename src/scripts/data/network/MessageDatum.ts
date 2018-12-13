export class MessageDatum {
    public readonly itemName: string;
    public readonly description: string;

    public constructor(itemName: string, description: string) {
        this.itemName = itemName;
        this.description = description;
    }
}
