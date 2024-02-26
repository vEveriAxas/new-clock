<template>
    <!-- Контейнер для формы -->
    <v-card color="background" elevation="0" class="d-flex align-start">
        <error-message-comp 
        :show="isShowErrorMessage"
        :title="'Ошибка'"
        :text="'Не удалось сохранить данные нового проекта'"
        @close="isShowErrorMessage = false"
        ></error-message-comp>
        <v-window class="create-clock__wrapped" v-model="windowView">
            <!-- Форма создания общих сведений проекта -->
            <v-window-item class="wrapped__item" :value="'general'">
                <v-card  class="create-clock__general-form" rounded="lg">
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
                        <!-- Сохранить -->
                        <v-btn
                        class="buttons__save"
                        color="var(--text-primary)"  
                        :loading="isGeneralLoading"
                        @click="createNewProject"
                        >
                            Сохранить
                        </v-btn>
                        <!-- Переход к видео -->
                        <v-btn
                        v-if="route.name === 'changeClock'"
                        class="buttons__next" 
                        @click="windowView = 'input-file'"
                        color="var(--text-primary)" 
                        append-icon="mdi-arrow-right"
                        variant="outlined"
                        >Видео</v-btn>

                    </v-sheet>
                </v-card>
            </v-window-item>
    
            <v-window-item  class="wrapped__item" :value="'input-file'">
                
                <v-btn 
                class="input-files__button-back" 
                icon="mdi-arrow-left"
                @click="windowView = 'general'"
                ></v-btn>
                <!-- Блок для записи видеофайлов  -->
                <v-card class="create-clock__input-files" rounded="lg" v-show="true /* Тут был параметр id с маршрута */">
                    <!-- Верхняя часть -->
                    <v-card-title class="create-clock__title text-h5">Добавьте видео</v-card-title>

                    
                    <!-- =================  ПЕРВАЯ ЦИФРА  ========================== -->
                    <v-card-title class="position__subtite">Первая цифра</v-card-title>
                    <v-card-text class="pa-1 d-flex flex-wrap">
                        <div class="mr-2" v-for="(video, index) in projectData.firstPosition" :key="index">
                            <clockInput 
                            :videoID="`video-first-position-${index}`"
                            v-model="projectData.firstPosition[index]" 
                            :project-data="{id: +route.params.id, position: 'first', index}"
                            />
                        </div>
                    </v-card-text>
        
                    <!-- =================  ВТОРАЯ ЦИФРА  ========================== -->
                    <v-card-title class="position__subtite">Вторая цифра</v-card-title>
                    <v-card-text class="pa-1 d-flex flex-wrap">
                        <div class="mr-2" v-for="(video, index) in projectData.secondPosition" :key="index">
                            <clockInput 
                            :videoID="`video-second-position-${index}`"
                            v-model="projectData.secondPosition[index]" 
                            :project-data="{id: +route.params.id, position: 'second', index}"
                            />
                        </div>
                    </v-card-text>
        
        
                    <!-- =================  ТРЕТЯЯ ЦИФРА  ========================== -->
                    <v-card-title class="position__subtite">Третья цифра</v-card-title>
                    <v-card-text class="pa-1 d-flex flex-wrap">
                        <div class="mr-2" v-for="(video, index) in projectData.thirdPosition" :key="index">
                            <clockInput 
                            :videoID="`video-third-position-${index}`"
                            v-model="projectData.thirdPosition[index]" 
                            :project-data="{id: +route.params.id, position: 'third', index}"
                            />
                        </div>
                    </v-card-text>
        
                    <!-- =================  ЧЕТВЕРТАЯ ЦИФРА  ========================== -->
                    <v-card-title class="position__subtite">Четвертая цифра</v-card-title>
                    <v-card-text class="pa-1 d-flex flex-wrap">
                        <div class="mr-2" v-for="(video, index) in projectData.fourthPosition" :key="index">
                            <clockInput 
                            :videoID="`video-fourth-position-${index}`"
                            v-model="projectData.fourthPosition[index]" 
                            :project-data="{id: +route.params.id, position: 'fourth', index}"
                            />
                        </div>
                    </v-card-text>
        
                    <!-- Здесь был v-dialog для просмотра видеочасов -->
                    <v-btn block class="create-clock__confirm-btn" color="primary" @click="addedVideos">Добавить видео</v-btn>
                </v-card>
            </v-window-item>
        </v-window>

    </v-card>
</template>
  
<script setup>
import clockInput from './clockInput.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import useGeneralStore from '@/store/general';
import { 
    createProject, 
    getProjectByID,
    putVideoProjectByID,
} from '@/api/clocks';

const route = useRoute();
const generalStore = useGeneralStore();

const computedProjecID = computed(() => {
    if(route.params.id === undefined && !route.params.id) {
        return 1;
    }
    return 1
}) 

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

const windowView = ref('general');
const isGeneralLoading = ref(false);
const isShowErrorMessage = ref(false);
const newCreatedProjectID = ref(null);

// Получение данных текущего проекта
onMounted(async() => {
    if(route.params.id === undefined && !route.params.id) {
        return 1;
    }
    // Если этот компонент используется для редактирования проекта
    if(route.name === 'selectClock' || route.name === 'changeClock') {
        try {
            const project = await getProjectByID(+route.params.id); // преобразуем id со строки в число 
            projectData.value = project;
            console.log(projectData.value);
        } catch (err) {
            throw new Error(`components/clocksSelect:onMounted => ${err}`);
        }
    }
});

// Создание проекта
async function createNewProject() {
    try {
        // Поулучение новосозданного проекта для дальнейшего внесения в него видеофайлов
        isGeneralLoading.value = true;  // Загрузка
        const { name, description, isPublic, price } = projectData.value  // необходимые данные для первичного создания проекта
        const { project, user } = await createProject(name, description, price, isPublic);
        console.log('Пользователь который создал проект: ', user);
        projectData.value = {...project}
        newCreatedProjectID.value = project.id;
        console.log('projectData', projectData.value);
        windowView.value = 'input-file';
    } catch (err) {
        console.log(err);
        isShowErrorMessage.value = true;
        // throw new Error(`components/clocksSelect:createNewProject => ${err}`);
    } finally {
        isGeneralLoading.value = false;
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
                            putVideoProjectByID(computedProjecID, positionObject.videoFiles[index], positionObject.position, index)
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
                console.log(generalStore.compareObjects(projectData.value, response[response.length -1]));
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

.create-clock__wrapped {
    position: relative;
    width: 100%;
}
.wrapped__item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    /* border: 1px solid black; */
}
.create-clock__general-form {
    position: relative;
    width: 45%;
    padding: 2rem 4rem;
}
.create-clock__input-files {
    position: relative;
    width: 100%;
    padding: 1rem 3rem;
}
.input-files__button-back {
    margin: 10px;
    color: var(--text-primary);
    z-index: 100;
}
.create-clock__title {
    color: var(--color-descr)
}
.clock-select__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
}
.buttons__save {
    color: white;
    flex-grow: 2;

}
.buttons__next {
    display: flex;
    flex-grow: 1;
    margin: 0 0 0 1rem;
}
.create-clock__title {
    color: var(--text-descr);
}
.create-clock__subtitle {
    color: var(--text-descr);
}
.position__subtite {
    color: var(--text-descr);
    padding: 3rem 0 0 1rem;
}
.create-clock__confirm-btn {
    margin: 1rem;
}
</style>