<template>
    <div class="ui-wrapper">
        <PanUI></PanUI>
        <ZoomUI></ZoomUI>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import PanUI from "./PanUI.vue";
    import ZoomUI from "./ZoomUI.vue";

    @Component({
                   components: {ZoomUI, PanUI}
               })
    export default class ZoomPanUI extends Vue {
        // 最大・最小倍率
        @Prop() min!: number;
        @Prop() max!: number;

        public magnification: number = 1.0;
    }
</script>

<style scoped lang="scss">
    .ui-wrapper {
        width: 60px;
        z-index: 1;
        position: absolute;
        display: block;
    }
</style>
