import {Color} from "@/scripts/color/Color";
import {INodeColorStrategy} from "@/n2/node/strategy/color/INodeColorStrategy";
import {Tyukan} from "@/scripts/json/Tyukan";
import {GraphNodeSet2} from "@/scripts/json/GraphNodeSet2";
import {NodeDatum2} from "@/scripts/json/NodeDatum2";

export class ThreeBasePointsGradation implements INodeColorStrategy {

    private readonly basePointColors: Color[];
    private readonly midPointCreator: (variants: Tyukan) => number;

    public constructor(basePointColors: Color[],
                       midPointCreator: (variants: Tyukan) => number) {
        this.basePointColors = basePointColors;
        this.midPointCreator = midPointCreator;
    }

    exec(variants: Tyukan, nodeData: GraphNodeSet2): void {
        // midPointの計算
        const midPoint = this.midPointCreator(variants);

        // 色を変更
        variants.hiassyukus()
                .forEach((variant) => {
                    const node = nodeData.get(variant.id);
                    node.color = this.createNodeColor(variant, midPoint);
                });
    }

    private createNodeColor(variant: NodeDatum2, midPoint: number): Color {
        const fitness: number = variant.variant.fitness;

        if (fitness < 0.0 || 1.0 < fitness) {

            return Color.BLACK;
        } else if (0.0 <= fitness && fitness < midPoint) {
            const ratio = fitness / midPoint;

            return this.basePointColors[0].createMiddleColor(this.basePointColors[1], ratio);
        } else if (midPoint <= fitness && fitness <= 1.0) {
            const ratio = (fitness - midPoint) / (1.0 - midPoint);

            return this.basePointColors[1].createMiddleColor(this.basePointColors[2], ratio);
        } else {
            return Color.BLACK;
        }
    }
}
