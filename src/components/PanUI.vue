<template>
    <div class="pan">
        <div style="display: flex;">
            <div style="width: 20px;"></div>
            <Triangle :direction="'up'"
                      @triangle-clicked="moveUp">
            </Triangle>
        </div>
        <div style="display: flex;">
            <Triangle :direction="'left'"
                      @triangle-clicked="moveLeft">
            </Triangle>
            <div style="width: 20px;"></div>
            <Triangle :direction="'right'"
                      @triangle-clicked="moveRight">
            </Triangle>
        </div>
        <div style="display: flex;">
            <div style="width: 20px;"></div>
            <Triangle :direction="'down'"
                      @triangle-clicked="moveDown">
            </Triangle>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Triangle from "./Triangle.vue";

    @Component({
                   components: {Triangle}
               })
    export default class PanUI extends Vue {

        public moveUp() {
            this.$store.commit('LayoutStore/pan', {
                offset: {x: 0, y: 1.5}
            });
        }

        public moveDown() {
            this.$store.commit('LayoutStore/pan', {
                offset: {x: 0, y: -1.5}
            });
        }

        public moveLeft() {
            this.$store.commit('LayoutStore/pan', {
                offset: {x: 1.5, y: 0}
            });
        }

        public moveRight() {
            this.$store.commit('LayoutStore/pan', {
                offset: {x: -1.5, y: 0}
            });
        }
    }
</script>

<style scoped>

    .pan {
        width: 60px;
        height: 60px;
        /*background-color: #2c3e50;*/
        border: 2px solid gray;
        border-radius: 100%;
        /*position: absolute;*/
    }
</style>
