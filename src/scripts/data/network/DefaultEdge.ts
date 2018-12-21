import {GraphEdge} from "@/scripts/data/network/GraphEdge";
import {Color} from "@/scripts/color/Color";

export class DefaultEdge extends GraphEdge {

    private static readonly instance = new DefaultEdge();

    private constructor() {
        super('', Color.BLACK, 0, 0, 0, 0, '', '', '');
    }

    public static getInstance(): DefaultEdge {
        return DefaultEdge.instance;
    }

    // override methods

    public addCSSClass(cssClass: string): void {
    }

    public clearCSSClasses(): void {
    }
}
