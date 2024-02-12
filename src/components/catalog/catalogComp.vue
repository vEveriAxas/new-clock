<template>
    <!-- Каталог всех проектов -->
    <v-row>
        <v-col 
        v-for="(project, index) in projectsList" 
        cols="3"
        sm="4" 
        md="3"
        :key="index">
            <clockItemComp :clock-data="project"/>
        </v-col>
    </v-row>
</template>

<script setup>
import clockItemComp from '../generals/clockItemComp.vue';
import { ref, onMounted } from 'vue';
import { getAllProjects } from '@/api/clocks';

const projectsList = ref([]);


// Получаем список проектов
onMounted(async() => {
    try {
        // Получаем пользователя
        projectsList.value = await getAllProjects(null, false, false, 1);
    } catch (err) {
        throw new Error(`components/clocksList:onMounted =>  ${err}`,);
    }
});

</script>

<style scoped></style>