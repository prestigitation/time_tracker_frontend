<template>
<div class="attachment__wrapper" 
:style="`background:${color}`" 
:class="{attachment__wrapper_new: add_new}"
>
    <span v-if="add_new">+</span>
    <span>{{title}}</span>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'attachment',
    props: {
        add_new: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'black'
        },
        title: {
            type: String,
            default: 'No title'
        }
    }
})
</script>

<style lang="scss" scoped>
.attachment__wrapper {
    padding: 8px;
    color: white;
    text-align: center;
    max-width: 125px;
    &_new {
        width: 75%;
    }
    &:hover {
        cursor: pointer;
    }
}
</style>