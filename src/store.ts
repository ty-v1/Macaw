import Vue from 'vue';
import Vuex from 'vuex';
import {Variant} from '@/scripts/data/Variant';
import HashMap from 'hashmap';
import {VariantDatum} from '@/scripts/data/VariantDatum';
import {JSONData} from "@/scripts/data/JSONData";
import {Patch} from "@/scripts/data/Patch";
import {TestSummary} from "@/scripts/data/TestSummary";
import {Operation} from "@/scripts/data/Operation";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // id -> Variant
        idToVariant: new HashMap<string, Variant>(),
        generationNumberToVariantCount: [0],
        maxGenerationNumber: 0,
        projectName: ""
    },
    getters: {
        getAllVariants: (state) => state.idToVariant.values(),
        getVariant: (state) => (id: string) => {
            state.idToVariant.get(id)
        },
        getGenerationNumberToVariantCount: (state) => state.generationNumberToVariantCount,
        getMaxGenerationNumber: (state) => state.maxGenerationNumber,
        maxFitness: (state) => () => {
            const variants: Variant[] = state.idToVariant.values();
            const maxFitness: number[] = [state.maxGenerationNumber + 1].map(() => 0);

            variants.forEach((variant: Variant) => {
                const generationNumber = variant.getGenerationNumber();
                const fitness = variant.getFitness();
                const max = maxFitness[generationNumber];

                if (max < fitness) {
                    maxFitness[generationNumber] = fitness;
                }
            });

            return maxFitness;
        },
        getProjectName: (state) => state.projectName
    },
    mutations: {
        parseJson: (state, payload) => {
            const jsonString: string = payload.jsonString;
            const jsonData: JSONData = JSON.parse(jsonString);
            state.projectName = jsonData.projectName;
            const variantData: VariantDatum[] = jsonData.variants;

            // コピー(選択)の解決をする
            const idToVariant: HashMap<string, Variant> = new HashMap<string, Variant>();
            let maxGenerationNumber = 0;
            variantData.forEach((variantDatum) => {
                const id: string = variantDatum.id;
                const selectionCount: number = variantDatum.selectionCount;
                const patches: Patch[] = variantDatum.patches;
                const fitness: number = variantDatum.fitness;
                const buildSuccess: boolean = variantDatum.isBuildSuccess;
                const generationNumber: number = variantDatum.generationNumber;
                const testSummary: TestSummary = variantDatum.testSummary;
                const operations: Operation[] = variantDatum.operations;
                // 親のVariantを追加する
                const parent: Variant = new Variant(id, generationNumber, fitness, buildSuccess,
                    selectionCount, patches, operations, testSummary);
                idToVariant.set(id, parent);

                for (let i = 1; i <= selectionCount; i++) {
                    const selectedVariantId: string = id.concat(String(i));
                    const operations: Operation[] = [{
                        id: id,
                        operationName: 'select'
                    }];
                    const variant: Variant = new Variant(selectedVariantId, generationNumber + i,
                        fitness, buildSuccess, selectionCount, patches, operations, testSummary, true);
                    idToVariant.set(selectedVariantId, variant);
                }

                if (maxGenerationNumber < generationNumber) {
                    maxGenerationNumber = generationNumber;
                }
            });
            state.maxGenerationNumber = maxGenerationNumber;

            // 選択されたVariantの子の親IDを書き換える
            idToVariant.values().forEach((variant) => {

                if (variant.isSelected()) {
                    return;
                }

                const childGenerationNumber = variant.getGenerationNumber();

                variant.getParentIds().forEach((oldParentId) => {
                    const parentGenerationNumber = idToVariant.get(oldParentId).getGenerationNumber();
                    const generationSub = parentGenerationNumber - childGenerationNumber;
                    if (generationSub === 1) {
                        return;
                    }
                    const newParentId: string = oldParentId.concat(String(generationSub - 1));
                    variant.changeParentId(oldParentId, newParentId);
                });
            });

            state.idToVariant = idToVariant;

            // 世代ごとのvariantの数を求める
            const generationNumberToVariantCount
                = new Array(maxGenerationNumber + 1);
            generationNumberToVariantCount.fill(0);

            idToVariant.values().forEach((variant) => {
                generationNumberToVariantCount[variant.getGenerationNumber()]++;
            });

            state.generationNumberToVariantCount = generationNumberToVariantCount;
        }
    },
    actions: {}
})
