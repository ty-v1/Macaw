import {INodeSizeStrategy} from "@/scripts/network/node/strategy/size/INodeSizeStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export class FixedNodeSize implements INodeSizeStrategy {

    private readonly nodeWidth: number;
    private readonly nodeHeight: number;

    public constructor(nodeWidth: number, nodeHeight: number) {
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
    }

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodeData: HashMap<string, NodeDatum>) {

        variants.forEach((variant) => {

            const node = nodeData.get(variant.getId());
            node.width = this.nodeWidth;
            node.height = this.nodeHeight;
        });
    }
}
