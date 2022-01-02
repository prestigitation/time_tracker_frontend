<template>
<div>
    <task></task>
    <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
    <el-button class="task_create_page_button" type="success" @click.prevent="addTask">Добавить задачу</el-button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: 'create-task',
    setup() {
        const error_message = ref('')
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
        return {
            error_message,
            addTask
        }
    }
})
</script>

<style>

</style>