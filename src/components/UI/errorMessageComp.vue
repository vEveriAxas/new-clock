<template>
    <!-- Уведомление об ошибке -->
    <v-alert
    class="error-message"
    color="error"
    icon="mdi-alert-circle-outline" 
    @click="emit('close')"
    v-show="props.show"
    :title="props.title" 
    :text="props.text"
    ></v-alert>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});

// Скрытие уведомления через время
watch(() => props.show, (newValue) => {
    if(newValue === true) {
        const timeoutID = setTimeout(() => {
            emit('close');
            clearTimeout(timeoutID);
        }, 3000);
    }
})

</script>

<style scoped>
.error-message {
    width: max-content;
    max-width: 500px;
    position: fixed;
    right: 2rem;
    padding-right: 2rem;
    z-index: 999;
    cursor: pointer;
}
</style>