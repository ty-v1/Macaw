<template>
    <div id="app"
         @dragover="onDragOver"
         @dragleave="onDragLeave"
         @dragend="onDragEnd"
         @drop="onDrop">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

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
            // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
            event.preventDefault();

            if (event.dataTransfer !== null && event.dataTransfer.files[0] !== null) {
                const file: File = event.dataTransfer.files[0];
                // TODO ipcの設定
                console.log(file.path);
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
