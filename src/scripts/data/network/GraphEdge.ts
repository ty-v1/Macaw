import {Color} from "@/scripts/color/Color";

export class GraphEdge {
    private readonly id: string;
    private readonly color: Color;
    private readonly sourceX: number;
    private readonly sourceY: number;
    private readonly targetX: number;
    private readonly targetY: number;
    private readonly sourceId: string;
    private readonly targetId: string;
    private readonly pattern: string;
    public highlighted: boolean = false;
    private cssClasses: string[] = [];

    public constructor(id: string, color: Color,
                       sourceX: number, sourceY: number,
                       targetX: number, targetY: number,
                       sourceId: string, targetId: string, pattern: string) {
        this.id = id;
        this.color = color;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.pattern = pattern;
    }

    // getter
    public getId(): string {
        return this.id;
    }

    public getColor(): Color {
        return this.color;
    }

    public getSourceX(): number {
        return this.sourceX;
    }

    public getSourceY(): number {
        return this.sourceY;
    }

    public getTargetX(): number {
        return this.targetX;
    }

    public getTargetY(): number {
        return this.targetY;
    }

    public getSourceId(): string {
        return this.sourceId;
    }

    public getTargetId(): string {
        return this.targetId;
    }

    public getPattern(): string {
        return this.pattern;
    }

    public getHighlighted(): boolean {
        return this.highlighted;
    }

    public getCSSClasses(): string[] {
        return this.cssClasses;
    }

    // setter
    public addCSSClass(cssClass: string): void {
        this.cssClasses.push(cssClass);
    }

    public clearCSSClasses(): void {
        this.cssClasses = [];
    }
}
