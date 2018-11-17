import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class FixedNodeSize implements INodeSizeStrategy {

    private readonly nodeWidth: number;
    private readonly nodeHeight: number;

    public constructor(nodeWidth: number, nodeHeight: number) {
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
    }

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodes: GraphNodeSet) {

        variants.forEach((variant) => {

            const node = nodes.get(variant.getId());
            node.width = this.nodeWidth;
            node.height = this.nodeHeight;
        });
    }
}
