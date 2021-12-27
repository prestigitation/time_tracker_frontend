<template>
<div class="header_wrapper">
    <el-row>
        <el-col class="main_links" :span="16">
            <el-link class="grid-content" type="primary" href="/">
                Главная
            </el-link>
        </el-col>
        <el-col :span="4">
            <el-link class="grid-content" type="success" href="/login">
                Войти
            </el-link>
        </el-col>
        <el-col :span="4">
            <el-link class="grid-content" type="success" href="/register">
                Регистрация
            </el-link>
        </el-col>
    </el-row>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'app-header'
})
</script>

<style lang="scss" scoped>
.main_links {
    display: flex;
    justify-content: flex-start !important;
}
</style>