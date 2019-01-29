<template>
    <div id="app"
         @dragover="onDragOver"
         @dragleave="onDragLeave"
         @dragend="onDragEnd"
         @drop="onDrop">
        <div id="nav">
            <router-link to="/">Tree</router-link>
            |
            <router-link to="/about">Line Chart</router-link>
        </div>
        <Config></Config>
        <div style="height: 90%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import Vue from "vue";
    import Config from "./components/Config.vue";
    import axios from "axios";

    // ストアのアクセスだけここにかく
    @Component({
                   components: {Config}
               })
    export default class App extends Vue {


        async mounted() {
            const res = await axios.get('history.json');

            this.$store.commit('DiffStore/reset', {});

            console.log('Before Load ' + performance.now());
            this.$store.commit('VariantStore/setVariants',
                               {jsonString: JSON.stringify(res.data)});
            console.log('After Load ' + performance.now());
        }

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
            console.log('Before Load ' + performance.now());

            // ファイルを読み込んでレイアウトの適応
            if (event.dataTransfer !== null && event.dataTransfer.files[0] !== null) {
                const file: File = event.dataTransfer.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result !== null) {
                        this.$store.commit('DiffStore/reset', {});
                        this.$store.commit('VariantStore/setVariants',
                                           {jsonString: reader.result.toString()});
                        console.log('After Load ' + performance.now());
                    }
                };
                reader.readAsText(file);
            }

            return false;
        }
    }
</script>

<style lang="scss">
    body {
        overflow: hidden;
    }

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

