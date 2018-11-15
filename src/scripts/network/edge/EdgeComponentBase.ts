import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {EdgeStyle} from "@/scripts/data/style/EdgeStyle";

@Component
export default class EdgeComponentBase extends Vue {
    @Prop() id!: string;
    @Prop() edgeStyle!: EdgeStyle;

    /**
     * computed methods
     * */
    get sourceX(): number {
        const sourceX = this.edgeStyle.source.x;
        const width = this.edgeStyle.source.width;

        return sourceX + width;
    }

    get sourceY(): number {
        const sourceY = this.edgeStyle.source.y;
        const height = this.edgeStyle.source.height;

        return sourceY + height * 2;
    }

    get targetX(): number {
        const targetX = this.edgeStyle.target.x;
        const width = this.edgeStyle.target.width;

        return targetX + width;
    }

    get targetY(): number {
        return this.edgeStyle.target.y;
    }
}
