<template>
    <g :transform="transform">
        <path :fill="color"
              d="M0,0.3L0.7,1L0,1.7L0.3,2L1,1.3L1.7,2L2,1.7L1.3,1L2,0.3L1.7,0L1,0.7L0.3,0Z"
              @mouseover="onMouseOver"
              @mouseout="onMouseOut">
        </path>
        <text x="2" y="1.3">
            {{text}}
        </text>
    </g>

</template>

<script lang="ts">
    import {Component, Emit} from 'vue-property-decorator';
    import NodeComponentBase from "../../../scripts/network/node/NodeComponentBase";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";
    import {sprintf} from "sprintf-js";
    import {Item} from "../../../store/VariantPopupStore";
    import {EdgeDatum3} from "../../../scripts/json/Layout";

    @Component
    export default class CrossNode extends NodeComponentBase {

        public get text(): string {
            return sprintf('%d', this.node.variantIds.length);
        }

        @Emit('node-mouse-over')
        public onMouseOver(event: MouseEvent): NodeMouseOverEvent {

            const items: Item[] = [];
            items.push({
                           name: 'count',
                           value: String(this.node.variantIds.length)
                       });

            const operations: number[] = Array(4);
            operations.fill(0);
            this.node.inEdgeIds.forEach((e) => {
                const edge: EdgeDatum3 = this.$store.getters['LayoutStore/edge'](e);

                switch (edge.operation) {
                    case 'insert':
                        operations[0]++;
                        break;
                    case 'delete':
                        operations[1]++;
                        break;
                    case 'replace':
                        operations[2]++;
                        break;
                    default:
                        operations[3]++;
                        break
                }
            });

            items.push({
                           name: 'insert',
                           value: String(operations[0])
                       });


            items.push({
                           name: 'delete',
                           value: String(operations[1])
                       });


            items.push({
                           name: 'replace',
                           value: String(operations[2])
                       });


            items.push({
                           name: 'crossover',
                           value: String(operations[3] / 2)
                       });

            return {
                id: this.node.id,
                nodeX: this.node.x,
                nodeY: this.node.y,
                nodeWidth: this.node.width,
                nodeHeight: this.node.height,
                pageX: event.pageX,
                pageY: event.pageY,
                message: {
                    title: 'Build Failed Variant',
                    items: items
                }
            };
        }

        @Emit('node-mouse-out')
        public onMouseOut() {
        }
    }
</script>
