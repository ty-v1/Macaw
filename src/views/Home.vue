<template>
    <div class="home">
        <Basic></Basic>
        <DiffWindow></DiffWindow>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Basic from "../components/D3JS/Basic.vue";
    import DiffWindow from "../components/ui/DiffWindow.vue";

    @Component({components: {DiffWindow, Basic},})
    export default class Home extends Vue {
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
