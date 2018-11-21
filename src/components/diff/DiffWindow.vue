<template>
    <div class="content">
        <DiffList v-for="variantId in variantIds"
                  :key="variantId"
                  :variant-id="variantId">
        </DiffList>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import DiffList from "./DiffList.vue";
    import {mapGetters} from "vuex";

    @Component(
        {
            components: {DiffList},
            computed: {
                ...mapGetters(
                    {
                        variantIds: 'DiffStore/variantIds'
                    }),
            },
        })
    export default class DiffWindow extends Vue {
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
