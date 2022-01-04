<template>
<div>
    <task
        @update:description="changeTaskDescription" 
        @update:title="changeTitle"
        @update:ended_at="changeDueDate"
        @update:files="changeFiles"
        
        @update:subtask_description="changeSubtaskDescription"
        
        :subtasks="subtasks"
        @openNewSubtask="openSubtask"
    />
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask">Добавить задачу</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ISubtask, ISubtaskEmit, ITask } from '../../types/subtask'
export default defineComponent({
    name: 'create-task',
    setup() {
        const error_message = ref<string>('')
        
        const subtasks = reactive<ISubtask[]>([])
        const task = reactive<ITask>({
            title: '',
            description: '',
            ended_at: ''
        })
        
        const openSubtask = () => {
            subtasks.push(<ITask>{
                title: '',
                description: '',
                ended_at: ''
            });
        }
        const addTask = () => {
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
        const changeFiles = (files: FileList) => {
            console.log('recieved files')
            console.log(files);
            
        }
        const changeDueDate = (date: string) => {
            console.log(date, typeof date)
            task.ended_at = date
        }
        const changeTitle = (title:string) => {
            task.title = title
        }
        const changeTaskDescription = (description: string) => {
            task.description = description
        }
        const changeSubtaskDescription = (subtaskInfo: any) => {
            console.log('change subtask description')
            console.log(subtaskInfo)
        }
        return {
            error_message,
            
            addTask,
            openSubtask,
            
            
            task,
            subtasks,
            
            
            changeTaskDescription,
            changeTitle,
            changeDueDate,
            changeFiles,

            changeSubtaskDescription,
        }
    }
})
</script>

<style>

</style>