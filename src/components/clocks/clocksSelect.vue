<template>
    <!-- Контейнер для формы -->
    <v-card color="background" elevation="0" class="d-flex align-start">

        <!-- Форма просмотра выбранных часов -->
        <v-card class="pa-4 w-50" rounded="lg">

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
                <v-btn color="primary" width="45%" @click="editProject">Сохранить</v-btn>
            </v-sheet>
        </v-card>

        <!-- Блок для записи видеоматериалов  -->
        <v-card class="pa-4 w-50 ml-5" rounded="lg" v-show="true /* Тут был параметр id с маршрута */">
            <v-card-title class="pl-0">Видеозаписи</v-card-title>


            <!-- =================  ПЕРВАЯ ЦИФРА  ========================== -->
            <v-card-title>Первая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(video, index) in projectData.firstPosition" :key="index">
                    <clockInput 
                    :videoID="`video-first-position-${index}`"
                    v-model="projectData.firstPosition[index]" 
                    />
                </div>
            </v-card-text>

            <!-- =================  ВТОРАЯ ЦИФРА  ========================== -->
            <v-card-title>Вторая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(video, index) in projectData.secondPosition" :key="index">
                    <clockInput 
                    :videoID="`video-second-position-${index}`"
                    v-model="projectData.secondPosition[index]" 
                    />
                </div>
            </v-card-text>


            <!-- =================  ТРЕТЯЯ ЦИФРА  ========================== -->
            <v-card-title>Третья цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(video, index) in projectData.thirdPosition" :key="index">
                    <clockInput 
                    :videoID="`video-third-position-${index}`"
                    v-model="projectData.thirdPosition[index]" 
                    />
                </div>
            </v-card-text>

            <!-- =================  ЧЕТВЕРТАЯ ЦИФРА  ========================== -->
            <v-card-title>Четвертая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(video, index) in projectData.fourthPosition" :key="index">
                    <clockInput 
                    :videoID="`video-fourth-position-${index}`"
                    v-model="projectData.fourthPosition[index]" 
                    />
                </div>
            </v-card-text>

            <!-- Здесь был v-dialog для просмотра видеочасов -->
            <v-btn block class="text-none" color="primary" @click="addedVideos">Добавить видео</v-btn>
        </v-card>
    </v-card>
</template>
  
<script setup>
import clockInput from './clockInput.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
    editProjectByID, 
    getProjectByID,
    putVideoProjectByID,
} from '@/api/clocks';

const route = useRoute();

const clockDialog = ref(false);
const projectData = ref({
    name: null,
    description: null,
    price: null,
    isPublic: true,
    firstPosition: [null, null, null],
    secondPosition: [null, null, null, null, null, null, null, null, null, null],
    thirdPosition: [null, null, null, null, null, null],
    fourthPosition: [null, null, null, null, null, null, null, null, null, null],
});


// Получение данных текущего проекта
onMounted(async() => {
    try {
        const project = await getProjectByID(+route.params.id); // преобразуем id со строки в число 
        projectData.value = project;
        console.log(projectData.value);
    } catch (err) {
        throw new Error(`components/clocksSelect:onMounted => ${err}`);
    }
});

// Создание проекта
// async function createNewProject() {
//     console.log('createNewProject');
//     try {
//         // Поулучение новосозданного проекта для дальнейшего внесения в него видеофайлов
//         const { name, description, isPublic, price } = projectData.value  // необходимые данные для первичного создания проекта
//         const { project, user } = await createProject(name, description, price, isPublic);
//         console.log('Пользователь который создал проект: ', user);
//         projectData.value = {...project}
//         console.log('projectData', projectData.value);
//     } catch (err) {
//         console.log(err);
//         throw new Error(`components/clocksSelect:createNewProject => ${err}`);
//     }
// }

// Редактирование проекта
async function editProject() {
    try {
        // Получение полей для редактирования проекта
        const { name, description, isPublic, price } = projectData.value;
        await editProjectByID(+route.params.id, name, description, price, isPublic);
    } catch (err) {
        throw new Error(`components/clocksSelect:editProject => ${err}`);
    }
}

// Заполнение проекта данными
function addedVideos() {
    
    // First position
    try {
        putVideoProjectByID(+route.params.id, projectData.value.firstPosition[0], "first", 0);
        // projectData.value.firstPosition.forEach((videoFile, index) => {
        //     if (videoFile) {
        //         console.log('await_block');
        //     }
        // });
    } catch (err) {
        throw new Error(`components/clocksSelect:addedVideos > ['firstPosition'] => ${err}`);
    }

    // // Second position
    // try {
    //     projectData.value.secondPosition.forEach(async(videoFile, index) => {
    //         if (videoFile) {
    //             await putVideoProjectByID(+route.params.id, videoFile, "second", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['secondPosition'] => ${err}`);

    // }

    // // Third position
    // try {
    //     projectData.value.thirdPosition.forEach(async(videoFile, index) => {
    //         if (videoFile) {
    //             await putVideoProjectByID(+route.params.id, videoFile, "third", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['thirdPosition'] => ${err}`);
    // }
    
    // // Fourth position
    // try {
    //     projectData.value.fourthPosition.forEach(async(videoFile, index) => {
    //         if (videoFile) {
    //             await putVideoProjectByID(+route.params.id, videoFile, "fourth", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['fourthPosition'] => ${err}`);
    // }
}
function showClock() {
    clockDialog.value = true;
    console.log(projectData.value);
}
</script>

<style scoped>
.clock-select__buttons {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
}
</style>