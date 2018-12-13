import HashMap from "hashmap";
import {Variant} from "@/scripts/data/Variant";
import {JSONData} from "@/scripts/data/JSONData";
import {VariantDatum} from "@/scripts/data/VariantDatum";
import {Diff} from "@/scripts/data/Diff";
import {TestSummary} from "@/scripts/data/TestSummary";
import {Operation} from "@/scripts/data/Operation";
import {sprintf} from "sprintf-js";
import {Statistics} from "@/scripts/data/Statistics";
import {CompressedVariant} from "@/scripts/data/CompressedVariant";

export interface VariantStoreState {
    idToVariant: HashMap<string, Variant>,
    maxGenerationNumber: number,
    projectName: string
}

const state: VariantStoreState = {
    idToVariant: new HashMap<string, Variant>(),
    maxGenerationNumber: 0,
    projectName: ""
};

const getters = {
    variants: state => state.idToVariant.values().sort(Variant.compare),

    variant: state => (id: string) => state.idToVariant.get(id),

    maxGenerationNumber: state => state.maxGenerationNumber,

    projectName: state => state.projectName,

    generationNumberToVariantCount: state => {
        // 世代ごとのvariantの数を求める
        const generationNumberToVariantCount
            = new Array(state.maxGenerationNumber + 1);
        generationNumberToVariantCount.fill(0);

        state.idToVariant.values()
             .forEach((variant) => {
                 generationNumberToVariantCount[variant.getGenerationNumber()]++;
             });

        return generationNumberToVariantCount;
    },

    // 各世代ごとのfitnessの統計情報を返す
    generationNumberToFitnessStatistics: state => {

        const generationNumberToStatistics: Statistics[] = new Array(state.maxGenerationNumber + 1);
        for (let i = 0; i <= state.maxGenerationNumber; i++) {
            generationNumberToStatistics[i] = {
                max: 0,
                min: 0,
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
                 if (statistics.max < fitness) {
                     statistics.max = fitness;
                 }

                 // 最小値を更新する
                 if (statistics.min > fitness) {
                     statistics.min = fitness;
                 }

                 // 合計を更新する
                 statistics.sum += fitness;

                 // 数を更新する
                 statistics.count++;
             });

        return generationNumberToStatistics;
    },

    // 0世代目のVariantを返す
    initialVariant: state => state.idToVariant.get("0"),

    // ビルドが成功したVariantを返す
    buildSucceededVariant: state => {
        return state.idToVariant.values()
                    .filter((variant: Variant) => {
                        return variant.isBuildSuccess();
                    });
    },

    // ビルドが失敗したVariantを返す
    buildFailedVariant: state => {
        return state.idToVariant.values()
                    .filter((variant: Variant) => {
                        return !variant.isBuildSuccess();
                    });
    },
};

const mutations = {
    setVariants(state, payload) {
        const jsonData: JSONData = JSON.parse(payload.jsonString);

        state.projectName = jsonData.projectName;
        const variantData: VariantDatum[] = jsonData.variants;

        // コピー(選択)の解決をする
        const idToVariant: HashMap<string, Variant> = resolveCopy(variantData);

        // 選択されたVariantの子の親IDを書き換える
        changeSelectVariantParentId(idToVariant);

        // 世代数の最大値を求める
        const maxGenerationNumber = searchMaxGenerationNumber(idToVariant.values());

        // いらない個体を圧縮する
        compressVariantData(idToVariant, maxGenerationNumber);

        state.idToVariant = idToVariant;

        // 世代数の最大値を求める
        state.maxGenerationNumber = maxGenerationNumber;
    },
};

// setVariantが呼び出すサブルーチン
function resolveCopy(variantData: VariantDatum[]): HashMap<string, Variant> {
    // コピー(選択)の解決をする
    const idToVariant: HashMap<string, Variant> = new HashMap<string, Variant>();
    variantData.forEach((variantDatum) => {
        const id: string = variantDatum.id;
        const selectionCount: number = (id === "0") ?
            variantDatum.selectionCount + 1 : variantDatum.selectionCount
        const patch: Diff[] = variantDatum.patch;
        const fitness: number = variantDatum.fitness;
        const buildSuccess: boolean = variantDatum.isBuildSuccess;
        const generationNumber: number = variantDatum.generationNumber;
        const testSummary: TestSummary = variantDatum.testSummary;
        const operations: Operation[] = variantDatum.operations;

        // 親のVariantを追加する
        const parent: Variant = new Variant(id,
                                            generationNumber,
                                            fitness,
                                            buildSuccess,
                                            selectionCount,
                                            patch,
                                            operations,
                                            testSummary);
        idToVariant.set(id, parent);

        for (let i = 1; i <= selectionCount; i++) {
            const selectedVariantId: string = sprintf('%s-%d', id, i);
            const operations: Operation[] = [{
                id: (i == 1) ? id : sprintf('%s-%d', id, i - 1),
                operationName: 'select'
            }];
            const variant: Variant = new Variant(selectedVariantId,
                                                 generationNumber + i,
                                                 fitness,
                                                 buildSuccess,
                                                 selectionCount,
                                                 patch,
                                                 operations,
                                                 testSummary,
                                                 true);
            idToVariant.set(selectedVariantId, variant);
        }
    });
    return idToVariant;
}

function searchMaxGenerationNumber(variants: Variant[]): number {
    const size = variants.length;
    let max = 0;
    for (let i = 0; i < size; i++) {
        const generationNumber = variants[i].getGenerationNumber();
        if (max < generationNumber) {
            max = generationNumber;
        }
    }
    return max;
}

function changeSelectVariantParentId(idToVariant: HashMap<string, Variant>) {

    idToVariant.values()
               .forEach((variant) => {

                   if (variant.isSelected()) {
                       return;
                   }

                   const childGenerationNumber = variant.getGenerationNumber();

                   variant.getParentIds()
                          .forEach((oldParentId) => {
                              const parentGenerationNumber =
                                  idToVariant.get(oldParentId)
                                             .getGenerationNumber();
                              const generationSub = childGenerationNumber - parentGenerationNumber;
                              if (generationSub === 1) {
                                  return;
                              }
                              const newParentId: string =
                                  sprintf('%s-%d', oldParentId, generationSub - 1);
                              variant.changeParentId(oldParentId, newParentId);
                          });
               });
}

// 不要なデータを圧縮する
function compressVariantData(idToVariant: HashMap<string, Variant>, maxGenerationNumber: number): void {
    // 世代 -> ビルドに失敗した個体の数
    const buildFailedVariantCount: number[] = Array(maxGenerationNumber + 1);
    const compressedVariantIds: Set<string> = new Set<string>();

    buildFailedVariantCount.fill(0);

    // 圧縮するVariantを探す
    idToVariant.values()
               .forEach((variant) => {
                   if (!variant.isBuildSuccess()) {
                       buildFailedVariantCount[variant.getGenerationNumber()]++;
                       compressedVariantIds.add(variant.getId());
                   }
               });

    // 圧縮する個体を消す
    compressedVariantIds.forEach((variantId) => {
        idToVariant.remove(variantId);
    });

    // CompressedVariantを追加する
    for (let i = 0; i < buildFailedVariantCount.length; i++) {
        const count = buildFailedVariantCount[i];
        if (count === 0) {
            continue;
        }
        const id: string = sprintf('c%d', i);

        const compressedVariant = new CompressedVariant(id, i, -1.0, count);

        idToVariant.set(id, compressedVariant);
    }

}

const actions = {};

export const VariantStore = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
};
