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
        <router-view/>
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
                        this.$store.commit('VariantStore/setVariants',
                                           {jsonString: reader.result.toString()});

                        this.$store.commit('LayoutStore/apply',
                                           {
                                               variants:
                                                   this.$store.getters['VariantStore/variants'],
                                               maxGenerationNumber:
                                                   this.$store.getters['VariantStore/maxGenerationNumber'],
                                               generationNumberToVariantCount:
                                                   this.$store.getters['VariantStore/generationNumberToVariantCount']
                                           });
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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
            text-align: center;
        }
    }

    html {
        width: 100%;
        height: 100%;
    }

    body {
        width: 100%;
        height: 100%;
    }
</style>
