<template>
<el-row justify="center" class="auth_page">
    <el-col :span="8" :xs="12">
        <el-form class="user_form">
            <el-form-item label="Придумайте ник" /> 
            <el-input v-model="login" />
            <el-form-item label="Введите ваш E-Mail" /> 
            <el-input v-model="email" />
            <el-form-item label="Введите пароль" /> 
            <el-input v-model="password" />
            <small class="error_message_small" v-if="error_message">Ошибка: {{error_message}}</small>
            <el-button type="success" class="auth_page_button" @click.prevent="register">Войти</el-button>
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
    name: 'register',
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
        let login = ref('')
        let error_message = ref('')
        
        let register =  async () : Promise<any> => {
            let formData = new FormData()
            formData.append('login', login.value)
            formData.append('password', password.value)
            formData.append('email', email.value)
            axios.post('auth/register', formData).then((response: AxiosResponse) => {
                store.dispatch('auth', {
                    id: response.data.id,
                    login: response.data.login
                })
                router.push('/')
            }).catch((error: AxiosError) => {
                error_message.value = error.message
            })
        }
        return {register, error_message, email, login, password}
    }
})
</script>
