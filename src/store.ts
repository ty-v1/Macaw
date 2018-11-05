import Vue from 'vue';
import Vuex from 'vuex';
import {Variant} from '@/scripts/data/Variant';
import HashMap from 'hashmap';
import {VariantDatum} from '@/scripts/data/VariantDatum';
import {JSONData} from "@/scripts/data/JSONData";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // id -> Variant
        idToVariant: new HashMap<string, Variant>(),
        maxGenerationNumber: 0,
        projectName: ""
    },
    getters: {
        getAllVariants: (state) => state.idToVariant.values(),
        getVariant: (state) => (id: string) => {
            state.idToVariant.get(id)
        },
        getGenerationValue: (state) => state.maxGenerationNumber,
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
            const variantData: VariantDatum[] = jsonData.variants;

            // jsonからオブジェクトを作る
            const variants: Variant[] = [];
            variantData.forEach((variantDatum: VariantDatum) => {
                const length = variants.length;
                variants[length] = new Variant(variantDatum);
            });

            // TODO コピー(選択)の解決をする

            const idToVariant: HashMap<string, Variant> = new HashMap<string, Variant>();
            let maxGenerationNumber = 0;

            variants.forEach((variant: Variant) => {
                const id: string = variant.getId();
                idToVariant.set(id, variant);

                const generationNumber = variant.getGenerationNumber();

                if (maxGenerationNumber < generationNumber) {
                    maxGenerationNumber = generationNumber;
                }
            });

            state.idToVariant = idToVariant;
            state.maxGenerationNumber = maxGenerationNumber;
        }

    },
    actions: {}
})
