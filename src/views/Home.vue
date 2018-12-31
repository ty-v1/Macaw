<template>
    <Split>
        <SplitArea :size="70">
            <Basic></Basic>
        </SplitArea>
        <SplitArea :size="30">
            <DiffWindow></DiffWindow>
        </SplitArea>
    </Split>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Basic from "../components/D3JS/Basic.vue";
    import DiffWindow from "../components/diff/VariantInformation.vue";

    @Component({components: {DiffWindow, Basic},})
    export default class Home extends Vue {
    }
</script>
