import {ElementDefinition} from "cytoscape";
import {CytoscapeNodeDataDefinition} from "@/scripts/network/definition/CytoscapeNodeDataDefinition";

export interface CytoscapeNodeDefinition extends ElementDefinition {
    data: CytoscapeNodeDataDefinition
}
