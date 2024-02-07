<template>
  <!-- Форма Авторизации Контейнер -->
  <v-card class="signin__container" elevation="0">
    <!-- Заголовок формы -->
    <v-card-title class="signin__title text-h5">
      Добро пожаловать!
    </v-card-title>

    <!-- Форма Авторизации -->
    <v-form lazy-validation style="padding: 8px 16px">
      <!-- Заголовок E-mail -->
      <v-card-subtitle style="margin: 32px 0 8px 0; padding-left: 0">
        Адрес электронной почты
      </v-card-subtitle>

      <!-- Поле ввода E-mail -->
      <email-input-comp
        v-model="email"
        @keyEnter="() => handleLogin()"
        :require-check-email="false"

      ></email-input-comp>

      <!-- Заголовок Пароля -->
      <v-card-subtitle style="margin: 8px 0; padding-left: 0">
        Пароль
      </v-card-subtitle>

      <!-- Поле ввода Пароля -->
      <password-input-comp
        v-model="password"
        @keyEnter="() => handleLogin()"
      ></password-input-comp>

      <!-- Подзаголовок Пароля -->
      <offer-form-comp
        :title="'Еще не зарегистрированы?'"
        :button-title="'Регистрация'"
        @click="router.push({ name: 'signup' })"
      ></offer-form-comp>

      <!-- кнопка ПРОДОЛЖИТЬ -->
      <v-sheet class="signin__buttons">
        <v-btn
          class="btn text-none"
          color="primary"
          size="large"
          :loading="isLoading"
          :disabled="isSignInDisabled"
          @click="handleLogin"
        >
          Продолжить
        </v-btn>
      </v-sheet>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../../api/auth.js";
import { useRouter } from "vue-router";
const router = useRouter();

const isLoading = ref(false);
const isSignInDisabled = ref(false);

const email = ref("");
const password = ref("");

function handleLogin() {
  if (!email.value.length && !password.value.length) {
    return;
  }
  login(email.value, password.value);
}
</script>

<style scoped>
.signin__container {
  width: 500px;
  padding: 32px 32px 32px 32px;
  box-shadow: 0px 0px 10px 0px #18707d40 !important;
  border-radius: 18px;
  font-family: "Nunito Sans", sans-serif;
}
.signin__title {
  font-weight: bold;
  color: var(--text-descr);
  font-family: "Nunito Sans", sans-serif;
}
.signin__buttons {
  display: flex;
  justify-content: end;
  margin: 32px 0 0 0;
}
.btn {
  font-family: "Nunito Sans", sans-serif;
}
</style>
