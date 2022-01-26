<template>
<el-tag
    class="tag" 
    v-for="tag: any in tags" 
    :key="tag.id" 
    :color="tag.color"
    > 
    {{tag.title}}
</el-tag>
</template>

<script lang="ts">import { defineComponent } from "vue";

export default defineComponent({
    props: {
        tags: {
            type: Array,
            default: () => []
        }
    },
})
</script>

<style lang="scss" scoped>
.tag:hover {
    cursor: pointer;
}
</style>