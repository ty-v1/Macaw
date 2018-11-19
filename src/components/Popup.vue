<template>
    <div v-if="isShow" class="popup" :style="style">
        <p>Generation Number : {{generationNumber}}</p>
        <p>Fitness : {{fitness}}</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {sprintf} from "sprintf-js";

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
    }
</script>

<style scoped>
    .popup {
        position: absolute;
        z-index: 1;
        background: aqua;
        width: 200px;
        height: 100px;
    }
</style>
