import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {GraphEdge} from "@/scripts/data/network/GraphEdge";

@Component
export default class EdgeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() edge!: GraphEdge;

    /**
     * computed methods
     * */
    get sourceX(): number {
        return this.edge.getSourceX();
    }

    get sourceY(): number {
        return this.edge.getSourceY();
    }

    get targetX(): number {
        return this.edge.getTargetX();
    }

    get targetY(): number {
        return this.edge.getTargetY();
    }
}
