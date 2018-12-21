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
    private cssClasses: string[];

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

        this.cssClasses = [this.pattern];
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

    public getCSSClasses(): string[] {
        return this.cssClasses;
    }

    // setter
    public addCSSClass(cssClass: string): void {
        if (!this.hasCSSClass(cssClass)) {
            this.cssClasses.push(cssClass);
        }
    }

    public clearCSSClasses(): void {
        this.cssClasses = [this.getPattern()];
    }

    public hasCSSClass(cssClass: string): boolean {
        for (let i = 0; i < this.cssClasses.length; i++) {
            if (this.cssClasses[i] === cssClass) {
                return true;
            }
        }
        return false;
    }
}
