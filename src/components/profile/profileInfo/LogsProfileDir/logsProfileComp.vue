<template>
  <v-card color="background" elevation="0" class="pa-2">
    <v-card class="d-flex align-center pa-2 pl-5 rounded-lg">
      <v-icon class="mr-2 pointer" icon="mdi-camera"></v-icon>
      <v-card-text
        ><a href="" class="text-primary">{{ "Вадим Смирнов " }}</a
        >отметил вас на фото</v-card-text
      >
    </v-card>

    <v-card class="pa-1 pl-5 rounded-lg mt-2">
      <v-sheet class="d-flex align-center">
        <v-icon class="mr-2 pointer" icon="mdi-camera"></v-icon>
        <v-card-text class="pa-0 pt-2"
          ><a href="" class="text-primary">{{ "Мария Дружная " }}</a
          >добавила вашу семью в свой семейный круг</v-card-text
        >
      </v-sheet>
      <v-card-actions class="pa-0 pr-4">
        <v-spacer></v-spacer>
        <v-btn
          density="compact"
          variant="text"
          color="primary"
          class="text-none"
          >Подтвердить</v-btn
        >
        <v-btn density="compact" variant="text" class="text-none"
          >Отклонить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-card>
</template>