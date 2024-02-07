<template>
  <v-card class="signup__container" elevation="0">
    <v-card-text>
      <!-- Форма Регистрации -->
      <v-form class="text-left" lazy-validation>
        <!-- Заголовок формы -->
        <v-card-title class="signup__title text-h5">
          Создание учетной записи
        </v-card-title>
        <!-- Подзаголовок -->
        <v-card-subtitle style="padding: 0; margin-top: 2px">
          Зарегистрируйтесь с помощью электронной почты.
        </v-card-subtitle>

        <!-- Подзаголовок Поля ввода - E-MAIL -->
        <v-card-subtitle style="margin: 24px 0 2px 0; padding-left: 0">
          Адрес электронной почты
        </v-card-subtitle>
        <!-- E-MAIL -->
        <email-input-comp
          v-model="registrationData.email"
          @keyEnter="() => handlerForm()"
          :require-check-email="true"
        >
        </email-input-comp>

        <!-- Подзаголовок Поля ввода - PASSWORD -->
        <v-card-subtitle style="margin: 2px 0; padding-left: 0">
          Пароль
        </v-card-subtitle>
        <!-- PASSWORD -->
        <password-input-comp
          v-model="registrationData.password"
          :password-rules="passwordRules"
          @keyEnter="() => handlerForm()"
        >
        </password-input-comp>

        <!-- Подзаголовок Поля ввода - REPEAT PASSWORD -->
        <v-card-subtitle style="margin: 6px 0 2px 0; padding-left: 0">
          Повторите пароль
        </v-card-subtitle>
        <!-- REPEAT PASSWORD -->
        <password-input-comp
          v-model="repassword"
          :password-rules="rePasswordRules"
          @keyEnter="() => handlerForm()"
        >
        </password-input-comp>

        <!-- Подзаголовок Поля ввода - NAME -->
        <v-card-subtitle style="margin: 6px 0 2px 0; padding-left: 0">
          Имя
        </v-card-subtitle>
        <!-- input NAME -->
        <input-comp
          v-model.trim="registrationData.firstName"
          @keyEnter="() => handlerForm()"
        >
        </input-comp>

        <!-- Подзаголовок Поля ввода - NAME -->
        <v-card-subtitle style="margin: 6px 0 2px 0; padding-left: 0">
          Фамилия
        </v-card-subtitle>
        <!-- input NAME -->
        <input-comp
          v-model.trim="registrationData.lastName"
          @keyEnter="() => handlerForm()"
        >
        </input-comp>
      </v-form>

      <!-- Подзаголовок кнопки ВОЙТИ -->
      <offer-form-comp
        :title="'Уже есть учетная запись?'"
        :button-title="'Войти'"
        @click="router.push({ name: 'signin' })"
      ></offer-form-comp>

      <v-sheet class="d-flex justify-end mt-8">
        <v-spacer></v-spacer>
        <!-- кнопка ПРОДОЛЖИТЬ -->
        <v-btn
          class="btn text-none"
          color="primary"
          variant="flat"
          @click="handlerForm"
        >
          Продолжить
        </v-btn>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { sendCodeOnEmail } from '@/api/auth';
import useAuthStore from "@/store/auth";
const store = useAuthStore();
const router = useRouter();

const repassword = ref("");

const registrationData = reactive({
  email: null,
  password: null,
  firstName: null,
  lastName: null,
});

onMounted(() => {
  // Получаем захешированные данные заполнения формы с localStorage если они есть
  try {
    const formDataHash = localStorage.getItem("formData");
    if(formDataHash && !!formDataHash.length) {
      // Расшифровываем объект с данными и записываем в поля ввода его ключи 
      const formDataDecrypted = store.decryptObject(formDataHash, store.key); 
      registrationData.email = formDataDecrypted.email;
      registrationData.password = formDataDecrypted.password;
      registrationData.firstName = formDataDecrypted.firstName;
      registrationData.lastName = formDataDecrypted.lastName;
      repassword.value = formDataDecrypted.password;
    }
  } catch (err) {
    throw new Error('signupForm:onMounted', err)
  }
});

// ВАЛИДАЦИЯ ПАРОЛЕЙ
const passwordRules = ref([
    (value) => !!value || "Пароль обязательное поле",
    (value) => (value && value.length >= 8) || "Минимальная длина пароля 8 символов",
    (value) => {
      // Появляется сообщение об ошибке только если поле repassword заполнено
      if(repassword.value.length) {
        return value == repassword.value || "Пароли не совпадают";
      } else {
        return true;
      }
    },
    (value) =>
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value) ||
        "Только латинские буквы, цифры и спецсимволы",
]);
const rePasswordRules = ref([
    (value) => !!value || "Пароль обязательное поле",
    (value) => (value && value.length >= 8) || "Минимальная длина пароля 8 символов",
    (value) => value == registrationData.password || "Пароли не совпадают",
    (value) =>
        /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value) ||
        "Только латинские буквы, цифры и спецсимволы",
]);

// Обрабатывает запрос регистрации нового пользователя 
async function handlerForm() {
  // Получение кода для подтверждения E-mail
  store.code = await sendCodeOnEmail(registrationData.email);
  console.log(store.code);
  // В качестве ключа хэширования используется код подтверждения E-mail
  const formDataHashed = store.encryptObject(registrationData, store.key);
  localStorage.setItem("formData", formDataHashed);
  router.push({ name: 'signupCode' }); // Переходим на странциу подтверждения E-mail
}
</script>

<style scoped>
.signup__container {
  width: 500px;
  padding: 32px;
  box-shadow: 0px 0px 10px 0px #18707d40 !important;
  border-radius: 18px;
  overflow-y: auto;
  font-family: "Nunito Sans", sans-serif;
}
.signup__title {
  font-weight: bold;
  color: var(--text-descr);
  padding-left: 0;
  font-family: "Nunito Sans", sans-serif;
}
.btn {
  font-family: "Nunito Sans", sans-serif;
}
</style>
