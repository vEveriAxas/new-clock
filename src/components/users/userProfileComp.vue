<template>
    <!-- Контейнер с данными о выбранном пользователе -->
    <v-card color="background" flat="" class="d-flex align-start">
        <!-- Форма для редактирования выбранного пользователя -->
        <v-card width="30%">

            <!-- Заголовок формы -->
            <v-card-title>Профиль</v-card-title>

            <!-- Тело формы -->
            <div class="user-profile__body">
                <v-card-subtilte>ФИО</v-card-subtilte>
                <v-text-field placeholder="Фамилия Имя Отчество" v-model="userData.fullName"></v-text-field>
                <v-card-subtilte>Телефон</v-card-subtilte>
                <v-text-field placeholder="+70000000000" v-model="userData.tel"></v-text-field>
                <v-card-subtilte>Email</v-card-subtilte>
                <v-text-field placeholder="your_mail@mail.ru" v-model="userData.email"></v-text-field>
                
                <!-- PASSWORD -->
                <v-card-subtilte>Новый пароль</v-card-subtilte>
                <password-input-comp
                v-model="password"
                :password-rules="passwordRules"
                >
                </password-input-comp>
            
                <!-- REPEAT PASSWORD -->
                <v-card-subtilte>Повторите пароль</v-card-subtilte>
                <password-input-comp
                v-model="repassword"
                :password-rules="rePasswordRules"
                >
                </password-input-comp>

                <v-card-subtilte>Назначить администратором {{ (userData.isSuperuser)? '(Уже назначен)' : '' }}</v-card-subtilte>
                <v-checkbox
                color="var(--text-primary)"
                v-model="isSelectAdmin"
                :label="'Админ'"
                :value="true"
                ></v-checkbox>
            </div>

            <!-- Блок действия с формой -->
            <div class="user-profile__actions">
                <v-btn class="user-profile__actions--btn" color="primary" variant="outlined" @click="router.go(-1)">Назад</v-btn>
                <v-btn class="user-profile__actions--btn" color="primary" @click="changeUser">Изменить</v-btn>
            </div>
        </v-card>
        <v-card width="70%" class="ml-4">
            <!-- Список проектов -->
            <clocksList></clocksList>
        </v-card>
    </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import clocksList from "../clocks/clocksList.vue";
import { getUserByIdCP, changeUserDataCP } from '@/api/users';

const route = useRoute();
const router = useRouter();

// Реактивные данные выбранного пользователя приходят с сервера в onMounted
const userData = reactive({
    id: null,
    email: null,
    tel: null,
    fullName: null,
    created: null,
    lastActivity: null,
    isSuperuser: null,
});
const isSelectAdmin = ref(false);
const password = ref('');
const repassword = ref('');

// Получение данных пользователя по ID
onMounted(async() => {
    try {
        const receivedUser = await getUserByIdCP(+route.params.id);  //тип route.params.id перевожу со string => number
        console.log(receivedUser);
        userData.id = receivedUser.id;
        userData.email = receivedUser.email;
        userData.fullName = receivedUser.fullName;
        userData.tel = receivedUser.tel;
        userData.created = receivedUser.created;
        userData.lastActivity = receivedUser.lastActivity;
        userData.isSuperuser = receivedUser.isSuperuser;
        // Записываем состояние суперпользователя пришедшее с БД
        isSelectAdmin.value = userData.isSuperuser;
    } catch (err) {
        throw new Error(`components/userProfileComp:onMounted => ${err}`);
    }
});

// Редактирование данных выбранного пользователя
async function changeUser() {
    userData.isSuperuser = isSelectAdmin.value;
    let newPassword;
    if(password.value && password.value === repassword.value) {
        newPassword = password.value;
    }
    try {
        const receivedUser = await changeUserDataCP(
            userData.id, 
            userData.email, 
            userData.tel, 
            userData.fullName, 
            newPassword,
            userData.isSuperuser,
            );
            console.log(receivedUser);
    } catch (err) {
        throw new Error(`components/userProfileComp:changeUser => ${err}`);
    }
}

// ВАЛИДАЦИЯ ПАРОЛЕЙ
const passwordRules = ref([
    (value) => (value && value.length >= 8) || "Минимальная длина пароля 8 символов",
    (value) => {
      // Появляется сообщение об ошибке только если поле repassword заполнено
      if(repassword.value.length) {
        return value === repassword.value || "Пароли не совпадают";
      } else {
        return true;
      }
    },
    (value) =>
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value) ||
        "Только латинские буквы, цифры и спецсимволы",
]);
const rePasswordRules = ref([
    (value) => (value && value.length >= 8) || "Минимальная длина пароля 8 символов",
    (value) => value === password.value || "Пароли не совпадают",
    (value) =>
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value) ||
        "Только латинские буквы, цифры и спецсимволы",
]);


</script>

<style scoped>
.user-profile__body {
    display: flex;
    flex-direction: column;
    padding: 0 38px;
}
.user-profile__actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between !important;
    padding: 0 38px 38px 38px;
}
.user-profile__actions--btn {
    width: 45%;
}

</style>