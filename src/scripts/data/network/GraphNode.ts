import {Color} from "@/scripts/color/Color";

export class GraphNode {
    private readonly id: string;
    private readonly x: number;
    private readonly y: number;
    private readonly color: Color;
    private readonly width: number;
    private readonly height: number;
    private readonly shape: string;
    private readonly inEdgeIds: string[] = [];
    private readonly outEdgeIds: string[] = [];
    private cssClasses: string[] = [];

    public constructor(id: string, x: number, y: number,
                       width: number, height: number,
                       color: Color, shape: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.shape = shape;
    }

    // getter
    public getId(): string {
        return this.id;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getColor(): Color {
        return this.color;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getShape(): string {
        return this.shape;
    }

    public getInEdgeIds(): string[] {
        return this.inEdgeIds;
    }

    public getOutEdgeIds(): string[] {
        return this.outEdgeIds;
    }

    public getCSSClasses(): string[] {
        return this.cssClasses;
    }

    // setter
    public addInEdgeId(edgeId: string): void {
        this.inEdgeIds.push(edgeId);
    }

    public addOutEdgeId(edgeId: string): void {
        this.outEdgeIds.push(edgeId);
    }

    public addCSSClass(cssClass: string): void {
        if (!this.hasCSSClass(cssClass)) {
            this.cssClasses.push(cssClass);
        }
    }

    public removeCSSClass(cssClass: string): void {
        this.cssClasses = this.cssClasses.filter((e => e !== cssClass));
    }

    public clearCSSClasses(): void {
        this.cssClasses = [];
    }

    private hasCSSClass(cssClass: string): boolean {
        for (let i = 0; i < this.cssClasses.length; i++) {
            if (this.cssClasses[i] === cssClass) {
                return true;
            }
        }
        return false;
    }
}

export type NodeDatum = {
    x: number;
    y: number;
    color: Color;
    width: number;
    height: number;
    shape: string;
}
