<template>
    <!-- Контейнер для формы -->
    <v-card color="background" elevation="0" class="d-flex align-start">
        
        <!-- Форма просмотра выбранных часов -->
        <v-card class="pa-4 w-50">

            <!-- Заголовок Формы -->
            <v-card-title class="pl-0">Основная информация</v-card-title>

            <!-- Подзаголовок "Имя проекта" -->
            <v-card-text class="pa-1">
                <div>Имя проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.name"></v-text-field>
            </v-card-text>

            <!-- Подзаголовок "Описание проекта" -->
            <v-card-text class="pa-1">
                <div>Описание проекта</div>
                <v-textarea rows="1" auto-grow="" class="mt-1" variant="solo"
                    v-model="projectData.description"></v-textarea>
            </v-card-text>
            
            <!-- Подзаголовок "Дата создания проекта" -->
            <v-card-text class="pa-1">
                <div>Стоимость проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.price"></v-text-field>
            </v-card-text>
            
            <!-- Кнопки ("Просмотр часов" / "Сохранить") -->
            <v-sheet class="clock-select__buttons">
                <v-btn color="primary" class="mr-2 text-none" width="45%" @click="showClock">Просмотр часов</v-btn>
                <v-btn color="primary" width="45%" @click="createNewProject">Сохранить</v-btn>
            </v-sheet>
        </v-card>

        <!-- Блок для  -->
        <v-card class="pa-4 w-50 ml-5" v-show="true /* Тут был параметр id с маршрута */">
            <v-card-title class="pl-0">Видеозаписи</v-card-title>
            <v-card-title>Первая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(first, index) in projectData.first_position" :key="index">
                    <clockInput v-model="projectData.first_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Вторая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.second_position" :key="index">
                    <clockInput v-model="projectData.second_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Третья цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.third_position" :key="index">
                    <clockInput v-model="projectData.third_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Четвертая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.fourth_position" :key="index">
                    <clockInput v-model="projectData.fourth_position[index]" />
                </div>
            </v-card-text>

            <!-- Здесь был v-dialog -->
            <v-btn block class="text-none" color="primary" @click="addedVideos">Добавить видео</v-btn>
        </v-card>
    </v-card>
</template>
  
<script setup>
import clockInput from './clockInput.vue';
import { ref, onBeforeMount } from 'vue';

onBeforeMount(() => {
    
});


const clockDialog = ref(false);
const projectData = ref({
    name: null,
    description: null,
    price: null,
    is_public: false,
    first_position: [null, null, null],
    second_position: [null, null, null, null, null, null, null, null, null, null],
    third_position: [null, null, null, null, null, null],
    fourth_position: [null, null, null, null, null, null, null, null, null, null],
});

function createNewProject() {
    console.log('createNewProject');
}
function addedVideos() {
    console.log('addedVideos');
}
function showClock() {
    clockDialog.value = true;
}
</script>

<style scoped>
.clock-select__buttons {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
}
</style>