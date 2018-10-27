<template>
    <div class="home">
        <CytoscapeJS></CytoscapeJS>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CytoscapeJS from "../components/CytoscapeJS.vue"; // @ is an alias to /src

    @Component({
        components: {
            CytoscapeJS
        },
    })
    export default class Home extends Vue {
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
    }
</style>
