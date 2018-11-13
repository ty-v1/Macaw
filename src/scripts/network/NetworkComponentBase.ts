import {Variant} from "../data/Variant";
import {Event, ipcRenderer} from "electron";
import Vue from "vue";
import {Channel} from "../ipc/Channel";
import {Component} from 'vue-property-decorator';

@Component
export default class NetworkComponentBase extends Vue {

    /**
     * data
     * */
    protected width: number = 100;
    protected height: number = 100;

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
            this.variants = this.$store.getters.getAllVariants(this.$store.state);
            this.maxGenerationNumber = this.$store.getters.getMaxGenerationNumber(this.$store.state);
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
     * 初期化前に呼び出す
     * */
    beforeCreate() {
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
