import {Variant} from "@/scripts/data/Variant";
import {IEdgeArrowShapeStrategy} from "@/scripts/network/style/edge/IEdgeArrowShapeStrategy";
import {IEdgeColorStrategy} from "@/scripts/network/style/edge/IEdgeColorStrategy";
import {IEdgeLineStrategy} from "@/scripts/network/style/edge/IEdgeLineStrategy";
import {IEdgeWidthStrategy} from "@/scripts/network/style/edge/IEdgeWidthStrategy";
import {INodeHeightStrategy} from "@/scripts/network/style/node/INodeHeightStrategy";
import {INodeYStrategy} from "@/scripts/network/style/node/INodeYStrategy";
import {INodeXStrategy} from "@/scripts/network/style/node/INodeXStrategy";
import {INodeWidthStrategy} from "@/scripts/network/style/node/INodeWidthStrategy";
import {INodeShapeStrategy} from "@/scripts/network/style/node/INodeShapeStrategy";
import {INodeColorStrategy} from "@/scripts/network/style/node/INodeColorStrategy";
import {INodeBorderColorStrategy} from "@/scripts/network/style/node/INodeBorderColorStrategy";
import {INodeBorderWidthStrategy} from "@/scripts/network/style/node/INodeBorderWidthStrategy";
import {DefaultEdgeArrowShape} from "@/scripts/network/style/edge/default/DefaultEdgeArrowShape";
import {DefaultEdgeColor} from "@/scripts/network/style/edge/default/DefaultEdgeColor";
import {DefaultEdgeLine} from "@/scripts/network/style/edge/default/DefaultEdgeLine";
import {DefaultEdgeWidth} from "@/scripts/network/style/edge/default/DefaultEdgeWidth";
import {DefaultNodeBorderColor} from "@/scripts/network/style/node/default/DefaultNodeBorderColor";
import {DefaultNodeBorderWidth} from "@/scripts/network/style/node/default/DefaultNodeBorderWidth";
import {DefaultNodeColor} from "@/scripts/network/style/node/default/DefaultNodeColor";
import {DefaultNodeShape} from "@/scripts/network/style/node/default/DefaultNodeShape";
import {DefaultNodeWidth} from "@/scripts/network/style/node/default/DefaultNodeWidth";
import {DefaultNodeHeight} from "@/scripts/network/style/node/default/DefaultNodeHeight";
import {DefaultNodeX} from "@/scripts/network/style/node/default/DefaultNodeX";
import {DefaultNodeY} from "@/scripts/network/style/node/default/DefaultNodeY";
import Edge = cytoscape.Css.Edge;
import Node = cytoscape.Css.Node;

export class ElementStyleCreator {

    // edge strategies
    private edgeArrowShapeStrategy: IEdgeArrowShapeStrategy = new DefaultEdgeArrowShape();
    private edgeColorStrategy: IEdgeColorStrategy = new DefaultEdgeColor();
    private edgeLineStrategy: IEdgeLineStrategy = new DefaultEdgeLine();
    private edgeWidthStrategy: IEdgeWidthStrategy = new DefaultEdgeWidth();

    // node strategies
    private nodeBorderColorStrategy: INodeBorderColorStrategy = new DefaultNodeBorderColor();
    private nodeBorderWidthStrategy: INodeBorderWidthStrategy = new DefaultNodeBorderWidth();
    private nodeColorStrategy: INodeColorStrategy = new DefaultNodeColor();
    private nodeShapeStrategy: INodeShapeStrategy = new DefaultNodeShape();
    private nodeWidthStrategy: INodeWidthStrategy = new DefaultNodeWidth();
    private nodeHeightStrategy: INodeHeightStrategy = new DefaultNodeHeight();
    private nodeXStrategy: INodeXStrategy = new DefaultNodeX();
    private nodeYStrategy: INodeYStrategy = new DefaultNodeY();

    public createCytoscapeEdgeStyle(variant: Variant): Edge {
        return {
            'target-arrow-shape': this.edgeArrowShapeStrategy.createEdgeArrowShape(variant),
            'width': this.edgeWidthStrategy.createEdgeWidth(variant),
            'line-color': this.edgeColorStrategy.createEdgeColor(variant),
            'line-style': this.edgeLineStrategy.createEdgeLine(variant),
        };
    }

    // TODO 座標操作は別メソッドに切り分ける
    public createCytoscapeNodeStyle(variant: Variant): Node {
        return {
            'border-width': this.nodeBorderWidthStrategy.createNodeBorderWidth(variant),
            'border-color': this.nodeBorderColorStrategy.createNodeBorderColor(variant),
            'background-color': this.nodeColorStrategy.createNodeColor(variant),
            'shape': this.nodeShapeStrategy.createNodeShape(variant),
            'width': this.nodeWidthStrategy.createNodeWidth(variant),
            'height': this.nodeHeightStrategy.createNodeHeight(variant)
        };
    }

    // edge strategies
    public setEdgeArrowShapeStrategy(edgeArrowShapeStrategy: IEdgeArrowShapeStrategy) {
        this.edgeArrowShapeStrategy = edgeArrowShapeStrategy;
    }

    public setEdgeColorStrategy(edgeColorStrategy: IEdgeColorStrategy) {
        this.edgeColorStrategy = edgeColorStrategy;
    }

    public setEdgeLineStrategy(edgeLineStrategy: IEdgeLineStrategy) {
        this.edgeLineStrategy = edgeLineStrategy;
    }

    public setEdgeWidthStrategy(edgeWidthStrategy: IEdgeWidthStrategy) {
        this.edgeWidthStrategy = edgeWidthStrategy;
    }

    // node strategies
    public setNodeBorderColorStrategy(nodeBorderColorStrategy: INodeBorderColorStrategy) {
        this.nodeBorderColorStrategy = nodeBorderColorStrategy;
    }

    public setNodeBorderWidthColorStrategy(nodeBorderWidthStrategy: INodeBorderWidthStrategy) {
        this.nodeBorderWidthStrategy = nodeBorderWidthStrategy;
    }

    public setNodeColorStrategy(nodeColorStrategy: INodeColorStrategy) {
        this.nodeColorStrategy = nodeColorStrategy;
    }

    public setNodeShapeStrategy(nodeShapeStrategy: INodeShapeStrategy) {
        this.nodeShapeStrategy = nodeShapeStrategy;
    }

    public setNodeWidthStrategy(nodeWidthStrategy: INodeWidthStrategy) {
        this.nodeWidthStrategy = nodeWidthStrategy;
    }

    public setNodeHeightStrategy(nodeHegihtStrategy: INodeHeightStrategy) {
        this.nodeHeightStrategy = nodeHegihtStrategy;
    }

    public setNodeXStrategy(nodeXStrategy: INodeXStrategy) {
        this.nodeXStrategy = nodeXStrategy;
    }

    public setNotYStrategy(nodeYStrategy: INodeYStrategy) {
        this.nodeYStrategy = nodeYStrategy;
    }
}
