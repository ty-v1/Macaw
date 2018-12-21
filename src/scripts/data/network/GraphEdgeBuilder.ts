import {Color} from "@/scripts/color/Color";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";

export class GraphEdgeBuilder {
    private id: string = '';
    private color: Color = Color.BLACK;
    private sourceX: number = 0;
    private sourceY: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;
    private sourceId: string = '';
    private targetId: string = '';
    private pattern: string = '';

    public setId(id: string): GraphEdgeBuilder {
        this.id = id;
        return this;
    }

    public setColor(color: Color): GraphEdgeBuilder {
        this.color = color;
        return this;
    }

    public setSourceX(sourceX: number): GraphEdgeBuilder {
        this.sourceX = sourceX;
        return this;

    }

    public setSourceY(sourceY: number): GraphEdgeBuilder {
        this.sourceY = sourceY;
        return this;

    }

    public setTargetX(targetX: number): GraphEdgeBuilder {
        this.targetX = targetX;
        return this;

    }

    public setTargetY(targetY: number): GraphEdgeBuilder {
        this.targetY = targetY;
        return this;

    }

    public setSourceId(sourceId: string): GraphEdgeBuilder {
        this.sourceId = sourceId;
        return this;

    }

    public setTargetId(targetId: string): GraphEdgeBuilder {
        this.targetId = targetId;
        return this;
    }

    public setPattern(pattern: string): GraphEdgeBuilder {
        this.pattern = pattern;
        return this;
    }

    public build(): GraphEdge {
        return new GraphEdge(this.id, this.color,
                             this.sourceX, this.sourceY,
                             this.targetX, this.targetY,
                             this.sourceId, this.targetId, this.pattern);
    }
}
