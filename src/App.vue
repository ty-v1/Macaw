<template>
    <div id="app"
         @dragover="onDragOver"
         @dragleave="onDragLeave"
         @dragend="onDragEnd"
         @drop="onDrop">
        <div id="nav">
            <router-link to="/">Network Graph</router-link>
            |
            <router-link to="/about">Line Graph</router-link>
        </div>
        <div style="height: 90%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from "vue";

    // ストアのアクセスだけここにかく
    @Component
    export default class App extends Vue {
        /**
         * event handlers
         * */
        onDragOver(event: DragEvent) {
            event.preventDefault();
            return false;
        }

        onDragLeave(event: DragEvent) {
            event.preventDefault();
            return false;
        }

        onDragEnd(event: DragEvent) {
            event.preventDefault();
            return false;
        }

        onDrop(event: DragEvent) {
            event.preventDefault();

            // ファイルを読み込んでレイアウトの適応
            if (event.dataTransfer !== null && event.dataTransfer.files[0] !== null) {
                const file: File = event.dataTransfer.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result !== null) {
                        this.$store.commit('DiffStore/reset', {});
                        this.$store.commit('VariantStore/setVariants',
                                           {jsonString: reader.result.toString()});
                    }
                };
                reader.readAsText(file);
            }
            return false;
        }
    }
</script>

<style lang="scss">
    #app {
        position: absolute;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #nav {
        margin: 10px;
        height: 10%;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
            text-align: center;
        }
    }

    #content {
        width: 100%;
        height: 90%;
    }
</style>

