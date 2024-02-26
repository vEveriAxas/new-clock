<template>
    <!-- Компонент отображает список проектов (Часов) -->
    <v-card class="clocks-list__container">
        <!-- Блок перефирии для взаимодействия с проектами  -->
        <v-card class="clock-list__buttons" elevation="0">
            <v-card-title class="clock-list__title">Ваши проекты</v-card-title>
            <!-- +СОЗДАТЬ -->
            <v-btn 
            class="clock-list__add" 
            prepend-icon="mdi-plus" 
            color="#0ea5e9" 
            @click="router.push({ name: 'createClock' })"
            >
                Создать
            </v-btn>
        </v-card>

        <!-- Список Проектов -->
        <v-row class="clock-list">
            <v-col 
            v-for="(item, index) in projectsList" 
            cols="3"
            :key="index"> 
                <clockItemComp :clockData="item"/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import clockItemComp from '../generals/clockItemComp.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserProjects } from '@/api/clocks';
import useUsersStore from '@/store/users';


const router = useRouter();
const usersStore = useUsersStore();

const projectsList = ref([]);

// Получаем список проектов конкретного пользователя 
onMounted(async() => {
    try {
        // Получаем пользователя
        const currentUser = await usersStore.getUserAndCache();
        projectsList.value = [...await getUserProjects(currentUser.id, true, true, 1)];
    } catch (err) {
        throw new Error(`components/clocksList:onMounted =>  ${err}`,);
    }
});


// function searchProjects(value) {
//     search.value = value;
// }
// function updatePagination(pagination) {
//     pagination.page = pagination;
// }

</script>

<style scoped>
.clocks-list__container {
    position: relative;
    max-height: 100%;
    box-shadow: none !important;
    overflow-y: auto;
    border-bottom: 1px solid rgba(126, 126, 126, 0.2);
    background-color: rgba(0,0,0,0) !important;
    border-radius: 0 !important;
}
.clock-list__buttons {
    position: sticky;
    top: 0;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    padding: 0.5rem !important;
    background-color: rgba(255, 255, 255, .8) !important;
    backdrop-filter: blur(16px);
    box-shadow: none !important;
    font-family: "Nunito Sans", sans-serif;
    border-bottom: 1px solid rgba(126, 126, 126, 0.2);
    z-index: 100;
}
.clock-list {
    padding: 10px;
    /* max-height: 75vh !important; */
}
.clock-list__title {
    margin: 0 auto 0 15px !important;
}
.clock-list__add {
    margin-right: 15px;
}
.clock-list__table {
    max-height: 75vh !important;
}
</style>