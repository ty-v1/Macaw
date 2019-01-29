<template>
    <div :class="['triangle', direction]"
         @mousedown="onMouseDown"
         @mouseup="onMouseUp"
         @mouseleave="onMouseLeave">
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Triangle extends Vue {
        @Prop(String) direction!: string;

        public isMouseDown: boolean = false;

        public mouseHold() {
            this.$emit('triangle-clicked');

            if (this.isMouseDown) {
                setTimeout(this.mouseHold, 1);
            }
        }

        public onMouseDown() {
            this.isMouseDown = true;
            setTimeout(this.mouseHold, 1);
        }

        public onMouseUp() {
            this.isMouseDown = false;
        }

        public onMouseLeave() {
            this.isMouseDown = false;
        }
    }
</script>

<style scoped>

    .triangle {
        width: 0;
        height: 0;
    }

    .left {
        border-top: 10px solid transparent;
        border-right: 20px solid gray;
        border-bottom: 10px solid transparent;
    }

    .right {
        border-top: 10px solid transparent;
        border-left: 20px solid gray;
        border-bottom: 10px solid transparent;
    }

    .up {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid gray;
    }

    .down {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 20px solid gray;
    }
</style>
