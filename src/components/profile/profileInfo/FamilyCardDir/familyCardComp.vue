<template>
  <v-card color="background" elevation="0" class="pa-2">
    <v-card class="pa-0 rounded-lg">
      <v-card-text class="d-flex align-center pa-2">
        <v-card-text>Семья</v-card-text>
        <v-btn color="primary" class="text-none" variant="text"
          >Показать всех</v-btn
        >
      </v-card-text>

      <v-card-text class="d-flex align-start justify-space-between pa-0">
        <v-card-text class="d-flex align-center pt-0 pb-1">
          <v-avatar class="pa-0" color="surface-variant"></v-avatar>
          <v-card-text class="pa-0">
            <v-card-text class="text-subtitle-1 pb-0"
              >Валентина Смирнова</v-card-text
            >
            <v-card-subtitle>Сестра</v-card-subtitle>
            <v-btn variant="text" density="compact">Написать</v-btn>
          </v-card-text>
        </v-card-text>
        <v-card-text class="pa-0">
          <v-btn elevation="0" size="small" icon="mdi-dots-vertical"></v-btn>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-card>
</template>