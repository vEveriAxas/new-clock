<template>
    <!-- Форма для загрузки видеофайлов -->
    <div v-if="true" class="input-container img-avatar" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
        @drop.prevent="handleFileDrop">
        <!-- Label для триггера поля ввода видеофайлов -->
        <label watch :for="props.videoID" class="file-wrapper no-selected-image" :style="{
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
        }">
            <v-icon icon="mdi-play-outline" class="text-h3" color="var(--text-primary)"></v-icon>
        </label>
    </div>

    <!-- Поле ввода для видеофайлов -->
    <input type="file" style="display: none" :id="props.videoID" :value="!props.modelValue ? props.modelValue : null"
        @change="handleFileInput" accept="video/*" />
</template>
  
<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Object, String, null],
    },
    videoID: {
        type: String,
        required: true,
    }
});
const emit = defineEmits(["update:modelValue"]);

const isDragOver = ref(false);

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


function handleFileDrop(event) {
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) return;
    isDragOver.value = false;
    const blobFile = loadImage(droppedFile);
    emit("update:modelValue", blobFile);
}

// Получаем видеофайл и Update в clocksSelect
async function handleFileInput(event) {
    try {
        const file = event.target.files[0];
        emit('update:modelValue', file);
    } catch (err) {
        return new Error(`components/handleFileInput:loadImage => ${err}`);
    }
}

// Форматируем видеофайл в blob-формат
function loadImage(file) {
    console.log(loadImage.name);
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                resolve(result);
            };
            if(file) {
                reader.readAsDataURL(file);
            } else {
                resolve(null);
            }
        } catch (err) {
            reject(new Error(`components/clockInput:loadImage => ${err}`));
        }
    });
}

// function removeImage() {
//     emit("update:modelValue", null);
// }

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
  