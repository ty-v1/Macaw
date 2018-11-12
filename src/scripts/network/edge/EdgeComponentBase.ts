import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Variant} from "@/scripts/data/Variant";
import {IEdgeWidthStrategy} from "@/scripts/network/edge/strategy/width/IEdgeWidthStrategy";
import {IEdgeColorStrategy} from "@/scripts/network/edge/strategy/color/IEdgeColorStrategy";

@Component
export default class EdgeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() variant!: Variant;
    @Prop() edgeWidthStrategy!: IEdgeWidthStrategy;
    @Prop() edgeColorStrategy!: IEdgeColorStrategy;
}
