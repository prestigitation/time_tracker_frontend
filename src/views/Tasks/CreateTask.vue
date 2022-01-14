<template>
<div>
    <task
        @update:description="changeTaskValue($event,'description')" 
        @update:title="changeTaskValue($event,'title')"
        @update:ended_at="changeTaskValue($event,'ended_at')"
        @update:files="changeTaskValue($event,'files')"
        
        @update:subtask_description="changeSubtaskValue"
        @update:subtask_title="changeSubtaskValue"
        @update:subtask_ended_at="changeSubtaskDueDate"
        
        :subtasks="subtasks"
        @openNewSubtask="openSubtask"

        :loading="loading"
    />
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask" v-if="error_message === ''"> {{ $t('tasks.add') }}</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from "vue";
import { ISubtask, ITask, ISubtaskStructure, ITaskValue } from '../../types/task'
import { AxiosError } from "axios";
import { useI18n } from 'vue-i18n'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'create-task',
    setup() {
        const axios: any = inject('axios')
        const {t} = useI18n()
        const store = useStore()
        const router = useRouter()
        const error_message = ref<string>('')
        const loading = ref(false)
        const subtasks = reactive<ISubtask[]>([])
        const task = reactive<ITask>({
            title: '',
            description: '',
            ended_at: '',
            files: []
        })
        
        const openSubtask = () => {
            subtasks.push(<ITask>{
                title: '',
                description: '',
                ended_at: '',
                files: []
            });
        }
        const addTask = async () => {
            loading.value = true
            let formData = new FormData()
            formData.append('task', JSON.stringify(task))
            formData.append('subtasks', JSON.stringify(subtasks))
            for(let i = 0; i < task.files.length; i++) {
                formData.append(`files[${i}]`, task.files[i])
            }

            
            await axios.post('/task', formData).then(() => { 
                    router.push('/') 
                    ElNotification({
                        title: t('tasks.created.title'),
                        message: t('tasks.created.message'),
                        type: 'success',
                    })
                }).catch((error: AxiosError) => {
                    ElNotification({
                        title: t('tasks.failed.title'),
                        message: t('tasks.failed.message'),
                        type: 'error',
                    })
                    error_message.value = error.message
                    setTimeout(() => {
                        error_message.value = ''
                    }, 10000)
                }).finally(() => {
                    loading.value = false
                })
                

        
                /*axios.post('/task', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + store.getters.get_user.token
                    }
                }).then(() => { 
                    router.push('/') 
                    ElNotification({
                        title: t('tasks.created.title'),
                        message: t('tasks.created.message'),
                        type: 'success',
                    })
                }).catch((error: AxiosError) => {
                    ElNotification({
                        title: t('tasks.failed.title'),
                        message: t('tasks.failed.message'),
                        type: 'error',
                    })
                    error_message.value = error.message
                    setTimeout(() => {
                        error_message.value = ''
                    }, 10000)
                }).finally(() => {
                    loading.value = false
                })*/
        }
        const changeTaskValue = (taskInfo: ITaskValue, updatingField: string) => {
            task[updatingField] = taskInfo
        }
        const changeSubtaskValue = (subtaskInfo: ISubtaskStructure) => {
            console.log(subtaskInfo);
            subtasks[subtaskInfo.index][subtaskInfo.updatingField] = subtaskInfo.value
        }
        const changeSubtaskDueDate = (subtaskInfo: ISubtaskStructure) => {
            if(task.ended_at && new Date(task.ended_at) >  new Date(subtaskInfo.value as string)) {
                subtasks[subtaskInfo.index][subtaskInfo.updatingField] = subtaskInfo.value
                error_message.value = ''
            } else error_message.value = t('tasks.subtasks.date_error', {index: subtaskInfo.index + 1})
        }
        return {
            error_message,
            
            addTask,
            openSubtask,
            
            
            task,
            subtasks,
            

            changeTaskValue,
            changeSubtaskValue,
            changeSubtaskDueDate,
            loading
        }
    }
})
</script>

<style>

</style>