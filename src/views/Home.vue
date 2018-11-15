<template>
    <div class="home">
        <Basic></Basic>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Basic from "../components/D3JS/Basic.vue";

    @Component({components: {Basic},})
    export default class Home extends Vue {
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
    }
</style>
