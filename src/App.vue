<template>
    <v-app class="app">
        <router-view></router-view>
    </v-app>
</template>

<script setup>



</script>

<style>
:root {
    --reverse-bg: #ffffff;
    --text-primary: #0ea5e9;
    --background: #f1f5f9;
    --text-descr: #415174;
    --shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
    --border: 1px solid rgba(0, 0, 0, 0.199);
    --fill-icon-gray: rgb(89, 89, 89);
}

.app {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    overflow: hidden;
    font-family: "Nunito Sans", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

html {
    overflow-y: hidden !important;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@import url(./media/index.css);
</style>
