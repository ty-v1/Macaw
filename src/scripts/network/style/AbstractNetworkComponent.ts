import {INetworkLayoutCreator} from "@/scripts/network/layout/INetworkLayoutCreator";
import {ElementStyleCreator} from "@/scripts/network/style/ElementStyleCreator";
import {Variant} from "@/scripts/data/Variant";
import {Event, ipcRenderer} from "electron";
import {BreadthFirstLayout} from "@/scripts/network/layout/BreadthFirstLayout";
import {Vue} from "vue-property-decorator";
import {Channel} from "@/scripts/ipc/Channel";

export abstract class AbstractNetworkComponent extends Vue {

    protected networkLayoutCreator: INetworkLayoutCreator = new BreadthFirstLayout();
    protected elementStyleCreator: ElementStyleCreator = new ElementStyleCreator();

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
            this.setVariants(variants);
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

    // setter
    private setVariants(variants: Variant[]): void {
        this.removeAllElements();
        this.addElements(variants);
    }

    public setNetworkLayout(networkLayout: INetworkLayoutCreator): void {
        this.networkLayoutCreator = networkLayout;
        const variants: Variant[] = this.$store.getters.getAllVariants(this.$store);
        this.applyLayout(variants);
    }

    public setElementStyleFactory(elementStyleFactory: ElementStyleCreator): void {
        this.elementStyleCreator = elementStyleFactory;
        const variants: Variant[] = this.$store.getters.getAllVariants(this.$store);
        this.applyElementStyle(variants);
    }

    protected abstract applyElementStyle(variants: Variant[]): void;

    protected abstract applyLayout(variants: Variant[]): void;

    protected abstract addElements(variants: Variant[]): void;

    protected abstract removeAllElements(): void;
}
