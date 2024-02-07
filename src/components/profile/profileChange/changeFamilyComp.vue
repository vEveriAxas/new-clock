<template>
    <!-- Блок Редактирования ДАННЫХ О СЕМЬЕ -->
    <v-card color="background" elevation="0">

        <v-card class="change-family" rounded="lg">
            <!-- Форма -->
            <v-form class="text-left" ref="refForm" lazy-validation>
                <v-card-item>
                    <v-card-subtitle class="mb-2 mt-2 pl-0"> Супруг(а) </v-card-subtitle>
                    <v-autocomplete 
                    autocomplete="off" 
                    required readonly="" 
                    density="default" 
                    color="primary"
                    :items="usersData" 
                    return-object 
                    label="Введите имя родственника" 
                    variant="outlined"
                    :hide-details="true" 
                    :menu-props="{
                        closeOnContentClick: true,
                    }" v-model="spouse">
                    <template #selection="{ item }">
                        {{ getUserTitle(item.raw) }}
                    </template>
                    <template v-slot:item="{ item }">
                        <v-list-item @click="spouse = item.raw"
                            :prepend-avatar="item.raw.avatar ?? '/src/assets/base/empty-user.svg'"
                            :title="getUserTitle(item.raw)" />
                    </template>
                    </v-autocomplete>
                </v-card-item>
                <v-card-item v-for="item in comboboxItems" :key="item?.id">
                    <v-card-subtitle class="mb-2 mt-2 pl-0">{{
                        item.name
                    }}</v-card-subtitle>
                    <v-autocomplete autocomplete="off" label="Введите имя родственника" :items="usersData"
                        variant="outlined" :hide-details="true" v-model="item.selectItems" required density="default"
                        color="primary">
                        <template v-slot:item="{ item }">
                            <v-list-item :prepend-avatar="item.raw.avatar ?? '/src/assets/base/empty-user.svg'"
                                :title="getUserTitle(item.raw)" />
                        </template>
                    </v-autocomplete>
                </v-card-item>
                <v-sheet class="pa-4 d-flex justify-end">
                    <!-- <v-btn variant="text">Отмена</v-btn> -->
                    <v-btn color="primary" class="ml-2" @click="saveData">Сохранить</v-btn>
                </v-sheet>
            </v-form>
        </v-card>
    </v-card>
</template>

<script setup>
// import { usersApi } from "../../../api/usersApi";
// const { getUsers } = usersApi();
import { ref, defineProps, computed, watch } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            id: 0,
        }),
    },
});

const usersData = ref([]);
const item = ref({});
const spouse = ref({
    first_name: null,
});

const getUserTitle = computed(() => {
    return (user) => {
        let title = user.first_name ?? null
        title = title ? `${title} ${user.last_name ?? ''}` : user.last_name ?? null
        return title ?? 'Не указано';
    };
});

watch(() => props.data, (newValue) => {
    if (newValue) {
        item.value = { ...newValue }
    } else {
        item.value = {}
    }
});

// const registrationData = ref({
//     biography: null,
// });


const comboboxItems = ref([
    {
        name: "Дети",
        selectItems: null,
    },
]);

async function saveData() {
    alert("Well Done !");
}
</script>

<style scoped>
.change-family {
    display: flex !important;
    flex-direction: column !important;
    padding: 1rem 2rem !important;
}
ul {
    columns: 2;
    list-style: none;
}
</style>
