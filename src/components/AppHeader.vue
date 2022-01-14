<template>
<div class="header_wrapper">
    <el-row>
        <el-col class="main_links" :span="16" :xs="6">
            <el-link class="grid-content" type="success" href="/">
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
                <span class="welcome">{{$t('auth.welcome')}},</span> 
                <span>{{ user.login }}</span>
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
        (currentLocale, previousLocalee) => {
            emit('changeLocale', currentLocale)
        })
        
        const logout = () => {
            store.dispatch('logout').then(() => router.push('/'))
            localStorage.removeItem("access_token")
        }
        return { user, logout, avaliable_locales, locale }
    }
})
</script>

<style lang="scss" scoped>
.select_container {
    width: 35%;
}

%links {
    display: flex;
    align-items: center;
    &>a {
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
}

.main_links,
.user_links {
    @extend %links;
}

.main_links {
    justify-content: flex-start !important;
}
.user_links {
    justify-content: flex-end !important;
}

.header_wrapper {
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.welcome {
    @media (max-width: 768px) {
        display: none !important;
    }
}
</style>