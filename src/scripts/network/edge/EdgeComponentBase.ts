import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {NWEdge} from "@/scripts/data/network/NWEdge";

@Component
export default class EdgeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop({required:true}) edge!: NWEdge;

    /**
     * computed methods
     * */
    get sourceX(): number {
        return this.edge.sourceX;
    }

    get sourceY(): number {
        return this.edge.sourceY;
    }

    get targetX(): number {
        return this.edge.targetX;
    }

    get targetY(): number {
        return this.edge.targetY;
    }
}
