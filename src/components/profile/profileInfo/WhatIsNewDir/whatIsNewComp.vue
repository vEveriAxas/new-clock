<template>
    <v-card class="whats-is-new__container d-flex rounded-lg align-center pr-3">
        <v-text-field density="compact" placeholder="Что у вас нового ?" single-line variant="solo" hide-details
            type="text" :flat="true"></v-text-field>
        <v-sheet>
            <v-icon class="mr-2 pointer" icon="mdi-camera"></v-icon>
            <v-icon class="mr-2 pointer" icon="mdi-play-circle"></v-icon>
            <v-icon class="pointer" icon="mdi-format-text"></v-icon>
        </v-sheet>
    </v-card>
</template>

<style scoped>
.whats-is-new__container {
    margin: 8px 0;
}
</style>