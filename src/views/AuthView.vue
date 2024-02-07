<template>
    <!-- Отображение форм маршрута auth -->
    <v-main class="main-containter bg-background flex-row align-center justify-space-around">
        <!-- Лист с логотипом -->
        <img class="sheet-logo" src="@/assets/logo/logo.svg" alt="logo" />

        <!-- Лист для Форм Авторизации и Регистрации -->
        <v-sheet class="container-form bg-background d-flex align-center justify-center" elevation="2">
            <!-- router/auth.js -->
            <router-view></router-view>
        </v-sheet>
    </v-main>
</template>

<script setup>

</script>

<style scoped>
.main-containter {
    height: 100vh;
    display: flex;
}

.container-form {
    width: max-content;
    height: max-content;
    border-radius: 18px;
}

.sheet-logo {
    width: 50%;
}
</style>
