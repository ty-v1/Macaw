import {sprintf} from "sprintf-js";

export class RGB {

    private readonly r: string;
    private readonly g: string;
    private readonly b: string;

    public constructor(r: string, g: string, b: string) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public getR(): number {
        return parseInt(this.r, 16);
    }

    public getG(): number {
        return parseInt(this.g, 16);
    }

    public getB(): number {
        return parseInt(this.b, 16);
    }

    public toString(): string {
        return sprintf("#%s%s%s", this.r, this.g, this.b);
    }

    public static BLACK: RGB = new RGB("00", "00", "00");
    public static WIHTE: RGB = new RGB("FF", "FF", "FF");
    public static BLUE: RGB = new RGB("00", "00", "FF");
    public static RED: RGB = new RGB("FF", "00", "00");
    public static GREEN: RGB = new RGB("00", "FF", "00");
}
