import {Variant} from "../../../data/Variant";
import {CytoscapeNodeDefinition} from "../CytoscapeNodeDefinition";
import {CytoscapeEdgeDefinition} from "../CytoscapeEdgeDefinition";

export class CytoscapeNetworkElementFactory {

    public static createCytoscapeJSNodes(...variants: Variant[]): CytoscapeNodeDefinition[] {
        const nodes: CytoscapeNodeDefinition[] = [];

        variants.forEach((variant) => {
            const node: CytoscapeNodeDefinition = {
                group: "nodes",
                data: {
                    id: variant.getId(),
                    generationNumber: variant.getGenerationNumber(),
                    fitness: variant.getFitness()
                }
            };
            const length: number = nodes.length;
            nodes[length] = node;
        });
        return nodes;
    }

    public static createCytoscapeJSEdges(...variants: Variant[]): CytoscapeEdgeDefinition[] {
        const edges: CytoscapeEdgeDefinition[] = [];

        variants.forEach((variant) => {
            const targetId: string = variant.getId();

            variant.getOperations().forEach((operation) => {
                const edge: CytoscapeEdgeDefinition = {
                    group: "edges",
                    data: {
                        source: operation.id,
                        target: targetId,
                        operationName: operation.operationName
                    }
                };
                const length: number = edges.length;
                edges[length] = edge;
            });
        });
        return edges;
    }
}
