<template>
    <!-- Отрисовка Фотографий пользователя -->
    <v-row class="pa-3">
        <template v-for="(photo, index) in photosArr">
            <v-col v-if="index <= 7" :key="index" class="d-flex child-flex" cols="3">
                <v-img :src="photo.url" aspect-ratio="1" cover
                    class="bg-grey-lighten-2 pointer" @click="previewImg(photo)">
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                    <!-- <template v-slot:placeholder>
                    </template> -->
                </v-img>
            </v-col>
        </template>
    </v-row>

    <!-- Блок Действий с фотографиями (Посмотреть все / Загрузить фото) -->
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" class="text-text text-none" @click="albumsUserDialog = true">Посмотреть все</v-btn>
        <v-btn variant="tonal" class="text-text text-none" @click="photosDialog = true">Загрузить фото</v-btn>
    </v-card-actions>

    <v-dialog v-model="photosDialog" width="1000">
        <photoDialogComp @close="closeDialogDataPhoto" :albumsList="albumsArr" @update="updateDataAlbum" />
    </v-dialog>

    <!-- <v-dialog v-model="imgOverlay" location-strategy="connected" scroll-strategy="none"
        class="d-flex align-center justify-center w-100" width="1000">
        <v-card>
            <v-card class="pa-3 d-flex align-start justify-space-between" rounded="0" color="#3C3C3C">
                <div class="d-flex">
                    <v-card-text class="pa-0 pr-2 text-white">Фото</v-card-text>
                    <v-card-text class="pa-0 pr-2 text-white">{{
                        img.address
                    }}</v-card-text>
                    <v-card-text class="pa-0 text-white">{{
                        img.happened
                        ? new Date(img.happened * 1000).toLocaleDateString()
                        : new Date(img.created * 1000).toLocaleDateString()
                    }}</v-card-text>
                </div>
                <v-spacer></v-spacer>
                <v-btn class="pa-0 text-white" variant="text" density="compact" @click="deleteSelectPhoto">Удалить</v-btn>
            </v-card>
            <v-img :src="img.url" class="d-flex flex-column flex-center justify-center">
            </v-img>
        </v-card>
    </v-dialog> -->

    <!-- Модальное окно. Блок альбомов и фотографий -->
    <v-dialog v-model="albumsUserDialog" location-strategy="connected" scroll-strategy="none"
        class="d-flex align-center justify-center w-100" width="100vw" height="vw">
        <albumsUser @selectAlbum="selectAlbumInDialog" @close="closeAlbumsDialog" />
    </v-dialog>

    
    <v-dialog v-model="albumsSelectUserDialog" location-strategy="connected" scroll-strategy="none"
        class="d-flex align-center justify-center w-100" width="100vw" height="vw">
        <selectAlbumsUserComp :idAlbum="selectAlbumId" @close="closeAlbumsSelectDialog" />
    </v-dialog>
</template>

<script setup>
// import { mediaApi } from "../../../api/mediaApi.js";
// const { getPhotos, getAlbums, deletePhotos } = mediaApi();
import photoDialogComp from "./photoDialogComp.vue";
import selectAlbumsUserComp from "./selectAlbumsUserComp.vue";
import albumsUser from "./albumsUser.vue";
import { ref } from 'vue';

const photosArr = ref([{}, {}, {},]);
// const albumsArr = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]);
const photosDialog = ref(false);
const imgOverlay = ref(false);
const selectAlbumId = ref(null);
const albumsSelectUserDialog = ref(false);
const albumsUserDialog = ref(false);
const img = ref(null);



// function deleteSelectPhoto() {
//     console.log('deleteSelectPhoto');
// }
// function closeAlbumsSelectDialog() {
//     albumsSelectUserDialog.value = false;
//     albumsUserDialog.value = true;
// }
function closeAlbumsDialog() {
    albumsUserDialog.value = false;
}
function selectAlbumInDialog(album_id) {
    closeAlbumsDialog();
    selectAlbumId.value = album_id;
    albumsSelectUserDialog.value = true;
}
function previewImg(item) {
    img.value = item;
    imgOverlay.value = true;
}
// function closeDialogDataPhoto() {
//     photosDialog.value = false;
// }
// function updateDataAlbum() {
//     console.log('updateDataAlbum');
// }

// const updateDataPhotos = () => {
//     console.log('updateDataPhotos');
// };
</script>