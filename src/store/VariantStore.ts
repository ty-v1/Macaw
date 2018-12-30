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
    variants: state => state.idToVariant.values()
                            .sort(Variant.compare),

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

        // コピー(選択)の解決をする
        const variantData: VariantDatum[] = resolveCopy(jsonData.variants);

        // 選択されたVariantの子の親IDを書き換える
        changeSelectVariantParentId(variantData);

        // 世代数の最大値を求める
        const maxGenerationNumber = searchMaxGenerationNumber(variantData);

        // jsonデータを元にオブジェクトを作成する
        const idToVariant = buildVariants(variantData);

        // いらない個体を圧縮する
        compressVariantData(idToVariant, maxGenerationNumber);

        state.idToVariant = idToVariant;

        // 世代数の最大値を求める
        state.maxGenerationNumber = maxGenerationNumber;
    },
};

// setVariantが呼び出すサブルーチン
function buildVariants(variantData: VariantDatum[]): HashMap<string, Variant> {
    // 子供の数をカウントする
    const idToChildren = new HashMap<string, Set<string>>();
    variantData.forEach((v) => {
        v.operations.forEach((o) => {
            if (idToChildren.has(v.id)) {
                idToChildren.get(v.id)
                            .add(o.id);
            } else {
                idToChildren.set(v.id, new Set(o.id))
            }
        });
    });

    const idToVariant: HashMap<string, Variant> = new HashMap<string, Variant>();

    variantData.forEach((variantDatum) => {
        const id: string = variantDatum.id;
        const selectionCount: number = (id === "0") ?
            variantDatum.selectionCount + 1 : variantDatum.selectionCount;
        const patch: Diff[] = variantDatum.patch;
        const fitness: number = variantDatum.fitness;
        const buildSuccess: boolean = variantDatum.isBuildSuccess;
        const generationNumber: number = variantDatum.generationNumber;
        const testSummary: TestSummary = variantDatum.testSummary;
        const operations: Operation[] = variantDatum.operations;

        const parent: Variant = new Variant(id,
                                            generationNumber,
                                            fitness,
                                            buildSuccess,
                                            selectionCount,
                                            patch,
                                            operations,
                                            testSummary,
                                            idToChildren.get(id));
        idToVariant.set(id, parent);
    });
    return idToVariant;
}

function resolveCopy(rawData: VariantDatum[]): VariantDatum[] {
    const variantData: VariantDatum[] = [];

    rawData.forEach((variantDatum) => {
        variantData.push(variantDatum);

        const id: string = variantDatum.id;
        const selectionCount: number = (id === "0") ?
            variantDatum.selectionCount + 1 : variantDatum.selectionCount;
        const patch: Diff[] = variantDatum.patch;
        const fitness: number = variantDatum.fitness;
        const buildSuccess: boolean = variantDatum.isBuildSuccess;
        const generationNumber: number = variantDatum.generationNumber;
        const testSummary: TestSummary = variantDatum.testSummary;

        for (let i = 1; i <= selectionCount; i++) {
            const selectedVariantId: string = sprintf('%s-%d', id, i);
            const operations: Operation[] = [{
                id: (i == 1) ? id : sprintf('%s-%d', id, i - 1),
                operationName: 'select'
            }];
            variantData.push(
                {
                    id: selectedVariantId,
                    generationNumber: generationNumber + i,
                    fitness: fitness,
                    selectionCount: selectionCount - i,
                    isBuildSuccess: buildSuccess,
                    testSummary: testSummary,
                    patch: patch,
                    operations: operations
                }
            );
        }
    });
    return variantData;
}

function searchMaxGenerationNumber(variantData: VariantDatum[]): number {
    const size = variantData.length;
    let max = 0;
    for (let i = 0; i < size; i++) {
        const generationNumber = variantData[i].generationNumber;
        if (max < generationNumber) {
            max = generationNumber;
        }
    }
    return max;
}

function changeSelectVariantParentId(variantData: VariantDatum[]) {
    const idToGenerationNumber: HashMap<string, number> = new HashMap<string, number>();

    variantData.forEach((e) => {
        idToGenerationNumber.set(e.id, e.generationNumber);
    });

    variantData.forEach((variantDatum) => {
        if (variantDatum.operations.length === 1
            && variantDatum.operations[0].operationName === 'select') {
            return;
        }
        const childGenerationNumber = variantDatum.generationNumber;

        variantDatum.operations.forEach((operation) => {
            const parentGenerationNumber = idToGenerationNumber.get(operation.id);

            const generationSub = childGenerationNumber - parentGenerationNumber;
            if (generationSub === 1) {
                return;
            }
            operation.id = sprintf('%s-%d', operation.id, generationSub - 1);
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
        const id: string = sprintf('c-%d', i);

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
