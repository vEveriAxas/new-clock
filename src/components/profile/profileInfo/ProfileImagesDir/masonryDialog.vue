<template>
    <v-card class="w-100" color="white" elevation="0">
        <!-- <masonry-wall :items="photos" :ssr-columns="1" :padding="30">
            <template #default="{ item }">
                <v-card class="ma-1" color="white">
                    <v-img class="align-end text-white pointer" :src="item.url" :lazy-src="item.url" cover
                        @click="previewImg(item)">
                    </v-img>
                </v-card>
            </template>
        </masonry-wall> -->
        <v-container>
            <v-row>
                <v-col cols="4" v-for="(photo, index) in photos" :key="index">
                    <v-card>
                        <v-img class="photo" :src="photo.url" height="200px"></v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>

    <v-dialog v-model="imgOverlay" location-strategy="connected" scroll-strategy="none"
        class="d-flex align-center justify-center w-100" width="1000">
        <v-card>
            <v-card class="pa-3 d-flex align-start justify-space-between" rounded="0" color="#3C3C3C">
                <div class="d-flex">
                    <v-card-text class="pa-0 pr-2 text-white">{{
                        selectAlbum.name ?? "Все фото"
                    }}</v-card-text>
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
    </v-dialog>
</template>

<script setup>
import { faker } from "@faker-js/faker";
// import { mediaApi } from "../api/mediaApi";
// const { deletePhotos } = mediaApi();
import { ref, onMounted } from 'vue';

function deleteSelectPhoto() {
    console.log('deleteSelectPhoto');
}

// const emit = defineEmits(["update"]);
// const props = defineProps({
//     photos: {
//         type: Array,
//         default: () => [],
//     },
//     selectAlbum: {
//         type: Object,
//         default: () => ({ name: "Все фото" }),
//     },
// });
onMounted(() => {
    initPhotos();
});

const photos = ref([]);

const getPhotoHeight = (index) => {
    let height = 0;
    if (index % 3 === 0) {
        height = 480;
    } else if (index % 3 === 1) {
        height = 240;
    } else {
        height = 360;
    }
    return height;
};

/* const initPhotos = () => {
  photos.value = Array.from({ length: 25 }, (value, index) => ({
    id: index + "",
    url: faker.image.animals(undefined, getPhotoHeight(index), true),
    title: faker.lorem.word(),
    description: faker.lorem.text(),
  }));
}; */

function initPhotos() {
    photos.value = Array.from({ length: 25 }, (value, index) => ({
        id: index + "",
        url: faker.image.animals(undefined, getPhotoHeight(index), true),
        title: faker.lorem.word(),
        description: faker.lorem.text(),
    }));
}

const imgOverlay = ref(false);
// const imgSrc = ref("");
const img = ref(null);
// const previewImg = (item) => {
//     img.value = item;
//     imgOverlay.value = true;
// };
</script>

<style scoped>
.photo {
    background-clip: cover;
}
</style>
