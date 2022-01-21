<template>
<div v-loading="loading">
    <div class="index__header">
        <span class="index__header_title">{{$t('tasks.your_tasks')}}({{tasks.length}})</span>
        <el-button type="success" class="index__header_button" @click.prevent="router.push('/task')">+ {{ $t('tasks.add') }} </el-button>
    </div>
    <div>
        <el-table 
            :data="currentTasks" 
            @cell-mouse-enter="handleTableMouseEnter"
            @cell-click="taskModalOpened = true"
            class="index__table"
        >
            <el-table-column prop="title" :label="$t('tasks.title')" width="180">
                <template #default="scope">
                    <span>{{scope.row.title}}</span>
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
                <span v-if="scope.row.spent_time">
                    <Time
                        @sync_time="syncTime($event, scope.row.id)"
                        :time="scope.row.spent_time"
                    />
                </span>
                <span v-else>
                    {{ $t('tasks.no_information')}}
                </span>
            </template>
            </el-table-column>
            <el-table-column prop="hours" :label="$t('tasks.hours.title')" width="150" />
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
        </el-table>
        <Pagination @update:current-page="changePage" :total="tasks.length" :perPage="perPage" />
    </div>
</div>



<el-dialog v-model="deleteModalOpened" :title="$t('tasks.delete.title')">
    <div v-text="$t('tasks.delete.text')" />
    <template #footer>
        <el-button v-if="$t('tasks.delete.reject')" @click.prevent="deleteModalOpened = false">{{ $t('tasks.delete.reject')}}</el-button>
        <el-button v-if="$t('tasks.delete.confirm')" @click.prevent="deleteTask" type="danger">{{ $t('tasks.delete.confirm')}}</el-button>
    </template>
</el-dialog>

<el-dialog v-model="taskModalOpened" width="95%">
    <keep-alive>
        <div class="task__wrapper">
            <div class="task__title">
                <span v-if="currentTask.title">
                    {{ currentTask.title }}
                </span>
                <span v-if="currentTask.hours">
                    {{ $t('tasks.hours.dialog_title') }} {{ currentTask.hours }} {{ $t('tasks.hours.measure') }}
                </span>
                <span>tags</span> <!-- TODO: tags-->
            </div>
            <div class="task__description" v-if="currentTask.description">
                <span v-text="currentTask.description" />
            </div>
            <div class="task__attachments">
                <div class="task__files" v-if="getFilesLinks(currentTask.files).length">
                    <div>{{$t('tasks.file.title')}}</div>
                    <span v-for="file in getFilesLinks(currentTask.files)">
                        <Image v-if="getFileType(file) === 'image'" :src="file" />
                    </span>
                </div>
                <div class="task__priority" v-if="currentTask.priority_id">
                    <span>Приоритет:</span>
                    <Attachment 
                        :title="currentTask?.priority?.title"
                        :color="currentTask?.priority?.color" 
                    />
                </div>
            </div>
        </div>
    </keep-alive>
    <template #footer>
        <el-button type="primary" @click.prevent="editTask">
            {{ $t('tasks.update.title') }}
        </el-button>
        <el-button type="danger" @click.prevent="deleteModalOpened = true">
            {{ $t('tasks.delete.title') }}
        </el-button>
    </template>
</el-dialog>

</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { defineComponent, inject, ref,  onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'
import Attachment from './Tasks/Attachment.vue'
import Time from './Tasks/Time.vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Image from '../components/Image.vue'
import Pagination from '@/components/Pagination.vue'
export default defineComponent({
    components: {
    Edit,
    Delete,
    Attachment,
    Time,
    Image,
    Pagination
},
    name: 'index',
    setup() {
        const router = useRouter()
        const axios: any = inject('axios')
        const {t} = useI18n()
        
        const tasks = ref<any[]>([])
        const loading = ref(true)
        const currentRowId = ref(undefined)
        const currentTask = ref<any>(undefined)
        const currentPage = ref(1)
        const total = ref<number|undefined>(undefined)
        const deleteModalOpened = ref(false)
        const taskModalOpened = ref(false)
        const perPage = 5
        
        
        const getTasks = async () => {
            const allTasks = await axios.get('task').then((response: AxiosResponse) => {
                return response.data
            })
            tasks.value = allTasks
        }

        const handleTableMouseEnter = (task: any) => {
            currentRowId.value = task.id
        }

        const editTask = () => {
            router.push(`/task/${currentRowId.value}`)
        }


        const deleteTask = () => {
            deleteModalOpened.value = true
            axios.delete(`/task/${currentRowId.value}`).then(() => {
                ElNotification({
                    title: t('tasks.delete.title'),
                    message: t('tasks.delete.success.message'),
                    type: 'success',
                })
            }).catch(() => {
                ElNotification({
                    title: t('tasks.delete.title'),
                    message: t('tasks.delete.failed.message'),
                    type: 'error',
                })
            })
        }

        const syncTime = async (event: string, id: number) => {
            let formData = new FormData()
            formData.append('id', id.toString())           
            formData.append('value', event)
            await axios.post('/task/sync_time', formData)
        }

        const getFilesLinks = (filesArray: string): Array<string> => {
            let result: Array<string> = []
            for(let i = 0; i < filesArray.length; i++) {
                if(filesArray[i] === '"') {
                    let closeBracket = filesArray.indexOf('"', i+1)
                    let link = filesArray.slice(i + 1,closeBracket)
                    result.push(link)
                    i = closeBracket + 1
                }
            }
            return result
        }

        const getFileType = (fileName: string) => {
            if(fileName.endsWith('jpg') || fileName.endsWith('jpeg') || fileName.endsWith('png')) {
                return 'image'
            } else if (fileName.endsWith('mp4') || fileName.endsWith('webm')) return 'video'
        }

        const changePage = (page: number) => {
            currentPage.value = page
        }

        const currentTasks = computed(() => tasks.value.slice(currentPage.value, currentPage.value + perPage))

        watch(() => taskModalOpened.value, 
            (previousValue: boolean, currentValue: boolean) => {
                if(previousValue) {
                    //находим текущую задачу, открывается модальное окно с информацией о ней
                    currentTask.value = tasks.value.filter(task => task.id === currentRowId.value)[0]
                }
        })


        onMounted(async () => {
            await getTasks().finally(() => {
                loading.value = false 
            })
        })

        return {
            router, 
            tasks, 
            loading, 
            taskModalOpened,
            deleteModalOpened,
            currentTask,
            perPage,
            total,
            currentPage,
            currentTasks,

            handleTableMouseEnter, 
            deleteTask,
            editTask, 
            syncTime, 
            getFilesLinks,
            getFileType,
            changePage, 
        }
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
.task {
    &__title {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        font-weight: bold;
    }
    &__attachments {
        display: flex;
        justify-content: space-between;
    }
    &__description {
        margin-top: 25px;
        display: flex;
        flex-direction: flex-start;
        min-height: 300px;
        @media (min-width: 768px) {
            min-height: 100px;
        }
    }
}
</style>