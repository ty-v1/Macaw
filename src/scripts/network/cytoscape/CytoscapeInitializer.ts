import {Core, CytoscapeOptions} from "cytoscape";

export class CytoscapeInitializer {
    private static readonly cytoscape = require("cytoscape");

    public static initialize(cytoscapeOptions: CytoscapeOptions): Core {
        return CytoscapeInitializer.cytoscape(cytoscapeOptions);
    }
}
