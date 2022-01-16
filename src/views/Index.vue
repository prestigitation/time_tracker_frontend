<template>
<div v-loading="loading">
    <div>
        <span class="index__title">{{$t('tasks.your_tasks')}}({{tasks.length}})</span>
        <el-button type="success" class="index_task_button" @click.prevent="router.push('/task')">+ {{ $t('tasks.add') }} </el-button>
    </div>
    <div>
        <el-table 
            :data="tasks" 
            @cell-mouse-enter="handleTableMouseEnter"
        >
            <el-table-column prop="title" :label="$t('tasks.title')" width="180" />
            <el-table-column prop="ended_at" :label="$t('tasks.due_date')" width="180" />
            <el-table-column prop="description" :label="$t('tasks.extended_labels.description')" width="auto" />
            <el-table-column :label="$t('tasks.extended_labels.actions')" width="180"> 
                <el-button type="primary" @click.prevent="editTask()" circle>
                    <Edit width="20" height="20" /> 
                </el-button>
                <el-button type="danger" @click.prevent="deleteTask()" circle>
                    <Delete width="20" height="20" /> 
                </el-button>
            </el-table-column>
        </el-table>
    </div>
</div>



<el-dialog v-model="deleteModalOpened" :title="$t('tasks.delete.title')">
    <div v-text="$t('tasks.delete.text')" />
    <template #footer>
        <el-button @click.prevent="deleteModalOpened = false">{{ $t('tasks.delete.reject')}}</el-button>
        <el-button type="danger">{{ $t('tasks.delete.confirm')}}</el-button>
    </template>
</el-dialog>

</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { defineComponent, inject, ref,  onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

export default defineComponent({
    components: {
        Edit,
        Delete
    },
    name: 'index',
    setup() {
        const router = useRouter()
        const axios: any = inject('axios')
        const tasks = ref([])
        const loading = ref(true)
        const currentRow = ref(undefined)
        const deleteModalOpened = ref(false)
        const getTasks = async () => {
            const allTasks = await axios.get('task').then((response: AxiosResponse) => {
                return response.data
            })
            tasks.value = allTasks
        }

        const handleTableMouseEnter = (task: any) => {
            currentRow.value = task.id
        }

        const handleCellClick = (task: any) => {
            router.push(`/tasks/${task.id}`)
        }

        const editTask = () => {
            if(currentRow.value) {
                router.push(`/tasks/${currentRow.value}/edit`)
            }
        }

        const deleteTask = () => {
            deleteModalOpened.value = true
        }

        onMounted(async () => {
            await getTasks().finally(() => {
                loading.value = false 
            })
        })

        return {router, tasks, handleCellClick, editTask, loading, handleTableMouseEnter, deleteTask, deleteModalOpened}
    },
})
</script>

<style lang="scss" scoped>
.index {
    &_task_button {
        margin-left: 10px;
        margin-right: 10px;
    }
    &__title {
        font-size: 22px;
        font-weight: bold;
    }
}
</style>