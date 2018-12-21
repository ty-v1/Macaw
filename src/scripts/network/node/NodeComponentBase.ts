import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {sprintf} from "sprintf-js";
import {GraphNode} from "@/scripts/data/network/GraphNode";

@Component
export default class NodeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() node!: GraphNode;

    get transform(): string {
        const x: number = this.node.getX();
        const y: number = this.node.getY();
        const width: number = this.node.getWidth();
        const height: number = this.node.getHeight();

        return sprintf("translate(%d, %d)scale(%d, %d)", x, y, width, height);
    }

    get color(): string {
        return this.node.getColor().toString();
    }
}
