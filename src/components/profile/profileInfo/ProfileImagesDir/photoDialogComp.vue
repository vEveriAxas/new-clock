<template>
    <!-- Модальное окно для добавления фотографий -->
    <v-card color="white">
        <v-card-title class="pa-6 pb-0">
            <span>Добавить фотографии</span> <v-spacer></v-spacer>
            <v-btn icon="mdi-close" size="x-small" :flat="true" elevation="0" @click="closeDialog"></v-btn>
        </v-card-title>
        <v-card-text class="pt-0">
            <div class="mt-2 d-flex flex-wrap">
                <template v-for="(photo, index) in newGalleryImg" :key="index">
                    <v-card class="pa-0" flat>
                        <imageInputSelect removable v-if="newGalleryImg[index].img" v-model="newGalleryImg[index].img">
                        </imageInputSelect>
                        <!-- <v-text-field
                            density="compact"
                            single-line
                            class="text-caption"
                        ></v-text-field> -->
                        <div class="d-flex">
                            <input placeholder="Место" v-if="newGalleryImg[index].img"
                                v-model="newGalleryImg[index].address" type="text"
                                class="w-100 bg-my_grey text-field__input" />
                        </div>
                    </v-card>
                </template>
                <div>
                    <ImageInputSelect removable class="ml-2" v-if="firstNullAttachmentIndex !== -1"
                        v-model="newGalleryImg[firstNullAttachmentIndex].img" />
                </div>
            </div>
        </v-card-text>
        <v-card-text class="d-flex pb-5">
            <v-menu v-model="menu" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn variant="text" color="primary" class="text-none" v-bind="props">{{
                        isSelectedAlbum ? isSelectedAlbum.name : "Добавить в альбом"
                    }}</v-btn>
                </template>

                <v-card min-width="230">
                    <v-list class="d-flex flex-column align-start">
                        <v-btn v-for="album in albums" @click="selectAlbum(album)"
                            class="text-none d-flex justify-start flex-grow-1 w-100" elevation="0" :key="album.id">
                            <v-span>
                                {{ album.name }}
                            </v-span>
                        </v-btn>
                    </v-list>

                    <v-divider></v-divider>
                </v-card>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="closeDialog">Отмена</v-btn>
            <v-btn color="primary" class="ml-4 text-none" @click="addedetGallery">Добавить фотографии</v-btn>
        </v-card-text>
    </v-card>
</template>

<script setup>
// import { mediaApi } from "../../../api/mediaApi";
// const { createAlbum, addImages, changeImages } = mediaApi();
import imageInputSelect from "./imageInputSelect.vue";
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
    albumsList: {
        type: Array,
        default: () => [],
    },
});

// const test = ref();
const menu = ref(false);
const newGalleryImg = ref([]);
const emit = defineEmits(["update"]);
const throttle = ref(null);
const albums = ref([...props.albumsList]);
const isSelectedAlbum = ref(null);


const firstNullAttachmentIndex = computed(() => {
    for (let i = 0; i < newGalleryImg.value.length; i++) {
        if (!newGalleryImg.value[i].img) {
            return i;
        }
    }
    return -1;
});

onMounted(() => {
    if (!throttle.value) {
        throttle.value = true;
        newGalleryImg.value = newGalleryImg.value.filter((a) => a);
        while (newGalleryImg.value?.length < 30) {
            newGalleryImg.value.push({ img: null, address: null });
        }
        setTimeout(() => {
            throttle.value = null;
        }, 100);
    }
});

function selectAlbum(album) {
    isSelectedAlbum.value = album;
}

function addedetGallery() {
    let promises = [];
    let photos = [];
    newGalleryImg.value.forEach((element) => {
        if (element.img) {
            promises.push(
                'example'
                // addImages(element.img).then((r) => {
                //     if (!isSelectedAlbum.value) {
                //         photos.push(changeImages(r.data.data.id, null, element.address));
                //     } else {
                //         photos.push(
                //             changeImages(
                //                 r.data.data.id,
                //                 isSelectedAlbum.value.id,
                //                 element.address
                //             )
                //         );
                //     }
                // })
            );
        }
    });

    Promise.all(promises).then(() => {
        Promise.all(photos).then(() => {
            emit("update");
            emit("close");
        });
    });
}

function closeDialog() {
    emit("close");
}
</script>

<style>
.text-field__input {
    background-image: url(../../../../assets/base/places-icon.svg);
    background-repeat: no-repeat;
    text-indent: 0px;
    height: 25px;
    padding: 0.375rem 0.75rem 0.375rem 1.5rem;
    font-family: inherit;
    font-size: 8px;
    font-weight: 200;
    line-height: 1.5;
    max-width: 184px;
    color: #212529;
    border-radius: 0px 0px 3px 3px;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.text-field__input::placeholder {
    color: #212529;
    opacity: 0.4;
}

.text-field__input:focus {
    color: #212529;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
    box-shadow: 0 0 0 0 rgba(158, 158, 158, 0.25);
}

.text-field__input:disabled,
.text-field__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
}
</style>