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
//TODO: запись видео (опционально аудио)
import './assets/index.scss'
import { defineComponent, computed } from 'vue'
import  AppHeader from './components/AppHeader.vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'app',
  components: {
    AppHeader
  },
  setup() {
    const store = useStore()
    const i18n = useI18n()
    const router = useRouter()
    console.log(i18n)

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
