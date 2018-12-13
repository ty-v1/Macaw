<template>
    <div v-if="isShow" class="popup" :style="style">
        <div v-if="messageData.hasTop()">
            {{messageData.getTop()}}
        </div>
        <ul>
            <li v-for="messageDatum in messageData.getData()">
                <span>
                    {{ messageDatum.itemName}}
                </span>
                :
                <span>
                    {{ messageDatum.description}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {sprintf} from "sprintf-js";
    import {MessageData} from "../scripts/data/MessageData";

    @Component
    export default class Popup extends Vue {

        /**
         * computed methods
         * */
        get x() {
            return this.$store.getters['VariantPopupStore/x'];
        }

        get y() {
            return this.$store.getters['VariantPopupStore/y'];
        }

        get fitness() {
            return sprintf("%1.3f", this.$store.getters['VariantPopupStore/fitness']);
        }

        get generationNumber() {
            return this.$store.getters['VariantPopupStore/generationNumber'];
        }

        get isShow() {
            return this.$store.getters['VariantPopupStore/isShow'];
        }

        get style() {
            return {
                top: this.y + 'px',
                left: this.x + 'px'
            }
        }

        get messageData(): MessageData {
            return this.$store.getters['VariantPopupStore/messageData'];
        }
    }
</script>

<style scoped>
    .popup {
        position: absolute;
        z-index: 1;
        background: aqua;
        width: 250px;
        height: 80px;
    }
</style>
