<template>
  <!-- Поле ввода -->
  <v-text-field
    v-model="value"
    required
    :error="error"
    density="default"
    bg-color="var(--reverse-bg)"
    :rules="valueRules"
    name="number"
    validateOn="blur"
    @change="resetErrors"
    @keyup.enter="keyEnter"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { defineModel, defineEmits, defineProps } from "@vue/runtime-core";

const props = defineProps({
  valueForCheck: {
    type: [String, Number],
    required: false,
    default: null,
  },
  notMatchedText: {
    type: String,
    required: false,
    default: 'Данные не совпадают',
  },
})

// Связываем двусторонне это поле ввода с полем в родит. компоненте
const value = defineModel("value");
// Регистрация события keyEnter
const emit = defineEmits(["keyEnter"]);

// const codeIsMatched = ref(false)

// Функция вызывает событие отправки формы по нажатию Enter
function keyEnter() {
  emit("keyEnter");
  console.log("keyEnter()");
}

// Правила ввода E-Mail
const valueRules = ref([
  (value) => !!value || "Обязательное поле",
  (value) => {
    if(props.valueForCheck !== null) {
      return value === props.valueForCheck || props.notMatchedText
    } else return true;
  }, 
]);

// Перехватчик ошибки
const error = ref(false);
const errorMessages = ref("");
function resetErrors() {
  error.value = false;
  errorMessages.value = "";
}
</script>
