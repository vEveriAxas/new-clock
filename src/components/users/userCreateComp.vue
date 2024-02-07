<template>
    <v-dialog width="500">
        <template v-slot:activator="{ props }">
            <!-- <v-btn v-bind="props" text="Open Dialog"> </v-btn> -->
            <!-- +СОЗДАТЬ -->
            <v-btn 
            class="users-list__add" 
            prepend-icon="mdi-plus" 
            color="#0ea5e9" 
            v-bind="props"
            @click="isActive = true"
            text="Создать"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
                    <!-- Форма для редактирования выбранного пользователя -->
            <v-card class="user-create__form" rounded="lg">

                <!-- Заголовок формы -->
                <v-card-title>Создайте нового пользователя</v-card-title>

                <!-- Тело формы -->
                <div class="user-profile__body">
                    <v-card-subtilte>ФИО</v-card-subtilte>
                    <v-text-field placeholder="Фамилия Имя Отчество" v-model="fullName"></v-text-field>
                    <v-card-subtilte>Телефон</v-card-subtilte>
                    <v-text-field placeholder="+70000000000" v-model="tel"></v-text-field>
                    <v-card-subtilte>Email</v-card-subtilte>
                    <email-input-comp 
                    placeholder="email@example.com" 
                    v-model:email="email"
                    :require-check-email="true"
                    ></email-input-comp>
                    
                    <!-- PASSWORD -->
                    <v-card-subtilte>Пароль</v-card-subtilte>
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

                    <v-card-subtilte>Назначить администратором</v-card-subtilte>
                    <v-checkbox
                    color="var(--text-primary)"
                    v-model="isSelectAdmin"
                    :label="'Админ'"
                    :value="true"
                    ></v-checkbox>
                </div>

                <!-- Блок действия с формой -->
                <div class="user-profile__actions">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" block @click="changeUser(isActive)">Создать</v-btn>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { createUserCP, getUsersCP } from '@/api/users';

const emit = defineEmits(['updateUsersList']);

const fullName = ref('');
const tel = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');
const isSelectAdmin = ref(false);


async function changeUser(isActive) {
    try {
        await createUserCP(email.value, tel.value, fullName.value, password.value, isSelectAdmin.value);
        const usersList = await getUsersCP();
        return emit('updateUsersList', usersList);
    } catch (err) {
        throw new Error(`components/userCreateComp:changeUser => ${err}`);
    } finally {
        isActive.value = false;
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
.user-create__form {
    padding: 16px 28px 30px 28px;
}
.users-list__add {
    margin: 0 10px 0 20px;
}
</style>