<template>
    <el-row justify="center" class="task_create_page">
    <el-col :span="8" :xs="20">
        <span class="task_create_header">{{ subtask ? $t('tasks.subtasks.create') : $t('tasks.create')}}</span>
        <el-form v-loading="loading"  class="task_form" enctype="multipart/form-data" method="post">
            <el-form-item  :label="$t('tasks.title', {type: subtask ? $t('tasks.subtasks.name') : $t('tasks.name')})" /> 
            <el-input v-model="title" @input="matchData('title', $event)" />
            <el-form-item  :label="$t('tasks.priority.title')" />  
            <el-select @change="matchData('priority', $event)" v-model="priority">
                <el-option
                    v-for="priority: any in priorities"
                    :key="priority.id"
                    :label="priority.title"
                    :value="priority.id"
                />
            </el-select>
            <el-form-item  :label="$t('tasks.description', {type: subtask ? $t('tasks.subtasks.name') : $t('tasks.name')})" /> 
            <el-input type="textarea" v-model="description" @input="matchData('description', $event)" />
            <el-form-item  :label="$t('tasks.hours.title')" /> 
            <el-input v-model="hours" @input="matchData('hours', $event)" />
            <el-form-item :label="$t('tasks.due_date')" /> 
            <div class="date_picker">
                <el-date-picker
                    v-model="ended_at" @change="matchData('ended_at', $event)"
                    type="datetime"
                    :placeholder="$t('tasks.due_date')"
                    :shortcuts="shortcuts"
                />
            </div>
            <div v-if="!$props.subtask">
                <el-form-item  :label="$t('tasks.files') + ':'" /> 
                <input class="files" type="file" name="files[]" ref="files" multiple @change="setFiles($event)">
            </div>
            
            <subtask 
                @openNewSubtask="openNewSubtask" 
                v-if="!subtask" 
                :subtasks="subtasks"
                @update:subtask_description="changeSubtaskField('description', $event)"
                @update:subtask_title="changeSubtaskField('title', $event)"
                @update:subtask_ended_at="changeSubtaskField('ended_at', $event)"  
            />
        </el-form>
    </el-col>
</el-row>
</template>

<script lang="ts">
import { ISubtaskEmit } from '@/types/task';
import { AxiosResponse } from 'axios';
import { defineComponent, ref, watch, reactive, onMounted, inject, nextTick } from 'vue'
import useShortcuts  from '../../hooks/useShortcuts'
export default defineComponent({
    name: 'task',
    emits: [ 
        'update:description' ,
        'update:subtask_description',
        'update:title',
        'update:subtask_title',
        'update:ended_at',
        'update:subtask_ended_at',
        'update:files',
        'update:subtask_files',
        'update:hours',
        'update:subtask_hours',
        'update:priority',
        'update:subtask_priority',

        'openNewSubtask'
    ],
    props: {
        subtask: {
            type: Boolean,
            deefault: false
        },
        subtasks: {
            type: Array,
            default: []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    setup(props, {emit}) {
        const axios: any = inject('axios')

        const title = ref<string>('')
        const priorities = ref([])
        const priority = ref('')
        const ended_at = ref('')
        const description = ref<string>('')
        const hours = ref('0')
        const files = ref<File[]>([])
        const { shortcuts } = useShortcuts()

        onMounted(async() => {
            await getPriorities()
        })


        const getPriorities = async () => {
            const allTasks = await axios.get('priority').then((response: AxiosResponse) => {
                return response.data
            })
            priorities.value = allTasks
        }
        const addTask = () => {}
        const setFiles = (event: any) => {
            emit('update:files', event.target.files)
        }
        const matchData = (property: string, event: any) => {
            if(props.subtask) {
                prepareSubtask(property, event)
            } else changeField(property, event)
        }   
        const changeField = (updatingField: string, value: string) => {
                let defaultEmit: any = `update:${updatingField}`
                // Если задача является подзадачей, отправляем ее для установления нужного индекса 
                // в компонент subtask
                // и последующего изменения в родительском компоненте
                // Если мы работаем с обычной формой, отправляем это напрямую родителю (createTask.vue)
                emit(defaultEmit, value)
        }
        const prepareSubtask = (updatingField: string, value: string) => {
            let emitString: any = `update:subtask_${updatingField}`
            emit(emitString, value)
        }

        const changeSubtaskField = (updatingField: string, structure: ISubtaskEmit) => {
            let subtaskEmit: any = `update:subtask_${updatingField}`
            emit(subtaskEmit, {
                updatingField,
                index: structure.index,
                value: structure.value
            })
        }
        const openNewSubtask = () => {
            emit('openNewSubtask')
        }
        return {
            title,
            priorities,
            priority,
            ended_at,
            description,
            files,
            shortcuts,
            hours,
            addTask,
            changeField,
            changeSubtaskField,
            openNewSubtask,
            setFiles,
            matchData,
        }
    },
})
</script>


<style lang="scss" scoped>
.date_picker {
    margin-top: 20px;
    margin-bottom: 20px;
}
.files {
    display: flex;
}
.task_create {
    &_header {
        font-size: 2em;
    }
}
.task_form {
        & .el-form-item {
            margin-bottom: 5px !important;
            font-weight: bold;
            font-size: 2.5em;
        }
}
</style>