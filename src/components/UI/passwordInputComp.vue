<template>
  <v-text-field
    autocomplete="new-password"
    v-model.trim="password"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :error="error"
    :error-messages="errorMessages"
    required
    density="default"
    bg-color="var(--reverse-bg)"
    :rules="props.passwordRules"
    name="password"
    validateOn="input"
    @click:append-inner="showPassword = !showPassword"
    @change="resetErrors"
    @keyup.enter="keyEnter"
  >
  </v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { defineModel, defineEmits, defineProps } from "@vue/runtime-core";

const props = defineProps({
  passwordRules: {
    type: Array,
    required: false,
  }
});

// Связываем двусторонне это поле ввода с полем в родит. компоненте
const password = defineModel("password");
// Регистрация события keyEnter
const emit = defineEmits(["keyEnter"]);

const showPassword = ref(false);
const error = ref(false);
const errorMessages = ref("");

// Функция вызывает событие отправки формы по нажатию Enter
function keyEnter() {
  emit("keyEnter");
  console.log("keyEnter()");
}

// // Правила ввода Пароля
// const passwordRules = ref([ 
//   (value) => !!value || "Пароль обязательное поле",
//   (value) => (value && value.length >= 8) || "Минимальная длина пароля 8 символов",
//   () => !props.isMatch || "Пароли не совпадают",
// ]);

// Удаление статуса ошибки
function resetErrors() {
  error.value = false;
  errorMessages.value = "";
}
</script>

<style scoped></style>
