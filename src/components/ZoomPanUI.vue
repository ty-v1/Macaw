<template>
    <div class="ui-wrapper">
        <div class="pan">
            aaa
        </div>

        <div class="zoom">
            aaaaa
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class ZoomPanUI extends Vue {
        // 最大・最小倍率
        @Prop() min!: number;
        @Prop() max!: number;

        public magnification: number = 1.0;
    }
</script>

<style scoped lang="scss">
    .ui-wrapper {
        background: cornflowerblue;
        width: 100%;
        display: flex;


        div {
            width: 100%;
        }
    }
</style>
