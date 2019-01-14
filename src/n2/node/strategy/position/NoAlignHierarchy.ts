import {INodePositionStrategy} from "@/n2/node/strategy/position/INodePositionStrategy";
import {GraphNodeSet2, Tyukan} from "@/scripts/json/Variant2";

export class NoAlignHierarchy implements INodePositionStrategy {

    exec(variants: Tyukan,
         xPadding: number,
         yPadding: number,
         nodeData: GraphNodeSet2): void {
        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(variants.maxGeneration + 1);
        generationNumberToCurrentX.fill(0);

        // 座標計算を行うコールバック関数
        const keisan = (variant) => {
            const generation: number = variant.generation;
            const beforeX = generationNumberToCurrentX[generation];
            const x = beforeX + xPadding;

            const node = nodeData.get(variant.id);
            node.x = x;
            node.y = generation * yPadding + generation * node.height;

            generationNumberToCurrentX[generation] = x + node.width;
        };

        // 集約していないノードの座標を先に計算する
        variants.hiassyukus()
                .forEach(keisan);

        // 集約したノードの座標を計算する
        variants.assyukus()
                .forEach(keisan)
    }
}
