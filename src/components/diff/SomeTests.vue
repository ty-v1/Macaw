<template>
    <ul>
        <li v-for="fqn in fqns" class="fqn">{{fqn}}</li>
    </ul>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class SomeTests extends Vue {
        @Prop(Array) fqns!: string[];
    }
</script>

<style scoped lang="scss">
    ul {
        list-style: none;
        padding-left: 0;
    }
</style>
