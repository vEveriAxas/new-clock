<template>
    <div style="
    height: 100%;
    width: 100%;
    border-top: var(--border);
    border-bottom: var(--border);
    ">
        <v-card elevation="0" color="background" class="d-flex justify-center">
            <v-card style="margin-top: 8px;" color="background" elevation="0" class="w-50">
                
                <!-- ProfileCard -->
                <profileCardComp v-if="userData" :data="userData"/>

                <!-- Вкладки для выбора Фото -->
                <v-card class="profile-info__body" rounded="lg">
                    <v-tabs color="primary" density="compact" v-model="tab">
                        <v-tab class="tab" :value="1">Фото</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    <v-window v-model="tab">
                        <v-window-item :value="1" class="pa-2">
                            <profileImages />
                        </v-window-item>
                    </v-window>
                </v-card>

                <!-- ??? Компонент для добавления новости на свою страницу ??? -->
                <whatIsNewComp />
            </v-card>
            <v-card elevation="0" color="background" class="w-20">
                <!-- ??? Компонент для показа уведомлений ???  -->
                <logsProfileComp />
                <!-- ??? Компонент для отображения членов семьи ??? -->
                <familyCardComp />
            </v-card>
        </v-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import profileCardComp from "../general/profileCardComp.vue";
import profileImages from "./ProfileImagesDir/profileImages.vue";
import whatIsNewComp from "./WhatIsNewDir/whatIsNewComp.vue";
import logsProfileComp from "./LogsProfileDir/logsProfileComp.vue";
import familyCardComp from "./FamilyCardDir/familyCardComp.vue";
import useUsersStore from '@/store/users';

const userStore = useUsersStore();

const userData = ref({
    email: null,
    tel: null,
    fullName: null,
    id: null,
    created: null,
    lastActivity: null,
    isSuperuser: null,
});
onMounted(async() => {
    // Получение пользователя их БД или из localStorage
    userData.value = await userStore.getUserAndCache();
});
const tab = ref(null);
</script>

<style scoped>
.profile-info__body {
    margin-top: 10px; 
    /* border: 1px solid black; */
    box-shadow: var(--shadow) !important;
    padding: 0 16px;
    background-color: white;
}
.profile-info__card {
    border-radius: 10px;
    overflow: hidden;
    /* box-shadow: var(--shadow); */
}
.tab {
    font-family: "Nunito Sans", sans-serif !important;
    font-size: 12px !important;
}
</style>