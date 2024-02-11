<!-- Блок информации о себе -->
<template>
    <v-card class="d-flex flex-column rounded-xl pa-2 card-text-text">
        <v-card-title class="pl-9 d-flex align-center justify-space-between">
            Подробная информация
            <v-btn icon="mdi-close" size="small" elevation="0" @click="() => emit('close')"></v-btn></v-card-title>

        <!-- ID Системы -->
        <v-card-text class="d-flex">
            <v-card-subtitle style="width: 200px;">ID</v-card-subtitle>
            <v-card-subtitle>{{ props.data?.id }}</v-card-subtitle>
        </v-card-text>

        <v-divider></v-divider>

        <!-- Мобильный телефон -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Мобильный телефон</v-card-subtitle>
            <v-card-subtitle>{{ props.data?.tel }}</v-card-subtitle>
        </v-card-text>
        
        <v-divider></v-divider>
        
        <!-- Имя -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">ФИО</v-card-subtitle>
            <v-card-subtitle>{{ props.data?.fullName }}</v-card-subtitle>
        </v-card-text>
        
        <v-divider></v-divider>


        <!-- Диалоговое окно для подтверждения удаления аккаунта пользователя -->
        <v-dialog width="500">
            <template v-slot:activator="{ props }">
                <v-btn 
                class="information-card__delete-btn"
                variant="plain"
                density="compact"
                size="small"
                v-bind="props"
                >
                    Удалить аккаунт
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card 
                title="Вы уверены, что хотите удалить аккаунт?"
                style="
                    display: flex;
                    align-items: center;
                    padding: 10px;
                "
                >
                    <v-card-actions style="
                        width: 50%;
                        display: flex;
                        justify-content: space-evenly;
                        margin-top: 20px;
                    ">
                        <!-- ДА -->
                        <v-btn
                        color="red"
                        text="Да"
                        variant="outlined"
                        density="comfortable"
                        @click="deleteAccountUser"
                        ></v-btn>

                        <!-- НЕТ -->
                        <v-btn
                        color="var(--text-primary)"
                        text="Нет"
                        variant="outlined"
                        density="comfortable"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { deleteUser } from '@/api/users';

const emit = defineEmits(['close']);

const props = defineProps({
    data: {
        type: Object,
    },
});

function deleteAccountUser () { 
    deleteUser();
}

// const userData = ref(props.data);
</script>

<style scoped>
.information-card__delete-btn {
    align-self: center;
    color: red;
    margin: 20px 0 10px 0;
}
</style>

