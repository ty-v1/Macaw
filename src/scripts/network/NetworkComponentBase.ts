import Vue from "vue";
import {Component} from 'vue-property-decorator';

@Component
export default class NetworkComponentBase extends Vue {

    /**
     * data
     * */
    protected width: number = 100;
    protected height: number = 100;

    protected applyLayout(): void {
    }
}
