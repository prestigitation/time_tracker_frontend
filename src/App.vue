<template>
<div class="main">
  <div class="header">
    <app-header />
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import  AppHeader from './components/AppHeader.vue'
export default defineComponent({
  name: 'app',
  components: {
    AppHeader
  },
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
</style>

<style>
:root {
  --el-color-success: #42b883;
}
</style>
