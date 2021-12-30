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
//TODO: i18n хотя бы 2 языка
//TODO: запись видео (опционально аудио)
import './assets/index.scss'
import { defineComponent, ref } from 'vue'
import  AppHeader from './components/AppHeader.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'app',
  components: {
    AppHeader
  },
  setup() {
    const store = useStore()
    const locale = ref('')
    const setLocale = (newLocale: string) => {
      locale.value = newLocale
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
