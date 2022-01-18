<template>
<div v-loading="loading">
    <div class="index__header">
        <span class="index__header_title">{{$t('tasks.your_tasks')}}({{tasks.length}})</span>
        <el-button type="success" class="index__header_button" @click.prevent="router.push('/task')">+ {{ $t('tasks.add') }} </el-button>
    </div>
    <div>
        <el-table 
            :data="tasks" 
            @cell-mouse-enter="handleTableMouseEnter"
            class="index__table"
        >
            <el-table-column prop="title" :label="$t('tasks.title')" width="180">
                <template #default="scope">
                    <a @click.prevent="handleCellClick">{{scope.row.title}}</a>
                </template>
            </el-table-column>

            <el-table-column prop="ended_at" :label="$t('tasks.due_date')" width="180" />
            <el-table-column prop="description" :label="$t('tasks.extended_labels.description')" width="auto" />
            <el-table-column
            prop="spent_time"
            :label="$t('tasks.spent_time.title')"
            width="180"
            > 
            <template #default="scope">
                <span v-if="!scope.row.spent_time">
                    <Time />
                </span>
                <span v-else>
                    {{ $t('tasks.no_information')}}
                </span>
            </template>
            </el-table-column>
            <el-table-column
            prop="priority"
            :label="$t('tasks.priority.title')"
            width="180"
            >
                <template #default="scope">
                    <div v-if="scope.row.priority && scope.row.priority.title && scope.row.priority.color">
                        <Attachment  
                            :title="scope.row.priority.title"
                            :color="scope.row.priority.color"
                        />
                    </div>
                    <div v-else>
                        <Attacment 
                            :add_new="true"
                            :title="$t('tasks.priority.add')"
                            color="green"
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="tags"
            :label="$t('tasks.tags.title')"
            width="180"
            >
                <template #default="scope">
                    <div v-if="scope.row.tags">
                        <Attachment
                            v-for="tag in scope.row.tags" 
                            :key="tag.id"
                            :title="tag.title"
                            :color="tag.color"
                        />
                    </div>
                    <div v-else>
                        <Attachment
                            :add_new="true"
                            :title="$t('tasks.tags.add')"
                            color="green"
                        />
                    </div>
                </template>
            </el-table-column>
            
            
            <el-table-column :label="$t('tasks.extended_labels.actions')" width="180"> 
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
        <el-button v-if="$t('tasks.delete.reject')" @click.prevent="deleteModalOpened = false">{{ $t('tasks.delete.reject')}}</el-button>
        <el-button v-if="$t('tasks.delete.confirm')" type="danger">{{ $t('tasks.delete.confirm')}}</el-button>
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
import Attachment from './Tasks/Attachment.vue'
import Time from './Tasks/Time.vue'

export default defineComponent({
    components: {
    Edit,
    Delete,
    Attachment,
    Time
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

        const handleCellClick = () => {
            router.push(`/tasks/${currentRow.value}`)
        }


        const deleteTask = () => {
            deleteModalOpened.value = true
        }

        onMounted(async () => {
            await getTasks().finally(() => {
                loading.value = false 
            })
        })

        return {router, tasks, handleCellClick, loading, handleTableMouseEnter, deleteTask, deleteModalOpened}
    },
})
</script>

<style lang="scss" scoped>
.index {
    &__header {
        &_title {
            font-size: 22px;
            font-weight: bold;
            @media (max-width: 768px) {
                margin: 10px 0 10px 0;
            }
        }
        &_button {
            margin: 0 10px 0 10px;
            @media (max-width: 768px) {
                height: 35px;
            }
        }
        @media (max-width: 768px) {
            display: flex;
            align-items: center;
        }
    }
    &__table {
        margin-top: 20px;
    }
}
</style>