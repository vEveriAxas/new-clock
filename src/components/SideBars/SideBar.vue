<template>
  <v-navigation-drawer floating permanent color="#F1F5F9">
    <v-list density="compact" nav>

      <!-- Вкладка "ЧАСЫ" -->
      <v-list-item
        :style="
          (route.name === 'clocksList') ? {backgroundColor: 'var(--text-primary)'} : {}
          "
        @click="router.push({ name: 'clocksList' })"
        :title="'Часы'"
        prepend-icon="mdi-clock"
        ></v-list-item>

      <!-- Вкладка "ПОЛЬЗОВАТЕЛИ" -->
      <v-list-item
        v-if="isShowTabUsers"
        :style="
          (route.name === 'usersList' || route.name === 'selectUser') ? {backgroundColor: 'var(--text-primary)'} : {}
        "
        @click="router.push({ name: 'usersList' })"
        :title="'Пользователи'"
        prepend-icon="mdi-account-multiple"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from "vue";
import useUsersStore from '@/store/users';
const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();

const isShowTabUsers = ref(false);

onMounted(async() => {
    const user = await userStore.getUserAndCache();
    if(user.isSuperuser) {
        isShowTabUsers.value = true;
    }
})

</script>


<style scoped>

</style>