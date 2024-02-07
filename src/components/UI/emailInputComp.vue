<template>
  <!-- Поле ввода E-mail -->
  <v-text-field
    v-model.trim="email"
    required
    :error="error"
    density="default"
    bg-color="var(--reverse-bg)"
    :rules="emailRules"
    name="email"
    validateOn="blur"
    @change="resetErrors"
    @keyup.enter="keyEnter"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { defineModel, defineEmits, defineProps } from "@vue/runtime-core";
import { existUser } from '../../api/users';

const props = defineProps({
  requireCheckEmail: {
    type: Boolean,
    default: false,
  }
})

// Связываем двусторонне это поле ввода с полем в родит. компоненте
const email = defineModel("email");
// Регистрация события keyEnter
const emit = defineEmits(["keyEnter", "errorInput"]);

// Функция вызывает событие отправки формы по нажатию Enter
function keyEnter() {
  emit("keyEnter");
  console.log("keyEnter()");
}

// Правила ввода E-Mail
const emailRules = ref([
  (value) => !!value || "E-mail обязательное поле",
  (value) => /.+@.+\..+/.test(value) || "Введите корректный E-mail",
  async (value) => {
    // Проверка на существоане E-mail в базе данных
    if(props.requireCheckEmail) {
      const exists = await existUser(value);
      if(exists === false) return true;
      else return 'Пользователь с таким E-mail уже существует';
    } else {
      return true;
    }
  }
]);

// Перехватчик ошибки
const error = ref(false);
const errorMessages = ref("");
function resetErrors() {
  error.value = false;
  errorMessages.value = "";
}
</script>
