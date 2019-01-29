<template>
    <div class="zoom">
        <button @click="reset">RESET</button>
        <div class="square max">+</div>
        <div class="selector">
            <label>
                <input type="range"
                       value="1"
                       min="0.1"
                       max="2"
                       step="0.05"
                       v-model="rangeValue"/>
            </label>
        </div>
        <div class="square min">-</div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class ZoomUI extends Vue {

        public rangeValue: number = 1;

        @Watch('rangeValue')
        public onChangeRangeValue(newValue: number) {
            // this.rangeValue = newValue;
            // console.log(newValue);
            console.log('changed');
            console.log('Zoom Event ' + performance.now());

            return this.$store.commit('LayoutStore/setScale', {scale: newValue});
        }

        public reset() {
            this.rangeValue = 1;
            this.$store.commit('LayoutStore/reset');
        }
    }
</script>

<style scoped lang="scss">

    .zoom {
        width: 60px;
        position: absolute;
    }

    .square {
        width: 20px;
        height: 20px;
        left: 20px;
        position: absolute;
        background: white;
        border: solid 2px gray;
        text-align: center;
        cursor: pointer;
        user-select: none;
    }

    .min {
        top: 245px;
        border-radius: 8px;
        background: white;
        color: grey;
        line-height: 20px;
    }

    .max {
        top: 25px;
        border-radius: 8px;
        background: white;
        color: grey;
        line-height: 20px;
    }

    .selector {
        top: 250px;
        right: -165px;
        transform: rotate(-90deg);
        transform-origin: left top;
        position: absolute;

        input {
            width: 200px;
        }
    }
</style>
