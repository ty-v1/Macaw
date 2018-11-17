import {Color} from "@/scripts/color/Color";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";
import {GraphNodeSet} from "@/scripts/data/network/GraphNodeSet";

export class ThreeBasePointsGradation implements INodeColorStrategy {

    private readonly basePointColors: Color[];
    private readonly midPointCreator: (variants: Variant[]) => number;

    public constructor(basePointColors: Color[],
                       midPointCreator: (variants: Variant[]) => number) {
        this.basePointColors = basePointColors;
        this.midPointCreator = midPointCreator;
    }

    exec(variants: Variant[],
         maxGenerationNumber: number,
         nodes: GraphNodeSet): void {
        // midPointの計算
        const midPoint = this.midPointCreator(variants);

        // 色を変更
        variants.forEach((variant) => {
            const node = nodes.get(variant.getId());
            node.color = this.createNodeColor(variant, midPoint);
        });
    }

    private createNodeColor(variant: Variant, midPoint: number): Color {
        const fitness: number = variant.getFitness();

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
