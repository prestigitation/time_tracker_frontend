<template>
<div class="image__wrapper">
    <div class="image__content">
        <img :src="src" class="image">
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: 'image',
    props: {
        src: {
            type: String,
            default: ''
        }
    }
})
</script>
<style lang="scss" scoped>
.image {
    padding: 10px;
    max-width: 150px;
    max-height: 100px;
    &__wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>