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
    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        width: 100px;
    }
    width: 100px;
    height: 100px;
}
</style>