<template>
    <div v-if="!modelValue" class="input-container d-flex align-center no-select mt-2 img-avatar" @dragleave="onDragLeave"
        @dragover.prevent="onDragOver" @drop.prevent="handleFileDrop"
        style="border-radius: 3px 3px 0px 0px; width: 184px; height: 126px" :style="{}">
        <label for="input-image"
            class="file-wrapper no-selected-image pointer d-flex flex-column align-center justify-center" :style="{
                backgroundColor: currentBackgroundColor,
                color: currentTextColor,
            }">
            <slot name="empty-layout d-flex align-center">
                <v-icon icon="mdi-plus" class="icon-plus text-h4"></v-icon>
                <!-- <span class="no-selected-image-title text-align-center d-flex align-center flex-center text-subtitle-2">
                    Добавить
                </span> -->
            </slot>
        </label>
    </div>
    <div :style="{}" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
        style="width: 184px; height: 126px; border-radius: 3px 3px 0px 0px" v-else
        class="relative no-select selected-image mr-2 mt-2">
        <label @drop.prevent="handleFileDrop" :style="{}"
            style="width: 184px; height: 126px; border-radius: 3px 3px 0px 0px" :for="`${uid}` + '-input'"
            :class="{ 'is-drag-over': isDragOver }" class="hover-label pointer">
            <img alt="" :src="imgSrc" :style="{}" style="
          border-radius: 3px 3px 0px 0px;
          width: 184px;
          height: 126px;
          object-fit: cover;
        " class="" />
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
        <v-btn flat v-if="removable" size="mini" variant="text" color="white" class="bg-my_grey" icon="mdi-close"
            rounded="0" style="
        margin-top: -255px;
        margin-left: 160px;
        border-radius: 0px 3px 0px 0px !important;
      " @click="removeImage"></v-btn>
    </div>
    <input type="file" style="display: none" id="input-image" :value="!modelValue ? modelValue : null"
        @change="handleFileInput" />
</template>

<script>
let uid = 0;
export default {
    name: "ImageInput",
    emits: ["update:modelValue", "load:image"],
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
        uid += 1;
        return {
            uid: `image-input${uid}`,
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
        },
        loadImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgSrc = e.target.result;
                this.$emit("load:image", { image: this.imgSrc, file });
            };
            reader.readAsDataURL(file);
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
    overflow: hidden;
    width: fit-content;
}

.no-selected-image {
    background: #fff;
    border-radius: 3px 3px 0px 0px;
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
    background: var(--primary);
    color: #1b7feb;
    border-radius: 3px 3px 0px 0px;
    z-index: 100;
    transition: 0.3s;
    cursor: pointer;
}
.v-icon:hover {
    background: var(--primary);
    color: #fff;
}
.file-wrapper {
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    width: 170px;
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
    opacity: 65%;
}
.is-drag-over {
    position: relative;
    transition: all 0.3s;
    opacity: 75%;
}
.icon-plus {
    margin: auto !important;
}
</style>
