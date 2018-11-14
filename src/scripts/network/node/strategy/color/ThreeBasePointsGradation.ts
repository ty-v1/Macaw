import {RGB} from "@/scripts/color/RGB";
import {INodeColorStrategy} from "@/scripts/network/node/strategy/color/INodeColorStrategy";
import {Variant} from "@/scripts/data/Variant";

export class ThreeBasePointsGradation implements INodeColorStrategy {

    private readonly basePoints: number[];
    private readonly basePointColors: RGB[];

    public constructor(basePoints: number[], basePointColors: RGB[]) {
        this.basePoints = basePoints;
        this.basePointColors = basePointColors;
    }

    createNodeColor(variant: Variant): RGB {
        const fitness: number = variant.getFitness();

        if (fitness < this.basePoints[0] || this.basePoints[2] < fitness) {
            return RGB.BLACK;
        } else if (this.basePoints[0] <= fitness && fitness <= this.basePoints[1]) {
            const ratio = ThreeBasePointsGradation.calculateRatio(
                this.basePoints[1], this.basePoints[0], fitness);

            return ThreeBasePointsGradation.calculateMiddleColorCode(
                this.basePointColors[0], this.basePointColors[1], ratio);
        } else if (this.basePoints[1] <= fitness && fitness <= this.basePoints[2]) {
            const ratio = ThreeBasePointsGradation.calculateRatio(
                this.basePoints[2], this.basePoints[1], fitness);

            return ThreeBasePointsGradation.calculateMiddleColorCode(
                this.basePointColors[1], this.basePointColors[2], ratio);
        } else {
            return RGB.BLACK;
        }
    }

    // TODO あとでRGBに写す
    private static calculateMiddleColorCode(baseColorCode: RGB, objectiveColorCode: RGB, ratio: number) {

        const middleRed: number =
            Math.floor((objectiveColorCode.getR() - baseColorCode.getR()) * ratio + baseColorCode.getR());

        const middleBlue: number =
            Math.floor((objectiveColorCode.getB() - baseColorCode.getB()) * ratio + baseColorCode.getB());

        const middleGreen: number =
            Math.floor((objectiveColorCode.getG() - baseColorCode.getG()) * ratio + baseColorCode.getG());

        const middleRedCode = this.convertColorCode(middleRed);
        const middleGreenCode = this.convertColorCode(middleGreen);
        const middleBlueCode = this.convertColorCode(middleBlue);

        return new RGB(middleRedCode, middleGreenCode, middleBlueCode);
    }

    private static calculateRatio(max: number, min: number, x: number): number {
        return (x - min) / (max - min);
    }

    // TODO あとでRGBに写す
    private static convertColorCode(x: number): string {
        if (x < 0) {
            return '00';
        } else if (x > 255) {
            return 'FF';
        } else {
            return ('00' + x.toString(16)).slice(-2);
        }
    }

}
