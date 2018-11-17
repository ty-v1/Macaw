import {INodePositionStrategy} from "@/scripts/network/node/strategy/position/INodePositionStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class NoAlignHierarchy implements INodePositionStrategy {

    exec(variants: Variant[],
         maxGenerationNumber: number,
         xPadding: number,
         yPadding: number,
         nodes: GraphNodeSet): void {
        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(maxGenerationNumber + 1);
        generationNumberToCurrentX.fill(0);

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const beforeX = generationNumberToCurrentX[generationNumber];
            const x = (beforeX === 0) ? 0 : beforeX + xPadding;

            const node = nodes.get(variant.getId());
            node.x = x;
            node.y = generationNumber * yPadding + generationNumber * node.height;

            generationNumberToCurrentX[generationNumber] = x + node.width;
        });
    }
}
