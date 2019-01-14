import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {sprintf} from "sprintf-js";
import {NodeDatum3} from "@/scripts/json/Variant2";

@Component
export default class NodeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() node!: NodeDatum3;

    get transform(): string {
        const x: number = this.node.x;
        const y: number = this.node.y;
        const width: number = this.node.width;
        const height: number = this.node.height;

        return sprintf("translate(%d, %d)scale(%d, %d)", x, y, width, height);
    }

    get color(): string {
        return this.node.color.toString();
    }
}
