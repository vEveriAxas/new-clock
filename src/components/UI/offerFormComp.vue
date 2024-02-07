<template>
  <!-- Предложение  -->
  <v-card-subtitle class="offer-form">
    <!-- Еще не зарегистрированы? -->
    {{ props.title }}
    <span class="offer-form__button text-none" variant="text">
      <!-- Регистрация -->
      {{ props.buttonTitle }}
    </span>
  </v-card-subtitle>
</template>

<script setup>
import { defineProps } from "@vue/runtime-core";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonTitle: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.offer-form {
  margin-top: 3px;
  padding-left: 0;
}

.offer-form__button {
  cursor: pointer;
  user-select: none;
  color: var(--text-primary);
  font-weight: bold;
}
</style>
