<template>
    <el-row justify="center" class="task_create_page">
    <el-col :span="8" :xs="20">
        <span class="task_create_header">{{ subtask ? $t('tasks.subtasks.create') : $t('tasks.create')}}</span>
        <el-form class="task_form" enctype="multipart/form-data" method="post">
            <el-form-item  :label="$t('tasks.title', {type: subtask ? $t('tasks.subtasks.name') : $t('tasks.name')})" /> 
            <el-input v-model="title" @input="matchData('title', $event)" />
            <el-form-item  :label="$t('tasks.priority', {type: subtask ? $t('tasks.subtasks.name') : $t('tasks.name')})" /> 
            <el-input :priority="priority" />
            <el-form-item  :label="$t('tasks.description', {type: subtask ? $t('tasks.subtasks.name') : $t('tasks.name')})" /> 
            <el-input type="textarea" v-model="description" @input="matchData('description', $event)" />
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
                <input class="files" type="file" ref="files" multiple @change="setFiles($event)">
            </div>
            
            <subtask 
                @openNewSubtask="openNewSubtask" 
                v-if="!subtask" 
                :subtasks="subtasks"
                @update:subtask_description="changeSubtaskField('description', $event)" 
            />
        </el-form>
    </el-col>
</el-row>
</template>

<script lang="ts">
import { ISubtaskEmit } from '@/types/task';
import { defineComponent, ref } from 'vue'
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
        }
    },
    setup(props, {emit}) {
        const title = ref<string>('')
        const priority = ref('')
        const ended_at = ref('')
        const description = ref<string>('')
        //const tags = ref('')
        const files = ref<File[]>([])
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
        const { shortcuts } = useShortcuts()
        return {
            title,
            priority,
            ended_at,
            description,
            files,
            shortcuts,
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