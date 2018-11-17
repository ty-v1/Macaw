import {sprintf} from "sprintf-js";

export class Color {

    private readonly r: number;
    private readonly g: number;
    private readonly b: number;

    public constructor(r: number, g: number, b: number) {
        this.r = Color.checkColorCode(r);
        this.g = Color.checkColorCode(g);
        this.b = Color.checkColorCode(b);
    }

    private static checkColorCode(x: number): number {
        if (x < 0) {
            return 0x00;
        } else if (x > 255) {
            return 0xFF;
        } else {
            return x;
        }
    }

    public getR(): number {
        return this.r;
    }

    public getG(): number {
        return this.g;
    }

    public getB(): number {
        return this.b;
    }

    public toString(): string {
        return sprintf("#%02x%02x%02x", this.r, this.g, this.b);
    }

    /**
     * 自身を基準にして中間色を求める
     *
     * */
    public createMiddleColor(color: Color, ratio: number) {

        const middleRed: number =
            Math.floor((color.getR() - this.r) * ratio + this.r);

        const middleBlue: number =
            Math.floor((color.getB() - this.b) * ratio + this.b);

        const middleGreen: number =
            Math.floor((color.getG() - this.g) * ratio + this.g);

        return new Color(Color.checkColorCode(middleRed),
                         Color.checkColorCode(middleGreen),
                         Color.checkColorCode(middleBlue));
    }

    public static BLACK: Color = new Color(0x00, 0x00, 0x00);
    public static WHITE: Color = new Color(0xFF, 0xFF, 0xFF);
    public static BLUE: Color = new Color(0x00, 0x00, 0xFF);
    public static RED: Color = new Color(0xFF, 0x00, 0x00);
    public static GREEN: Color = new Color(0x00, 0xFF, 0x00);
}
