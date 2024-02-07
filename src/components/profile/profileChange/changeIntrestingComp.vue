<template>
    <v-card 
    class="change-intresting__container"
    color="background" 
    elevation="0" 
    >
        <v-card class="change-intresting" rounded="lg">
            <v-form 
            class="text-left" 
            ref="refForm" 
            lazy-validation
            >
                <!-- Подзаголовок Поля БИОГРАФИЯ -->
                <v-card-subtitle class="mb-2 mt-2 pl-0">
                    Биография
                </v-card-subtitle>
                <!-- Поле ввода БИОГРАФИИ -->
                <v-textarea auto-grow variant="outlined" rows="1" :hide-details="false"
                    v-model="registrationData.description" required density="default" bg-color="reverse_background"
                    color="primary"></v-textarea>

                <!-- ???? -->
                <v-card-subtitle class="mb-2 mt-2 pl-0">Интересы</v-card-subtitle>

                <ul>
                    <li v-for="(interst, index) in interestsData" :key="index">
                        <div>
                            <v-checkbox color="primary" hide-details density="compact" :label="interst.name"
                                :value="interst.name" v-model="registrationData.interests"></v-checkbox>
                        </div>
                    </li>
                </ul>

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
// import { interestsApi } from "../../../api/interestsApi";
// const { changeUser } = profileApi();
// const { getInterest } = interestsApi();
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
const interestsData = ref([]);
const registrationData = ref(null);

function saveData() {
    console.log('saveData');
}
watch(() => {
    registrationData.value = { ...props.data };
});
</script>

<style scoped>
/* d-flex flex-column pa-3 pb-0 */
.change-intresting {
    display: flex !important;
    flex-direction: column !important;
    padding: 1rem 3rem !important;
}
ul {
    columns: 2;
    list-style: none;
}
</style>