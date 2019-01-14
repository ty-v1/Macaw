<template>
    <CircleNode v-if="node.shape === 'circle'"
                :node="node"
                @node-mouse-over="onNodeMouseOver"
                @node-mouse-out="onNodeMouseOut"
                @node-click="onNodeClick"
    ></CircleNode>
    <CrossNode v-else-if="node.shape === 'cross'"
               :node="node"
               @node-mouse-over="onNodeMouseOver"
               @node-mouse-out="onNodeMouseOut"
    ></CrossNode>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import CircleNode from "./CircleNode.vue";
    import CrossNode from "./CrossNode.vue";
    import {NodeDatum3} from "../../../scripts/json/Variant2";
    import {NodeClickEvent} from "../../../scripts/event/NodeClickEvent";
    import {NodeMouseOverEvent} from "../../../scripts/event/NodeMouseOverEvent";

    @Component({
                   components: {CrossNode, CircleNode}
               })
    export default class GNode extends Vue {
        @Prop() node!: NodeDatum3;

        /**
         * custom event handler
         * */
        onNodeMouseOver(event: NodeMouseOverEvent) {

            this.$store.commit('VariantPopupStore/initializeData',
                               {
                                   message: event.message,
                                   x: event.pageX,
                                   y: event.pageY - 20,
                                   width: 100,
                                   height: 100,
                               });
        }

        onNodeMouseOut() {
            this.$store.commit('VariantPopupStore/dismiss');
        }

        onNodeClick(event: NodeClickEvent) {
            const variantId: number = this.$store.getters['DiffStore/variantId'];

            // 経路のハイライトを解除する
            this.$store.commit('LayoutStore/clearNodeClass', {});
            this.$store.commit('LayoutStore/clearEdgeClass', {});

            if (variantId !== -1) {
                this.$store.commit('DiffStore/reset', {});
            } else {
                this.$store.commit('DiffStore/setVariantId', {
                    variantId: event.variantId
                });
                // 経路をハイライトする
                this.$store.commit('LayoutStore/highlightAncestryTree', {
                    id: event.id
                });
            }
        }

    }
</script>

<style scoped>

</style>
