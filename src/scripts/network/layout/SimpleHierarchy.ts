import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import HashMap from "hashmap";
import {Variant} from "@/scripts/data/Variant";
import {NodeStyle} from "@/scripts/data/style/NodeStyle";

export class SimpleHierarchy {

    private readonly nodeWidth: number;
    private readonly nodeHeight: number;

    private readonly nodeColorStrategy: INodeColorStrategy;
    private readonly nodeXCache: HashMap<string, number> = new HashMap<string, number>();
    private readonly nodeYCache: HashMap<string, number> = new HashMap<string, number>();

    private readonly xPadding: number;
    private readonly yPadding: number;

    private width = 0;
    private height = 0;

    public constructor(nodeWidth: number,
                       nodeHeight: number,
                       nodeColorStrategy: INodeColorStrategy,
                       xPadding: number,
                       yPadding: number) {
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
        this.nodeColorStrategy = nodeColorStrategy;
        this.xPadding = xPadding;
        this.yPadding = yPadding;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public exec(variants: Variant[], maxGenerationNumber: number): HashMap<string, NodeStyle> {
        this.calculateWidth(variants, maxGenerationNumber);
        this.calculateHeight(maxGenerationNumber);

        this.cacheNodeX(variants, maxGenerationNumber);
        this.cacheNodeY(variants);

        const idToNodeStyle: HashMap<string, NodeStyle> = new HashMap<string, NodeStyle>();
        variants.forEach((variant) => {
            const id = variant.getId();
            const x = this.nodeXCache.get(id);
            const y = this.nodeYCache.get(id);

            const nodeStyle: NodeStyle = {
                x: x,
                y: y,
                width: this.nodeWidth,
                height: this.nodeHeight,
                color: this.nodeColorStrategy.createNodeColor(variant),
            };

            idToNodeStyle.set(id, nodeStyle);
        });

        return idToNodeStyle;
    }

    private cacheNodeX(variants: Variant[],
                       maxGenerationNumber: number): void {
        this.nodeXCache.clear();

        // 設定したX座標を記憶する
        const generationNumberToCurrentX = new Array(maxGenerationNumber + 1);
        generationNumberToCurrentX.fill(0);

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const beforeX = generationNumberToCurrentX[generationNumber];
            const x = beforeX + this.xPadding;

            this.nodeXCache.set(variant.getId(), x);

            generationNumberToCurrentX[generationNumber] = x + this.nodeWidth;
        });
    }

    private cacheNodeY(variants: Variant[]) {
        this.nodeYCache.clear();

        variants.forEach((variant) => {
            const generationNumber = variant.getGenerationNumber();
            const y = (generationNumber + 1) * this.yPadding + generationNumber * this.nodeHeight;

            this.nodeYCache.set(variant.getId(), y);
        });
    }

    private calculateWidth(variants: Variant[],
                           maxGenerationNumber: number): void {

        const generationNumberToVariantCount
            = this.calculateGenerationNumberToVariantCount(variants, maxGenerationNumber);
        let max = 0;
        generationNumberToVariantCount.forEach((variantCount) => {
            if (max < variantCount) {
                max = variantCount;
            }
        });

        this.width = this.xPadding * 2 +
            this.xPadding * (max - 1) +
            this.nodeWidth * max;
    }

    private calculateGenerationNumberToVariantCount(variants: Variant[],
                                                    maxGenerationNumber: number): number[] {
        const generationNumberToVariantCount = new Array(maxGenerationNumber + 1);
        generationNumberToVariantCount.fill(0);
        variants.forEach((variant) => {
            generationNumberToVariantCount[variant.getGenerationNumber()]++;
        });

        return generationNumberToVariantCount;
    }

    private calculateHeight(maxGenerationNumber: number): void {

        this.height = this.yPadding * 2 +
            this.yPadding * maxGenerationNumber +
            this.nodeHeight * (maxGenerationNumber + 1);
    }
}
