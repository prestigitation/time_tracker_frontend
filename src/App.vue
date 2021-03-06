<template>
<div class="main">
  <div class="header">
    <app-header @changeLocale="changeLocale" />
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<script lang="ts">
import './assets/index.scss'

import  AppHeader from './components/AppHeader.vue'

import { defineComponent, computed, inject, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

axios.interceptors.request.use(async (config: any) => {
  const access_token = localStorage.getItem("access_token")
  config.headers.common['Authorization'] = `Bearer ${access_token}`
  config.headers.common['Locale'] = localStorage.getItem('locale') ?? 'en'
  return config
})

export default defineComponent({
  name: 'app',
  components: {
    AppHeader
  },
  setup() {
    const store = useStore()
    const i18n = useI18n()
    const router = useRouter()
    const axios: any = inject('axios')

    onBeforeMount(async () => {
      await router.isReady()
      const route = useRoute()
      axios.interceptors.response.use((config) => {
            return config
          },error => {
            if(error.response.status == 401 || (!localStorage.getItem("access_token") && route.path !== '/register')) {
              router.push('/login')
          }
          return Promise.reject(error)
      })
      
    })

    router.beforeEach((to, from, next) => {
      let locale = computed(() => store.getters.get_locale)
      if(locale.value && locale.value !== i18n.locale.value) {
        setLocale(locale.value)
      }
      return next()
    })
    
    const setLocale = (newLocale: string) => {
      i18n.locale.value = newLocale
    }
    const changeLocale = (locale: string) => {
      store.dispatch('change_locale', locale)
      setLocale(locale)
      localStorage.setItem('locale', locale)
    }
    return {
      changeLocale
    }
  }
})
</script>

<style lang="scss" scoped> 
.content {
  padding: 0 25px 0 25px;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

:root {
  --el-color-success: #42b883 !important;
}
</style>
