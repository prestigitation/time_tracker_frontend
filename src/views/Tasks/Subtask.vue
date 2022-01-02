<template>
<div class="subtask__wrapper">
<div class="subtask__closed">
    <div class="subtask__button">
        <span class="subtask__button_text" @click.prevent="openNewSubtask">
            + {{ $t('tasks.subtasks.create') }}
        </span>
    </div>
</div>
<div class="subtask__list">
    <task v-for="(subtask, index) in subtasks" :key="index" />
        <!--<Task></Task> -->

</div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ISubtask } from '../../types/subtask'
export default defineComponent({
    name: "subtask",
    setup() {
        const subtasks = reactive<ISubtask[]>([]);
        const openNewSubtask = () => {
            subtasks.push({
                title: "",
                description: ""
            });
        };
        return {
            subtasks,
            openNewSubtask
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
        align-items: center;
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
}
</style>