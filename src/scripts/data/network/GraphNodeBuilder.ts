import {Color} from "@/scripts/color/Color";
import {GraphNode} from "@/scripts/data/network/GraphNode";

export class GraphNodeBuilder {

    private id: string = '';
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;
    private color: Color = Color.BLACK;
    private shape: string = '';

    public setId(id: string): GraphNodeBuilder {
        this.id = id;
        return this;
    }

    public setX(x: number): GraphNodeBuilder {
        this.x = x;
        return this;
    }

    public setY(y: number): GraphNodeBuilder {
        this.y = y;
        return this;
    }

    public setWidth(width: number): GraphNodeBuilder {
        this.width = width;
        return this;
    }

    public setHeight(height: number): GraphNodeBuilder {
        this.height = height;
        return this;
    }

    public setColor(color: Color): GraphNodeBuilder {
        this.color = color;
        return this;
    }

    public setShape(shape: string): GraphNodeBuilder {
        this.shape = shape;
        return this;
    }

    public build(): GraphNode {
        return new GraphNode(this.id, this.x, this.y,
                             this.width, this.height,
                             this.color, this.shape);
    }

}
