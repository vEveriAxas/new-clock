<template>
    <!-- Контейнер для формы -->
    <v-card color="background" elevation="0" class="d-flex align-start">

        <!-- Форма создания общих сведений проекта -->
        <v-card class="pa-4 w-50" rounded="lg">

            <!-- Заголовок Формы -->
            <v-card-title class="create-clock__title pl-0">Основная информация</v-card-title>

            <!-- Подзаголовок "Имя проекта" -->
            <v-card-subtitle class="create-clock__subtitle text-subtitle-2">Имя проекта</v-card-subtitle>
            <v-text-field 
            class="mt-1" 
            color="var(--text-primary)" 
            variant="outlined" 
            v-model="projectData.name"
            ></v-text-field>

            <!-- Подзаголовок "Описание проекта" -->
            <v-card-subtitle class="create-clock__subtitle text-subtitle-2">Описание проекта</v-card-subtitle>
            <v-textarea 
            rows="1" 
            color="var(--text-primary)" 
            variant="outlined" 
            auto-grow="" 
            class="mt-1"
            v-model="projectData.description"
            ></v-textarea>

            <!-- Подзаголовок "Дата создания проекта" -->
            <v-card-subtitle class="create-clock__subtitle text-subtitle-2">Стоимость проекта</v-card-subtitle>
            <v-text-field 
            class="mt-1" 
            color="var(--text-primary)" 
            variant="outlined" 
            v-model="projectData.price"
            ></v-text-field>

            <!-- Кнопки ("Просмотр часов" / "Сохранить") -->
            <v-sheet class="clock-select__buttons">
                <v-btn color="primary" block @click="createNewProject">Сохранить</v-btn>
            </v-sheet>
        </v-card>

        <!-- Блок для записи видеоматериалов  -->
        <v-card class="pa-4 w-50 ml-5" rounded="lg" v-show="true /* Тут был параметр id с маршрута */">
            <v-card-title class="pl-0">Видеозаписи</v-card-title>


            <!-- =================  ПЕРВАЯ ЦИФРА  ========================== -->
            <v-card-title>Первая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(video, index) in projectData.firstPosition" :key="index">
                    {{ (video === null)? 'null' : '' }}
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
                    {{ (video === null)? 'null' : '' }}
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
                    {{ (video === null)? 'null' : '' }}
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
                    {{ (video === null)? 'null' : '' }}
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { 
    createProject, 
    putVideoProjectByID,
} from '@/api/clocks';

const route = useRoute();

// const clockDialog = ref(false);
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


// // Получение данных текущего проекта
// onMounted(async() => {
//     try {
//         const project = await getProjectByID(+route.params.id); // преобразуем id со строки в число 
//         projectData.value = project;
//         console.log(projectData.value);
//     } catch (err) {
//         throw new Error(`components/clocksSelect:onMounted => ${err}`);
//     }
// });

// Создание проекта
async function createNewProject() {
    console.log('createNewProject');
    try {
        // Поулучение новосозданного проекта для дальнейшего внесения в него видеофайлов
        const { name, description, isPublic, price } = projectData.value  // необходимые данные для первичного создания проекта
        const { project, user } = await createProject(name, description, price, isPublic);
        console.log('Пользователь который создал проект: ', user);
        projectData.value = {...project}
        console.log('projectData', projectData.value);
    } catch (err) {
        console.log(err);
        throw new Error(`components/clocksSelect:createNewProject => ${err}`);
    }
}

// Редактирование проекта
// async function editProject() {
//     try {
//         // Получение полей для редактирования проекта
//         const { name, description, isPublic, price } = projectData.value;
//         await editProjectByID(+route.params.id, name, description, price, isPublic);
//     } catch (err) {
//         throw new Error(`components/clocksSelect:editProject => ${err}`);
//     }
// }

// Заполнение проекта данными (Видеофайлами)
function addedVideos() {
    try {
        // Объединяем все массивы с файлами в один массив для выполнения Promise.all позже
        const generalPositionArray = [
            { videoFiles: [...projectData.value.firstPosition], position: 'first' },
            { videoFiles: [...projectData.value.secondPosition], position: 'second' },
            { videoFiles: [...projectData.value.thirdPosition], position: 'third' },
            { videoFiles: [...projectData.value.fourthPosition], position: 'fourth' },
        ];
        const promiseArray = [];  // В этот массив заполняются промисы выполняющие загрузку файлов на сервер. Используется как аргумент для Promise.all
        // Проходим по объектам содержащим информацию о каждой позиции часов
        generalPositionArray.forEach((positionObject) => {
            // Выполняется обход в цикле каждого файла в массиве одной из четырех позиций
            positionObject.videoFiles.forEach(async(file, index) => {
                if (typeof file === 'object' && file !== null) {  // Если файла не существует либо если он в виде строки URL то не выполняем блок
                    // Создается новый промис, который выполняет загрузку файла на сервер и записывается в массив Promise.all
                    const fetchVideoURLPromise = new Promise((resolve, reject) => {
                        try {
                            putVideoProjectByID(+route.params.id, positionObject.videoFiles[index], positionObject.position, index)
                                .then((response) => {
                                    // Выходит измененный объект проекта 
                                    resolve(response);
                                });
                        } catch (err) {
                            // Обработка ошибок
                            reject(new Error(`components/clocksSelect:addedVideos [forEach..] => ${err}`));
                        }
                    });
                    // Добавление промиса в массив Promise.all
                    promiseArray.push(fetchVideoURLPromise);
                } else {
                    console.log('Файл заполнен');
                }
            });
        });
        // Указывается аргументом массив промисов которые добавлены в цикле для ожидания окончания общей загрузки файлов на сервер
        Promise.all(promiseArray)
            .then((response) => {
                console.log('Все промисы получения видеофайлов выполнены', response);
            });
    } catch (err) {
        throw new Error(`components/clocksSelect:addedVideos => ${err}`);
    }
    // First position
    try {
        projectData.value.firstPosition.forEach((firstVideo, index) => {
            // Если videoFile существует и типа object (Конструктор File) и если не равен null
            if (typeof firstVideo === 'object' && firstVideo !== null) {
                putVideoProjectByID(+route.params.id, projectData.value.firstPosition[index], "first", index);
                console.log('await_block');
            }
        });
    } catch (err) {
        throw new Error(`components/clocksSelect:addedVideos > ['firstPosition'] => ${err}`);
    }

    // // First position
    // try {
    //     projectData.value.firstPosition.forEach(async(firstVideo, index) => {
    //         // Если videoFile существует и типа object (Конструктор File) и если не равен null
    //         if (typeof firstVideo === 'object' && firstVideo !== null) {
    //             await putVideoProjectByID(+route.params.id, firstVideo, "first", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['secondPosition'] => ${err}`); 
    // }

    // // Second position
    // try {
    //     projectData.value.secondPosition.forEach(async(secondVideo, index) => {
    //         // Если videoFile существует и типа object (Конструктор File) и если не равен null
    //         if (typeof secondVideo === 'object' && secondVideo !== null) {
    //             await putVideoProjectByID(+route.params.id, secondVideo, "second", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['secondPosition'] => ${err}`);

    // }

    // // Third position
    // try {
    //     projectData.value.thirdPosition.forEach(async(thirdVideo, index) => {
    //         // Если videoFile существует и типа object (Конструктор File) и если не равен null
    //         if (typeof thirdVideo === 'object' && thirdVideo !== null) {
    //             await putVideoProjectByID(+route.params.id, thirdVideo, "third", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['thirdPosition'] => ${err}`);
    // }
    
    // // Fourth position
    // try {
    //     projectData.value.fourthPosition.forEach(async(fourthVideo, index) => {
    //         // Если videoFile существует и типа object (Конструктор File) и если не равен null
    //         if (typeof fourthVideo === 'object' && fourthVideo !== null) {
    //             await putVideoProjectByID(+route.params.id, fourthVideo, "fourth", index);
    //         }
    //     });
    // } catch (err) {
    //     throw new Error(`components/clocksSelect:addedVideos > ['fourthPosition'] => ${err}`);
    // }
}
// function showClock() {
//     clockDialog.value = true;
//     console.log(projectData.value);
// }
</script>

<style scoped>
.clock-select__buttons {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
.create-clock__title {
    color: var(--text-descr);

}
.create-clock__subtitle {
    color: var(--text-descr);
}
</style>