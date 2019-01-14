import HashMap from "hashmap";
import {Variant} from "@/scripts/data/Variant";
import {Statistics} from "@/scripts/data/Statistics";
import {APRResult} from "@/scripts/json/APRResult";
import {Tyukan, Variant2} from "@/scripts/json/Variant2";

export interface VariantStoreState {
    idToVariant: HashMap<number, Variant2>,
    tyukan: Tyukan,
    projectName: string
}

const state: VariantStoreState = {
    idToVariant: new HashMap<number, Variant2>(),
    projectName: "",
    tyukan: new Tyukan([])
};

const getters = {
    variants: state => state.idToVariant.values()
                            .sort(Variant.compare),

    variant: state => (id: number) => state.idToVariant.get(id),

    tyukan: state => state.tyukan,

    projectName: state => state.projectName,

    // 各世代ごとのfitnessの統計情報を返す
    // TODO 手直しを入れる
    generationNumberToFitnessStatistics: state => {

        const generationNumberToStatistics: Statistics[] = new Array(state.maxGenerationNumber + 1);
        for (let i = 0; i <= state.maxGenerationNumber; i++) {
            generationNumberToStatistics[i] = {
                max: undefined,
                min: undefined,
                sum: 0,
                count: 0
            };
        }

        state.idToVariant.values()
             .forEach((variant: Variant) => {

                 if (!variant.isBuildSuccess()) {
                     return;
                 }

                 const generationNumber = variant.getGenerationNumber();
                 const fitness = variant.getFitness();

                 const statistics = generationNumberToStatistics[generationNumber];

                 // 最大値を更新する
                 if (statistics.max === undefined) {
                     statistics.max = fitness;
                 } else if (statistics.max < fitness) {
                     statistics.max = fitness;
                 }

                 // 最小値を更新する
                 if (statistics.min === undefined) {
                     statistics.min = fitness;
                 }
                 else if (statistics.min > fitness) {
                     statistics.min = fitness;
                 }

                 // 合計を更新する
                 statistics.sum += fitness;

                 // 数を更新する
                 statistics.count++;
             });

        return generationNumberToStatistics;
    },
};

const mutations = {
    setVariants(state, payload) {

        const aprResult: APRResult = new APRResult();
        aprResult.deserialize(JSON.parse(payload.jsonString));

        console.log(aprResult);

        state.projectName = aprResult.projectName;

        const iToV = new HashMap<number, Variant2>();
        aprResult.variants.forEach((v) => iToV.set(v.id, v));
        state.idToVariant = iToV;

        // 中間データの作成
        state.tyukan = new Tyukan(aprResult.variants);
    },
};

const actions = {};

export const VariantStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
