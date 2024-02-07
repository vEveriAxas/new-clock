<template>
    <!-- Блок позволяет добавлять новую аватарку (Иконка камеры) -->
    <div v-if="true" 
    class="input-container"  
    @dragleave="onDragLeave"
    @dragover.prevent="onDragOver" 
    @drop.prevent="handleFileDrop"
    >
        <!-- Label используется как нативный HTML-тег. Триггерит input-file для ввода файлов -->
        <label for="input-file"
            class="file-wrapper no-selected-image" 
            :style="{
                backgroundColor: currentBackgroundColor,
                color: currentTextColor,
            }">
                <v-icon class="icon-load" icon="mdi-camera-outline" color="primary"></v-icon>
        </label>
    </div>

    <!-- ХЗ Что это такое блять этот черт заебал уже со своим говнокодом -->
    <div v-else 
    class="govno selected-image"
    @dragleave="onDragLeave" 
    @dragover.prevent="onDragOver"
    >
        <label 
        class="hover-label pointer"
        :class="{ 'is-drag-over': isDragOver }" 
        @drop.prevent="handleFileDrop" 
        for="input-file" 
        >
            <img class="nothing" alt="govno" :src="imgSrc" />
        </label>
        <!-- <svg
        class="v-icon"
        @click="removeImage"
        v-if="removable"
        large
        width="50px"
        height="50px"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"
          fill="#FFFFFF"
        />
      </svg> -->
        <v-btn 
        v-if="removable" 
        class="bg-primary rounded" 
        flat 
        size="mini" 
        variant="text" 
        density="compact" 
        icon="mdi-close"
        rounded="0" 
        style="margin-top: -355px; margin-left: 145px"
        @click="removeImage"
        >
        </v-btn>
    </div>

    <!-- Поле ввода для новой аватарки -->
    <input 
    type="file" 
    v-show="false"
    id="input-file" 
    :value="!modelValue ? modelValue : null"
    @change="handleFileInput" />
</template>
  
<script>
export default {
    name: "ImageInput",
    emits: ["update:modelValue", "load:image", "loadPhoto"],
    // Не понимаю нахрена столько много реквизитов
    props: {
        modelValue: {
            type: [Object, String, null],
        },
        backgroundColorOver: {
            type: String,
            required: false,
            default: "#CEE7FF",
        },
        backgroundColor: {
            type: String,
            required: false,
            default: "#fff",
        },
        textColorOver: {
            type: String,
            required: false,
            default: "#1B7FEB",
        },
        textColor: {
            type: String,
            required: false,
            default: "#000",
        },
        border: {
            type: String,
            required: false,
            default: "none",
        },
        borderRadius: {
            type: String,
            required: false,
            default: "10px",
        },
        width: {
            type: String,
            required: false,
            default: "100px",
        },
        height: {
            type: String,
            required: false,
            default: "100px",
        },
        removable: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isDragOver: false,
            imgSrc: null,
        };
    },
    computed: {
        currentBackgroundColor() {
            return this.isDragOver ? this.backgroundColorOver : this.backgroundColor;
        },
        currentTextColor() {
            return this.isDragOver ? this.textColorOver : this.textColor;
        },
    },
    watch: {
        modelValue: {
            immediate: true, // call in on "created" hook
            handler(newValue) {
                if (!newValue || typeof this.modelValue === "string") {
                    this.imgSrc = newValue;
                } else {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imgSrc = e.target.result;
                    };
                    reader.readAsDataURL(newValue);
                }
            },
        },
    },
    methods: {
        handleFileDrop(e) {
            const droppedFile = e.dataTransfer.files[0];
            if (!droppedFile) return;
            this.$emit("update:modelValue", droppedFile);
            this.isDragOver = false;
            this.loadImage(droppedFile);
        },
        handleFileInput(e) {
            const file = e.target.files[0];
            if (!file) return;
            this.$emit("update:modelValue", file);
            this.loadImage(file);
        },
        removeImage() {
            this.$emit("update:modelValue", null);
            this.$emit("loadPhoto");
        },
        loadImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgSrc = e.target.result;
                this.$emit("load:image", { image: this.imgSrc, file });
            };
            reader.readAsDataURL(file);

            this.$emit("loadPhoto");
        },
        onDragOver() {
            this.isDragOver = true;
        },
        onDragLeave() {
            this.isDragOver = false;
        },
    },
};
</script>
  
<style scoped>
.input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 12px;
    width: 168px;
    height: 168px;
    border-radius: 100px;
    border: 1px solid #ccc;
    cursor: pointer;
    overflow: hidden;
    /* width: fit-content; */
}
.no-selected-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #edeff2;
    border-radius: 100px;
    transition: all 0.3s;
}
.no-selected-image:hover {
    color: #1b7feb !important;
    background: #cee7ff !important;
}
.v-icon {
    position: absolute;
    margin-left: -15px;
    margin-top: -10px;
    color: #1b7feb;
    border-radius: 100px;
    z-index: 100;
    transition: 0.3s;
    cursor: pointer;
}
.v-icon:hover {
    color: #edeff2;
}

.file-wrapper {
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    width: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #edeff2 !important;
    cursor: pointer;
}
.file-wrapper input {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.icon-load {
    margin: auto;
    font-size: 2.5rem !important;
    line-height: 1.2 !important;
    font-weight: 500 !important;
}

.govno {
    position: relative !important;
    width: 168px !important; 
    height: 168px !important; 
    margin-top: 16px !important;
    user-select: none !important;
    border-radius: 100px !important;
} 
.nothing {
    border-radius: 100px;
    width: 168px;
    height: 168px;
    object-fit: cover;
}

.hover-label {
    transition: all 0.3s;
}
.hover-label:hover {
    opacity: 65%;
}

.is-drag-over {
    position: relative;
    transition: all 0.3s;
    opacity: 75%;
}
</style>
  