import {EdgeDefinition} from "cytoscape";
import {CytoscapeEdgeDataDefinition} from "@/scripts/network/definition/CytoscapeEdgeDataDefinition";

export interface CytoscapeEdgeDefinition extends EdgeDefinition {
    data: CytoscapeEdgeDataDefinition
}
