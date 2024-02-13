<template>
    <!-- Форма для просмотра часов -->
    <v-card height="100vh" @click.prevent.right="emit('close')">
        <v-card class="d-flex w-100 h-100 align-center justify-center" color="black">

            <!-- First position -->
            <div class="video__container">
                <video class="video" autoplay muted id="videoId_1" :key="props.firtsLink">
                    <source 
                    :src="props.firtsLink" 
                    type="video/mp4" />
                </video>
            </div>

            <!-- Second position -->
            <div class="video__container">
                <video class="video" autoplay muted id="videoId_2" :key="props.secondLink">
                    <source 
                    :src="props.secondLink" 
                    type="video/mp4" />
                </video>
            </div>

            <!-- Third position -->
            <div class="video__container">
                <video class="video" autoplay muted id="videoId_3" :key="props.thirdLink">
                    <source 
                    :src="props.thirdLink" 
                    type="video/mp4" />
                </video>
            </div>

            <!-- Fourth position -->
            <div class="video__container">
                <video class="video" autoplay muted id="videoId_4" :key="props.fourLink">
                    <source 
                    :src="props.fourLink" 
                    type="video/mp4" />
                </video>
            </div>
        </v-card>
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    firtsLink: {
        type: [String, null],
        required: true,
    },
    secondLink: {
        type: [String, null],
        required: true,
    },
    thirdLink: {
        type: [String, null],
        required: true,
    },
    fourLink: {
        type: [String, null],
        required: true,
    },
})
const emit = defineEmits(['close']);

</script>

<style scoped>
.video__container {
    position: relative;
    width: 25%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.video {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    object-fit: cover;
}
</style>