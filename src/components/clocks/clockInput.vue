<template>
    <!-- Форма для загрузки видеофайлов -->
    <div 
    v-if="true" 
    class="input-container img-avatar" 
    @dragleave="onDragLeave"
    @dragover.prevent="onDragOver" 
    @drop.prevent="handleFileDrop"
    >
        <!-- Label для триггера поля ввода видеофайлов -->
        <label watch
        for="input-video"
        class="file-wrapper no-selected-image" 
        :style="{
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
        }">
            <v-icon icon="mdi-play-outline" class="text-h3" color="var(--text-primary)"></v-icon>
        </label>
    </div>

    <!-- Непонятно для чего нужен этот блок -->
    <!-- <div v-else :style="{}" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
        style="width: 168px; height: 168px; border-radius: 15px" class="relative no-select selected-image mt-2">
        <label @drop.prevent="handleFileDrop" :style="{}" style="width: 168px; height: 168px; border-radius: 15px"
            :for="`${uid}` + '-input'" :class="{ 'is-drag-over': isDragOver }" class="hover-label pointer">
            <video alt="" :src="imgSrc" :style="{}" style="
            border-radius: 15px;
            width: 168px;
            height: 168px;
            object-fit: cover;
          " class="" />
        </label>
        <v-card-actions>
            <v-btn flat v-if="removable" size="mini" variant="text" color="white" density="compact" icon="mdi-close"
                rounded="0" style="margin-top: -355px; margin-left: 125px" @click="removeImage"></v-btn>
        </v-card-actions>
    </div> -->
    
    <!-- Поле ввода для видеофайлов -->
    <input 
    type="file" 
    style="display: none" 
    id="input-video" 
    :value="!modelValue ? modelValue : null"
    @change="handleFileInput" 
    accept="video/*" 
    />
</template>
    
<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Object, String, null],
    },
});
const emit = defineEmits(["update:modelValue", "load:image"]);

const isDragOver = ref(false);
const imgSrc = ref(null);

const backgroundColorOver = '#CEE7FF';
const backgroundColor = '#fff';
const textColorOver = '#1B7FEB';
const textColor = '#000';

const currentBackgroundColor = computed(() => {
    return isDragOver.value ? backgroundColorOver : backgroundColor;
});
const currentTextColor = computed(() => {
    return isDragOver.value ? textColorOver : textColor;
});

watch(() => props.modelValue, (newValue) => {
    if (!newValue || typeof props.modelValue === 'string') {
    imgSrc.value = newValue;
    } else {
    const reader = new FileReader();
    reader.onload = (e) => {
        imgSrc.value = e.target.result;
    };
    reader.readAsDataURL(newValue);
    }
});

function handleFileDrop(event) {
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) return;
    emit("update:modelValue", droppedFile);
    isDragOver.value = false;
    loadImage(droppedFile);
}

function handleFileInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    emit("update:modelValue", file);
    loadImage(file);
    console.log(file);
}

// function removeImage() {
//     emit("update:modelValue", null);
// }

function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imgSrc.value = e.target.result;
        emit("load:image", { image: this.imgSrc, file });
    };
    reader.readAsDataURL(file);
}

function onDragOver() {
    isDragOver.value = true;
}
function onDragLeave() {
    isDragOver.value = false;
}
</script>
    
<style scoped>
.input-container {
    width: 168px !important; 
    height: 168px !important;
    overflow: hidden !important;
    width: fit-content !important;
    display: flex !important;
    align-items: center !important;
    user-select: none !important;
    margin-top: 2rem !important;
    border-radius: 15px !important; 
}

.no-selected-image {
    background: #edeff2;
    border-radius: 15px;
    transition: all 0.3s;
}
.no-selected-image:hover {
    color: #1b7feb !important;
    background: #cee7ff !important;
}

.file-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 170px;
    background: #edeff2 !important;
    cursor: pointer !important;
}

.file-wrapper input {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.hover-label {
    transition: all 0.3s;
}
.hover-label:hover {
    transition: all 0.3s;
    opacity: 65%;
}

.is-drag-over {
    position: relative;
    transition: all 0.3s;
    opacity: 75%;
}
</style>
    