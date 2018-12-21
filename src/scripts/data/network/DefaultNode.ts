import {GraphNode} from "@/scripts/data/network/GraphNode";
import {Color} from "@/scripts/color/Color";

export class DefaultNode extends GraphNode {

    private static readonly instance = new DefaultNode();

    private constructor() {
        super('', 0, 0, 0, 0, Color.BLACK, '');
    }

    public static getInstance(): DefaultNode {
        return DefaultNode.instance;
    }

    // override methods

    public addInEdgeId(edgeId: string): void {
    }

    public addOutEdgeId(edgeId: string): void {
    }

    public addCSSClass(cssClass: string): void {
    }

    public removeCSSClass(cssClass: string): void {
    }

    public clearCSSClasses(): void {
    }
}
