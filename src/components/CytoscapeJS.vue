<template>
    <div id="cytoscape"></div>
</template>

<script lang="ts">
    import {AbstractNetworkComponent} from "../scripts/network/style/AbstractNetworkComponent";
    import {Component} from "vue-property-decorator";
    import {Variant} from "../scripts/data/Variant";
    import {Core, CytoscapeOptions, EdgeSingular, LayoutOptions, NodeSingular} from "cytoscape";
    import {CytoscapeInitializer} from "../scripts/network/cytoscape/CytoscapeInitializer";
    import {CytoscapeNodeDefinition} from "../scripts/network/definition/CytoscapeNodeDefinition";
    import {CytoscapeEdgeDefinition} from "../scripts/network/definition/CytoscapeEdgeDefinition";

    @Component({
        components: {},
    })
    export default class CytoscapeJS extends AbstractNetworkComponent {

        private cytoscapeCore: Core | null = null;

        /**
         * life cycle methods
         * */

        mounted() {
            super.mounted();
            this.setUpGraphLibrary();
        }

        destroyed() {
            super.destroyed();
        }

        /**
         * setUp and tearDown cytoscape
         * */

        protected setUpGraphLibrary(): void {
            const cytoscapeOptions: CytoscapeOptions = {
                container: document.getElementById('cytoscape')
            };
            this.cytoscapeCore = CytoscapeInitializer.initialize(cytoscapeOptions);
        }

        protected tearDownGraphLibrary(): void {
            if (this.cytoscapeCore !== null) {
                this.cytoscapeCore.destroy();
            }
        }

        /*
        * operate cytoscape
        * */
        protected addElements(variants: Variant[]): void {
            // elementを追加する（ついでにスタイルも適用）
            this.addNodes(variants);
            this.addEdges(variants);
            // 最後にレイアウトを適用する
            this.applyLayout(variants);
        }

        private addNodes(variants: Variant[]): void {
            variants.forEach((variant) => {
                const node: CytoscapeNodeDefinition = {
                    group: "nodes",
                    data: {
                        id: variant.getId(),
                        generationNumber: variant.getGenerationNumber(),
                        fitness: variant.getFitness()
                    },
                    style: this.elementStyleCreator.createCytoscapeNodeStyle(variant)
                };
                if (this.cytoscapeCore === null) {
                    return;
                }
                this.cytoscapeCore.add(node);
            });
        }

        private addEdges(variants: Variant[]) {
            variants.forEach((variant) => {
                const targetId: string = variant.getId();

                variant.getOperations().forEach((operation) => {
                    const edge: CytoscapeEdgeDefinition = {
                        group: "edges",
                        data: {
                            source: operation.id,
                            target: targetId,
                            operationName: operation.operationName
                        },
                        style: this.elementStyleCreator.createCytoscapeEdgeStyle(variant)
                    };
                    if (this.cytoscapeCore === null) {
                        return;
                    }
                    this.cytoscapeCore.add(edge);
                });
            });
        }

        protected applyElementStyle(variants: Variant[]): void {
            // ノードのスタイルを適用する
            this.applyNodeStyle();
            // エッジのスタイルを適用する
            this.applyEdgeStyle();
        }

        private applyNodeStyle() {
            if (this.cytoscapeCore === null) {
                return;
            }

            const nodes: NodeSingular[] = this.cytoscapeCore.nodes()
                .toArray();

            nodes.forEach((node) => {
                const style = this.elementStyleCreator.createCytoscapeNodeStyle(node);
                node.removeStyle();
                node.style(style);
            });
        }

        private applyEdgeStyle() {
            if (this.cytoscapeCore === null) {
                return;
            }

            const edges: EdgeSingular[] = this.cytoscapeCore.edges()
                .toArray();

            edges.forEach((edge) => {
                const style = this.elementStyleCreator.createCytoscapeEdgeStyle(edge);
                edge.removeStyle();
                edge.style(style);
            });
        }

        protected applyLayout(variants: Variant[]): void {
            if (this.cytoscapeCore === null) {
                return;
            }

            const layoutOptions: LayoutOptions
                = this.networkLayoutCreator.createCytoscapeLayoutOptions(variants);
            this.cytoscapeCore.makeLayout(layoutOptions);
        }

        protected removeAllElements(): void {
            if (this.cytoscapeCore === null) {
                return;
            }

            this.cytoscapeCore.elements()
                .forEach((element) => {
                    element.remove();
                });
        }
    }
</script>

<style scoped>
    /*
    とりあえず適当に大きさを定義しておく
    */
    #cytoscape {
        width: 100%;
        height: 100%;
    }
</style>
