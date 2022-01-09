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
        @update:subtask_files="setSubtaskFiles"
        
        :subtasks="subtasks"
        @openNewSubtask="openSubtask"
    />
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask">Добавить задачу</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from "vue";
import { ISubtask, ITask, ISubtaskStructure, ITaskValue } from '../../types/task'
import { AxiosError } from "axios";
export default defineComponent({
    name: 'create-task',
    setup() {
        const axios: any = inject('axios')
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
        const setSubtaskFiles = (e: any) => {
            console.log(e);
            console.log('set task');
            
            
        }
        const addTask = () => {
            console.log(subtasks[0].files);
            
            let formData = new FormData()
            formData.append('task', JSON.stringify(task))
            formData.append('subtasks', JSON.stringify(subtasks))
            for(let i = 0; i < task.files.length; i++) {
                formData.append(`task_file[${i}]`, task.files[i])
            }
            for(let t = 0; t < subtasks.length; t++) {
                for(let j = 0; j < subtasks[t].files.length; j++) {
                    formData.append(`subtask_file[${t+j}]`, subtasks[t].files[j])
                }
            }
            
            axios.post('/task', formData).then(() => { 
                //router.push('/') 
            }).catch((error: AxiosError) => {
                error_message.value = error.message
            })
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
            

            setSubtaskFiles,
            changeTaskValue,
            changeSubtaskValue,
        }
    }
})
</script>

<style>

</style>