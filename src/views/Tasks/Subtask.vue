<template>
<div>
    <el-form-item :label="$t('tasks.subtasks.header')" /> 
    <div class="subtask__wrapper">
        <div class="subtask__list">
            <task v-for="(sub, index) in subtasks" :key="index" 
                class="subtask__element"
                :subtask="true"
                @update:subtask_description="changeSubtaskValue('description', {
                    value: $event,
                    index
                })"
                @update:subtask_title="changeSubtaskValue('title', {
                    value: $event,
                    index
                })"
                @update:subtask_ended_at="changeSubtaskValue('ended_at', {
                    value: $event,
                    index
                })"
                @update:subtask_hours="changeSubtaskValue('hours', {
                    value: $event,
                    index
                })"
                @update:subtask_priority="changeSubtaskValue('priority', {
                    value: $event,
                    index
                })"
                @update:subtask_selected_tags="changeSubtaskValue('priority', {
                    value: $event,
                    index
                })"
            />
        </div>
        <div class="subtask__closed">
            <div class="subtask__button">
                <span class="subtask__button_text" @click.prevent="openNewSubtask">
                    + {{ $t('tasks.subtasks.create') }}
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ISubtaskEmit } from '../../types/task'
export default defineComponent({
    name: "subtask",
    emits: [
        'openNewSubtask',
        'update:subtask_description',
        'update:title',
        'update:subtask_title',
        'update:ended_at',
        'update:subtask_ended_at',
        'update:hours',
        'update:subtask_hours',
        'update:priority',
        'update:subtask_priority',
        'update:selected_tags',
        'update:subtask_selected_tags'
    ],
    props: {
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
        const changeSubtaskValue = (property: string, descriptionInfo: ISubtaskEmit) => {
            let result = {
                index: descriptionInfo.index,
                value: descriptionInfo.value
            }
            let subEmit: any = `update:subtask_${property}`
            emit(subEmit, result)
        }
        const openNewSubtask = () => {
            emit('openNewSubtask')
        };
        const changeSubtaskFiles = (e: any, b: any) => {
            
            
        }

        return {
            openNewSubtask,
            changeSubtaskValue,
            changeSubtaskFiles
        };
    },
})
</script>

<style lang="scss" scoped>
.subtask {
    &__wrapper {
        padding: 20px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: inherit;
    }
    &__button {
        background: #293942;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 15px;
        padding-left: 15px;
        &_text {
            color: white;
        }
    }
    &__element {
        border-bottom: 5px dashed #41B883;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }
}
</style>