<template>
<div class="index_header">
    <span>{{$t('tasks.your_tasks')}}(0)</span>
    <el-button round type="success" class="index_task_button" @click.prevent="router.push('/task')">+ {{ $t('tasks.add') }} </el-button>
    {{tasks}}
</div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'index',
    setup() {
        const router = useRouter()
        const axios: any = inject('axios')
        let tasks = reactive([])
        axios.get('task').then(({data}) => {
            tasks = data
        })
        return {router, tasks}
    }
})
</script>

<style lang="scss" scoped>
.index {
    &_header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    &_task_button {
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>