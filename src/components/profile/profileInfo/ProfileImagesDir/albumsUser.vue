<template>
    <!-- Используется в диалоговом окне для отображения всех файлов и фотографий пользователя -->
    <v-card class="albums-user__container" elevation="0" height="95vw" color="white">

        <!-- Титульная часть блока -->
        <v-card class="d-flex justify-space-between align-center" color="white" elevation="0">
            <!-- Заголовок блока -->
            <v-card-item class="pa-0 w-25">
                <v-card-title class="pa-4 text-h5">Фото пользователя </v-card-title>
            </v-card-item>
            <!-- Кнопка ЗАКРЫТЬ -->
            <v-card-item class="pa-5 w-75 d-flex justify-end align-center">
                <v-btn icon="mdi-close" size="" flat="true" elevation="0" @click="closeDialog"></v-btn>
            </v-card-item>
        </v-card>

        <!-- Блок АЛЬБОМЫ -->
        <v-card color="white" elevation="0" class="pa-4">

            <!-- Заголовок "Альбомы" -->
            <v-card-title>Альбомы</v-card-title>

            <!-- Контейнер для отрисовки альбомов -->
            <v-sheet color="white" class="pa-4 pt-0 d-flex flex-wrap" style="border: 1px solid rgba(0, 0, 0, 0);">

                <!-- Единица сущности "Альбом" -->
                <v-card
                class="mr-2 mt-2"
                max-width="248" 
                max-height="168"
                v-for="(album, index) in albumsArr"
                @click="routerAlbum(album.id)"
                :key="index"
                >
                    <!--  @click="openAlbum(album)" -->
                    <!-- Верхняя часть элемента Альбом -->
                    <v-sheet class="d-flex pa-2 pb-0">
                        <!-- Головная картинка альбома -->
                        <v-img class="rounded-lg" :src="album.cover ??
                            'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
                            " height="100px" width="232" cover>
                            <div class="d-flex justify-end pa-2" v-if="album.is_private">
                                <v-btn icon="mdi-lock" size="x-small"></v-btn>
                            </div>
                        </v-img>
                    </v-sheet>

                    <!-- Нижняя часть элемента Альбом -->
                    <v-sheet class="d-flex justify-space-between">

                        <v-sheet>
                            <!-- Название альбома -->
                            <v-card-title class="pa-2 pt-0 pb-0 text-subtitle-1" v>
                                {{ album.name }}
                            </v-card-title>
                            <!-- Дата создания/Редактирования альбома -->
                            <v-card-subtitle class="pa-2 pt-0" v-if="album.id > 0">
                            {{
                                album.custom_date
                                ? new Date(album.custom_date * 1000).toLocaleDateString()
                                : new Date(album.created * 1000).toLocaleDateString()
                            }}
                            </v-card-subtitle>
                        </v-sheet>

                        <!-- КОНТЕКСТНОЕ МЕНЮ. Блок действий для взаимодействия с альбомом -->
                        <v-sheet>
                            <v-card-actions>
                                <v-menu v-model="album.active" location="end">

                                    <!-- Кнопка вызывающая контекстное меню -->
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon="mdi-dots-vertical" density="compact" size="small" v-bind="props"></v-btn>
                                    </template>

                                    <!-- контейнер для отрисовки списка кнопок действий -->
                                    <v-card min-width="230">
                                        <!-- список кнопок возможных действий для альбома -->
                                        <v-list class="d-flex flex-column align-start">

                                            <!-- ДОБАВИТЬ/УБРАТЬ в(из) избранное(го) -->
                                            <v-btn 
                                            class="text-none d-flex justify-start flex-grow-1 w-100" 
                                            elevation="0"
                                            :prepend-icon="!album.is_favorite ? 'mdi-star-outline' : 'mdi-star'" 
                                            @click="acceptFavorite(album)">
                                                {{ !album.is_favorite ? 'Добавить в избранное': 'Убрать из избранного' }}
                                            </v-btn>

                                            <!-- ПЕРЕИМЕНОВАТЬ Альбом -->
                                            <v-btn
                                            class="text-none d-flex justify-start flex-grow-1 w-100" 
                                            elevation="0"
                                            prepend-icon="mdi-pencil" 
                                            text="Переименовать" 
                                            @click="selectAlbum(album)"
                                            >
                                                Переименовать
                                            </v-btn>

                                            <!-- СКАЧАТЬ -->
                                            <v-btn 
                                            class="text-none d-flex justify-start flex-grow-1 w-100" 
                                            elevation="0"
                                            prepend-icon="mdi-download"
                                            >
                                                Скачать
                                            </v-btn>

                                            <!-- УДАЛИТЬ -->
                                            <v-btn 
                                            block 
                                            class="text-none d-flex justify-start flex-grow-1 w-100"
                                            elevation="0" 
                                            prepend-icon="mdi-delete" 
                                            text="Удалить"
                                            @click="dropAlbum(album.id)"
                                            >
                                                Удалить
                                            </v-btn>
                                        </v-list>

                                        <!-- Отступ -->
                                        <v-divider></v-divider>
                                    </v-card>
                                </v-menu>
                            </v-card-actions>
                        </v-sheet>
                    </v-sheet>
                </v-card>
            </v-sheet>
        </v-card>

        <!-- Все фото пользователя -->
        <v-card color="white" elevation="0" class="pa-4 pt-0">
            <v-card-title>Все файлы</v-card-title>
            <v-card class="pa-4 pt-0" elevation="0" color="white">
                <!-- <MasonryDialog @update="updateDataPhotos" :photos="photosArr" /> -->
            </v-card>
        </v-card>
    </v-card>

                        <!-- ДИАЛОГОВЫЕ ОКНА -->

    <!-- Диалоговое окно для изменения имени альбома -->
    <v-dialog v-model="dialog" width="500">
        <v-card color="white" elevation="0" flat>
            <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
                <v-card-title class="pa-6"> Переименовать </v-card-title>
                <v-card-text class="pb-0 pt-0">
                    <v-text-field v-model="selectAlbumData.name" :rules="rulesNull" ref="refName" validateOn="blur"
                        :hide-details="false" :error="error" :error-messages="errorMessages" name="name"
                        @change="resetErrors"></v-text-field>
                </v-card-text>
                <v-card-text class="d-flex justify-end pb-5">
                    <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
                    <v-btn color="primary" class="ml-4" @click="renameAlbum">Сохранить</v-btn>
                </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>

    <!-- ??? НУЖЕН ЛИ ??? -->
    <v-dialog v-model="dialogAlbum" width="500">
        <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
            <v-card color="white">
                <v-card-title class="pa-6">
                    <span>Описание альбома</span> <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" size="x-small" flat="true" elevation="0" @click="dialogAlbum = false"></v-btn>
                </v-card-title>
                <v-card-text class="pb-0 pt-0">
                    <v-card-subtitle class="pa-0 pb-1 d-flex align-center"><span>Описание</span> <v-spacer></v-spacer><v-btn
                            elevation="0" flat="true" size="small" icon="mdi-pen" @click="changeArea = true"
                            v-if="!changeArea"></v-btn></v-card-subtitle>
                    <v-textarea auto-grow :variant="!changeArea ? 'underlined' : 'outlined'" flat="true"
                        :disabled="!changeArea ? true : false" rows="1" :rules="rules" ref="refEmail"
                        v-model="selectAlbumData.description" :hide-details="false" required density="compact"
                        bg-color="reverse_background" color="primary" persistent-counter="true" :counter="150"
                        :counter-value="150"></v-textarea>
                    <v-card-subtitle class="pa-0">Владелец</v-card-subtitle>
                    <v-card-title class="pa-0 text-subtitle-1">Я</v-card-title>

                    <v-card-subtitle class="pa-0 pt-2">Дата</v-card-subtitle>
                    <v-card-title class="pa-0 text-subtitle-1">
                        {{
                            selectAlbumData.custom_date
                            ? new Date(
                                selectAlbumData.custom_date * 1000
                            ).toLocaleDateString()
                            : new Date(selectAlbumData.created * 1000).toLocaleDateString()
                        }}
                    </v-card-title>

                    <v-checkbox label="Приватный альбом" color="primary" density="compact"
                        v-model="selectAlbumData.is_private" :disabled="!changeArea ? true : false"></v-checkbox>
                </v-card-text>
                <v-card-text class="d-flex justify-end pb-5" v-if="changeArea">
                    <v-btn variant="text" @click="changeArea = false">Отмена</v-btn>
                    <v-btn color="primary" class="ml-4" @click="updateAlbum">Сохранить</v-btn>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>

    <!-- ??? Модальное окно для создания альбома ??? -->
    <v-dialog v-model="dialogDataAlbum" width="500">
        <albumDialog @update="updateDataAlbum" />
    </v-dialog>

    <!-- ??? Форма для добавления новых фотографий ??? -->
    <v-dialog v-model="dialogDataPhoto" width="1000">
        <photoDialogComp @close="closeDialogDataPhoto" :albumsList="albumsArr" @update="updateDataAlbum" />
    </v-dialog>
</template>
  
<script setup>
// import MasonryDialog from "../third/MasonryDialog.vue";
import albumDialog from "./albumDialog.vue";
import photoDialogComp from "./photoDialogComp.vue";
// import router from "@/router";
// import { mediaApi } from "@/api/mediaApi";
// const { getAlbums, changeAlbum, deleteAlbum, getPhotos } = mediaApi();
import { ref, defineEmits } from "vue";
const emit = defineEmits(["close", "selectAlbum"]);
// const menu = ref(false);
const dialog = ref(false);
const dialogAlbum = ref(false);
const changeArea = ref(false);
const dialogDataAlbum = ref(false);
const dialogDataPhoto = ref(true);
// const albumData = ref({
//     body: null,
// });
const albumsArr = ref([
    {id:10, name: 'example', custom_date: 1706618587996}, 
    {id:1, name: 'example', is_private: true, custom_date: 1706618587996}, 
    {id:2, name: 'example', custom_date: 1706618587996, is_favorite: true}, 
    {id:3, name: 'example', custom_date: 1706618587996}, 
    {id:4, name: 'example', custom_date: 1706618587996},
    {id:5, name: 'example', custom_date: 1706618587996}, 
    {id:6, name: 'example', custom_date: 1706618587996}, 
    {id:7, name: 'example', custom_date: 1706618587996}, 
    {id:8, name: 'example', custom_date: 1706618587996}, 
    {id:9, name: 'example', custom_date: 1706618587996},
]);
// const photosArr = ref([]);
const selectAlbumData = ref({name: ''});
// const parentData = ref();
const refAlbumForm = ref();
const isFormValid = ref(true);
const error = ref(false);
const errorMessages = ref("");

const rules = ref([
    (value) => value?.length <= 150 || "Максимальная длина описания 150 символов",
]);
const rulesNull = ref([
    (value) => (value && value?.length > 0) || "Это обязательное поле",
]);


// function openDialogPhoto() {
//     dialogDataPhoto.value = true;
// }
function closeDialogDataPhoto() {
    dialogDataPhoto.value = false;
}
function closeDialog() {
    emit("close");
}
function updateDataAlbum() {
    console.log('updateDataAlbum');
}
// function updateDataPhotos() {
//     console.log('updateDataPhotos');
// }
function selectAlbum(album) {
    console.log('selectAlbum', album);
}
// function openAlbum(album) {
//     console.log('openAlbum', album);
// }
function acceptFavorite(data) {
    console.log('acceptFavorite', data);
}
async function updateAlbum() {
    console.log('updateAlbum');
}
async function renameAlbum () {
    console.log('renameAlbum');
}
function dropAlbum(id) {
    console.log('DropAlbum', id);
}
function resetErrors() {
    error.value = false;
    errorMessages.value = "";
}
function routerAlbum(id) {
    console.log('routerAlbum', id);
    emit("selectAlbum", id);
}
</script>

<style scoped>
.albums-user__container {
    font-family: "Nunito Sans", sans-serif !important;

}
</style>