<template>
    <!-- Используется как модальное окно для отображения файлов выбранного альбома -->
    <v-card elevation="0" height="95vw" color="white">

        <!-- Титульная часть компонента -->
        <v-card class="d-flex justify-space-between align-center" color="white" elevation="0">
            <v-card-item class="pa-0 w-25">
                <v-card-title class="pa-4 text-h5">Фото пользователя </v-card-title>
            </v-card-item>
            <v-card-item class="pa-5 w-75 d-flex justify-end align-center">
                <v-btn icon="mdi-close" size="" :flat="true" elevation="0" @click="closeDialog"></v-btn>
            </v-card-item>
        </v-card>

        <!-- Тело компонента -->
        <v-card color="white" elevation="0">
            <v-card-title>Все файлы</v-card-title>
            <v-card class="pa-4 pt-0" color="white">
                <masonryDialog @update="updateDataPhotos" :photos="photosArr" />
            </v-card>
        </v-card>
    </v-card>
    <!-- <v-dialog v-model="dialog" width="500">
        <v-card color="white">
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
    </v-dialog> -->

    <!-- <v-dialog v-model="dialogAlbum" width="500">
        <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
            <v-card color="white">
                <v-card-title class="pa-6">
                    <span>Описание альбома</span> <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" size="x-small" :flat="true" elevation="0" @click="dialogAlbum = false"></v-btn>
                </v-card-title>
                <v-card-text class="pb-0 pt-0">
                    <v-card-subtitle class="pa-0 pb-1 d-flex align-center"><span>Описание</span> <v-spacer></v-spacer><v-btn
                            elevation="0" :flat="true" size="small" icon="mdi-pen" @click="changeArea = true"
                            v-if="!changeArea"></v-btn></v-card-subtitle>
                    <v-textarea auto-grow :variant="!changeArea ? 'underlined' : 'outlined'" :flat="true"
                        :disabled="!changeArea ? true : false" rows="1" :rules="rules" ref="refEmail"
                        v-model="selectAlbumData.description" :hide-details="false" required density="compact"
                        bg-color="reverse_background" color="primary" :persistent-counter="true" :counter="150"
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
    </v-dialog> -->

    <v-dialog v-model="dialogDataAlbum" width="500">
        <albumDialog @update="updateDataAlbum" />
    </v-dialog>

    <v-dialog v-model="dialogDataPhoto" width="1000">
        <PhotoDialogComp @close="closeDialogDataPhoto" :albumsList="albumsArr" @update="updateDataAlbum" />
    </v-dialog>
</template>
  
<script setup>
import masonryDialog from "./masonryDialog.vue";
import albumDialog from "./albumDialog.vue";
import PhotoDialogComp from "./photoDialogComp.vue";

// import router from "@/router";
// import { mediaApi } from "@/api/mediaApi";
// const { getAlbums, changeAlbum, deleteAlbum, getPhotosSelectAlbum, getPhotos } =
//     mediaApi();

import { 
    ref, 
    defineEmits, 
} from "vue";

// EMITS
const emit = defineEmits(["close"]);

// PROPS
// const props = defineProps({
//     idAlbum: {
//         type: Number,
//         default: () => null,
//     },
// });

// STATE
// const menu = ref(false);
// const dialog = ref(false);
// const dialogAlbum = ref(false);
// const changeArea = ref(false);
const dialogDataAlbum = ref(false);
const dialogDataPhoto = ref(false);
// const albumsArr = ref([]);
const photosArr = ref([{}, {}, {}, {}, {}, {}, {}, {},]);
// const selectAlbumData = ref();
// const parentData = ref();
// const refAlbumForm = ref();
// const isFormValid = ref(true);
// const error = ref(false);
// const errorMessages = ref("");
// const albumData = ref({
    // body: null,
// });

// ACTIONS
// function openDialogPhoto() {
//     dialogDataPhoto.value = true;
// }

// function closeDialogDataPhoto() {
//     dialogDataPhoto.value = false;
// }
function closeDialog() {
    emit("close");
}

// function updateDataAlbum() {
//     getAlbums().then((r) => {
//         albumsArr.value = r.data.data;
//         albumsArr.value.splice(0, 0, { id: null, name: "Все фото" });
//     });
// }
function updateDataPhotos() {
    console.log('updateDataPhotos()');
    // if (props.idAlbum) {
    //     getPhotosSelectAlbum(props.idAlbum).then((r) => {
    //         photosArr.value = r.data.data;
    //     });
    // } else {
    //     getPhotos().then((r) => {
    //         photosArr.value = r.data.data;
    //     });
    // }
}
// function selectAlbum(album) {
//     parentData.value = album;
//     selectAlbumData.value = { ...parentData.value };
//     dialog.value = true;
// }
// function openAlbum(album) {
//     parentData.value = album;
//     selectAlbumData.value = { ...parentData.value };
//     dialogAlbum.value = true;
// }
// function acceptFavorite(data) {
//     changeAlbum({ is_favorite: !data.is_favorite }, data.id).then(() => {
//         data.is_favorite = !data.is_favorite;
//     });
// }
// onMounted(() => {
//     updateDataAlbum();
//     updateDataPhotos();
// });
// async function updateAlbum() {
//     const { valid } = await refAlbumForm.value.validate();
//     if (valid) {
//         changeAlbum(selectAlbumData.value, selectAlbumData.value.id).then(() => {
//             parentData.value.description = selectAlbumData.value.description;
//             parentData.value.is_private = selectAlbumData.value.is_private;
//             dialogAlbum.value = false;
//             changeArea.value = false;
//         });
//     }
// }
// async function renameAlbum() {
//     const { valid } = await refAlbumForm.value.validate();
//     if (valid) {
//         changeAlbum(
//             { name: selectAlbumData.value.name },
//             selectAlbumData.value.id
//         ).then(() => {
//             parentData.value.name = selectAlbumData.value.name;
//             dialog.value = false;
//         });
//     }
// }
// function dropAlbum(id) {
//     deleteAlbum(id).then(() => {
//         var index = albumsArr.value
//             .map((album) => {
//                 return album.id;
//             })
//             .indexOf(id);

//         albumsArr.value.splice(index, 1);
//     });
// }


// const rules = ref([
//     (value) => value.length <= 150 || "Максимальная длина описания 150 символов",
// ]);
// const rulesNull = ref([
//     (value) => (value && value.length > 0) || "Это обязательное поле",
// ]);

// function resetErrors() {
//     error.value = false;
//     errorMessages.value = "";
// }

// function routerAlbum(id) {
//     router.push({ name: "select_media-my_media", params: { id: id } });
// }
</script>