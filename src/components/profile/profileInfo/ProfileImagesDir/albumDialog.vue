<template>
    <!-- Форма для создания нового альбома -->
    <v-card color="white">
        <v-card-title class="pa-6">
            <span>Новый альбом</span> <v-spacer></v-spacer>
            <v-btn icon="mdi-close" size="x-small" flat="true" elevation="0"></v-btn>
        </v-card-title>
        <v-card-text>
            <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
                <v-card-subtitle class="pa-0 pb-2">Название</v-card-subtitle>
                <v-text-field ref="refName" validateOn="blur" :hide-details="false" v-model="albumData.name" required
                    density="default" bg-color="reverse_background" :rules="rulesNull" :error="error"
                    :error-messages="errorMessages" name="name" @change="resetErrors"></v-text-field>

                <v-card-subtitle class="pa-0 pb-1 d-flex align-center">Описание
                </v-card-subtitle>
                <!-- changeArea ? 'false' : 'true' -->
                <v-textarea auto-grow variant="outlined" flat="true" rows="1" ref="refDesc" validateOn="blur" :error="error"
                    :error-messages="errorMessages" :rules="rules" v-model="albumData.description" :hide-details="false"
                    required bg-color="reverse_background" color="primary" persistent-counter="true" :counter="150"
                    :counter-value="150" @change="resetErrors"></v-textarea>

                <datepickerComp class="mt-5" :assignObject="albumData" @update="updateBirthtime" />

                <v-card-subtitle class="pa-0 pb-2">Адрес или место</v-card-subtitle>
                <v-textarea auto-grow variant="outlined" flat="true" rows="1" ref="refLocation" v-model="albumData.location"
                    :hide-details="false" required bg-color="reverse_background" color="primary"></v-textarea>

                <v-checkbox density="compact" label="Приватный альбом" class="pa-0" hide-details="false"
                    v-model="albumData.is_private"></v-checkbox>
                <v-card-subtitle class="pa-0 pl-7">Фото из этого альбома будете видеть только Вы</v-card-subtitle>
            </v-form>
        </v-card-text>
        <v-card-text class="d-flex justify-end pb-5">
            <v-btn variant="text">Отмена</v-btn>
            <v-btn color="primary" class="ml-4" @click="addedetAlbum">Создать альбом</v-btn>
        </v-card-text>
    </v-card>
</template>

<script setup>
import datepickerComp from "../../../UI/datepickerComp.vue";
// import { mediaApi } from "../../../api/mediaApi";
import { ref } from "vue";

// const emit = defineEmits(["update"]);

// const { createAlbum } = mediaApi();

const refAlbumForm = ref();
const isFormValid = ref(true);
const error = ref(false);
const errorMessages = ref("");
const albumData = ref({
    name: null,
    description: null,
    location: null,
    custom_date: null,
    is_private: false,
});

function addedetAlbum() {
    console.log('addedetAlbum');
}
function updateBirthtime(date, assignObject) {
    assignObject.custom_date = date;
}
const rules = ref([
    (value) =>
        (value && value.length <= 150) || "Максимальная длина описания 150 символов",
]);
const rulesNull = ref([
    (value) => (value && value.length > 0) || "Это обязательное поле",
]);
function resetErrors() {
    error.value = false;
    errorMessages.value = "";
}
</script>