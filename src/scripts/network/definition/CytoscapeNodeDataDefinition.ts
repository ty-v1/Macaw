import {NodeDataDefinition} from "cytoscape";

export interface CytoscapeNodeDataDefinition extends NodeDataDefinition {
    fitness: number,
    generationNumber: number,
}
