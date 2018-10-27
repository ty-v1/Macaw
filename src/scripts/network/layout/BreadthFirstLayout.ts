import {INetworkLayoutCreator} from "@/scripts/network/layout/INetworkLayoutCreator";
import {Variant} from "@/scripts/data/Variant";
import {LayoutOptions} from "cytoscape";

export class BreadthFirstLayout implements INetworkLayoutCreator {
    createCytoscapeLayoutOptions(variants: Variant[]): LayoutOptions {
        return {
            name: "breadthfirst",
            directed: true,
            circle: false,
            roots: this.findRoot(variants)
        };
    }

    private findRoot(variants: Variant[]): string {
        let rootId = variants[0].getId();

        for (let i = 0; i < variants.length; i++) {
            if (variants[i].getOperations().length === 0) {
                rootId = variants[i].getId();
                break;
            }
        }
        return rootId;
    }
}
