<template>
<div>
    <task 
        @update:description="changeDescription" 
        :subtasks="subtasks"
        @openNewSubtask="openSubtask"
    />
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask">Добавить задачу</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ISubtask } from '../../types/subtask'
export default defineComponent({
    name: 'create-task',
    setup() {
        const error_message = ref('')
        const subtasks = reactive<ISubtask[]>([])
        const openSubtask = () => {
            console.log('sree')
            subtasks.push({
                title: "",
                description: ""
            });
            console.log(subtasks)
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
        const changeDescription = (event) => {
            console.log(event);
        }
        return {
            error_message,
            addTask,
            subtasks,
            openSubtask,
            changeDescription
        }
    }
})
</script>

<style>

</style>