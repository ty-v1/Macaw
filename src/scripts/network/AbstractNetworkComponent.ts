import {Variant} from "../data/Variant";
import {Event, ipcRenderer} from "electron";
import {Vue} from "vue-property-decorator";
import {Channel} from "../ipc/Channel";

export abstract class AbstractNetworkComponent extends Vue {

    /**
     * ネットワークライブラリのセットアップ
     * */
    protected abstract setUpGraphLibrary(): void;

    /**
     * ネットワークライブラリの初期化
     * */
    protected abstract tearDownGraphLibrary(): void;

    /**
     * メインプロセスとの通信の初期設定
     * */
    private setUpIPC(): void {
        // jsonファイルの読み込み終了時の動作
        ipcRenderer.on(Channel.FILE_READ, (event: Event, jsonString: string) => {
            // jsonのパースを同期的に行う
            this.$store.commit('parseJson', {jsonString: jsonString});
            const variants: Variant[] = this.$store.getters.getAllVariants(this.$store);
            this.applyLayout(variants);
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
    protected mounted() {
        this.setUpGraphLibrary();
        this.setUpIPC();
    }

    /**
     * 破棄時に呼び出す
     * */
    protected destroyed() {
        this.tearDownGraphLibrary();
        this.tearDownIPC();
    }

    protected abstract applyLayout(variants: Variant[]): void;
}
