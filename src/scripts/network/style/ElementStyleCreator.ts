import {IEdgeColorStrategy} from "@/scripts/network/style/edge/IEdgeColorStrategy";
import {IEdgeWidthStrategy} from "@/scripts/network/style/edge/IEdgeWidthStrategy";
import {INodeHeightStrategy} from "@/scripts/network/style/node/INodeHeightStrategy";
import {INodeYStrategy} from "@/scripts/network/style/node/INodeYStrategy";
import {INodeXStrategy} from "@/scripts/network/style/node/INodeXStrategy";
import {INodeWidthStrategy} from "@/scripts/network/style/node/INodeWidthStrategy";
import {INodeColorStrategy} from "@/scripts/network/style/node/INodeColorStrategy";
import {INodeBorderColorStrategy} from "@/scripts/network/style/node/INodeBorderColorStrategy";
import {INodeBorderWidthStrategy} from "@/scripts/network/style/node/INodeBorderWidthStrategy";
import {DefaultEdgeColor} from "@/scripts/network/style/edge/default/DefaultEdgeColor";
import {DefaultEdgeWidth} from "@/scripts/network/style/edge/default/DefaultEdgeWidth";
import {DefaultNodeBorderColor} from "@/scripts/network/style/node/default/DefaultNodeBorderColor";
import {DefaultNodeBorderWidth} from "@/scripts/network/style/node/default/DefaultNodeBorderWidth";
import {DefaultNodeColor} from "@/scripts/network/style/node/default/DefaultNodeColor";
import {DefaultNodeWidth} from "@/scripts/network/style/node/default/DefaultNodeWidth";
import {DefaultNodeHeight} from "@/scripts/network/style/node/default/DefaultNodeHeight";
import {DefaultNodeX} from "@/scripts/network/style/node/default/DefaultNodeX";
import {DefaultNodeY} from "@/scripts/network/style/node/default/DefaultNodeY";

export class ElementStyleCreator {

    // edge strategies
    private edgeColorStrategy: IEdgeColorStrategy = new DefaultEdgeColor();
    private edgeWidthStrategy: IEdgeWidthStrategy = new DefaultEdgeWidth();

    // node strategies
    private nodeBorderColorStrategy: INodeBorderColorStrategy = new DefaultNodeBorderColor();
    private nodeBorderWidthStrategy: INodeBorderWidthStrategy = new DefaultNodeBorderWidth();
    private nodeColorStrategy: INodeColorStrategy = new DefaultNodeColor();
    private nodeWidthStrategy: INodeWidthStrategy = new DefaultNodeWidth();
    private nodeHeightStrategy: INodeHeightStrategy = new DefaultNodeHeight();
    private nodeXStrategy: INodeXStrategy = new DefaultNodeX();
    private nodeYStrategy: INodeYStrategy = new DefaultNodeY();

    public setEdgeColorStrategy(edgeColorStrategy: IEdgeColorStrategy) {
        this.edgeColorStrategy = edgeColorStrategy;
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
