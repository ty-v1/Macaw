<template>
    <div class="content"
         v-if="isShow">
        <div>
            Configuration
        </div>
        <ul>
            <li>Max generation : {{config.maxGeneration}}</li>
            <li>Mutation generating count : {{config.mutationGeneratingCount}}</li>
            <li>Crossover generating count : {{config.crossoverGeneratingCount}}</li>
            <li>Headcount : {{config.headcount}}</li>
            <li>Random seed : {{config.randomSeed}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Vue} from "vue-property-decorator";
    import {APRConfiguration} from "../scripts/json/APRConfiguration";

    export default class Config extends Vue {

        public get isShow() {
            return this.$store.getters['VariantStore/config'] !== undefined;
        }

        public get config(): APRConfiguration {
            return this.$store.getters['VariantStore/config'];
        }
    }
</script>

<style scoped lang="scss">

</style>
