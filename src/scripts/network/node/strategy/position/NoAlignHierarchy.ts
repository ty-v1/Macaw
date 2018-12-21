import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {Variant} from "@/scripts/data/Variant";
import HashMap from "hashmap";
import {NodeDatum} from "@/scripts/data/network/GraphNode";

export class NoAlignHierarchy implements INodePositionStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         xPadding: number,
         yPadding: number,
         nodeData: HashMap<string, NodeDatum>): void {
        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(maxGenerationNumber + 1);
        generationNumberToCurrentX.fill(0);

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const beforeX = generationNumberToCurrentX[generationNumber];
            const x = (beforeX === 0) ? 0 : beforeX + xPadding;

            const node = nodeData.get(variant.getId());
            node.x = x;
            node.y = generationNumber * yPadding + generationNumber * node.height;

            generationNumberToCurrentX[generationNumber] = x + node.width;
        });
    }
}
