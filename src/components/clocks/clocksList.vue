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

        <!-- Список проектов -->
        <v-card v-if="false" class="rounded-lg">
            <v-table class="clock-list__table text-none" rounded="0" fixed-header density="compact">

                <!-- Поле заголовков -->
                <thead class="bg-white" color="">
                    <tr>
                        <th class="text-left" style="width: 20px">ID</th>
                        <th class="text-left">Проект</th>
                        <th class="text-left">Описание</th>
                        <th class="text-left">Дата создания</th>
                        <th class="text-left">Стоимость</th>
                        <th class="text-right"></th>
                    </tr>
                </thead>

                <!-- Тело таблицы -->
                <tbody class="bg-white">
                    <!-- Поля элементов таблицы -->
                    <tr 
                    class="pointer"
                    v-for="(item, index) in projectsList" 
                    :key="item.name"
                    @click="router.push({ name: 'selectClock', params: { id: item.id }})"  
                    >

                        <!-- поле: ID -->
                        <td @click="showClock(index)">{{ item.id }}</td>

                        <!-- поле: Название проекта -->
                        <td @click="showClock(index)">
                            <div class="d-flex align-center">
                                <v-avatar :image="item.cover ??
                                    'https://advour.ru/wp-content/uploads/c/d/c/cdcf919447b7312e113b2e8d09768bd2.png'
                                    "></v-avatar>
                                <div class="ml-4">
                                    <div class="font-weight-bold">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- поле: Описание -->
                        <td @click="showClock(index)">
                            {{ item.description }}
                        </td>

                        <!-- поле: Дата создания -->
                        <td @click="showClock(index)">
                            {{ new Date(item.created * 1000).toLocaleString() }}
                        </td>

                        <!-- поле: Стоимость -->
                        <td @click="showClock(index)">{{ item.price ?? 0 }}</td>

                        <!-- поле: Действия -->
                        <td class="text-right">
                            <div class="d-flex justify-end">
                                <v-btn icon="mdi-pen" size="small" elevation="0" flat=""
                                    @click="selectProject(item.id)"></v-btn>
                                <v-btn icon="mdi-delete" size="small" flat="" @click="deleteProject(item.id)"></v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <!-- Пагинация -->
            <v-card rounded="0" class="bg-white w-100 d-flex align-center">
                <v-pagination density="compact" v-model="page" :length="pageTotal.total" :total-visible="5"
                    @update:modelValue="updateDataUsers(page)"></v-pagination>
            </v-card>
        </v-card>
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
// const search = ref('');
// const itemsPerPage = ref(10);
// const pagination = reactive({ page: 1 });
const page = ref(1);
const pageTotal = ref({
    total: 10,
    page: 1,
    perPage: 10,
});

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
function updateDataUsers(page) {
    pageTotal.value.page = page;
}
function selectProject(id) {
    console.log(id);
}
function deleteProject(id) {
    console.log(id);
}
function showClock(index) {
    console.log(index);
}

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