<template>
<div>
    <el-form-item :label="$t('tasks.subtasks.header')" /> 
    <div class="subtask__wrapper">
        <div class="subtask__list">
            <!-- Главное отличие подзадачи от обычной заключается в том, что это рекурсивный компонент, 
            который может содержать множество подзадач. 
            Задачей этого компонента является отрисовка и обработка списка подзадач, а также маппинг индексов 
            подзадач для использования в родительском компоненте  -->
          <!-- <task v-for="(sub, index) in subtasks" :key="index" 
                class="subtask__element"
                :subtask="true"
                @update:subtask_description="changeSubtaskDescription({
                    index,
                    value: $event
                })"
                v-bind="$attrs"
            /> -->
            <task v-for="(sub, index) in subtasks" :key="index" 
                class="subtask__element"
                :subtask="true"
                @update:subtask_description="changeSubtaskValue('description', {
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
import { defineComponent, reactive } from "vue";
import { ISubtaskEmit } from '../../types/task'
export default defineComponent({
    name: "subtask",
    emits: [
        'openNewSubtask',
        'update:subtask_description'
    ],
    props: {
        subtasks: {
            type: Array,
            default: []
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

        return {
            openNewSubtask,
            changeSubtaskValue
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