<template>
    <div v-if="isShow" class="popup" :style="style">
        <div>
            {{message.title}}
        </div>
        <ul>
            <li v-for="item in message.items">
                <span>
                    {{ item.name}}
                </span>
                :
                <span>
                    {{ item.value}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {sprintf} from "sprintf-js";
    import {Message} from "../store/VariantPopupStore";

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

        get message(): Message {
            return this.$store.getters['VariantPopupStore/message'];
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
