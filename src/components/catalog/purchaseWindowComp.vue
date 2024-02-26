<template>
    <v-card class="purchase__window" rounded="lg">
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</v-card-text>
        <v-btn color="primary" block @click="emit('close')">Отмена</v-btn>
    </v-card>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);


</script>

<style scoped>
  
</style>