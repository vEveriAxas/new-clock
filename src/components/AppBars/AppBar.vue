<template>
    <v-main>
        <v-app-bar class="bg-background" :elevation="0" max-height="60">
            <div class="d-flex align-center justify-space-between w-100">
                <div class="d-flex align-center">
                    <span class="text-h5 text-primary fw-700 ml-2">
                        <img src="@/assets/logo/logo.svg" width="200" alt="" />
                    </span>
                </div>
                <div class="d-flex align-center">
                    <!-- <div class="">
                        <v-avatar
                            :image="'../../assets/base/empty-user.svg'"
                            
                            style="cursor: pointer;"
                            ></v-avatar>
                            
                        </div> -->
                    <img 
                    class="app-bar__avatar" 
                    src="../../assets/base/empty-user.svg" 
                    alt="user-avatar"
                    @click="goToProfileInfo"
                    style="cursor: pointer;"
                    >
                    <!-- <span class="ml-2 mr-4">{{ (store.user.fullName)? '' }}</span> -->
                    <v-btn rounded="0" icon="mdi-logout" class="mr-5" color="text" @click="logoutApp"></v-btn>
                </div>
            </div>
        </v-app-bar>
    </v-main>
</template>

<script setup>
import useAuthStore from '@/store/auth';
import { useRouter } from 'vue-router';
const store = useAuthStore();
const router = useRouter();

// Переход на страницу пользователя
function goToProfileInfo() {
    router.push({name: 'profile'});
} 

// Выход из аккаунта
function logoutApp() {
    store.deleteAccessToken();
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    // window.location.reload();
    router.push({name: 'auth'});
}
</script>

<style scoped>
.app-bar__avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
</style>
