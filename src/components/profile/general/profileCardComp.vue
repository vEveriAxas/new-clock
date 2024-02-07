<template>
    <div class="profile-card__container">
        <!-- Компонент для загрузки или создания аватарки -->
        <div class="profile-card__image" v-if="false">
            <ImageInputBaseCircle @loadPhoto="loadingPhoto"/>
        </div>

        <!-- Шаблон отображает аватарку или заглушку в случае если аватарки нет -->
        <template v-else>
            <v-avatar v-if="props.data?.avatar" :image="props.data.avatar" size="152"></v-avatar>
            <img v-else class="profile-card__image avatar-stab" src="../../../assets/base/empty-user.svg" alt="avatar-stab"  />
        </template>

        <!-- Блок взаимодействия с карточкой пользователя -->
        <div class="profile-card__body">

            <!-- Полное имя пользователя -->
            <v-card-title class="profile-card__fullname">
                {{ props.data?.fullName }}
            </v-card-title>

            <!-- Кнопки `Подробнее` -->
            <div class="profile-card__actions">

                <!-- Кнопка Подробнее (о местоположении) -->
                <v-btn class="more-details text-subtitle-2 pl-0" variant="text">
                    <v-icon class="mr-2">
                        mdi-google-maps
                    </v-icon>
                    Подробнее
                </v-btn>
                <!-- Кнопка Подробнее (о аккаунте пользователя) -->
                <v-btn class="more-details text-subtitle-2 ml-2" @click="dialog = !dialog" variant="text">
                    <v-icon class="mr-2">
                        mdi-information-outline
                    </v-icon>
                    Подробнее
                </v-btn>
            </div>

            <!-- Кнопка Редактировать профиль -->
            <v-btn 
            class="edit-btn text-text text-subtitle-1" 
            variant="tonal"
            @click="handlerEditButton"
            >
                {{ buttonEditValue }}
            </v-btn>
            <!-- <v-card-actions>
            </v-card-actions> -->
        </div>
        <!-- Диалоговое окно для просмотра информации о пользователе -->
        <v-dialog class="profile-card__information-dialog" v-model="dialog">
            <InformationCardComp :data="props.data" @close="close" />
        </v-dialog>
    </div>
</template>

<script setup>
import InformationCardComp from "../general/informationCardComp.vue";
import ImageInputBaseCircle from "../general/imageInputBaseCircle.vue";
import { ref, defineProps, computed } from "vue";
// Router
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// Приходит объект с данными пользователя
const props = defineProps({
    data: Object,
});
// const userData = ref({});
const dialog = ref(false);

// Вычисляет название кнопки `Редактировать`/ `Назад`
const buttonEditValue = computed(() => {
    if(route.name === 'change') {
        return 'Назад';
    } else return 'Редактировать профиль';
})

// Обработчик клика по кнопке `Редактировать`/ `Назад`
function handlerEditButton() {
    if(route.name === 'info') {
        router.push({ name: 'change' });
    } else if(route.name === 'change') {
        router.go(-1);
    }
}

function loadingPhoto(photo) {
    // changeAvatarUser(userData.value.avatar);
    console.log(photo);
}
function close() {
    dialog.value = false;
}
</script>

<style scoped>
.profile-card__container {
    font-family: "Nunito Sans", sans-serif !important;
    border-radius: 10px;
    box-shadow: var(--shadow) !important;
    /* border: 1px solid black; */
    display: flex;
    padding: 16px;
    overflow: hidden;
    background-color: white;
}
.profile-card__image {
    /* border: 1px solid black; */
}
.profile-card__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* border: 1px solid black; */
    padding: 12px;
}
.profile-card__actions {
    padding: 0 8px 8px 6px;
}
.profile-card__image {

}
.profile-card__fullname {
    padding: 8px 16px 8px 8px;
}
.more-details {
    font-family: "Nunito Sans", sans-serif !important;
    padding: 4px !important;
} 
.avatar-stab {
    width: 152px;
}
.edit-btn {
    font-family: "Nunito Sans", sans-serif !important;
    padding: 8px;
}
.profile-card__information-dialog {
    width: 650px;
}
</style>