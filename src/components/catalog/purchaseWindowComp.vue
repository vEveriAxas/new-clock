<template>
    <v-card class="purchase__window">
        <v-btn color="primary" block @click="emit('close')">Отмена</v-btn>
    </v-card>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);


</script>

<style scoped>
.purchase__window {
    
}    
</style>