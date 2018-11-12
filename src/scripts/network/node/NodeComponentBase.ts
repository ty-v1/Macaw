import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {sprintf} from "sprintf-js";
import {NodeStyle} from "@/scripts/data/style/NodeStyle";

@Component
export default class NodeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() nodeStyle!: NodeStyle;

    get transform(): string {
        const x: number = this.nodeStyle.x;
        const y: number = this.nodeStyle.y;
        const width: number = this.nodeStyle.width;
        const height: number = this.nodeStyle.height;

        return sprintf("translate(%d, %d)scale(%d, %d)", x, y, width, height);
    }

    get color(): string {
        return this.nodeStyle.color.toString();
    }
}
