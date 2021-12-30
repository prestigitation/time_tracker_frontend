<template>
<div class="header_wrapper">
    <el-row>
        <el-col class="main_links" :span="16" :xs="6">
            <el-link class="grid-content" type="primary" href="/">
                {{ $t('header.index') }}
            </el-link>
        </el-col>
        <el-col class="user_links" :span="8" :xs="10" v-if="!user.login && !user.id">
            <el-link class="grid-content" type="success" href="/login">
                {{$t('auth.login')}}
            </el-link>
            <el-link class="grid-content" type="success" href="/register">
                {{$t('auth.register')}}
            </el-link>
        </el-col>
        <el-col class="user_links" v-if="user && user.login && user.id" :span="8" :xs="18">
            <!--<span @click.prevent="$emit('changeLocale', 'en'); $i18n.locale = 'en'"> {{ $i18n.locale }}</span> -->
            <el-select v-model="locale" class="select_container">
                <el-option v-for="locale in avaliable_locales" 
                :key="locale" 
                :value="locale" 
                :label="$t('label.' + locale)"
                >
                    {{ $t('label.' + locale) }}
                </el-option>
            </el-select>
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
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Locale, useI18n } from 'vue-i18n'
export default defineComponent({
    name: 'app-header',
    emits: [ 'changeLocale' ],
    setup(props, {emit}) {
        const store = useStore()
        const router = useRouter()
        const i18n = useI18n()
        const {t} = useI18n()
        
        const avaliable_locales: Array<Locale> = i18n.availableLocales
        const user = computed(() => store.getters.get_user)
        const current_locale = store.getters.get_locale
        const locale = ref<string>(t('label.' + current_locale))

        watch(
        () => { return locale.value}, 
        (current, previous) => {
            emit('changeLocale', current)
        })
        
        const logout = () => {
            store.dispatch('logout').then(() => router.push('/'))
        }
        return { user, logout, avaliable_locales, locale }
    }
})
</script>

<style lang="scss" scoped>
.select_container {
    width: 20%;
}
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