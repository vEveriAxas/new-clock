<template>
    <!-- Блок Редактирования КОНТАКТНОЙ ИНФОРМАЦИИ -->
    <v-card color="background" elevation="0">
        <v-card class="change-contacts" rounded="lg">
            <v-form class="text-left" ref="refForm" lazy-validation>
                <v-card-subtitle class="mb-2 mt-2 pl-0">Родной город</v-card-subtitle>
                <v-autocomplete ref="refEmail" :hide-details="false" variant="outlined" required
                    v-model="registrationData.birth_location_id" :items="cityesArray" item-title="name" item-value="id"
                    density="default" bg-color="reverse_background"></v-autocomplete>

                <v-card-subtitle class="mb-2 mt-2 pl-0">Город проживания</v-card-subtitle>
                <v-autocomplete ref="refEmail" :hide-details="false" v-model="registrationData.location_id"
                    variant="outlined" required :items="cityesArray" item-title="name" item-value="id" density="default"
                    bg-color="reverse_background"></v-autocomplete>

                <v-card-subtitle class="mb-2 mt-2 pl-0">Мобильный телефон</v-card-subtitle>
                <v-text-field ref="refEmail" :hide-details="false" required density="default" bg-color="reverse_background"
                    v-model="registrationData.tel"></v-text-field>
                <v-card-subtitle class="mb-2 mt-2 pl-0">Телеграм</v-card-subtitle>
                <v-text-field ref="refEmail" :hide-details="false" required density="default" bg-color="reverse_background"
                    v-model="registrationData.tg"></v-text-field>
                <v-sheet class="pa-4 d-flex justify-end">
                    <!-- <v-btn variant="text">Отмена</v-btn> -->
                    <v-btn color="primary" class="ml-2" @click="saveData">Сохранить</v-btn>
                </v-sheet>
            </v-form>
        </v-card>
    </v-card>
</template>
  
<script setup>
// import { profileApi } from "../../../api/profileApi";
// import { cityes } from "../../../compositions/countries";
// const { changeUser } = profileApi();
// const { cityesArray } = cityes();
import { ref, watch, defineProps } from "vue";

// const emit = defineEmits(["update"]);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            id: 0,
        }),
    },
});
const registrationData = ref(null);

function saveData () {
    console.log('saveData');
}
watch(() => {
    registrationData.value = { ...props.data };
});
</script>

<style scoped>
.change-contacts {
    display: flex !important;
    flex-direction: column !important;
    padding: 1rem 3rem !important;
}
ul {
    columns: 2;
    list-style: none;
}
</style>