<template>
    <v-row>
        <v-col 
        v-for="(n, index) in 10" 
        cols="3"
        sm="4" 
        md="3"
        :key="index">
            <clockItemComp/>
        </v-col>
    </v-row>
</template>

<script setup>
import clockItemComp from '../generals/clockItemComp.vue';

</script>

<style scoped></style>