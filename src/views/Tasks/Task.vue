<template>
    <el-row justify="center" class="task_create_page">
    <el-col :span="8" :xs="20">
        <span class="task_create_header">{{ $t('tasks.create')}}</span>
        <el-form class="task_form" enctype="multipart/form-data" method="post">
            <el-form-item  :label="$t('tasks.title')" /> 
            <el-input :title="title" />
            <el-form-item  :label="$t('tasks.priority')" /> 
            <el-input :priority="priority" />
            <el-form-item  :label="$t('tasks.description')" /> 
            <el-input type="textarea" :description="description" />
            <el-form-item :label="$t('tasks.due_date')" /> 
            <div class="date_picker">
                <el-date-picker
                    :ended_at="ended_at"
                    type="datetime"
                    :placeholder="$t('tasks.due_date')"
                    :shortcuts="shortcuts"
                />
            </div>
            <el-form-item  :label="$t('tasks.files') + ':'" /> 
            <input class="files" type="file" ref="files" multiple>
            <el-form-item :label="$t('tasks.subtasks.header')" /> 
            
            <subtask />
        </el-form>
    </el-col>
</el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
    name: 'task',
    setup() {
        const {t} = useI18n()
        const title = ref('')
        const priority = ref('')
        const ended_at = ref('')
        const description = ref('')
        //const subtasks = ref('')
        //const tags = ref('')
        const files = ref<any>(null)
        const addTask = () => {}
        const shortcuts = ref([
        {
            text: t('tasks.picker.today'),
            value: new Date(),
        },
        {
            text: t('tasks.picker.tomorrow'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                return date
            },
        },
        {
            text: t('tasks.picker.3days'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
                return date
            }
        },
        {
            text: t('tasks.picker.week'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                return date
            },
        },
        ])


        return {
            title,
            priority,
            ended_at,
            description,
            //subtasks,
            files,
            //tags,
            shortcuts,
            addTask
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