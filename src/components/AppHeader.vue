<template>
<div class="header_wrapper">
    <el-row>
        <el-col class="main_links" :span="16" :xs="6">
            <el-link class="grid-content" type="primary" href="/">
                {{ $t('header.index') }}
            </el-link>
        </el-col>
        <el-col :span="8" :xs="10" v-if="!user || user === {}">
            <el-link class="grid-content" type="success" href="/login">
                {{$t('auth.login')}}
            </el-link>
            <el-link class="grid-content" type="success" href="/register">
                {{$t('auth.register')}}
            </el-link>
        </el-col>
        <el-col class="user_links" v-if="user && user.login && user.id" :span="8" :xs="18">
            <span @click.prevent="$emit('changeLocale', 'en'); $i18n.locale = 'en'"> {{ $i18n.locale }}</span>
            <el-link class="grid-content" type="primary" :href="`/users/${user.id}`">
                {{$t('auth.welcome')}}, {{ user.login }}
            </el-link>
            <el-link class="grid-content" type="warning" @click.prevent="logout">
                {{$t('auth.logout')}}
            </el-link>
        </el-col>
    </el-row>
</div>
</template>

<script lang="ts">
//TODO: change lang
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'app-header',
    emits: [ 'changeLocale' ],
    setup() {
        const store = useStore()
        const router = useRouter()
        
        let user = computed(() => store.getters.get_user)
        
        const logout = () => {
            store.dispatch('logout').then(() => router.push('/'))
        }
        return { user, logout }
    }
})
</script>

<style lang="scss" scoped>
.main_links {
    display: flex;
    justify-content: flex-start !important;
    &>a {
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
}
.user_links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &>a {
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
}
.header_wrapper {
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
}
</style>