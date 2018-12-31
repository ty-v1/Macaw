<template>
    <div class="content">
        <DiffList v-if="isShow"
                  :variant-id="variantId">
        </DiffList>

        <TestSummary v-if="isShow"
                     :variant-id="variantId">
        </TestSummary>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import DiffList from "./DiffList.vue";
    import {mapGetters} from "vuex";
    import TestSummary from "./TestGroup.vue";

    @Component(
        {
            components: {TestSummary, DiffList},
            computed: {
                ...mapGetters(
                    {
                        variantId: 'DiffStore/variantId'
                    }),
            },
        })
    export default class VariantInformation extends Vue {
        get isShow(): boolean {
            const variantId: string = this.$store.getters['DiffStore/variantId'];
            return variantId !== '' && variantId !== '0';
        }
    }
</script>

<style scoped>
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
</style>
