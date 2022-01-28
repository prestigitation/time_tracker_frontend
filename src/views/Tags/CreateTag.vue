<template>
<el-row justify="center">
    <el-col :span="8" :xs="20">
        <el-form>
            <input class="tag__form-input" v-model="text" :placeholder="$t('tasks.tags.text.title')">
            <el-form-item  :label="$t('tasks.tags.bg_color.title')" />  
            <el-color-picker v-model="background_color" />
            <el-form-item  :label="$t('tasks.tags.final_tag.title')" /> 
            <div class="tag__form-tag_block">
                <el-tag effect="dark" :color="background_color" v-if="text">{{ text }}</el-tag>
            </div>
            <div>
                <el-button type="success" @click.prevent="createTag">{{ $t('tasks.tags.create.title')}}</el-button>
            </div>
        </el-form>
    </el-col>
</el-row>
</template>
<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
        const axios: any = inject('axios')
        const {t} = useI18n()
        const router = useRouter()

        const text = ref('')
        const background_color = ref('')

        const createTag = async() => {
            let formData = new FormData()
            formData.append('title', text.value)
            formData.append('color', background_color.value)
            await axios.post('/tag', formData).then(() => {
                ElNotification({
                    title: t('tasks.tags.create.title'),
                    message: t('tasks.tags.create.success'),
                    type: 'success',
                })
                router.push('/')
            }).catch(() => {
                ElNotification({
                    title: t('tasks.tags.create.title'),
                    message: t('tasks.tags.create.fail'),
                    type: 'error',
                })
            })
        }
        return {
            background_color,
            text,

            createTag
        }
    }
})
</script>

<style lang="scss" scoped> 
.tag {
    &__form {
        &-input {
            width: -moz-available;
            padding: 10px;
        }
        &-tag_block {
            margin: 10px 0 10px 0;
        }
    }
}
</style>