<template>
<div class="pagination__wrapper">
    <div class="pagination_start" v-if="currentPage < step">
        <div class="pagination__item" v-for="page in step + 1" :key="page" @click.prevent="setCurrentPage(page)">
            {{page}}
        </div>
    </div>
    <div class="pagination_progress" v-else-if="currentPage >= step">
        <div class="pagination__item" v-for="page in getProgressSequence()" :key="page" @click.prevent="setCurrentPage(page)">
            {{page}}
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
    name: 'pagination',
    setup(props, {emit}) {
        const step = 2 // шаг пагинации, в одну сторону
        const currentPage = ref(1)
        const pagesAmount = computed(() => Math.round(props.total / props.perPage) + 1)
        const setCurrentPage = (page: number) => {
            currentPage.value = page
            emit('update:currentPage', page)
        } 
        const getProgressSequence = () => {
            let result: Array<number> = []
            
            if(pagesAmount.value >= currentPage.value + step) {
                for(let i = currentPage.value - step + 1; i < currentPage.value + step; i++) {
                    result.push(i)
                }
            } else {
                for(let i = pagesAmount.value - step - 1; i < pagesAmount.value; i++) {
                    result.push(i)
                }
            }
            return result
        }
        return { step, pagesAmount, currentPage, setCurrentPage, getProgressSequence }
    },
    props: {
        total: {
            type: Number,
            default: 0
        },
        perPage: {
            type: Number,
            default: 5
        }
    },
    emits: [
        'update:currentPage'
    ]
})
</script>
<style lang="scss" scoped>
.pagination {
    &__wrapper,
    &_start,
    &_progress {
        display: flex;
    }
    &__wrapper {
        margin: 20px 0 0 0;
        justify-content: center;
    }
    &__item {
        margin: 0 10px 0 10px;
        padding: 10px;
        background: #42b883;
    }
}
</style>