<template>
    <!-- Блок Редактирования ОБЩЕЙ ИНФОРМАЦИИ -->
    <v-card 
    color="background" 
    elevation="0" 
    rounded="lg"
    v-if="registrationData"
    >
        <v-card class="change-personal d-flex flex-column pa-3 pb-0 rounded-lg">

            <!-- Форма для редактирования общей информации -->
            <v-form class="change-personal__form text-left" ref="refForm" lazy-validation>

                <!-- Подлзаголовок Поля ИМЯ -->
                <v-card-subtitle class="mb-2 mt-2 pl-0">
                    Имя*
                </v-card-subtitle>
                <!-- поле ИМЯ -->
                <v-text-field 
                ref="refFirstName" 
                :hide-details="false" 
                v-model="registrationData.first_name" 
                required
                :error="error" 
                density="default" 
                bg-color="reverse_background" 
                :rules="generalRules" 
                name="first_name"
                validateOn="blur" 
                @change="resetErrors"
                ></v-text-field>

                <!-- Подлзаголовок Поля ФАМИЛИЯ -->
                <v-card-subtitle class="mb-2 mt-1 pl-0">Фамилия*</v-card-subtitle>
                <!-- поле ФАМИЛИЯ -->
                <v-text-field 
                ref="refLastname" 
                v-model="registrationData.last_name" 
                :error="error"
                :error-messages="errorMessages" 
                :hide-details="false" 
                required 
                density="default"
                bg-color="reverse_background" 
                :rules="generalRules" 
                name="last_name" 
                validateOn="blur"
                @change="resetErrors"
                ></v-text-field>

                <!-- Подлзаголовок Поля ОТЧЕСТВО -->
                <v-card-subtitle class="mb-2 pl-0">Отчество</v-card-subtitle>
                <!-- поле ОТЧЕСТВО -->
                <v-text-field 
                ref="refPatronymic" 
                v-model="registrationData.patronymic" 
                :hide-details="false"
                density="default" 
                bg-color="reverse_background" 
                name="patronymic" 
                validateOn="blur"
                ></v-text-field>

                <!-- Подлзаголовок Поля ДАТА РОЖДЕНИЯ -->
                <v-card-subtitle class="mb-2 pl-0">Дата рождения*</v-card-subtitle>
                <!-- Выбор даты -->
                <datepickerComp :default="registrationData.birthdate" :assignObject="registrationData"
                    @update="updateBirthtime" />

                <!-- Подлзаголовок Поля ПОЛ -->
                <v-card-subtitle class="mb-2 pl-0">Пол</v-card-subtitle>
                <!-- Селект выбора ПОЛА -->
                <v-select 
                ref="refPatronymic" 
                v-model="registrationData.gender" 
                :hide-details="false" 
                density="default"
                bg-color="reverse_background" 
                name="patronymic" 
                validateOn="blur" 
                :items="[
                    { id: 0, name: 'Мужской' },
                    { id: 1, name: 'Женский' },
                ]" 
                item-title="name" 
                item-value="id" 
                variant="outlined"
                ></v-select>

                <!-- Подлзаголовок Поля ДЕВИЧЬЯ ФАМИЛИЯ -->
                <v-card-subtitle class="mb-2 pl-0" v-show="registrationData.gender == 1">
                    Девичья фамилия
                </v-card-subtitle>
                <!-- поле ДЕВИЧЬЯ ФАМИЛИЯ -->
                <v-text-field 
                v-show="registrationData.gender == 1" 
                ref="refPatronymic" 
                v-model="registrationData.maiden_name"
                :hide-details="false" 
                density="default" 
                bg-color="reverse_background" 
                name="maiden_name"
                validateOn="blur"
                ></v-text-field>

                <!-- Кнопка СОХРАНИТЬ -->
                <v-sheet class="pa-4 d-flex justify-end">
                    <!-- <v-btn variant="text">Отмена</v-btn> -->
                    <v-btn color="primary" class="ml-2" @click="saveData">Сохранить</v-btn>
                </v-sheet>
            </v-form>
        </v-card>
    </v-card>
</template>

<script setup>
import datepickerComp from "../../UI/datepickerComp.vue";
// import { profileApi } from "../../../api/profileApi";
// const { changeUser } = profileApi();

import { ref, watch, defineProps } from 'vue';
// const emit = defineEmits(["update"]);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            id: 0,
        }),
    },
});

const error = ref(false);
const errorMessages = ref("");
const registrationData = ref(null);
const refForm = ref(null);

const generalRules = ref([
    (value) => !!value || "Поле обязательно к заполнению",
]);

watch(() => {
    registrationData.value = { ...props.data };
});

async function saveData() {
    console.log('saveData');
}
//Datetime
function updateBirthtime(date, assignObject) {
    assignObject.birthtime = date;
}
//RULES
function resetErrors() {
    error.value = false;
    errorMessages.value = "";
}
</script>

<style scoped>
.change-personal {
    padding: 0 !important;
}
.change-personal__form {
    padding: .5rem 3rem !important;
}
</style>