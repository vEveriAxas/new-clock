<template>
    <!-- Форма для загрузки видеофайлов -->
    <div v-if="!props.modelValue" class="input-container img-avatar" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
        @drop.prevent="handleFileDrop">
        <!-- Label для триггера поля ввода видеофайлов -->
        <label watch :for="props.videoID" class="file-wrapper no-selected-image" :style="{
            
            backgroundColor: currentBackgroundColor,
            color: currentTextColor,
        }">
            <v-icon icon="mdi-play-outline" class="text-h3" color="var(--text-primary)"></v-icon>
        </label>
    </div>
    <!-- Блок отображает видеофайл который загружен в данный input -->
    <div v-else class="video-container">
        <!-- Уведомление об ошибке -->
        <error-message-comp 
        class="not-loaded-err"
        :show="isShowErrorMessage"
        :title="'Ошибка'"
        :text="'Не удалось загрузить видео на сервер'"
        @close="isShowErrorMessage = false"
        ></error-message-comp>
        <div class="video-cover">
            <!-- Крутилка -->
            <v-progress-circular 
            v-if="isUploadVideo"
            model-value="20" 
            indeterminate 
            :width="7"
            color="var(--text-primary)"
            ></v-progress-circular>

            <!-- Загрузить видеофайл в БД -->
            <v-btn
            v-else-if="!isUploadVideo && isAppendNewVideo"
            class="video-cover__upload"
            variant="elevated"
            color="var(--text-primary)"
            icon="mdi-upload"
            title="Отправить"
            @click="uploadVideo"
            ></v-btn>

            <!-- Отменить выбор видеофайла -->
            <v-btn
            class="video-cover__cancel"
            variant="text"
            :density="'compact'"
            icon="mdi-close"
            title="Отменить"
            @click="resetVideo"
            ></v-btn>
        </div>
        <!-- Видеофайл -->
        <video class="video" autoplay :id="`${props.videoID}-stub`" :key="`${props.videoID}-stub`"></video>
    </div>

    <!-- Поле ввода для видеофайлов -->
    <input 
    type="file" 
    style="display: none" 
    :id="props.videoID" 
    :value="!props.modelValue ? props.modelValue : null"
    @change="handleFileInput" accept="video/*" />
</template>
  
<script setup>
import { nextTick } from 'vue';
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue';
import { putVideoProjectByID } from '@/api/clocks';

const props = defineProps({
    modelValue: {
        type: [Object, String, null],
    },
    videoID: {
        type: String,
        required: true,
    },
    projectData: {
        type: Object,
        required: true,
    }
});
const emit = defineEmits(["update:modelValue"]);

const isDragOver = ref(false);
const isUploadVideo = ref(false);
const isAppendNewVideo = ref(false);
const isShowErrorMessage = ref(false);

const backgroundColorOver = '#CEE7FF';
const backgroundColor = '#fff';
const textColorOver = '#1B7FEB';
const textColor = '#000';

// При первичном рендеринге компонента проверяем устанавливаем для video ссылку на видеофайл
onMounted(() => {
    const videoElement = document.getElementById(`${props.videoID}-stub`);
    if(props.modelValue !== null) {
        videoElement.src = props.modelValue;
    }
})

watch(() => props.modelValue, (newValue) => {
    console.log('newValue__watch',newValue);
});

const currentBackgroundColor = computed(() => {
    return isDragOver.value ? backgroundColorOver : backgroundColor;
});
const currentTextColor = computed(() => {
    return isDragOver.value ? textColorOver : textColor;
});

// Запись нового файла в поле для просмотра и последующей загрузки на сервер
async function handleFileInput(event) {
    try {
        const file = event.target.files[0];
        emit('update:modelValue', file);
        isAppendNewVideo.value = true;  // Если видеофайл новодобавленный то будет отображаться кнопка Upload
        // Ожидаем следующего тика DOM-реактивности, присваиваем ресурс к video
        nextTick(async() => {
            const videoElement = document.getElementById(`${props.videoID}-stub`);
            videoElement.src = await loadImage(file);
        });
    } catch (err) {
        return new Error(`components/clockInput:handleFileInput => ${err}`);
    }
}

// Загрузка видеофайла на сервер
async function uploadVideo() {
    try {
        isUploadVideo.value = true;
        const { id, position, index } = props.projectData;
        await putVideoProjectByID(id, props.modelValue, position, index);
        isAppendNewVideo.value = false;
    } catch (err) {
        isShowErrorMessage.value = true;
        return new Error(`components/clockInput:uploadVideo => ${err}`);
    } finally {
        isUploadVideo.value = false;
    }
}

// Сброс видеофайла
async function resetVideo() {
    try {
        // const videoElement = document.getElementById(`${props.videoID}-stub`);
        emit('update:modelValue', null);
    } catch (err) {
        return new Error(`components/clockInput:resetVideo => ${err}`);

    }
}

function handleFileDrop(event) {
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) return;
    isDragOver.value = false;
    const blobFile = loadImage(droppedFile);
    emit("update:modelValue", blobFile);
}


// Форматируем видеофайл в blob-формат
function loadImage(file) {
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
.not-loaded-err {
    top: 10%;
}
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

.selected-video {
    width: 168px !important;
    height: 168px !important;
    overflow: hidden !important;
    display: flex !important;
    align-items: center !important;
    user-select: none !important;
    margin-top: 2rem !important;
    border-radius: 15px !important;
    border: 1px solid black;
}
.video-container {
    position: relative;
    width: 168px;
    height: 168px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-top: 2rem;
    border-radius: 15px;
}

.video-cover {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0ea4e943;
} 
.video-cover__upload {
    position: relative; 
    color: white;
    z-index: 99;
    font-weight: bolder;
}
.video-cover__cancel {
    position: absolute; 
    right: .3rem;
    top: .3rem;
    margin-left: 1rem; 
    color: red; 
    z-index: 99;
}
.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  