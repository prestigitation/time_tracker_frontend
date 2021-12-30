<template>
<el-row justify="center" class="auth_page">
    <el-col :span="8" :xs="12">
        <el-form class="user_form">
            <el-form-item label="Введите ваш E-Mail" /> 
            <el-input v-model="email" />
            <el-form-item label="Введите пароль" /> 
            <el-input v-model="password" />
            <small class="error_message_small" v-if="error_message">Ошибка: {{ error_message }}</small>
            <el-button type="success" class="auth_page_button" @click.prevent="login">Войти</el-button>
        </el-form>
    </el-col>
</el-row>
</template>
<script lang="ts">
import { defineComponent, inject, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { AxiosError, AxiosResponse } from 'axios'
export default defineComponent({
    name: 'login',
    setup() {
        const axios: any = inject('axios')
        const store = useStore()
        const router = useRouter()
        
        onBeforeMount(() => {
            if(store.getters.get_user.login && store.getters.get_user.login) {
                router.push('/')
            }
        })

        let email = ref('')
        let password = ref('')
        let error_message = ref('')
        
        let login =  async () : Promise<any> => {
            let formData = new FormData()
            formData.append('password', password.value)
            formData.append('email', email.value)
            axios.post('auth/login', formData).then((response: AxiosResponse) => {
                    store.dispatch('auth', {
                        id: response.data.id,
                        login: response.data.login
                    })
                    router.push('/')
            }).catch((error: AxiosError) => {
                error_message.value = error?.response?.data?.message
            })
        }
        return {login, email, password, error_message}
    }
})
</script>
