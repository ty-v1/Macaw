import {Variant} from "../data/Variant";
import {Event, ipcRenderer} from "electron";
import Vue from "vue";
import {Channel} from "../ipc/Channel";
import Component from "vue-class-component";

@Component
export default class NetworkComponentBase extends Vue {

    /**
     * data
     * */
    width: number = 100;
    height: number = 100;

    protected variants: Variant[] = [];
    protected maxGenerationNumber: number = 0;

    /**
     * メインプロセスとの通信の初期設定
     * */
    private setUpIPC(): void {
        // jsonファイルの読み込み終了時の動作
        ipcRenderer.on(Channel.FILE_READ, (event: Event, jsonString: string) => {
            // jsonのパースを同期的に行う
            this.$store.commit('parseJson', {jsonString: jsonString});
            this.variants = this.$store.getters.getAllVariants(this.$store);
            this.maxGenerationNumber = this.$store.getters.getMaxGenerationNumber(this.$store);
            this.applyLayout();
        });
    }

    /**
     * メインプロセスとの通信の初期化
     * */
    private tearDownIPC(): void {
        ipcRenderer.removeAllListeners(Channel.FILE_READ);
    }

    /**
     * マウント時に呼び出す
     * */
    mounted() {
        this.setUpIPC();
    }

    /**
     * 破棄時に呼び出す
     * */
    destroyed() {
        this.tearDownIPC();
    }

    protected applyLayout(): void {
    }
}
