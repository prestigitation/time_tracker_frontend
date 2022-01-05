<template>
<div>
    <task
        @update:description="changeTaskValue($event,'description')" 
        @update:title="changeTaskValue($event,'title')"
        @update:ended_at="changeTaskValue($event,'ended_at')"
        @update:files="changeTaskValue($event,'files')"
        
        @update:subtask_description="changeSubtaskValue"
        @update:subtask_title="changeSubtaskValue"
        @update:subtask_ended_at="changeSubtaskValue"
        @update:subtask_files="changeSubtaskValue"
        
        :subtasks="subtasks"
        @openNewSubtask="openSubtask"
    />
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask">Добавить задачу</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ISubtask, ITask, ISubtaskStructure, ITaskValue } from '../../types/task'
export default defineComponent({
    name: 'create-task',
    setup() {
        const error_message = ref<string>('')
        
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
        const addTask = () => {
            console.log(subtasks);
            /*let formData = new FormData()
            formData.append('title', title.value)
            formData.append('priority', title.value)
            formData.append('description', description.value)
            formData.append('ended_at', ended_at.value)
            if(files) {
                for(let i = 0; i < files.value.files.length; i++) {
                    formData.append('file' + i, files.value.files[i])
                }
            }
            axios.post('/task', formData).then(() => { 
                //router.push('/') 
            }).catch((error: AxiosError) => {
                error_message.value = error.message
            })*/
        }
        const changeTaskValue = (taskInfo: ITaskValue, updatingField: string) => {
            task[updatingField] = taskInfo
        }
        const changeSubtaskValue = (subtaskInfo: ISubtaskStructure) => {
            subtasks[subtaskInfo.index][subtaskInfo.updatingField] = subtaskInfo.value
        }
        return {
            error_message,
            
            addTask,
            openSubtask,
            
            
            task,
            subtasks,
            


            changeTaskValue,
            changeSubtaskValue,
        }
    }
})
</script>

<style>

</style>